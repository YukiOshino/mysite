let handpose;
let video;
let predictions = [];
let posX;
let posY;
let num;
let endX;
let endY;
let angle = 45;
let wind_num = 8;
let status = "no";

function preload() {
  biri = loadSound("get.mp3");
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);
  status = "no"
  
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  if(status == "no") {
    biri.stop();
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  background(0, 200);
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

function thunder_1() {
  for(let j = 0; j < 300; j++) {
    endX = posX + random(-4, 4);
    endY = posY + 3;
    strokeWeight(0.1 * j);
    stroke(255);
    line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}

function thunder_2() {
  for(let j = 0; j < 300; j++) {
    endX = posX + 3;
    endY = posY + random(-4, 4);
    strokeWeight(0.1 * j);
    stroke(255);
    line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}

function thunder_3() {
  for(let j = 0; j < 300; j++) {
    endX = posX + random(-4, 4);
    endY = posY - 3;
    strokeWeight(0.1 * j);
    stroke(255);
    line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}

function thunder_4() {
  for(let j = 0; j < 300; j++) {
    endX = posX - 3;
    endY = posY + random(-4, 4);
    strokeWeight(0.1 * j);
    stroke(255);
    line(posX, posY, endX, endY);
    posX = endX;
    posY = endY;
  }
}

function wind() {
  for(let i = 0; i < wind_num; i++) {
    let angle1 = i * 360 / wind_num
    let x1 = width / 2 + cos(angle1) * 200;
    let y1 = height / 2 + sin(angle1) * 200;
    let x = width / 2 + cos(angle1) * 400;
    let y = height / 2 + sin(angle1) * 400;
      // translate(x, y)
      //rotate(angle1)
    strokeWeight(1);
    stroke(255, 100);
    line(x1, y1, x + 50, y + 50)
    status = "yes"
  }
}