let capture;
let frame; 
let delaySlider; 

// Video effects. 
let blurD, blurValue; 
let threshold; 
let gray; 
let invert; 
let posterize, postValue; 
let dilate; 
let erode; 

function setup() {
  // Where we draw the image. 
  var canvas = createCanvas(320, 240);
  canvas.parent('canvasContainer');
  setupVideoCapture()
  delaySlider = select('#delayTime');

  // Collect all the divs. 
  blurD = select('#blur'); blurValue = select('#blurValue');
  threshold = select('#threshold'); 
  gray = select('#gray'); 
  invert = select('#invert'); 
  posterize = select('#posterize'); 
  postValue = select('#postValue'); 
  dilate = select('#dilate'); 
  erode = select('#erode'); 
}

function draw() {
  let dt = delaySlider.value(); 
  // background(255);
  if (capture.loadedmetadata) {
   let frame = capture.get(0, 0, 320, 240); 
   // Schedule the frame to be drawn at a later time. 
   setTimeout(delayCbk, dt, frame); 
  }
}

function setupVideoCapture() {
  // Video capture. 
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.position(0, 0);
  capture.parent('captureContainer');
  capture.elt.style.position = 'relative';
}  

function delayCbk(frame) {
  // Image is draw inside the canvas. 
  image(frame, 0, 0); 
  applyFilters();
}

function applyFilters() {
    // Determine what effects to apply on the image 
  if (blurD.elt.checked) {
    let val = blurValue.value(); 
    filter(BLUR, val); 
    }

    if (threshold.elt.checked) {
        filter(THRESHOLD); 
    }

    if (gray.elt.checked) {
        filter(GRAY);
    }

    if (invert.elt.checked) {
        filter(INVERT); 
    }

    if (posterize.elt.checked) {
        let val = postValue.value();
        filter(POSTERIZE, val);
    }

    if (dilate.elt.checked) {
        filter(DILATE); 
    }

    if (erode.elt.checked) {
        filter(ERODE); 
    }
}

// EVENTS
function hide() {
    capture.hide();
}

function show() {
    capture.show();
}

function pause() {
    capture.pause();
}

function start() {
    capture.play();
}