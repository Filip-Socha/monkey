var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup;
var survivalTime = 0, score = 0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  monkey_stop = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(40, 360, 20, 20);
  monkey.addAnimation("stop", monkey_stop);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 395, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  
}


function draw() {
  background("Lime");
  
  stroke("White");
  textSize(20);
  fill("White");
  text("Score: "+ score, 275,30);
  
  stroke("Black");
  textSize(20);
  fill("Black");
  text("Survival Time: "+ survivalTime, 50,30);
  
  if (gameState == PLAY) {
    
    monkey.changeAnimation("monkey", monkey_running);
    
    survivalTime = Math.ceil(frameCount/frameRate());
    
    if (ground.x <0) {
      ground.x = ground.width/2;
    }
    
    if (keyDown("space")&& monkey.y >= 359.3) {
      monkey.velocityY = -20;   
    }
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnRocks();
    
    food();
    
  } else if (gameState == END) {
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("stop", monkey_stop);
    
  }
   
  
  monkey.collide(ground);
  
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,350));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 250;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}

function spawnRocks() {
  
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,375,10,40);
    
    //obstacle.debug = true;
    obstacle.velocityX = -4;
    
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  
}