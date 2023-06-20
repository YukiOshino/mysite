let faceapi;
let video;
let detections;
let status = [];
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
let angle;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

function preload() {
  bgm = loadSound("sunny.mp3");
  smiling = loadSound("kirakira.mp3");
}

function setup() {
    createCanvas(600, 600);
    noiseSeed(100);
    angle = random(180)
    bgm.loop();
    bgm.setVolume(0.3)

    // ビデオ準備
    video = createCapture(VIDEO);
    video.size(width, height);
    faceapi = ml5.faceApi(video, detection_options, modelReady)
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(255);
    if (detections) {
        if (detections.length > 0) {
            // console.log(detections)
            //drawBox(detections)
            drawLandmarks(detections)
        }

    }
    faceapi.detect(gotResults)
}

function drawBox(detections){
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height
        
        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rect(x, y, boxWidth, boxHeight);
    }
    
}

function drawLandmarks(detections){
    noFill();
    noStroke();

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth;
        drawPart(mouth, true);
    }

}

function drawPart(feature, closed){
    let mouthX = [];
    
    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x
        const y = feature[i]._y
        vertex(x, y)
            mouthX.push(x);

      if(closed === true){
          endShape(CLOSE);
      } else {
          endShape();
      }
    }
    mouth_min.push(min(mouthX));
    mouth_max.push(max(mouthX));
    start_size = mouth_max[0] - mouth_min[0];
    now_size = mouth_max[mouth_max.length -1] - mouth_min[mouth_min.length - 1];
    if(now_size > start_size + 10) {
      status.push("smile");
    } else {
      status.push("defalt");
    }
    if(status[status.length - 2] == "defalt" && status[status.length - 1] == "smile"){
      smile();
      smiling.play();
    }
}
  
  
function draw() {
  image(video, 0,0, width, height);
  background(193, 239, 255, 200);
  angleMode(DEGREES);

  for(let i = 0; i < suns.length; i++) {
    suns[i].display();
  }
  for(let i = 0; i < trees1.length; i++) {
    trees1[i].display();
  }
  for(let i = 0; i < trees2.length; i++) {
    trees2[i].display();
}
for(let i = 0; i < trees3.length; i++) {
  trees3[i].display();
}
for(let i = 0; i < grasses.length; i++) {
  grasses[i].display();
}
}

function smile() {
  if(suns.length < 32) {
  for(let i = 0; i < 8; i++) {
    suns.push(new Sun());
  }
} else if(trees1.length < 40) {
  for(let i = 0; i < 20; i++) {
  trees1.push(new Tree(trees1.length))
  n += 0.05;
  if(trees1.length > 20) {
    n+=0.05
  }
  }
} else if(trees2.length < 40) {
  n = 0;
  for(let i = 0; i < 20; i++) {
    trees2.push(new Tree(trees2.length));
    n += 0.05;
  if(trees2.length > 20) {
    n+=0.05
  }
}
} else if(trees3.length < 40) {
  n = 0;
  for(let i = 0; i < 20; i++) {
    trees3.push(new Tree(trees3.length));
    n+= 0.05;
  if(trees3.length > 20) {
    n+=0.05
  }
}
} else {
  for(let i = 0; i < 20; i++) {
    grasses.push(new Grass());
  }
}
  
}

class Sun {
  constructor() {
    this.posX = random(width);
    this.posY = random(height / 6);
    this.cir_size = random(20,100);
    this.colorful = color(255, random(190, 255), random(164, 193), 200);
  }

  display() {
    fill(this.colorful);
    noStroke();
    ellipse(this.posX, this.posY, this.cir_size);
  }
}

class Tree {
  constructor(i) {
    this.pos = createVector(map(noise(n), 0, 1, width / 2 - 500, width / 2 + 500), height - i * 10);
    this.cir_size = map(this.pos.y, 100, height, 0, 40);
    this.colorful = color(random(102, 159), random(90, 135), random(72, 114), 200);
  }
  display() {
    fill(this.colorful);
    ellipse(this.pos.x + 250, this.pos.y, this.cir_size);
  }
}

class Grass {
  constructor() {
    this.cir_size = random(20, 40);
    this.colorful = color(random(115, 144), random(169, 200), 173, 150);
    this.angle = random(360);
    this.radius = random(0, width / 2 - 50);
  }
  display() {
    fill(this.colorful);
    ellipse(width / 2 + this.radius * cos(this.angle), height / 2 + this.radius * sin(this.angle), this.cir_size);
  }
 }