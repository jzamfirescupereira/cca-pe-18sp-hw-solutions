var baseTone = 60;

var toneA = 0;
var toneS = -2;
var toneD = 0;
var toneF = 3;

var oscA, oscS, oscD, oscF;
var playing;

function toneToFreq(tone) {
  return midiToFreq(baseTone + tone);
}

function setup() {
  createCanvas(400, 400);
  backgroundColor = color(255, 0, 255);
  textAlign(CENTER);

  oscA = new p5.Oscillator();
  oscA.setType('triangle');
  oscA.freq(toneToFreq(toneA));
  oscA.amp(0);
  oscA.start();

  oscS = new p5.Oscillator();
  oscS.setType('triangle');
  oscS.freq(toneToFreq(toneS));
  oscS.amp(0);
  oscS.start();

  oscD = new p5.Oscillator();
  oscD.setType('triangle');
  oscD.freq(toneToFreq(toneD));
  oscD.amp(0);
  oscD.start();

  oscF = new p5.Oscillator();
  oscF.setType('triangle');
  oscF.freq(toneToFreq(toneF));
  oscF.amp(0);
  oscF.start();
}

var numSegments = 20;

function oscForX(x) {
  if (x < width / 4) {
    return oscA;
  } else if (x < width / 2) {
    return oscS;
  } else if (x < 3 * width / 4) {
    return oscD;
  } else {
    return oscF;
  }
}


function draw() {
  noStroke();
  background(120);

  fill(220);
  rect(0, map(toneA, -numSegments / 2, numSegments / 2, height, 0), width / 4, height / numSegments);
  rect(width / 4, map(toneS, -numSegments / 2, numSegments / 2, height, 0), width / 4, height / numSegments);
  rect(width / 2, map(toneD, -numSegments / 2, numSegments / 2, height, 0), width / 4, height / numSegments);
  rect(3 * width / 4, map(toneF, -numSegments / 2, numSegments / 2, height, 0), width / 4, height / numSegments);

  fill(180);
  rect(width / 4 * floor(mouseX / (width / 4)),
    floor(mouseY / (height / numSegments)) * numSegments,
    width / 4,
    height / numSegments);

  var x = map(millis() % 2000, 0, 2000, 0, width);
  stroke("red");
  line(x, 0, x, height);

  var nextOsc = oscForX(x);
  if (nextOsc != playing) {
    if (playing) {
      playing.amp(0, 0.5);
    }
    nextOsc.amp(0.5, 0.1);
    playing = nextOsc;
  }
}

function mousePressed() {
  var x = mouseX;
  var tone = numSegments / 2 - floor(mouseY / (height / numSegments));
  if (x < width / 4) {
    toneA = tone;
  } else if (x < width / 2) {
    toneS = tone;
  } else if (x < 3 * width / 4) {
    toneD = tone;
  } else {
    toneF = tone;
  }

  updateTones();
}

function mouseDragged() {
  mousePressed();
}

function updateTones() {
  oscA.freq(toneToFreq(toneA));
  oscS.freq(toneToFreq(toneS));
  oscD.freq(toneToFreq(toneD));
  oscF.freq(toneToFreq(toneF));
}
