var balloon
var backgroundImg


function preload() {
  backgroundImg = loadImage("Images/HotAirBallon.png")
}
function setup() {
  database = firebase.database();
    console.log(database)
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);

  var balloon = database.ref('balloon/Position');
    balloon.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 

  textSize(20)
  fill("blue")
  stroke("blue")
  Text("press the arrow keys to move the hot air balloon",50,50)
  
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10
  }
  drawSprites();
}
function writePosition(x,y){
  database.ref('balloon/Position').set({
      'x': position.x + x,
      'y': position.y + y,
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;

}
function showError(){
  console.log("Error in writing to the database");
}