const num = 15;
const center_size = 30;
const circle_num = 10;
let circle_posX;
let circle_posY;
let color_list = [[240,128,128,230], [255,192,203, 230], [255,255,224, 230], [221,160,221, 230], [152,251,152, 230], [135,206,250, 230]];
let flowers = [];
let circles = [];
let status = [];

function preload() {
  bgm1 = loadSound("soyosoyo.mp3");
}

function setup() {
  createCanvas(500, 500);
  for(let i = 0; i < num; i++) {
    flowers.push(new Flower());
  }
  bgm1.loop();
  bgm1.setVolume(0.1);
}

function draw() {
  blendMode(ADD);
  background(255, 100);
  blendMode(BLEND)
  rotation();
  for (let i = 0; i < circles1.length; i++) {
    circles[i].move();
    circles[i].display();
    if (circles[i].lifetime < 0) {
      // 配列から消す
      circles.splice(i, 1);
    }
  }
  for(let i = 0; i < flowers.length; i++) {
    flowers[i].update();
    flowers[i].display();
  }
}

function rotation() {
  if(mouseIsPressed) {
    for(let i = 0; i < flowers.length; i++) {
      if(mouseX > flowers[i].posX - flowers[i].len && mouseX < flowers[i].posX + flowers[i].len) {
        if(mouseY > flowers[i].posY - flowers[i].len && mouseY < flowers[i].posY + flowers[i].len) {
          flowers[i].angle += 3
          push();
          rotate(flowers[i].angle);
          pop();
          for(let i = 0; i < flowers.length; i++) {
            if(mouseX > flowers[i].posX - flowers[i].len && mouseX < flowers[i].posX + flowers[i].len) {
              if(mouseY > flowers[i].posY - flowers[i].len && mouseY < flowers[i].posY + flowers[i].len) {
                for (let j = 0; j < 5; j++) {
                  circles.push(new Circle(mouseX, mouseY));
                }
              }
            }
          }
        }
      }
    }
  }
}

class Flower {
  constructor() {
    this.posX = random(width);
    this.posY = random(height);
    this.center_color = color(240, 230, 140, 240);
    this.len = random(50, 100);
    this.weight = 20;
    this.angle = 0;
    this.petal = 360 / this.weight;
    this.flower_color =  color(color_list[floor(random(color_list.length))]);
  }
  
  update() {
    this.angle += 1;
  }
  
  display() {
    angleMode(DEGREES);
    push();
    translate(this.posX, this.posY);
    rotate(this.angle);
    ellipseMode(CORNER);
    for(let j = 0; j < this.petal; j++) {
      push();
      strokeWeight(0.5);
      stroke(0, 100);
      fill(this.flower_color);
      rotate(360 / this.petal * j);
      ellipse(0, 0,  this.len, this.weight);
      pop();
    }
    fill(this.center_color);
    strokeWeight(0.5);
    stroke(0, 100);
    ellipseMode(CENTER);
    ellipse(0, 0, center_size);
    pop();
  }
}

class Circle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.velocity.mult(random(1, 2));
    this.circle_color = color(random(100, 255), random(100, 255), random(100, 255), 100);
    this.size = random(10, 30);
    this.time = 300;
  }
  move() {
    this.position.add(this.velocity);
    this.lifetime --;
  }
  display() {
    push();
    noStroke();
    fill(this.circle_color);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }
}