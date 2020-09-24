
var monkey , monkey_running, monke_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup
var score
var ground;
var gameState = "PLAY";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
 
}



function setup() {
  createCanvas(600, 300);

  monkey = createSprite(100, 200, 10, 10)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  ground = createSprite(300, 230, 1500, 10);
  ground.velocityX = -4;
}


function draw() {
  background(255);
  
  textSize(20);
  fill("black");
  text("Survival Time:" + score, 250, 50);
  
  if (gameState === "PLAY"){
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    score = Math.ceil(frameCount/frameRate());
    if (keyDown("space") && monkey.y > 190){
      monkey.velocityY = -12;
    }
    monkey.velocityY += 0.8;

    monkey.collide(ground);

    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();

    }
    
    if(monkey.isTouching(ObstacleGroup)){
      gameState = "END";
    }
    
    food();
    death();
  }
  
  if (gameState === "END"){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1); 
    textSize(30);
    fill("yellow");
    text("GameOver", 220, 150); 
  }
  drawSprites()  
}

function food(){
  if(frameCount % 95 === 0){
    var rand = Math.round(random(80, 140));
    banana = createSprite(600, rand, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 125;
    FoodGroup.add(banana);
  }
}

function death(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600, 210, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.lifetime = 125;
    obstacle.setCollider("rectangle", 0, 0, 480, 490);
    ObstacleGroup.add(obstacle);
  }
}






