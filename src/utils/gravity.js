import Matter from 'matter-js';

export const startGravity = (containerSelector, itemSelector) => {
  const container = document.querySelector(containerSelector);
  const items = Array.from(document.querySelectorAll(itemSelector));
  
  if (!container || items.length === 0) return null;

  const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events } = Matter;
  
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

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    
    // Calculate initial center position relative to container
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;

    const body = Bodies.rectangle(x, y, rect.width, rect.height, {
      restitution: 0.6,
      friction: 0.1,
      density: 0.001
    });
    
    World.add(world, body);
    
    // Store original dimensions for positioning
    bodyMap.set(item, { body, width: rect.width, height: rect.height });
    
    // Fix width and height so they don't collapse when position absolute
    item.style.width = `${rect.width}px`;
    item.style.height = `${rect.height}px`;
  });

  // Now make them absolute after all rects are calculated
  items.forEach((item) => {
    item.style.position = 'absolute';
    item.style.top = '0px';
    item.style.left = '0px';
    item.style.margin = '0';
    item.style.zIndex = '50';
    item.style.transition = 'none'; // Disable CSS transitions!
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
  
  // Fix for mouse coordinates when container is scrolled
  Mouse.setOffset(mouse, { x: -containerRect.left, y: -containerRect.top });

  World.add(world, mouseConstraint);

  // Sync DOM to Physics
  Events.on(engine, 'afterUpdate', () => {
    bodyMap.forEach(({ body, width, height }, item) => {
      const px = body.position.x - width / 2;
      const py = body.position.y - height / 2;
      const angle = body.angle;
      item.style.transform = `translate(${px}px, ${py}px) rotate(${angle}rad)`;
    });
  });

  // Run the engine
  const runner = Runner.create();
  Runner.run(runner, engine);

  return { engine, runner };
};
