var freqA = 174;
var freqS = 196;
var freqD = 220;
var freqF = 246;

var oscA, oscS, oscD, oscF;

var playingA, playingS, playingD, playingF;

// store octave
var octave = 0;

function setup() {
  createCanvas(400, 400);
  backgroundColor = color(255, 0, 255);
  textAlign(CENTER);

  oscA = new p5.Oscillator();
  oscA.setType('triangle');
  oscA.freq(freqA);
  oscA.amp(0);
  oscA.start();

  oscS = new p5.Oscillator();
  oscS.setType('triangle');
  oscS.freq(freqS);
  oscS.amp(0);
  oscS.start();

  oscD = new p5.Oscillator();
  oscD.setType('triangle');
  oscD.freq(freqD);
  oscD.amp(0);
  oscD.start();

  oscF = new p5.Oscillator();
  oscF.setType('triangle');
  oscF.freq(freqF);
  oscF.amp(0);
  oscF.start();
}

function draw() {
  noStroke();
  background(120);
  fill(220);
  if (playingA) {
    rect(0, 0, width / 4, height);
  }
  if (playingS) {
    rect(width / 4, 0, width / 4, height);
  }
  if (playingD) {
    rect(width / 2, 0, width / 4, height);
  }
  if (playingF) {
    rect(3 * width / 4, 0, width / 4, height);
  }
}

function keyPressed() {
  print("got key press for ", key);
  var osc;
  if (key == 'A') {
    osc = oscA;
    playingA = true;
  } else if (key == 'S') {
    osc = oscS;
    playingS = true;
  } else if (key == 'D') {
    osc = oscD;
    playingD = true;
  } else if (key == 'F') {
    osc = oscF;
    playingF = true;
  } else if (key == 'P') {
    changeOctave(1);
  } else if (key == 'O') {
    changeOctave(-1);
  }
  if (osc) {
    osc.amp(0.5, 0.1);
  }
}

function keyReleased() {
  print("got key release for ", key);
  var osc;
  if (key == 'A') {
    osc = oscA;
    playingA = false;
  } else if (key == 'S') {
    osc = oscS;
    playingS = false;
  } else if (key == 'D') {
    osc = oscD;
    playingD = false;
  } else if (key == 'F') {
    osc = oscF;
    playingF = false;
  }
  if (osc) {
    osc.amp(0, 0.5);
  }
}

function changeOctave(change) {
  // update the octive +1 or -1
  octave = octave + change;

  // power of 2 to the octave.
  // octave = 0 means multiplier = 1
  // octave = 1 means multiplier = 2
  // octave = 2 means multiplier = 4
  // octave = 3 means multiplier = 8
  // ... etc ...
  // octave = -1 means multiplier = 0.5

  var multiplier = pow(2, octave);

  oscA.freq(multiplier * freqA);
  oscS.freq(multiplier * freqS);
  oscD.freq(multiplier * freqD);
  oscF.freq(multiplier * freqF);
}
