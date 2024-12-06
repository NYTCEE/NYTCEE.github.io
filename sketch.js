let constellation = [];
let n;
let d;
let currentScale = 1;
let music;
let isPlaying = false;

function preload() {
  music = loadSound('music.mp3', 
    () => console.log('Music loaded successfully'), // 加載成功
    (err) => console.log('Error loading music: ', err) // 加載錯誤
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 畫布填滿螢幕
  pixelDensity(displayDensity());
  smooth();
  n = 200;

  for (let i = 0; i <= n; i++) {
    constellation.push(new star());
  }
  strokeWeight(0.75);
  stroke('#6084E0');
}

function draw() {
  background('#0D0D0D');

  for (let i = 0; i < constellation.length; i++) {
    constellation[i].update();
    for (let j = 0; j < constellation.length; j++) {
      if (i > j) {
        d = constellation[i].loc.dist(constellation[j].loc);
        if (d <= width / 8) {
          line(constellation[i].loc.x, constellation[i].loc.y, constellation[j].loc.x, constellation[j].loc.y);
        }
      }
    }
  }
}

// 當窗口大小改變時，調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 動態調整畫布大小
}

// 改變模式的函數
function changeSketchModeInP5(mode) {
  console.log("Switch to mode: " + mode);
}

// 重置畫布的函數
function resetSketchInP5() {
  currentScale = currentScale === 1 ? 1.5 : 1; // 重置或調整畫布的縮放比例
  scaleCanvas();
}

// 設置畫布縮放
function scaleCanvas() {
  scale(currentScale);
}

// 播放或暫停音樂
function toggleMusic() {
  const musicBtn = document.getElementById('music-btn');
  if (isPlaying) {
    music.pause();
    musicBtn.innerHTML = 'Play Music'; // 播放時顯示 "Play Music"
  } else {
    music.loop();
    musicBtn.innerHTML = 'Pause Music'; // 暫停時顯示 "Pause Music"
  }
  isPlaying = !isPlaying;
}

function star() {
  this.a = random(5 * TAU);
  this.r = random(width * 0.4, width * 0.25);
  this.loc = createVector(width / 2 + sin(this.a) * this.r, height / 2 + cos(this.a) * this.r);
  this.speed = p5.Vector.random2D();
  this.bam = createVector();
  this.m;

  this.update = function () {
    this.bam = p5.Vector.random2D();
    this.bam.mult(0.45);
    this.speed.add(this.bam);
    const distance = dist(this.loc.x, this.loc.y, mouseX, mouseY);
    if (distance > width) {
      return;
    }

    this.m = constrain(map(distance, 0, width, 8, 0.05), 0.05, 8);
    this.speed.normalize().mult(this.m);

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
  };
}
