let points = [];
let circles3 = [];
let particles = [];
let triangles = [];
const point_num = 100;
const line_num = 10;
const cir_num = 8;
const tri_num = 10;
let start1 = [];
let end1 = [];
let disX1 = [];
let disY1 = [];
let start2 = [];
let end2 = [];
let disX2 = [];
let disY2 = [];
const line_speed = 200;
let speeds = 1;
let status3; // status
let mic;

function draw_line() {
  if(speeds < line_speed) {
    for(let i = 0; i < line_num; i++) {
      stroke(252, 255, 231, 50);
      line(points[start2[i]].posX, points[start2[i]].posY, points[start2[i]].posX + disX2[i] * speeds / line_speed, points[start2[i]].posY + disY2[i] * speeds / line_speed);
    }
    speeds ++;
  } else {
    for(let i = 0; i < line_num; i++) {
      if(speeds - line_speed < line_speed) {
        status3 = "1";
        stroke(252, 255, 231, 50);
        line(points[start1[i]].posX, points[start1[i]].posY, points[start1[i]].posX + disX1[i] * (speeds - line_speed) / line_speed, points[start1[i]].posY + disY1[i] * (speeds - line_speed) / line_speed);
      } else if (speeds - line_speed < line_speed * 2) {
        status3 = "2";
        stroke(252, 255, 231, 50);
        line(points[start1[i]].posX, points[start1[i]].posY, points[start1[i]].posX + disX1[i], points[start1[i]].posY + disY1[i]);
        line(points[start2[i]].posX, points[start2[i]].posY, points[start2[i]].posX + disX2[i] * (speeds - line_speed * 2) / line_speed, points[start2[i]].posY + disY2[i] * (speeds - line_speed * 2) / line_speed);
        }
      if(status3 == "1") {
        line(points[start2[i]].posX, points[start2[i]].posY, points[start2[i]].posX + disX2[i], points[start2[i]].posY + disY2[i]);
      }
    }
    speeds ++;
    if(speeds - line_speed > line_speed * 2) {
      speeds = line_speed;
    }
  }
}

function preload() {
  bgm = loadSound("galaxy.mp3");
  click = loadSound("click.mp3");
}

function setup() {
  createCanvas(600, 600);
  pg6 = createGraphics(width, height)
  bgm.loop();
  
  angleMode(DEGREES);
  rectMode(CENTER);
  
  for(let i = 0; i < point_num; i++) {
    points.push(new Point(pg6));
  }
  
  // 線の始点、終点、距離のリスト作成
  for(let i = 0; i < line_num; i++) {
    start1.push(floor(random(points.length)));
  end1.push(floor(random(points.length)));
    disX1.push(points[end1[i]].posX - points[start1[i]].posX);
    disY1.push(points[end1[i]].posY - points[start1[i]].posY);
  }
  for(let i = 0; i < line_num; i++) {
    start2.push(floor(random(points.length)));
    end2.push(floor(random(points.length)));
    disX2.push(points[end2[i]].posX - points[start2[i]].posX);
    disY2.push(points[end2[i]].posY - points[start2[i]].posY);
  }
  
  for(let i = 0; i < cir_num; i++) {
    circles3.push(new Circle3(pg6));
  }

  for(let i = 0; i < tri_num; i++) {
    triangles.push(new Triangle(pg6));
  }

  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();
}

function draw() {
  image(pg6, 0, 0);
  pg6.background(43, 52, 103, 50);
  let volume = mic.getLevel();

  for(let i = 0; i < points.length; i++) {
    points[i].display();
  }
  
  draw_line();
  
  for(let i = 0; i < circles3.length; i++) {
    circles3[i].move();
    circles3[i].display();
    if(circles3[i].cir_size >= circles3[i].max_size) {
      
      particles.push(new Particle(circles3[i].posX, circles3[i].posY, circles3[i].cir_size, pg6));
      circles3.push(new Circle3(pg6));
      circles3.splice(i, 1);
    }
  }
  

  for(let j = 0; j < particles.length; j++) {
    particles[j].move();
    particles[j].display();
  }

  for(let i = 0; i < triangles.length; i++) {
    pg6.push();
    triangles[i].display();
    triangles[i].move(volume);
    pg6.pop();
  }
  console.log(volume)
  if(volume > 0.05) {
    click.play();
  }
}

class Point {
  constructor() {
    this.posX = random(width);
    this.posY = random(height);
    this.size = 5
  }
  
  display() {
    pg6.noStroke()
    pg6.fill(252, 255, 231, 100);
    pg6.ellipse(this.posX, this.posY, this.size);
  }
}

class Circle3 {
  constructor(_pg6) {
    this.ran = floor(random(points.length))
    this.posX = points[this.ran].posX;
    this.posY = points[this.ran].posY;
    this.max_size = random(100, 400);
    this.cir_size = 0;
    this.weight = random(1, 3);
    this.speed = random(0.3, 2);
    this.pg6 = _pg6;
  }
  move() {
    if(this.cir_size < this.max_size) {
      this.cir_size += this.speed;
    }
  }
  display() {
    this.pg6.push();
    this.pg6.strokeWeight(this.weight);
    this.pg6.stroke(235, 69, 95);
    this.pg6.noFill();
    this.pg6.ellipse(this.posX, this.posY, this.cir_size);
    this.pg6.pop();
  }
}

class Particle {
  constructor(x, y, cir_size, _pg6) {
    this.posX = x;
    this.posY = y;
    this.lifetime = 300;
    this.angle = 360 / 50;
    this.pos2 = cir_size;
    this.num = 1;
    this.transparency = 255;
    this.pg6 = _pg6
  }
  move() {
      this.num += 0.008
      this.transparency -= 1
  }
  display() {
    this.pg6.fill(235, 69, 95, this.transparency);
    this.pg6.noStroke();
    for(let i = 0; i < 50; i++) {
      this.pg6.ellipse(this.posX + this.pos2 / 2 * cos(this.angle * i) * this.num, this.posY + this.pos2 / 2 * sin(this.angle * i) * this.num, 2);
    }
  }
}

class Triangle {
  constructor(_pg6) {
    this.ran = floor(random(points.length))
    this.tri_size = random(40, 80)
    this.posX = points[this.ran].posX;
    this.posY = points[this.ran].posY - this.tri_size;
    this.angle1 = 0;
    this.rotation = random(0.5, 1);
    this.angle2 = 0;
    this.ran2 = random(50, 100);
    this.pg6 = _pg6
  }
  move(volume) {
    this.angle1 += this.rotation;
    this.angle2 += volume * this.ran2;
  }
  display() {
    this.pg6.noFill();
    this.pg6.stroke(173, 221, 208)
    this.pg6.translate(this.posX, this.posY + this.tri_size);
    this.pg6.rotate(this.angle1);
    for(let j = 0; j < 4; j++) {
      this.pg6.rotate(this.angle2);
      this.pg6.triangle(0, - this.tri_size, - this.tri_size, this.tri_size / 2, this.tri_size, this.tri_size / 2);
    }
  }
}