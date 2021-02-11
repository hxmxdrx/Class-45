var backgroundImg;

var playerShip;
var playerShipSprite;

var enemyShip;
var enemyShip2;
var enemyShip3;
var enemyShipSprite;
var enemyShipGroup;

var lazerBeam;
var lazerBeamSprite;
var lazerGroup;

var score;
var lives;

function preload(){

  backgroundImg = loadImage("images/background.jpg");

  playerShipSprite = loadImage("spaceshipMain.png");

  enemyShipSprite = loadImage("spaceshipEnemy.png");

  lazerBeamSprite = loadImage("lazerBeam.png");

}

function setup() {
  createCanvas(displayWidth - 15 ,displayHeight - 110);

  playerShip = createSprite(displayWidth/2, displayHeight - 150 , 50, 50);
  playerShip.addImage(playerShipSprite);
  playerShip.scale = 0.25;

  enemyShipGroup = new Group();
  lazerGroup = new Group();
  score = 0;
  lives = 5;

  console.log(lives);

}

function draw() {
  background(backgroundImg);

  playerShip.x = mouseX;

  if(keyDown("space")){
    lazer();
  } 

  spawnEnemies();

  edges = createEdgeSprites();

  if(lazerGroup.isTouching(enemyShip)){
    enemyShip.destroy();
    lazerGroup.destroyEach();
    score = score + 1;
  }



  //if(enemyShip.collide(edges[3])){
    //lives = lives - 1;
    //enemyShip.destroy();
  //}
  
  drawSprites();


  textSize(30);
  fill("white");
  text("Score: " + score, 20, 50);
  //text("Lives: " + lives, displayWidth - 20, 50);


}

function lazer(){

  lazerBeam = createSprite(playerShip.x - 3 , playerShip.y - 52, 50, 50);
  //lazerbeam.x = playerShip.x
  lazerBeam.addImage(lazerBeamSprite);
  lazerBeam.scale = 0.25;
  lazerBeam.velocityY = -8;
  velocityX = 0;
  lazerGroup.add(lazerBeam);

}

function spawnEnemies(){

if(frameCount % 50 === 0){
  enemyShip = createSprite( displayWidth, 50, 20, 20);
  enemyShip.x = Math.round(random(20, displayWidth - 100))
  enemyShip.velocityY = (4.5 + 3*score/10);
  enemyShip.addImage(enemyShipSprite);
  enemyShip.scale = 0.25;
  enemyShip.lifetime = Math.round(displayHeight/5);
  //enemyShipGroup.add(enemyShip);

  if(enemyShip.y > displayHeight - 75){
    enemyShip.destroy();
    lives = lives - 1;
  }

}

}