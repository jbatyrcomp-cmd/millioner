/**
 * Web Audio API Sound Synthesizer for "Millioner: Attestatsiya Maxsus"
 * Generates authentic game show sounds without needing external audio files.
 */
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.7;
        this.ambientOsc = null;
        this.ambientGain = null;
        this.isAmbientPlaying = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        if (!this.enabled && this.isAmbientPlaying) {
            this.stopAmbient();
        }
        return this.enabled;
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
    }

    // Play subtle clock tick
    playTick() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

            gain.gain.setValueAtTime(this.volume * 0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {
            console.warn('Audio tick error:', e);
        }
    }

    // Dramatic question reveal sound
    playQuestionAppear() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const chords = [130.81, 164.81, 196.00, 246.94]; // C3, E3, G3, B3

            chords.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq * 0.8, now);
                osc.frequency.exponentialRampToValueAtTime(freq, now + 0.4);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(this.volume * 0.18, now + 0.15);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + (i * 0.1));

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 1.5);
            });
        } catch (e) {
            console.warn('Audio question reveal error:', e);
        }
    }

    // Answer selected (yellow lock-in)
    playSelect() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5

            gain.gain.setValueAtTime(this.volume * 0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.35);
        } catch (e) {
            console.warn('Audio select error:', e);
        }
    }

    // Suspense heartbeat while waiting for answer reveal
    playSuspense() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            
            // Sub bass heartbeat thump 1
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(75, now);
            osc1.frequency.exponentialRampToValueAtTime(45, now + 0.15);
            gain1.gain.setValueAtTime(this.volume * 0.35, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc1.connect(gain1);
            gain1.connect(this.ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.22);

            // Sub bass heartbeat thump 2
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(70, now + 0.18);
            osc2.frequency.exponentialRampToValueAtTime(40, now + 0.35);
            gain2.gain.setValueAtTime(this.volume * 0.28, now + 0.18);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);
            osc2.start(now + 0.18);
            osc2.stop(now + 0.42);
        } catch (e) {
            console.warn('Audio suspense error:', e);
        }
    }

    // Correct answer sound (bright triumphant fanfares)
    playCorrect(isMilestone = false) {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const notes = isMilestone 
                ? [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6
                : [440.00, 554.37, 659.25, 880.00];          // A4, C#5, E5, A5

            notes.forEach((freq, index) => {
                const startTime = now + (index * 0.11);
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = isMilestone ? 'triangle' : 'sine';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.001, startTime);
                gain.gain.linearRampToValueAtTime(this.volume * (isMilestone ? 0.35 : 0.25), startTime + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + (isMilestone ? 1.5 : 0.9));

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 1.6);
            });
        } catch (e) {
            console.warn('Audio correct error:', e);
        }
    }

    // Wrong answer sound (dissonant descending gong)
    playWrong() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const freqs = [220, 207.65, 196, 185]; // A3, G#3, G3, F#3

            freqs.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + (idx * 0.12));
                osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 1.2);

                gain.gain.setValueAtTime(0.001, now + (idx * 0.12));
                gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + (idx * 0.12) + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now + (idx * 0.12));
                osc.stop(now + 1.5);
            });
        } catch (e) {
            console.warn('Audio wrong error:', e);
        }
    }

    // Lifeline used sound (magical sweep)
    playLifeline() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.4);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.65);
        } catch (e) {
            console.warn('Audio lifeline error:', e);
        }
    }

    // Grand win fanfare (Q15 win - 1,000,000,000 so'm / Oliy toifa)
    playGrandWin() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const fanfare = [
                { f: 523.25, d: 0.2, t: 0 },
                { f: 659.25, d: 0.2, t: 0.2 },
                { f: 783.99, d: 0.2, t: 0.4 },
                { f: 1046.50, d: 0.7, t: 0.6 },
                { f: 880.00, d: 0.3, t: 1.3 },
                { f: 1046.50, d: 1.2, t: 1.6 },
            ];

            fanfare.forEach(item => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const st = now + item.t;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(item.f, st);

                gain.gain.setValueAtTime(0.001, st);
                gain.gain.linearRampToValueAtTime(this.volume * 0.35, st + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, st + item.d);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(st);
                osc.stop(st + item.d + 0.1);
            });
        } catch (e) {
            console.warn('Audio grand win error:', e);
        }
    }

    // Gentle low tension ambient drone
    startAmbient(level = 1) {
        if (!this.enabled || this.isAmbientPlaying) return;
        this.init();
        try {
            const baseFreq = Math.max(55, 110 - (level * 3));
            this.ambientOsc = this.ctx.createOscillator();
            this.ambientGain = this.ctx.createGain();

            this.ambientOsc.type = 'sine';
            this.ambientOsc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

            this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
            this.ambientGain.gain.linearRampToValueAtTime(this.volume * 0.08, this.ctx.currentTime + 1.5);

            this.ambientOsc.connect(this.ambientGain);
            this.ambientGain.connect(this.ctx.destination);

            this.ambientOsc.start();
            this.isAmbientPlaying = true;
        } catch (e) {
            console.warn('Start ambient error:', e);
        }
    }

    stopAmbient() {
        if (!this.isAmbientPlaying || !this.ambientGain) return;
        try {
            const now = this.ctx.currentTime;
            this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
            setTimeout(() => {
                if (this.ambientOsc) {
                    this.ambientOsc.stop();
                    this.ambientOsc.disconnect();
                    this.ambientOsc = null;
                }
                this.isAmbientPlaying = false;
            }, 850);
        } catch (e) {
            this.isAmbientPlaying = false;
        }
    }
}

// Global sound manager singleton
window.soundManager = new SoundManager();

