let constellation = [];
let n;
let d;
let currentScale = 1;
let music;
let isPlaying = false;
let currentMode = 1;

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
    n = 200;

    constellation = []; // Reset constellation each setup
    for (let i = 0; i <= n; i++) {
        constellation.push(new Star());
    }
    strokeWeight(0.75);
    stroke('#6084E0');
}

function draw() {
    background('#0D0D0D');

    // Draw connections between stars
    for (let i = 0; i < constellation.length; i++) {
        constellation[i].update();
        for (let j = 0; j < constellation.length; j++) {
            if (i > j) {
                d = constellation[i].loc.dist(constellation[j].loc);
                if (d <= width / 8) {
                    line(constellation[i].loc.x, constellation[i].loc.y, 
                         constellation[j].loc.x, constellation[j].loc.y);
                }
            }
        }
    }
}

// Resize canvas when window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Recreate constellation when window is resized
    setup();
}

// Change sketch mode function
function changeSketchModeInP5(mode) {
    currentMode = mode;
    console.log("Switched to mode: " + mode);
    // You can add different behaviors for each mode here
    setup(); // Reinitialize the sketch
}

// Reset canvas and scale
function resetSketchInP5() {
    currentScale = currentScale === 1 ? 1.5 : 1;
    setup(); // Reinitialize the sketch
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
}

// Star class
class Star {
    constructor() {
        this.a = random(5 * TAU);
        this.r = random(width * 0.4, width * 0.25);
        this.loc = createVector(
            width / 2 + sin(this.a) * this.r, 
            height / 2 + cos(this.a) * this.r
        );
        this.speed = p5.Vector.random2D();
        this.bam = createVector();
        this.m = 0;
    }

    update() {
        this.bam = p5.Vector.random2D();
        this.bam.mult(0.45);
        this.speed.add(this.bam);

        const distance = dist(this.loc.x, this.loc.y, mouseX, mouseY);
        if (distance > width) {
            return;
        }

        this.m = constrain(map(distance, 0, width, 8, 0.05), 0.05, 8);
        this.speed.normalize().mult(this.m);

        // Boundary handling
        if (dist(this.loc.x, this.loc.y, width / 2, height / 2) > (width / 2) * 0.98) {
            if (this.loc.x < width / 2) {
                this.loc.x = width - this.loc.x - 4;
            } else if (this.loc.x > width / 2) {
                this.loc.x = width - this.loc.x + 4;
            }
            if (this.loc.y < height / 2) {
                this.loc.y = height - this.loc.y - 4;
            } else if (this.loc.y > height / 2) {
                this.loc.y = height - this.loc.y + 4;
            }
        }
        this.loc.add(this.speed);
    }
}