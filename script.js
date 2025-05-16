

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

const image = document.getElementById("milkImage"); // 이미지 ID 필요

let imageHeight = 0; // 이미지 높이 저장용

// 캔버스 크기와 이미지 높이 업데이트
function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  imageHeight = image.offsetHeight;
}
window.addEventListener("resize", () => {
  resizeCanvas();
  // 리사이즈 후 기존 원들의 y값도 조정
  circles.forEach(circle => {
    circle.y = canvas.height - imageHeight;
  });
});
resizeCanvas();

// 원 객체 클래스
class Circle {
  constructor() {
    const minX = canvas.width * 0.4;  // x 최소값 (캔버스 폭의 20%)
    const maxX = canvas.width * 0.6;  // x 최대값 (캔버스 폭의 80%)

    this.x = Math.random() * (maxX - minX) + minX; // x 위치 랜덤
    this.y = canvas.height - imageHeight; // 이미지 위에서 시작
    this.radius = 10 + Math.random() * 15;                     // 초기 반지름 (원 크기)
    this.maxRadius = this.radius * 2;   // 최대 반지름 = 초기의 2.5배
    this.dy = -0.7 - Math.random() * 0.15; // y축 속도 (위로 올라감, 0.7~0.85 사이 랜덤)
    this.dr = 0.05 + Math.random() * 0.05;  // 반지름 증가 속도 (0.05~0.1)
    this.opacity = 1;                     // 초기 투명도
    this.fadeRate = 0.0005;                // 투명도 감소 속도
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
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // 흰색, 투명도 반영
    ctx.strokeStyle = "black"; // 테두리 색
    ctx.lineWidth = 0.8;         // 테두리 두께 (고정)
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  isVisible() {
    return this.y + this.radius > 0 && this.opacity > 0;
  }
}

let circles = [];             // 원 저장 배열
let maxCircles = 15;          // 최대 원 개수 유지
let interval = 1000;           // 새로운 원 생성 딜레이(ms 단위)

// 초기 원들 먼저 10개 생성
for (let i = 0; i < maxCircles; i++) {
  setTimeout(() => {
    circles.push(new Circle());
  }, i * interval); // 순차적으로 딜레이 주며 생성
}

// 매 프레임마다 실행
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let newCirclesToAdd = 0;

  circles.forEach((circle) => {
    circle.update();
    circle.draw(ctx);

    // 사라졌으면 새로운 원 예약
    if (!circle.isVisible()) {
      newCirclesToAdd++;
    }
  });

  // 살아 있는 원만 유지
  circles = circles.filter((circle) => circle.isVisible());

  // 사라진 개수만큼 interval 간격으로 하나씩 생성
  for (let i = 0; i < newCirclesToAdd; i++) {
    setTimeout(() => {
      if (circles.length < maxCircles) {
        circles.push(new Circle());
      }
    }, i * interval); // 딜레이를 주고 순차 생성
  }

  requestAnimationFrame(animate);
}

// 시작
animate();

