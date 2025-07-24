// 디데이 영어

document.addEventListener("DOMContentLoaded", function () {
    const startDate = new Date('2025-01-20T00:00:00');
    const today = new Date();

    // 시차 문제 방지 (시간 제외)
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    document.getElementById('day-count').textContent = `day + ${diffDays}`;
});

// 디데이 한국어

document.addEventListener("DOMContentLoaded", function () {
    const startDate = new Date('2025-01-20T00:00:00');
    const today = new Date();

    // 시차 문제 방지 (시간 제외)
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    document.getElementById('day-count-kr').textContent = `${diffDays}일째`;
});

// 마퀴 텍스트

document.addEventListener("DOMContentLoaded", function () {
  const span = document.querySelector('.marquee-text span');
  span.textContent = '밀크티 좋아 ෆ '.repeat(100); // 텍스트 반복
});

document.addEventListener("DOMContentLoaded", function () {
  const span = document.querySelector('.marquee-text-en span');
  span.textContent = 'I love milk tea ෆ '.repeat(100); // 텍스트 반복
});





// 캔버스
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("milkImage");

let imageHeight = 0;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const containerWidth = canvas.parentElement.clientWidth;
  const containerHeight = canvas.parentElement.clientHeight;

  // 실제 해상도 (픽셀 단위)
  canvas.width = containerWidth * dpr;
  canvas.height = containerHeight * dpr;

  // CSS 사이즈 (화면에 보이는 크기)
  canvas.style.width = containerWidth + "px";
  canvas.style.height = containerHeight + "px";

  // 고해상도 대응
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  imageHeight = image.offsetHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  const dpr = window.devicePixelRatio || 1;
  circles.forEach((circle) => {
    circle.y = canvas.height / dpr - imageHeight;
  });
});

class Circle {
  constructor() {
    const dpr = window.devicePixelRatio || 1;
    const canvasDisplayWidth = canvas.width / dpr;

    const minX = canvasDisplayWidth * 0.4;
    const maxX = canvasDisplayWidth * 0.6;

    this.x = Math.random() * (maxX - minX) + minX;
    this.y = canvas.height / dpr - imageHeight;
    this.radius = 10 + Math.random() * 15;
    this.maxRadius = this.radius * 2;
    this.dy = -0.7 - Math.random() * 0.15;
    this.dr = 0.05 + Math.random() * 0.05;
    this.opacity = 1;
    this.fadeRate = 0.0005;
  }

  update() {
    this.y += this.dy;
    if (this.radius < this.maxRadius) {
      this.radius += this.dr;
    }
    this.opacity -= this.fadeRate;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  isVisible() {
    return this.y + this.radius > 0 && this.opacity > 0;
  }
}

let circles = [];
const maxCircles = 17;
const interval = 1200;

function addInitialCircles() {
  for (let i = 0; i < maxCircles; i++) {
    setTimeout(() => {
      circles.push(new Circle());
    }, i * interval);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let newCirclesToAdd = 0;

  circles.forEach((circle) => {
    circle.update();
    circle.draw(ctx);
    if (!circle.isVisible()) newCirclesToAdd++;
  });

  circles = circles.filter((circle) => circle.isVisible());

  for (let i = 0; i < newCirclesToAdd; i++) {
    setTimeout(() => {
      if (circles.length < maxCircles) {
        circles.push(new Circle());
      }
    }, i * interval);
  }

  requestAnimationFrame(animate);
}

// 시작
resizeCanvas();
addInitialCircles();
animate();



// 배경+글자 색 변경
document.addEventListener("DOMContentLoaded", () => {
  const flyTexts = document.querySelectorAll(".fly-text");
  const delay = 500;

  function runCycle() {
    flyTexts.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("highlight");
        setTimeout(() => {
          el.classList.remove("highlight");
        }, 500);
      }, index * delay);
    });

    const totalDuration = flyTexts.length * delay + 500;
    setTimeout(runCycle, totalDuration);
  }

  runCycle();
});