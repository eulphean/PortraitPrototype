class Voice {
    constructor(voiceEnded) {
        this.myVoice = new p5.Speech(); 
        this.myVoice.setVolume(1); 
        this.myVoice.setRate(0.6);
        this.myVoice.setPitch(1.0);
        this.myVoice.utterance.onerror = this.error; 
        this.myVoice.utterance.onend = voiceEnded;  
    }

    utter(text) {
        console.log('Speaking');
        this.myVoice.speak(text);
    }

    stop() {
        this.myVoice.stop();
    }

    error(e) {
        print(e);
    }

    setNewVoice(voice) {
        this.myVoice.setVoice(voice);
        // this.myVoice.setVolume(1); 
        // this.myVoice.setRate(0.6);
        // this.myVoice.setPitch(1.0);
    }

    setNewPitch(val) {
        this.myVoice.setPitch(val); 
    }

    setNewRate(val) {
        this.myVoice.setRate(val); 
    }
}