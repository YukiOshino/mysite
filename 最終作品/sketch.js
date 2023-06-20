// mainの関数
let box_size = 600;
let eyeZ;
let objects = [];
let angle1 = 0;
let box_status;
let rotate_status;
let ran;
let z = 3;
let boxes = [];

// flowerの関数
const num1 = 15;
const center_size = 30;
const circle_num = 10;
let circle_posX;
let circle_posY;
let color_list1 = [[240, 128, 128, 200], [255, 192, 203, 200], [255, 255, 224, 200], [221, 160, 221, 200], [152, 251, 152, 200], [135, 206, 250, 200]];
let flowers = [];
let circles1 = [];

// thunderの関数
let handpose;
let video;
let predictions = [];
let posX;
let posY;
let endX;
let endY;
let angle2;
let x1;
let y1;
let x2;
let y2;
let status1 = "no";
const wind_num = 8;

// sunnyの関数
let faceapi;
let detections;
let status2 = [];
let mouth_max = [];
let mouth_min = [];
let start_size;
let suns = [];
let trees1 = [];
let trees2 = [];
let trees3 = [];
let grasses = [];
let t = 0;
let n = 0;
let angle3;
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}

// snowの関数
let flakes = [];
let snows = [];
let angle4 = 0;

// rainyの関数
let rainyes = [];
let circles2 = [];
let num2 = 50;
let random_color;
let color_list2 = [[196, 223, 223], [210, 233, 233], [227, 244, 244], [130, 148, 196], [172, 177, 214], [219, 223, 234], 
[148, 179, 253], [148, 218, 255], [153, 254, 255]];
let color_status;
let index;

// starの関数
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
let status3;
let mic;

function preload() {
  // main
  image_thunder = loadImage("thunder.png");
  image_sunny = loadImage("sunny.png");
  // flower
  bgm1 = loadSound("soyosoyo.mp3");
  // thunder
  bgm6 = loadSound("kaze.mp3");
  biri = loadSound("get.mp3");
  // sunny
  bgm2 = loadSound("sunny.mp3");
  smiling = loadSound("kirakira.mp3");
  // snow
  bgm3 = loadSound("snow.mp3");
  // rainy
  bgm4 = loadSound('rainy.mp3');
  water_sound = loadSound('水滴1.mp3');
  // star
  bgm5 = loadSound("galaxy.mp3");
  click = loadSound("click.mp3");
}

function setup() {
  box_status = "main";
  rotate_status = "rotation";
  createCanvas(600, 600, WEBGL);
  camera(0, 0, 1500);
  // どの面を表示させるか選ぶ
  // ran = floor(random(6));
  ran = 1
  angleMode(DEGREES);
  rectMode(CENTER);
  noiseSeed(100);

  if (ran == 1 || ran == 2) {
    video = createCapture(VIDEO);
    video.size(width, height);
    handpose = ml5.handpose(video, modelReady);
    handpose.on("predict", results => {
      predictions = results;
    });
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    video.hide();
  }

  // カメラの位置と原点の距離
  eyeZ = height / 2 / tan(30);

  // 各面の追加
  pg1 = createGraphics(box_size, box_size); // flower
  pg2 = createGraphics(box_size, box_size); // thunder
  pg3 = createGraphics(box_size, box_size); // sunny
  pg4 = createGraphics(box_size, box_size); // snow
  pg5 = createGraphics(box_size, box_size); // rainy
  pg6 = createGraphics(box_size, box_size); // star

  objects.push(new IntersectPlane(1, 0, 0, -100, 0, 0)); // flower
  objects.push(new IntersectPlane)

  for(let i = 0; i < 80; i++) {
    boxes.push(new Box());
  }

  // flower
  for (let i = 0; i < num1; i++) {
    flowers.push(new Flower(pg1));
  }

  // sunny
  angle3 = random(180);

  // snow
  flakes.push(new Flake(pg4));
  for (let i = 0; i < 80; i++) {
    snows.push(new Snow(pg4));
  }

  // rainy
  for (let i = 0; i < num2; i++) {
    rainyes.push(new Rainy(pg5)); 
  }
  color_status = 1;


  // star
  pg6 = createGraphics(width, height)
  
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
  if (box_status == "main") {
    createCanvas(600, 600, WEBGL);
    camera(0, 0, 1500);
    ambientLight(0, 0, 100);
    directionalLight(255, 255, 0, 800, 0, 0, -1);
  } else {
    createCanvas(600, 600);
  }
  background(220);

  rotateX(angle1);
  rotateY(angle1 * 2);
  rotateZ(angle1 * z);
  if (box_status == "main") {
    angle1 += 3;
  }

  // 各面の描画
  if (box_status == "main") {
    for(let i = 0; i < boxes.length; i++) {
      boxes[i].display();
    }
    push();
    translate(0, 0, -box_size / 2);
    noFill();
    noStroke();
    box(box_size);
    draw_flower();
    draw_thunder();
    //draw_sunny();
    thunder_image();
    sunny_image();
    draw_snow();
    draw_rainy();
    draw_star();
    pop();
  }

  if (box_status == "main") {
    // 各面の貼り付け
    // flower
    push();
    translate(-box_size / 2, -box_size / 2);
    draw_flower();
    image(pg1, 0, 0);
    pop();
    // thuder
    push();
    translate(-box_size / 2, -box_size / 2, -box_size);
    rotateX(90);
    draw_thunder();
    image(pg2, 0, 0);
    pop();
    // sunny
    push();
    translate(-box_size / 2, -box_size / 2);
    rotateY(90);
    image(pg3, 0, 0);
    pop();
    // snow
    push();
    translate(box_size / 2, -box_size / 2, -box_size);
    rotateX(90);
    rotateY(90);
    draw_snow();
    image(pg4, 0, 0);
    pop();
    // rainy
    push();
    translate(-box_size / 2, box_size / 2, -box_size);
    rotateX(90);
    rotateY(0);
    image(pg5, 0, 0);
    pop();
    // star
    push();
    translate(-box_size / 2, -box_size / 2, -box_size);
    image(pg6, 0, 0);
    pop();
  }
  // selected();
  draw_image()

  const x = mouseX - width / 2;
  const y = mouseY - height / 2;
  const Q = createVector(0, 0, eyeZ); // 光線の始点
  const v = createVector(x, y, -eyeZ); // 光線の方向ベクトル

  let intersect; // 光線と平面の交点
  let closestLambda = eyeZ * 10;

  for (let x = 0; x < objects.length; x++) {
    let object = objects[x];
    let lambda = object.getLambda(Q, v); // 光線がオブジェクトと交差するラムダの値

    if (lambda < closestLambda && lambda > 0) {
      intersect = p5.Vector.add(Q, p5.Vector.mult(v, lambda));
      closestLambda = lambda;
    }
  }
}

// thunder, sunnyのカメラ設定
function modelReady() {
  if (box_status == "sunny" || box_status == "thunder") {
    console.log("Model ready!");
    console.log(faceapi);
    faceapi.detect(gotResults);
  }
}

function mousePressed() {
  if (box_status == "main") {
    if (ran == 0) {
      box_status = "flower";
      bgm1.loop();
      bgm1.setVolume(0.1);
    } else if (ran == 1) {
      bgm6.loop();
      bgm1.setVolume(0.05);
      box_status = "thunder";
    } else if (ran == 2) {
      box_status = "sunny";
      bgm2.loop();
      bgm2.setVolume(0.1);
    } else if (ran == 3) {
      box_status = "snow";
      bgm3.loop();
      bgm3.setVolume(0.1);
    } else if (ran == 4) {
      box_status = "rainy";
      bgm4.loop();
      bgm4.setVolume(0.1);
      water_sound.setVolume(0.5);
    } else if (ran == 5) {
      box_status = "star";
      bgm5.loop();
      bgm5.setVolume(0.1);
    }
  }
  if (box_status == "rainy") {
    if (rainyes.length > 0) {
      let randomIndex = floor(random(rainyes.length));
      let randomPos = rainyes[randomIndex].pos;
      circles2.push(new Circle2(randomPos, pg5)); 
      rainyes.splice(randomIndex, 1); 
      water_sound.play(); 
      rainyes[1].update();
    }
  }
}

// 各面の表示
function draw_image() {
  if (box_status == "flower") {
    createCanvas(600, 600);
    translate(-box_size / 2, -box_size / 2);
    draw_flower();
    image(pg1, 0, 0);
  } else if (box_status == "thunder") {
    createCanvas(600, 600);
    translate(-box_size / 2, -box_size / 2);
    draw_thunder();
    image(pg2, 0, 0);
  } else if (box_status == "sunny") {
    createCanvas(600, 600);
    translate(-box_size / 2, -box_size / 2);
    draw_sunny();
    image(pg3, 0, 0);
  } else if (box_status == "snow") {
    createCanvas(600, 600);
    translate(-box_size / 2, -box_size / 2);
    draw_snow();
    image(pg4, 0, 0);
  } else if (box_status == "rainy") {
    createCanvas(600, 600);
    translate(-box_size / 2, -box_size / 2);
    draw_rainy();
    image(pg5, 0, 0);
  } else if (box_status == "star") {
    createCanvas(600, 600);
    translate(-box_size / 2, -box_size / 2);
    draw_star();
    image(pg6, 0, 0);
  }
}

function thunder_image() {
  pg2.image(image_thunder, 0, 0, 0, box_size);
}

function sunny_image() {
  pg3.image(image_sunny, 0, 0, 0, box_size);
}

// flower：描画
function draw_flower() {
  pg1.blendMode(ADD);
  pg1.background(255, 100);
  pg1.blendMode(BLEND);
  rotation();
  for (let i = 0; i < circles1.length; i++) {
    circles1[i].move();
    circles1[i].display();
    if (circles1[i].lifetime < 0) {
      // 配列から消す
      circles1.splice(i, 1);
    }
  }
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].update();
    flowers[i].display();
  }
}

// flower：回転
function rotation() {
  if (mouseIsPressed) {
    for (let i = 0; i < flowers.length; i++) {
      if (mouseX > flowers[i].posX - flowers[i].len && mouseX < flowers[i].posX + flowers[i].len) {
        if (mouseY > flowers[i].posY - flowers[i].len && mouseY < flowers[i].posY + flowers[i].len) {
          flowers[i].angle += 3
          pg1.push();
          pg1.rotate(flowers[i].angle);
          pg1.pop();
          for (let i = 0; i < flowers.length; i++) {
            if (mouseX > flowers[i].posX - flowers[i].len && mouseX < flowers[i].posX + flowers[i].len) {
              if (mouseY > flowers[i].posY - flowers[i].len && mouseY < flowers[i].posY + flowers[i].len) {
                for (let j = 0; j < 5; j++) {
                  circles1.push(new Circle1(mouseX, mouseY, pg1));
                }
              }
            }
          }
        }
      }
    }
  }
}

// flower：花の描画
class Flower {
  constructor(_pg1) {
    this.posX = random(box_size);
    this.posY = random(box_size);
    this.center_color = color(240, 230, 140, 240);
    this.len = random(50, 100);
    this.weight = 20;
    this.angle = 0;
    this.petal = 360 / this.weight;
    this.flower_color = color(color_list1[floor(random(color_list1.length))]);
    this.pg1 = _pg1;
  }
  update() {
    this.angle += 1;
  }
  display() {
    this.pg1.angleMode(DEGREES);
    this.pg1.push();
    this.pg1.translate(this.posX, this.posY);
    this.pg1.rotate(this.angle);
    this.pg1.ellipseMode(CORNER);
    for (let j = 0; j < this.petal; j++) {
      this.pg1.push();
      this.pg1.strokeWeight(0.5);
      this.pg1.stroke(0, 100);
      this.pg1.fill(this.flower_color);
      this.pg1.rotate(360 / this.petal * j);
      this.pg1.ellipse(0, 0, this.len, this.weight);
      this.pg1.pop();
    }
    this.pg1.fill(this.center_color);
    this.pg1.strokeWeight(0.5);
    this.pg1.stroke(0, 100);
    this.pg1.ellipseMode(CENTER);
    this.pg1.ellipse(0, 0, center_size);
    this.pg1.pop();
  }
}

// flower：花びら
class Circle1 {
  constructor(x, y, _pg1) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.velocity.mult(random(1, 2));
    this.circle_color = color(random(100, 255), random(100, 255), random(100, 255), 100);
    this.size = random(10, 30);
    this.time = 300;
    this.pg1 = _pg1;
  }
  move() {
    this.position.add(this.velocity);
    this.lifetime--;
  }
  display() {
    this.pg1.push();
    this.pg1.noStroke();
    this.pg1.fill(this.circle_color);
    this.pg1.ellipse(this.position.x, this.position.y, this.size);
    this.pg1.pop();
  }
}


// thunder：描画
function draw_thunder() {
  if (box_status == "thunder") {
    pg2.image(video, 0, 0, width, height);
    status1 = "no";
    drawKeypoints();
    if (status1 == "no") {
      biri.stop();
    }
  }
}

// thunder：位置判定
function drawKeypoints() {
  pg2.background(0, 200);
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    let x_list = [];
    let y_list = [];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      x_list.push(keypoint[0]);
      y_list.push(keypoint[1]);
      wind();
    }
    posY = min(y_list);
    posX = x_list[y_list.indexOf(posY)];
    thunder_1();
    posY = min(y_list);
    posX = x_list[y_list.indexOf(posY)];
    thunder_2();
    posY = min(y_list);
    posX = x_list[y_list.indexOf(posY)];
    thunder_3();
    posY = min(y_list);
    posX = x_list[y_list.indexOf(posY)];
    thunder_4();
    biri.loop();
  }
}

// thunder：各線の定義
function thunder_1() {
  for (let j = 0; j < 300; j++) {
    endX = posX + random(-4, 4);
    endY = posY + 3;
    pg2.strokeWeight(0.1 * j);
    pg2.stroke(255);
    pg2.line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}
function thunder_2() {
  for (let j = 0; j < 300; j++) {
    endX = posX + 3;
    endY = posY + random(-4, 4);
    pg2.strokeWeight(0.1 * j);
    pg2.stroke(255);
    pg2.line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}
function thunder_3() {
  for (let j = 0; j < 300; j++) {
    endX = posX + random(-4, 4);
    endY = posY - 3;
    pg2.strokeWeight(0.1 * j);
    pg2.stroke(255);
    pg2.line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}
function thunder_4() {
  for (let j = 0; j < 300; j++) {
    endX = posX - 3;
    endY = posY + random(-4, 4);
    pg2.strokeWeight(0.1 * j);
    pg2.stroke(255);
    pg2.line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}

// thunder：風
function wind() {
  for (let i = 0; i < wind_num; i++) {
    angle2 = i * 360 / wind_num;
    x1 = width / 2 + cos(angle2) * 200;
    y1 = height / 2 + sin(angle2) * 200;
    x2 = width / 2 + cos(angle2) * 400;
    y2 = height / 2 + sin(angle2) * 400;
    strokeWeight(1);
    stroke(255, 100);
    line(x1, y1, x2 + 50, y2 + 50);
    status1 = "yes";
  }
}

// sunny：描画
function draw_sunny() {
  pg3.image(video, 0, 0, width, height);
  pg3.background(193, 239, 255, 200);

  for (let i = 0; i < suns.length; i++) {
    suns[i].display();
  }
  for (let i = 0; i < trees1.length; i++) {
    trees1[i].display();
  }
  for (let i = 0; i < trees2.length; i++) {
    trees2[i].display();
  }
  for (let i = 0; i < trees3.length; i++) {
    trees3[i].display();
  }
  for (let i = 0; i < grasses.length; i++) {
    grasses[i].display();
  }
}

// sunnyの唇感知
function gotResults(err, result) {
  if (box_status == "sunny") {
    if (err) {
      console.log(err)
      return
    }
    // console.log(result)
    detections = result;

    // background(220);
    pg3.background(255);
    //image(video, 0,0, width, height)
    if (detections) {
      if (detections.length > 0) {
        // console.log(detections)
        //drawBox(detections)
        drawLandmarks(detections)
      }
    }
    faceapi.detect(gotResults)
  }
}

// sunny：ボックス
function drawBox(detections) {
  if (box_status != "main") {
    for (let i = 0; i < detections.length; i++) {
      const alignedRect = detections[i].alignedRect;
      const x = alignedRect._box._x
      const y = alignedRect._box._y
      const boxWidth = alignedRect._box._width
      const boxHeight = alignedRect._box._height

      pg3.noFill();
      pg3.stroke(161, 95, 251);
      pg3.strokeWeight(2);
      pg3.rect(x, y, boxWidth, boxHeight);
    }
  }
}

// sunny：唇描画
function drawLandmarks(detections) {
  if (box_status != "main") {
    pg3.noFill();
    // stroke(161, 95, 251)
    // strokeWeight(2)
    pg3.noStroke();

    for (let i = 0; i < detections.length; i++) {
      const mouth = detections[i].parts.mouth;
      drawPart(mouth, true);
    }
  }
}

// sunnyの笑顔判定
function drawPart(feature, closed) {
  if (box_status != "main") {
    let mouthX = [];

    pg3.beginShape();
    for (let i = 0; i < feature.length; i++) {
      const x = feature[i]._x
      const y = feature[i]._y
      pg3.vertex(x, y)
      mouthX.push(x);

      if (closed === true) {
        pg3.endShape(CLOSE);
      } else {
        pg3.endShape();
      }
    }
    mouth_min.push(min(mouthX));
    mouth_max.push(max(mouthX));
    start_size = mouth_max[0] - mouth_min[0];
    now_size = mouth_max[mouth_max.length - 1] - mouth_min[mouth_min.length - 1];
    if (now_size > start_size + 10) {
      status2.push("smile");
    } else {
      status2.push("defalt");
    }
    if (status2[status2.length - 2] == "defalt" && status2[status2.length - 1] == "smile") {
      smile();
      smiling.play();
    }
  }
}


// sunny：笑ったとき
function smile() {
  if (suns.length < 32) {
    for (let i = 0; i < 8; i++) {
      suns.push(new Sun(pg3));
    }
  } else if (trees1.length < 40) {
    for (let i = 0; i < 20; i++) {
      trees1.push(new Tree(trees1.length, pg3))
      n += 0.05;
      if (trees1.length > 20) {
        n += 0.05;
      }
    }
  } else if (trees2.length < 40) {
    n = 0;
    for (let i = 0; i < 20; i++) {
      trees2.push(new Tree(trees2.length, pg3));
      n += 0.05;
      if (trees2.length > 20) {
        n += 0.05;
      }
    }
  } else if (trees3.length < 40) {
    n = 0;
    for (let i = 0; i < 20; i++) {
      trees3.push(new Tree(trees3.length, pg3));
      n += 0.05;
      if (trees3.length > 20) {
        n += 0.05;
      }
    }
  } else {
    for (let i = 0; i < 20; i++) {
      grasses.push(new Grass(pg3));
    }
  }
}

// sunny：太陽
class Sun {
  constructor(_pg3) {
    this.posX = random(width);
    this.posY = random(height / 6);
    this.cir_size = random(20,100);
    this.colorful = color(255, random(190, 255), random(164, 193), 200);
    this.pg3 = _pg3;
  }

  display() {
    this.pg3.fill(this.colorful);
    this.pg3.noStroke();
    this.pg3.ellipse(this.posX, this.posY, this.cir_size);
  }
}

// sunny：木
class Tree {
  constructor(i, _pg3) {
    this.pos = createVector(map(noise(n), 0, 1, width / 2 - 500, width / 2 + 500), height - i * 10);
    this.cir_size = map(this.pos.y, 100, height, 0, 40);
    this.colorful = color(random(102, 159), random(90, 135), random(72, 114), 200);
    this.pg3 = _pg3;
  }
  display() {
    this.pg3.fill(this.colorful);
    this.pg3.ellipse(this.pos.x + 250, this.pos.y, this.cir_size);
  }
}

// sunny：葉
class Grass {
  constructor(_pg3) {
    this.cir_size = random(20, 40);
    this.colorful = color(random(115, 144), random(169, 200), 173, 150);
    this.angle = random(360);
    this.radius = random(0, width / 2 - 50);
    this.pg3 = _pg3;
  }
  display() {
    this.pg3.fill(this.colorful);
    this.pg3.ellipse(width / 2 + this.radius * cos(this.angle), height / 2 + this.radius * sin(this.angle), this.cir_size);
  }
 }

// snow：描画
function draw_snow() {
  pg4.background(142, 167, 233, 50);

  for (let i = 0; i < snows.length; i++) {
    snows[i].move();
    snows[i].display();
    if (snows[i].pos.y > height) {
      snows.splice(i, 1);
      snows.push(new Snow(pg4));
    }
  }
  judge();
}

// snow：あたり判定
function judge() {
  pg4.push();
  pg4.translate(flakes[0].posX, flakes[0].posY)
  pg4.rotate(angle4);
  flakes[0].display();
  pg4.pop();
  angle4 += 0.005;
  if (mouseIsPressed) {
    if(flakes[0].col < 255) {
      flakes[0].col += 1;
    } else {
      for (let i = 0; i < snows.length; i++) {
        if (dist(snows[i].pos.x, snows[i].pos.y, mouseX, mouseY) < snows[i].cir_size / 2) {
          flakes[0].update();
        }
      }
    }
  }
}

// snow：雪の結晶
class Flake {
  constructor(_pg4) {
    this.posX = width / 2;
    this.posY = height / 2;
    this.len = 60;
    this.angle = 30;
    this.ran = 150;
    this.col = 0;
    this.mainX = 0;
    this.mainY = 0;
    this.subX = [0, 0, 0, 0, 0, 0, 0, 0];
    this.subY = [0, 0, 0, 0, 0, 0, 0, 0];
    this.rotate_angle = 0;
    this.pg4 = _pg4;
  }
  update() {
    if (this.mainX < this.posX - this.len && this.mainY < this.posY - this.len) {
      this.mainX++;
      this.mainY++;
      for (let i = 0; i < this.subX.length; i++) {
        if (this.mainX > this.subX[i] && this.subX[i] < this.ran) {
          this.subX[i]++;
          this.subY[i]++;
        }
      }
    } else {
      this.mainX = 0;
      this.mainY = 0;
      for (let i = 0; i < this.subX.length; i++) {
        this.subX[i] = 0;
        this.subY[i] = 0;
      }
    }
  }
  display() {
    for (let i = 0; i < 360 / this.angle; i++) {
      this.pg4.stroke(255, this.col);
      this.pg4.strokeWeight(4);
      this.pg4.push();
      this.pg4.rotate(this.angle * i);
      this.pg4.line(0, 0, this.mainX, this.mainY);
      for (let j = 0; j < 8; j++) {
        this.pg4.line(this.subX[j] / (j + 1), this.subY[j] / (j + 1), this.subX[j] / (j + 1), (this.subY[j] + this.ran) / (j + 1));
        this.pg4.line(this.subY[j] / (j + 1), this.subY[j] / (j + 1), (this.subX[j] + this.ran) / (j + 1), this.subX[j] / (j + 1));
      }
      this.pg4.pop();
    }
    this.pg4.ellipse(this.posX, this.posY, 10);
  }
}

// snow：雪の粒
class Snow {
  constructor(_pg4) {
    this.pos = createVector(random(width), 0);
    this.cir_size = random(10, 30);
    this.velocity = createVector(random(-0.5, 0.5), random(1));
    this.pg4 = _pg4;
  }
  move() {
    this.pos.add(this.velocity);
    console.log()
  }
  display() {
    this.pg4.noStroke();
    this.pg4.fill(255, 255, 255, 100);
    this.pg4.ellipse(this.pos.x, this.pos.y, this.cir_size);
  }
}

// rainy：描画
function draw_rainy() {
  pg5.background(248, 246, 244, 10);

  for (let i = rainyes.length - 1; i >= 0; i--) {
    rainyes[i].move();
    rainyes[i].display();
    if (rainyes[i].pos.y > height) {
      rainyes.splice(i, 1);
      rainyes.push(new Rainy(pg5));
    }
  }

  for (let i = circles2.length - 1; i >= 0; i--) {
    circles2[i].update();
    circles2[i].display();
    if (circles2[i].cir_size >= circles2[i].max_size) {
      circles2.splice(i, 1);
    }
  }
}

// rainy：雨
class Rainy {
  constructor(_pg5) {
    this.pos = createVector(random(width), 0);
    this.velocity = createVector(random(-0.3, 0.3), random(3, 5));
    this.cir_size = random(3, 10);
    this.cir_color1 = color_list2[floor(random(3))];
    this.cir_color2 = color_list2[floor(random(3, 6))];
    this.cir_color3 = color_list2[floor(random(6, 9))];
    this.pg5 = _pg5;
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
  }
  display() {
    this.pg5.noStroke();
    if(color_status == 1) {
      this.pg5.fill(this.cir_color1);
    } else if(color_status == 2) {
      this.pg5.fill(this.cir_color2);
    } else if(color_status == 3) {
      this.pg5.fill(this.cir_color3);
    }
    this.pg5.ellipse(this.pos.x, this.pos.y, this.cir_size); 
  }
}

// rainy：雫
class Circle2 {
  constructor(pos, _pg5) {
    this.pos = pos.copy(); 
    this.cir_size = 0; 
    this.max_size = random(50, 150); 
    this.pg5 = _pg5;
  }
  update() {
    if (this.cir_size < this.max_size) {
      this.cir_size += 1; 
    } else {
      circles2.splice(circles2.indexOf(this), 1); // 最大サイズの波紋を削除
    }
  }

  display() {
    this.pg5.noFill();
    let transparency = map(this.pos.y, 0, height, 10, 255);
    this.pg5.stroke(157, 178, 191, transparency);
    this.pg5.ellipse(this.pos.x, this.pos.y, this.cir_size, this.cir_size / 3); // 波紋
  }
}

class IntersectPlane {
  constructor(n1, n2, n3, p1, p2, p3) {
    this.normal = createVector(n1, n2, n3); // 平面の法線ベクトル
    this.point_vec = createVector(p1, p2, p3); // 平面上の1つの点
    this.dis = this.point_vec.dot(this.normal);
  }
  getLambda(Q, v) {
    return (-this.dis - this.normal.dot(Q)) / this.normal.dot(v);
  }
}

// star：描画
function draw_star() {
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
  if(volume > 0.01) {
    click.play();
    click.setVolume(0.1);
  }}

// star：線
function draw_line() {
  if(speeds < line_speed) {
    for(let i = 0; i < line_num; i++) {
      pg6.stroke(252, 255, 231, 50);
      pg6.line(points[start2[i]].posX, points[start2[i]].posY, points[start2[i]].posX + disX2[i] * speeds / line_speed, points[start2[i]].posY + disY2[i] * speeds / line_speed);
    }
    speeds ++;
  } else {
    for(let i = 0; i < line_num; i++) {
      if(speeds - line_speed < line_speed) {
        status3 = "1";
        pg6.stroke(252, 255, 231, 50);
        pg6.line(points[start1[i]].posX, points[start1[i]].posY, points[start1[i]].posX + disX1[i] * (speeds - line_speed) / line_speed, points[start1[i]].posY + disY1[i] * (speeds - line_speed) / line_speed);
      } else if (speeds - line_speed < line_speed * 2) {
        status3 = "2";
        pg6.stroke(252, 255, 231, 50);
        pg6.line(points[start1[i]].posX, points[start1[i]].posY, points[start1[i]].posX + disX1[i], points[start1[i]].posY + disY1[i]);
        pg6.line(points[start2[i]].posX, points[start2[i]].posY, points[start2[i]].posX + disX2[i] * (speeds - line_speed * 2) / line_speed, points[start2[i]].posY + disY2[i] * (speeds - line_speed * 2) / line_speed);
        }
      if(status3 == "1") {
        pg6.line(points[start2[i]].posX, points[start2[i]].posY, points[start2[i]].posX + disX2[i], points[start2[i]].posY + disY2[i]);
      }
    }
    speeds ++;
    if(speeds - line_speed > line_speed * 2) {
      speeds = line_speed;
    }
  }
}

// sunny：円のクラス
class Main {
  constructor(_pg3) {
    this.pos = createVector(width / 2, height / 2);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.colorful = color(255, 211, 110);
    this.pg3 = _pg3;
  }
  move() {
    this.pos.add(this.velocity);
    if (this.pos.x < cir_size / 2 || this.pos.x > width - cir_size / 2) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.pos.y < cir_size / 2 || this.pos.y > height - cir_size / 2) {
      this.velocity.y = -this.velocity.y;
    }
  }
  display() {
    this.pg3.fill(this.colorful);
    this.pg3.stroke(255, 178, 0);
    this.pg3.ellipse(this.pos.x, this.pos.y, cir_size);
  }
}

// star
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
    this.rotation = random(0.005, 0.01);
    this.angle2 = 0;
    this.ran2 = random(0.5, 1);
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

class Box {
  constructor() {
    this.posX = random(-1000, 1000);
    this.posY = random(-1000, 1000);
    this.posZ = random(-1000, 1000);
    this.box_size = random(50, 100);
    this.colorful = color(255, random(148, 245), random(148, 228), 100);
    this.angle = random(360);
    this.angle_vel = random(5);
  }
  display() {
    stroke(this.colorful);
    noFill();
    strokeWeight(4)
    push();
    translate(this.posX, this.posY, this.posZ);
    rotateX(this.angle);
    box(this.box_size);
    pop();
    this.angle += this.angle_vel;
  }
}