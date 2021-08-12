var SS, ESS, space, LB, LBG, ESSG, space2, LBR, rand;
var SSimg, ESSimg, spaceimg, LBimg, space2img, spaceLimg;
var readyToSpawn = true, stage;

function preload(){
  SSimg = loadImage("Mr,flyer.png");
  spaceimg = loadImage("backgroundfl.jpeg"); 
  space2img = loadImage("fl.background.jpeg");
  LBimg = loadImage("rainsw.png");
  ESSimg = loadImage("mr.kittyslayer.png");
  spaceLimg = loadImage("spaceL.png");
}

function setup() {
  createCanvas(2000,600)
  SS = createSprite(100, 300, 0, 0);
  SS.addImage(SSimg);
  SS.scale =0.5;

  space = createSprite(300, 300, 600, 600);
  space.addImage(spaceimg);
  space.depth = SS.depth-1;
  space.scale=10
  
  space2 = createSprite(1200, 300, 600, 600);
  space2.addImage(space2img);
  space2.depth = SS.depth-1;
  space2.scale=5

  ESSG = createGroup();
  LBG = createGroup();
  LBR = true;
  stage = "RealStart";
}

function draw() {
  background("black");
  
  rand = random(20, 580);
  SS.y = World.mouseY;
  
if(space.x===1000){
  space.x=1000
}

  
  if(stage === "RealStart"){
  space.visible = false;
  space2.visible = false;
  space.velocityX = 0;
  space2.velocityX = 0;
  SS.visible = false;  
  fill("darkgreen");  
  textAlign("center");  
  text("DO NOT LET THE ENEMIES CROSS YOU", 300, 300);
  text("PRESS SPACE TO CONTINUE", 300, 320);
  text("PRESS SPACE TO SHOOT", 300, 340);  
   if(keyDown("space")){
     stage = "start";
   } 
  }
  
  if(stage === "start"){
    space2.velocityX = -4;
    //space.velocityX = -4;
    space.visible = true;
    space2.visible = true;
    SS.visible = true;
    
    RTS();
    
  if(space2.x<0){
    space2.x = 300;
  }
  
  if(keyDown("space") && LBR === true){
    LB = createSprite(SS.x+50, World.mouseY, 10, 10);
    LB.velocityX = 9;
    LB.addImage(LBimg);
    LB.scale = 0.4;
    LBR = false;
    setTimeout(SLBR, 250);
    LBG.add(LB);
  }
  
  LBG.collide(ESSG, gotHit)
  
  SS.setCollider("rectangle", 0, 0, 0, 60000, 0);
  
  if(ESSG.collide(SS)){
    stage = "lost"
  }
  }
  
  if(stage === "lost"){
    SS.destroy();
    space2.addImage(spaceLimg);
    space2.x = 300;
    space2.velocityX = 0;
    LBR = false;
    ESSG.destroyEach();
  }
  
  drawSprites();
}

function SLBR(){
  LBR = true;
}

function SESS(){
  ESS = createSprite(1200, rand, 30, 30);
  ESS.addImage(ESSimg);
  ESS.scale = 0.5;
  ESS.velocityX = -6;
  ESSG.add(ESS);
  readyToSpawn = true;
}

function gotHit(Bullet, Ship){
  Bullet.destroy();
  Ship.destroy();
}

function RTS(){
  if(readyToSpawn===true)
  {
    readyToSpawn = false;
    setTimeout(SESS, random(1750, 2750));
  }
}