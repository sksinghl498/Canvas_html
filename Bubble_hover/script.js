var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// Rectangle
// c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0,0,255,0.5)";
// c.fillRect(600, 200, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.5)";
// c.fillRect(400, 400, 100, 100);
// console.log(canvas);

var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 40;
// var minRadius = 2;

var colorArray = ["#ffaa33", "#99ffaa", "#00ff00", "#4411aa", "#ff1100"];
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log(mouse);
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, (Math.PI = 7), false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Interactivity

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var y = 200;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;
var circleArray = [];

for (var i = 0; i < 5000; i++) {
  var radius = Math.random() * 3 + 1;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var y = 200;
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}
console.log(circleArray);
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
