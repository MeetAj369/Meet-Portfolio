import Matter from 'matter-js';

let activeInstance = null;
let savedStyles = new Map();
let savedContainerHeight = '';

export const startGravity = (containerSelector, itemSelector) => {
  if (activeInstance) {
    stopGravity(containerSelector, itemSelector);
  }

  const container = document.querySelector(containerSelector);
  const items = Array.from(document.querySelectorAll(itemSelector));
  
  if (!container || items.length === 0) return null;

  savedContainerHeight = container.style.height;

  const { Engine, Runner, World, Bodies, Mouse, MouseConstraint, Events } = Matter;
  
  const engine = Engine.create();
  const world = engine.world;

  // Make container relative and give it some height to fall into
  container.style.position = 'relative';
  const origHeight = container.getBoundingClientRect().height;
  container.style.height = `${Math.max(origHeight, 800)}px`;
  
  const width = container.getBoundingClientRect().width;
  const height = container.getBoundingClientRect().height;

  // Create boundaries
  const thickness = 60;
  const ground = Bodies.rectangle(width / 2, height + thickness/2, width * 2, thickness, { isStatic: true });
  const wallLeft = Bodies.rectangle(0 - thickness/2, height / 2, thickness, height * 2, { isStatic: true });
  const wallRight = Bodies.rectangle(width + thickness/2, height / 2, thickness, height * 2, { isStatic: true });
  const ceiling = Bodies.rectangle(width / 2, 0 - thickness/2, width * 2, thickness, { isStatic: true });
  
  World.add(world, [ground, wallLeft, wallRight, ceiling]);

  const bodyMap = new Map();
  const containerRect = container.getBoundingClientRect();

  savedStyles.clear();

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    
    // Save original styles for clean reset
    savedStyles.set(item, {
      position: item.style.position,
      top: item.style.top,
      left: item.style.left,
      margin: item.style.margin,
      zIndex: item.style.zIndex,
      transition: item.style.transition,
      transform: item.style.transform,
      width: item.style.width,
      height: item.style.height,
    });

    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;

    const body = Bodies.rectangle(x, y, rect.width, rect.height, {
      restitution: 0.6,
      friction: 0.1,
      density: 0.001
    });
    
    World.add(world, body);
    bodyMap.set(item, { body, width: rect.width, height: rect.height });
    
    item.style.width = `${rect.width}px`;
    item.style.height = `${rect.height}px`;
  });

  // Position items absolute
  items.forEach((item) => {
    item.style.position = 'absolute';
    item.style.top = '0px';
    item.style.left = '0px';
    item.style.margin = '0';
    item.style.zIndex = '50';
    item.style.transition = 'none';
  });

  // Mouse interaction
  const mouse = Mouse.create(container);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  });
  
  Mouse.setOffset(mouse, { x: -containerRect.left, y: -containerRect.top });
  World.add(world, mouseConstraint);

  // Sync DOM to Physics
  const updateListener = () => {
    bodyMap.forEach(({ body, width, height }, item) => {
      const px = body.position.x - width / 2;
      const py = body.position.y - height / 2;
      const angle = body.angle;
      item.style.transform = `translate(${px}px, ${py}px) rotate(${angle}rad)`;
    });
  };

  Events.on(engine, 'afterUpdate', updateListener);

  const runner = Runner.create();
  Runner.run(runner, engine);

  activeInstance = {
    engine,
    runner,
    world,
    updateListener,
    container,
    items
  };

  return activeInstance;
};

export const stopGravity = (containerSelector, itemSelector) => {
  if (!activeInstance) return;

  const { runner, engine, updateListener, container, items } = activeInstance;
  
  if (runner) Matter.Runner.stop(runner);
  if (engine) {
    Matter.Events.off(engine, 'afterUpdate', updateListener);
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);
  }

  // Restore container
  if (container) {
    container.style.position = '';
    container.style.height = savedContainerHeight || '';
  }

  // Restore items
  items.forEach((item) => {
    const saved = savedStyles.get(item);
    if (saved) {
      item.style.position = saved.position || '';
      item.style.top = saved.top || '';
      item.style.left = saved.left || '';
      item.style.margin = saved.margin || '';
      item.style.zIndex = saved.zIndex || '';
      item.style.transition = 'all 0.4s ease';
      item.style.transform = '';
      item.style.width = '';
      item.style.height = '';
    } else {
      item.style.position = '';
      item.style.transform = '';
      item.style.width = '';
      item.style.height = '';
      item.style.transition = 'all 0.4s ease';
    }
  });

  activeInstance = null;
};
