var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');


//load images

var floor = new Image();
var piece = new Image();
var obs = new Image();
var bg = new Image();
var good = new Image();


floor.src = "images/floor11.png";
piece.src = "images/piece7.png";
obs.src = "images/obs2.png";
bg.src = "images/bg3.png";
good.src = "images/good.png";


// variables
var wid = window.innerWidth ;
pX = wid / 2;
pY = 591;
right = 0;
left = 0;
oX = 120;
oY = canvas.height - canvas.height - 50;
score = 0;
obsn = 130;
gop = 190;

// obstacle coordinates

var obstacle = [];

obstacle[0] = {
  x : 80,
  y : oY
};

// good coordinates

var point = [];

point[0] = {
  x : 300,
  y : canvas.height - canvas.height - 50
};

// on load function

function draw() {

  var wid = window.innerWidth ;
  var hei = window.innerHeight;
  ctx.canvas.width = wid;
  ctx.canvas.height = hei;

  ctx.drawImage(bg,0,0);

  for (var i = 0; i < obstacle.length; i++) {
    ctx.drawImage(obs,obstacle[i].x,obstacle[i].y);

    obstacle[i].y +=3;

    if (obstacle[i].y >= obsn && obstacle[i].y <= obsn + 1) {
      obstacle.push({
        x : Math.floor(Math.random()*canvas.width) - 5,
        y : canvas.height - canvas.height - 50
      });
    }

    // collision
    if( pY - piece.height >= obs.y && obstacle[i].y >= pY - piece.height && obstacle[i].y <= pY - piece.height + 1 && pX + piece.width >= obstacle[i].x && pX <= obstacle[i].x) {
    console.log("wad");
    location.reload();

    }

    if (obstacle[i].y > canvas.height) {
        //console.log("y");
        obstacle.splice(i, 1);
    }
  }

  // NEWW
  for (var i = 0; i < point.length; i++) {
    ctx.drawImage(good,point[i].x,point[i].y);

    point[i].y +=3;

    if (point[i].y >= gop && point[i].y <= gop + 1) {
      point.push({
        x : Math.floor(Math.random()*canvas.width) - 5,
        y : canvas.height - canvas.height - 50
      });
    }

    // collision
    if( pY - piece.height >= good.y && point[i].y >= pY - piece.height && point[i].y <= pY - piece.height + 1 && pX + piece.width >= point[i].x && pX <= point[i].x) {
    console.log("wad");
    score += 1;
    }

    if (point[i].y > canvas.height) {
        //console.log("y");
        point.splice(i, 1);
    }
  }

  if (score > 7) {
    obsn === 90;
  }

  if (score > 15) {
    gop === 225;
  }

  ctx.font = '25px roboto';
  ctx.fillText(score, 10, 20);
  ctx.drawImage(floor,0, hei -  floor.height);
  ctx.drawImage(piece, pX, canvas.height - floor.height - 53);
  document.getElementById("right").style.top = hei - floor.height + 3 + "px";
  document.getElementById("right").style.left = wid / 2 + "px";
    document.getElementById("right").style.width = wid / 2 + "px";
  document.getElementById("left").style.top = hei - floor.height + 3 + "px";
  document.getElementById("left").style.left = "0px";
  document.getElementById("left").style.width = wid / 2 + "px";



  // intervals
  requestAnimationFrame(draw,10);
  requestAnimationFrame(cl2, 10);
  requestAnimationFrame(cl, 10);
  requestAnimationFrame(out, 10);
  requestAnimationFrame(obsd, 10);
}

// buttons
function cl2go() {
  right += 2;
}
function cl2stop() {
  right = 0;
}
function cl2() {
  pX += right;
}
function clgo() {
  left += 2;
}
function clstop() {
  left = 0;
}
function cl() {
  pX -= left;
}


// borders
function out() {
  if (pX > canvas.width - 80) {
     pX = canvas.width - 80;
  }
  if (pX < 0) {
    pX = 0;
  }
}

// obstacle going down
function obsd() {
  oY += 4;
}
