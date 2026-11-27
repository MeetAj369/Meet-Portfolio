/**
 * Updates pointer spotlight coordinates directly on element style for GPU-smooth
 * translucent card glow without triggering React re-renders.
 */
export const handleSpotlightMove = (e) => {
  if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
    return;
  }
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty('--spot-x', `${x.toFixed(1)}%`);
  el.style.setProperty('--spot-y', `${y.toFixed(1)}%`);
};

export const handleSpotlightLeave = (e) => {
  const el = e.currentTarget;
  el.style.setProperty('--spot-x', '50%');
  el.style.setProperty('--spot-y', '50%');
};
