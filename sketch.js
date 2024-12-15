let constellation = [];
let n;
let d;
let currentScale = 1;
let music;
let isPlaying = false;
let currentMode = 1;

let showText = false;
let displayText = "Hello, it's NYTCEE's Github website!";
let textOpacity = 0;
let textBaseOpacity = 0;
let textPulseAmount = 0;

function preload() {
    music = loadSound('music.mp3', 
        () => console.log('Music loaded successfully'),
        (err) => console.log('Error loading music: ', err)
    );
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(displayDensity());
    smooth();
    n = 80;

    if (constellation.length === 0) {
        for (let i = 0; i <= n; i++) {
            constellation.push(new Star());
        }
    } else {
        constellation.forEach(star => star.reset());
    }
    
    strokeWeight(0.75);
    stroke(255);
}

function draw() {
    background('#0D0D0D');

    // Draw constellation
    for (let i = 0; i < constellation.length; i++) {
        constellation[i].update();
        for (let j = 0; j < constellation.length; j++) {
            if (i > j) {
                d = constellation[i].loc.dist(constellation[j].loc);
                if (d <= width / 10) {
                    let alpha = map(d, 0, width / 10, 255, 50);
                    stroke(250, 250, 250, alpha);
                    line(constellation[i].loc.x, constellation[i].loc.y, 
                         constellation[j].loc.x, constellation[j].loc.y);
                }
            }
        }
    }

    // Simple fade in/out without pulsing
    if (showText) {
        textOpacity = lerp(textOpacity, 255, 0.05);
    } else {
        textOpacity = lerp(textOpacity, 0, 0.05);
    }

    // Draw text with smooth opacity
    if (textOpacity > 0) {
        textAlign(CENTER, CENTER);
        textFont('Times New Roman');
        textSize(width * 0.03);
        noStroke();
        fill(250, 250, 250, textOpacity);
        text(displayText, width/2, height/2);
    }
}

// Resize canvas when window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Recreate constellation when window is resized
    constellation.forEach(star => star.reset());
}

// In sketch.js
function changeSketchModeInP5(mode) {
    //currentMode = mode;
    if (mode === 3) {
        showText = !showText; // Toggle text visibility
        // Update button text based on state
        const textBtn = document.querySelector('[onclick="changeMode(3)"]');
        if (textBtn) {
            textBtn.innerHTML = showText ? 'ELIMINATE TEXT' : 'SHOW TEXT';
        }
    }
    console.log("Switched to mode: " + mode);
}

// Music toggle function
function toggleMusicInP5() {
    const musicBtn = document.getElementById('music-btn');
    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = 'Play Music';
    } else {
        music.loop();
        musicBtn.innerHTML = 'Pause Music';
    }
    isPlaying = !isPlaying;
    console.log("Music is now: " + (isPlaying ? 'playing' : 'paused'));
}

function resetSketchInP5() {
    for (let i = 0; i < constellation.length; i++) {
        constellation[i].reset();
    }
}

// Star class
class Star {
    constructor() {
        this.reset();
    }
    
    initialSetup() {
        this.a = random(5 * TAU);
        this.r = random(width * 0.4, width * 0.3);
        this.loc = createVector(
            width / 2 + sin(this.a) * this.r, 
            height / 2 + cos(this.a) * this.r
        );
        this.speed = createVector(0, 0);
        this.bam = createVector();
        this.m = 0;
    }

    reset() {
        this.initialSetup();
    }

    update() {

        this.bam = p5.Vector.random2D().mult(0.5);
        this.speed.add(this.bam);

        const distance = dist(this.loc.x, this.loc.y, mouseX, mouseY);
        

        if (distance <= width / 2) {

            this.m = map(distance, 0, width / 2, 3, 0.6);
            let mouseVector = createVector(mouseX - this.loc.x, mouseY - this.loc.y);
            mouseVector.normalize().mult(this.m);
            this.speed.add(mouseVector.mult(0.1));
        }
    
        let centerX = width / 2;
        let centerY = height / 2;
        let maxRadius = (width / 2) * 0.45;
    
        let distanceFromCenter = dist(this.loc.x, this.loc.y, centerX, centerY);
        if (distanceFromCenter > maxRadius) {

            let angle = atan2(this.loc.y - centerY, this.loc.x - centerX);
            this.loc.x = lerp(this.loc.x, centerX + cos(angle) * maxRadius, 0.1);
            this.loc.y = lerp(this.loc.y, centerY + sin(angle) * maxRadius, 0.1);
            
            this.speed.mult(0.5);
        }
    
        this.loc.add(this.speed);
    }
}