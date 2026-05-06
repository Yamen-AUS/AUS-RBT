/* ========================================
   RBT – Dubai Coverage Map Animation
   Animated bus on SVG route map
   ======================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  animateDubaiMap();
  initAreaPillHover();
});

/* ── Animated Bus Along Route ── */
function animateDubaiMap() {
  const bus = document.getElementById('animated-bus');
  if (!bus) return;

  // Waypoints: Dubai → Sharjah (via Al Ittihad Road) → Ajman → back
  // Updated for expanded tri-emirate SVG viewBox (1200×640)
  const waypoints = [
    { x: 80,   y: 392 },   // Discovery Gardens (Dubai W)
    { x: 162,  y: 380 },   // Discovery Gardens centre
    { x: 305,  y: 330 },   // Al Barsha
    { x: 455,  y: 278 },   // Jumeirah
    { x: 600,  y: 224 },   // Downtown Dubai
    { x: 700,  y: 200 },   // Mirdif approach
    { x: 745,  y: 175 },   // Deira
    { x: 800,  y: 162 },   // Dubai-Sharjah border approach
    { x: 878,  y: 152 },   // Border crossing DXB→SHJ ★
    { x: 895,  y: 150 },   // Al Butina Sharjah
    { x: 938,  y: 192 },   // Sharjah City / Al Majaz ★
    { x: 988,  y: 265 },   // Al Taawun Sharjah
    { x: 1005, y: 335 },   // Al Qasimia Sharjah
    { x: 900,  y: 375 },   // Muwaileh Sharjah
    { x: 938,  y: 192 },   // Back to Sharjah City
    { x: 962,  y: 153 },   // Al Khan Sharjah (coast)
    { x: 1012, y: 108 },   // Border crossing SHJ→AJM ★
    { x: 1058, y: 222 },   // Al Rashidiya Ajman
    { x: 1095, y: 150 },   // Ajman City ★
    { x: 1140, y: 216 },   // Al Nuaimia Ajman
    { x: 1118, y: 273 },   // Al Rumailah Ajman
    { x: 1155, y: 318 },   // Al Jurf Ajman
    { x: 1095, y: 150 },   // Back to Ajman City
    { x: 1012, y: 108 },   // Back through AJM-SHJ border
    { x: 938,  y: 192 },   // Sharjah City again
    { x: 878,  y: 152 },   // Back through SHJ-DXB border
    { x: 745,  y: 175 },   // Deira
    { x: 600,  y: 224 },   // Downtown
    { x: 455,  y: 278 },   // Jumeirah
    { x: 305,  y: 330 },   // Al Barsha
    { x: 162,  y: 380 },   // Discovery Gardens
    { x: 80,   y: 392 },   // Back to start
  ];

  let current = 0;
  let next = 1;
  let progress = 0;
  const speed = 0.008; // 0..1 per frame

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function step() {
    progress += speed;

    if (progress >= 1) {
      progress = 0;
      current = next;
      next = (next + 1) % waypoints.length;

      // When we wrap back to start, teleport silently
      if (next === 0) {
        current = 0;
        next = 1;
      }
    }

    const p = easeInOut(Math.min(progress, 1));
    const cx = waypoints[current];
    const cn = waypoints[next];
    const x = lerp(cx.x, cn.x, p);
    const y = lerp(cx.y, cn.y, p);

    // Rotate bus in direction of travel
    const dx = cn.x - cx.x;
    const dy = cn.y - cx.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    bus.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${angle.toFixed(1)})`);

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ── Area Pill Tooltips ── */
function initAreaPillHover() {
  const pills = document.querySelectorAll('.area-pill.active');
  pills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.cursor = 'pointer';
    });
  });
}

/* ── Pulse Dots Animation (SVG) ── */
function initPulseDots() {
  const dots = document.querySelectorAll('.pulse-dot');
  dots.forEach((dot, i) => {
    dot.style.animationDelay = `${i * 0.3}s`;
  });
}

document.addEventListener('DOMContentLoaded', initPulseDots);
