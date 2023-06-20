let flakes = [];
let snows = [];
let angle = 0

function preload() {
  bgm = loadSound("snow.mp3");
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  flakes.push(new Flake());
  bgm.loop();
  bgm.setVolume(0.2)
  
  for (let i = 0; i < 80; i++) {
    snows.push(new Snow());
  }
}

function draw() {
  background(142, 167, 233, 50);
  
  for (let i = 0; i < snows.length; i++) {
    snows[i].move();
    snows[i].display();
    if(snows[i].pos.y > height) {
      snows.splice(i, 1);
      snows.push(new Snow());
    }
  }
  judge();
}

function judge() {
  push()
  translate(flakes[0].posX, flakes[0].posY)
  rotate(angle)
  flakes[0].display();
  pop()
  angle += 0.5
  if(mouseIsPressed) {
    if(flakes[0].col < 255) {
      flakes[0].col += 1;
    } else {
      for (let i = 0; i < snows.length; i++) {
        if(dist(snows[i].pos.x, snows[i].pos.y, mouseX, mouseY) < snows[i].cir_size / 2) {
          flakes[0].update();
        }
      }
    }
  }
}

class Flake {
  constructor() {
    this.posX = width / 2;
    this.posY = height / 2;
    this.len = 60;
    this.angle = 30;
    this.ran = 150;
    this.col = 0;
    this.mainX = 0;
    this.mainY = 0;
    this.subX = [0, 0, 0, 0, 0, 0, 0 ,0]; // this.posX 
    this.subY = [0, 0, 0, 0, 0, 0, 0,0];
    this.rotate_angle = 0;
  }
  
  update() {
    if(this.mainX < this.posX - this.len && this.mainY < this.posY - this.len) {
      this.mainX ++;
      this.mainY ++;
      for(let i = 0; i < this.subX.length; i++) {
        if(this.mainX > this.subX[i] && this.subX[i] < this.ran) {
          this.subX[i] ++;
          this.subY[i] ++;
        } 
      }
    } else {
      this.mainX = 0;
      this.mainY = 0;
      for(let i = 0; i < this.subX.length; i++) {
        this.subX[i] = 0;
        this.subY[i] = 0;
      }
   }
  }

  display() {
    for (let i = 0; i < 360 / this.angle; i++) {
      stroke(255, this.col);
      strokeWeight(4);
      push();
      // translate(this.posX, this.posY);
      rotate(this.angle * i);
      line(0, 0, this.mainX, this.mainY);
      for(let j = 0; j < 8; j++) {
        line(this.subX[j] / (j + 1), this.subY[j] / (j + 1), this.subX[j] / (j + 1), (this.subY[j] + this.ran) / (j + 1));
        line(this.subY[j] / (j + 1), this.subY[j] / (j + 1), (this.subX[j]+ this.ran) / (j + 1), this.subX[j] / (j + 1));
      }
      pop();
    }
    ellipse(this.posX, this.posY, 10);
  }
}


class Snow {
  constructor() {
    this.pos = createVector(random(width), 0);
    this.cir_size = random(10, 30);
    this.velocity = createVector(random(-0.5, 0.5), random(1));
  }
  move() {
    this.pos.add(this.velocity);
  }
  display() {
    noStroke();
    fill(255, 255, 255, 100);
    ellipse(this.pos.x, this.pos.y, this.cir_size);
  }
}