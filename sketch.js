var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var diamonds;
var gameoverImg, gameOver;
var painting, paintingImg; 
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  diamondsImg = loadImage("diamonds.png");
  gameoverImg = loadImage("gameOver.png");
  paintingImg = loadImage('painting.png');
  doorsGroup = newGroup();
  climbersGroup = newGroup();
  diamondsGroup = newGroup();

  gameOver.scale = 0.5;

  gameOver.visible = false;
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.50
  invisibleBlockGroup = new Group();
  gameOver = createSprite(200,200,50,50);
  gameOver.addImage("gameOver",gameoverImg);
  invisibleBlockGroup = new Group();
}

function draw() {
  background(252, 158, 86);
    if(gameState === "play") {
      gameOver.visible=false
      if(keyDown ("left_arrow")) {
        ghost.x = ghost.x -4;
      }
      if(keyDown ("right_arrow")) {
        ghost.x = ghost.x +4;
      }
      if(keyDown ("space")) {
        ghost.velocityY = -5;
      }
      ghost.velocityY = ghost.velocityY + 0.8;
      if(climbersGroup.isTouching(ghost)) {
        ghost.velocityY = 0;
      }
      if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
        ghost.destroy();
        gameState = "end"
      }
      spawnDoors();
      if(tower.y > 400){
          tower.y = 300
        }
    drawSprites();
    }
    
    if(gameState === "end") {
      text("Gameover",250, 280 ) 
      textSize(50);
      gameOver.scale = 0.5;
    }
}

function spawnDoors() {
  if(frameCount%240===0) {
    door = createSprite(200,-50)
    door.addImage(doorImg)
    door.velocityY = 2;
    door.lifetime = 800;
    door.x = Math.round(random(120,400))
    //add each door to group
    doorsGroup.add(door);
    climber = createSprite(200,10)
    climber.addImage(climberImg)
    climber.velocityY = 2;
    climber.lifetime = 800;
    climber.x = door.x;
    //add each door to group
    diamonds = createSprite(200,-50)
    diamonds.addImage(diamondsImg)
    diamonds.velocityY = 2;
    diamonds.lifetime = 800;
    diamonds.x = Math.round(random(120,400))
    diamonds.scale = 0.14
    //add each door to group
    painting = createSprite(200,-50)
    painting.addImage(paintingImg)
    painting.velocityY = 2;
    painting.lifetime = 800;
    painting.x = Math.round(random(120,400))
    painting.scale = 0.05
    //add each door to group
    climbersGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth = +1;
    invisibleBlock = createSprite(200,15)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true
    invisibleBlockGroup.add(invisibleBlock)
    
  } 
}
