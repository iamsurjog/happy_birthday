const toggleBtn = document.getElementById('toggle-theme');
document.documentElement.setAttribute('data-theme', 'dark');
toggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});

  const button = document.getElementById('confetti-button');
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];

  function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: height,
      dx: Math.random() * 4 - 2,
      dy: Math.random() * -10 - 5,
      radius: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      gravity: 0.1,
      alpha: 1,
      decay: 0.01,
    };
  }

  function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function updateParticle(particle) {
    particle.x += particle.dx;
    particle.y += particle.dy;
    particle.dy += particle.gravity;
    particle.alpha -= particle.decay;

    if (particle.alpha <= 0) {
      return false;
    }
    return true;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles = particles.filter(particle => {
      drawParticle(particle);
      return updateParticle(particle);
    });

    requestAnimationFrame(animate);
  }

  button.addEventListener('click', () => {
     for(let i = 0; i < 200; i++){
        particles.push(createParticle());
     }
  });

  initCanvas();
  animate();

  window.addEventListener('resize', initCanvas);
