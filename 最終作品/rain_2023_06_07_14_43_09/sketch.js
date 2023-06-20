let rainyes = []; 
let circles = []; 
let num = 50;  // num2
let random_color;
let color_list = [[196, 223, 223], [210, 233, 233], [227, 244, 244], [130, 148, 196], [172, 177, 214], [219, 223, 234], 
[148, 179, 253], [148, 218, 255], [153, 254, 255]];
let color_status;
let index;

function preload() {
  rain_sound = loadSound('rainy.mp3'); 
  water_sound = loadSound('水滴1.mp3'); 
}

function setup() {
  createCanvas(600, 600); 

  rain_sound.setVolume(0.1); 
  rain_sound.loop(); 
  water_sound.setVolume(0.5); 

  for (let i = 0; i < num; i++) {
    rainyes.push(new Rainy()); 
  }
  color_status = 1;
}

function draw() {
  background(248, 246, 244, 10); 

  for (let i = rainyes.length - 1; i >= 0; i--) {
    rainyes[i].move(); 
    rainyes[i].display(); 

    if (rainyes[i].pos.y > height) {
      rainyes.splice(i, 1); 
      rainyes.push(new Rainy()); 
    }
  }

  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update(); 
    circles[i].display(); 

    if (circles[i].cir_size >= circles[i].max_size) {
      circles.splice(i, 1); 
    }
  }
}

function mousePressed() {
  if (rainyes.length > 0) {
    let randomIndex = floor(random(rainyes.length));
    let randomPos = rainyes[randomIndex].pos;
    circles.push(new Circle(randomPos)); 
    rainyes.splice(randomIndex, 1); 
    water_sound.play(); 
  }
    rainyes[1].update();
}

class Rainy {
  constructor() {
    this.pos = createVector(random(width), 0);
    this.velocity = createVector(random(-0.3, 0.3), random(3, 5)); 
    this.cir_size = random(3, 10);
    this.cir_color1 = color_list[floor(random(3))];
    this.cir_color2 = color_list[floor(random(3, 6))];
    this.cir_color3 = color_list[floor(random(6, 9))];
  }

  move() {
    this.pos.add(this.velocity);
  }

  update() {
    if(color_status < 3) {
      color_status ++;
    } else {
      color_status = 1;
    }
    console.log(color_status)
  }

  display() {
    noStroke();
    if(color_status == 1) {
    fill(this.cir_color1);
    } else if(color_status == 2) {
      fill(this.cir_color2);
    } else if(color_status == 3) {
      fill(this.cir_color3);
    }
    ellipse(this.pos.x, this.pos.y, this.cir_size); 
  }
}

class Circle {
  constructor(pos) {
    this.pos = pos.copy(); 
    this.cir_size = 0; 
    this.max_size = random(50, 150); 
  }

  update() {
    if (this.cir_size < this.max_size) {
      this.cir_size += 1; 
    } else {
      circles.splice(circles.indexOf(this), 1); // 最大サイズの波紋を削除
    }
  }

 display() {
    noFill();
    let transparency = map(this.pos.y, 0, height, 10, 255);
    stroke(157, 178, 191, transparency);
    ellipse(this.pos.x, this.pos.y, this.cir_size, this.cir_size / 3); // 波紋
  }
}
