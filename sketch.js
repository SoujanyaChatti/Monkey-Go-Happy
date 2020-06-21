//Global Variables
var monkey,monkeyload,jungle,jungleload,invisibleground,score;
var bananaload,stoneload,bananagroup,obstaclegroup,gamestate,PLAY,END;
var resetload,gameoverload,reset,gameover,survivaltime;
var monkeystop,jump,die,collect;
function preload(){
  
  jungleload=loadImage("jungle.png");
  
  monkeyload=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaload=loadImage("Banana.png");
  stoneload=loadImage("stone.png");
  
  resetload=loadImage("restart.png");
  gameoverload=loadImage("gameOver.png");
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  collect=loadSound("ach.mp3");
 monkeystop=loadImage("Monkey_01.png");
}


function setup() {
  createCanvas(600,300);
  
  ground=createSprite(300,150);
  ground.addImage("background",jungleload);
  ground.scale=1;
  
  
  monkey=createSprite(100,250,20,10);
  monkey.addAnimation("running",monkeyload);
  monkey.scale=0.1;
  monkey.setCollider("circle",0,0,10);
  invisibleground=createSprite(300,250,600,3);
  invisibleground.visible=false;
   reset=createSprite(300,150);
  reset.addImage(resetload);
  reset.scale=0.5;

   reset.visible=false;
  
  obstaclegroup=new Group();
  bananagroup= new Group();
  gameover=createSprite(290,100);
  gameover.addImage(gameoverload);
  gameover.scale=0.5;
   gameover.visible=false;
   PLAY=1;
  END=0;
  gamestate=PLAY;
 
  survivaltime=0;
  score=0;
  
}



function draw(){
 background(255); 
  
  if(gamestate==PLAY){
    
   
    
   //condition to jump
   if(keyDown("space")&&monkey.y>247){
   monkey.velocityY=-10.5;
    jump.play();
    }
  
  ground.velocityX=-10;
 if(ground.x<0){
  ground.x=ground.width/2;
 }


   bananaspawn();
    obstaclesspawn();
    
    //infinite ground
    
    
    
    //survival time
    survivaltime=survivaltime + Math.round(getFrameRate()/40);
    monkey.velocityY=monkey.velocityY+0.45;
    
    //condition for monkey to get banana
    if(monkey.isTouching(bananagroup)){
    score=score+1;
      collect.play();
   // playSound(   "sound://category_achievements/lighthearted_bonus_objective_2.mp3");
    bananagroup.destroyEach();
   }
  switch(score){
    case 10:
      monkey.scale=0.12;
      break;
      case 20:
      monkey.scale=0.14;
      break;
      case 30:
      monkey.scale=0.15;
      break;
      case 40:
      monkey.scale=0.16;
      
      
  }
   
   //condition for game to end
    if(monkey.isTouching(obstaclegroup)&&monkey.scale==0.1){
    gamestate=END;
    die.play();
   //playSound( "sound://category_female_voiceover/game_over_female.mp3");
    
   }
  else if (monkey.isTouching(obstaclegroup)&&monkey.scale>0.1){
    monkey.scale=0.1;
    score=score-1;
    gamestate=PLAY;
  }
  }
//instructions in the end state
   else if(gamestate==END){
    ground.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    obstaclegroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    bananagroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
   bananagroup.destroyEach();
    monkey.changeAnimation(monkeystop);
     monkey.scale=0.1;
    
    textSize(20);
    text("GAME OVER",135,200);
    reset.visible=true;
    gameover.visible=true;
  }
  //condition fro reset
  if(mousePressedOver(reset)){
    resets();
  }
  console.log(monkey.y);
   monkey.collide(invisibleground);
   drawSprites();
  fill("white");
  text("score="+score,300,50);
  text("survival time="+survivaltime,50,50);
}
  function bananaspawn(){
  if(frameCount%80==0){
    
  banana=createSprite(400,random(150,250));
  banana.addImage(bananaload);
  banana.velocityX=-5;
  banana.scale=0.05;
  banana.lifetime=120;
  bananagroup.add(banana);
}
}
function obstaclesspawn(){
  if(frameCount%300==0){
 var stone=createSprite(600,250);
  stone.addImage(stoneload);
  stone.scale=0.25;
  stone.velocityX=-5;
  obstaclegroup.add(stone);
  stone.lifetime=120;
  }
}
 function resets(){
  gamestate=PLAY;
  obstaclegroup.destroyEach();
  bananagroup.destroyEach();
 
  reset.visible=false;
  monkey.changeAnimation(monkeyload);
  monkey.scale=0.1;
 
  gameover.visible=false;
  score=0;
  survivaltime=0;
}