let img;
let particles = [];
let totalPoints = 120;
let mouseForce = 0;
let myCanvas;

function preload(){
  img = loadImage("horse.png",
    () => { console.log("Image loaded successfully"); },
    () => { console.warn("Image load failed, using fallback"); img = null; }
  );
}

function setup(){
  let container = document.getElementById('sketch-container');
  let w = container ? container.offsetWidth : windowWidth;
  let h = container ? container.offsetHeight : windowHeight;

  myCanvas = createCanvas(w, h);
  myCanvas.parent('sketch-container');

  if (img && img.width > 0) {
    img.resize(0, min(h * 0.55, 400));
  }
  generateParticles();
  console.log("Setup complete, particles:", particles.length);
}

function getThemeColor() {
  // dark mode -> white (255), light mode -> black (0)
  return document.documentElement.dataset.theme === 'dark' ? 255 : 0;
}

function generateParticles(){
  let candidates = [];

  if (img && img.width > 0) {
    img.loadPixels();
    for(let y = 0; y < img.height; y += 3){
      for(let x = 0; x < img.width; x += 3){
        let index = 4 * (y * img.width + x);
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let brightness = (r + g + b) / 3;

        if(brightness < 180){
          candidates.push({
            x: x,
            y: y,
            darkness: 255 - brightness
          });
        }
      }
    }
  }

  if (candidates.length === 0) {
    for (let i = 0; i < 500; i++) {
      candidates.push({
        x: random(200),
        y: random(250),
        darkness: random(50, 200)
      });
    }
  }

  for(let i = 0; i < totalPoints; i++){
    let p = random(candidates);
    particles.push({
      x: random(width),
      y: random(height),
      tx: width * 0.72 - (img && img.width > 0 ? img.width / 2 : 100) + p.x,
      ty: height / 2 - (img && img.height > 0 ? img.height / 2 : 125) + p.y,
      darkness: p.darkness,
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }
}

function draw(){
  clear(); // Transparent background — lets the hero theme color show throug

  let c = getThemeColor();
  let breathe = 1 + sin(frameCount * 0.04) * 0.015;

  let targetX = width * 0.72;
  let targetY = height / 2;
  let distanceToMouse = dist(mouseX, mouseY, targetX, targetY);
  mouseForce = map(distanceToMouse, 0, width / 2, 1, 0);
  mouseForce = constrain(mouseForce, 0, 1);

  for(let p of particles){
    if(mouseForce > 0.05){
      let speed = 0.03 + mouseForce * 0.08;
      p.x = lerp(p.x, targetX + (p.tx - targetX) * breathe, speed);
      p.y = lerp(p.y, targetY + (p.ty - targetY) * breathe, speed);
    } else {
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > width) p.vx *= -1;
      if(p.y < 0 || p.y > height) p.vy *= -1;
    }
  }

  for(let i = 0; i < particles.length; i++){
    for(let j = i + 1; j < particles.length; j++){
      let a = particles[i];
      let b = particles[j];
      let d = dist(a.x, a.y, b.x, b.y);

      if(d < 100){
        let chance = map(d, 0, 100, 0.7, 0);
        chance += (a.darkness + b.darkness) / 1000;
        if(random() < chance){
          let alpha = map(d, 0, 100, 150, 0);
          stroke(c, alpha);
          strokeWeight(0.7);
          line(a.x, a.y, b.x, b.y);
        }
      }
    }
  }

  noStroke();
  fill(c);
  for(let p of particles){
    circle(p.x, p.y, 3);
  }
}

function windowResized(){
  let container = document.getElementById('sketch-container');
  if(container && myCanvas){
    resizeCanvas(container.offsetWidth, container.offsetHeight);
    particles = [];
    if (img && img.width > 0) {
      img.resize(0, min(container.offsetHeight * 0.55, 400));
    }
    generateParticles();
  }
}
