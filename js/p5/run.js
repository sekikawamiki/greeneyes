// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }
//
// function draw() {
//   ellipse(100, 100, 80, 50);
// }


// var yPos = 0;
// function setup() {
//   frameRate(30);
//   createCanvas(windowWidth, windowHeight)
// }
// function draw() {
//   background(200);
//   yPos = yPos -1;
//   if(yPos < 0){
//     yPos = height;
//     console.log(yPos)
//   }
//   line(0, yPos, width, yPos);
// }

// var bug;
//
// function setup() {
//   createCanvas(800, 400);
//   bug = new Jitter();
// }
//
// function draw() {
//   background(200);
//   bug.move();
//   bug.display();
// }
//
// function Jitter() {
//   this.x = random(width);
//   this.y = random(height);
//   this.diameter = random(10, 30);
//   this.speed = 1;
//
//   this.move = function() {
//     this.x += random(-this.speed, this.speed);
//     this.y += random(-this.speed, this.speed);
//   };
//
//   this.display = function() {
//     ellipse(this.x, this.y, this.diameter, this.diameter)
//   }
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   stroke(255);
//   noFill();
// }
//
// function draw() {
//   background(0);
//
//   for (var i = 0; i < 200; i += 20) {
//     bezier(mouseX-(i/2.0), 40+i, 410, 20, 440, 300, 240-(i/16.0), 300+(i/8.0));
//   }
// }
function preload() {
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for(var i = 0; i < 100; i++){
    strokeWeight(random(i));
    stroke(random(i*100),random(i*100),random(i*100),i);

    fill(random(0,255), random(0,255), random(0,255),i*10);
    rect(random(i*500), random(i*500), random(i*10), random(i*10));
    console.log(random(i));

  }
}

function mouseMoved() {
  noLoop();
}
function mouseClicked() {
  loop();
}
