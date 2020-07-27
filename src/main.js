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

// Speech Recognition
let speech; 
let speechDiv; 

let allVoices; 
let speechSynth; 
let voicesSelect; 
let language; 
let voice; 

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

  speechDiv = select('#speech'); 
  // Initiate the speech engine. 
  speech = new Speech(speechResult); 
  speech.start(); 

  voice = new Voice(speechStarted, speechEnded); 
  voicesSelect = select('#voicesSelect'); 
  language = select('#language');
  speechSynth = window.speechSynthesis; 
  speechSynth.onvoiceschanged = populateVoices; 
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

function speechResult(result, isFinal) {
    speechDiv.html(result);
    if (isFinal) {
        console.log(result); 
        // Update the color of the SPEAK DIV to red
        // Because now the computer is speaking 
        // This is when the computer kicks off with the voice that needs to repeat things. 
        voice.utter(result);
    }
}

function populateVoices() {
    allVoices = speechSynth.getVoices().map(obj => {
        return {
            name: obj.name,
            lang: obj.lang
        }
    });

    for (var i = 0; i < allVoices.length; i++) {
        var name = allVoices[i].name; 
        var lang = allVoices[i].language; 
        var option = document.createElement("option");
        option.text = name; 
        option.setAttribute('lang', lang);
        voicesSelect.elt.add(option);
    }

    language.html(allVoices[0].lang);

    // Set the voice. 
}

function onVoiceSelected(event) {
    let idx = voicesSelect.elt.selectedIndex
    let l = allVoices[idx].lang; 
    language.html(l); 

    // Set the voice. 

    let v = speechSynth.getVoices().filter(obj => {
        return obj.name === allVoices[idx].name; 
    }); 

    voice.setNewVoice(v[0]);
}

function speechStarted() {

}

function speechEnded() {

}