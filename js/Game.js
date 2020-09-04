class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value")
      if(playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

  }

play() {
  form.hide();
  textSize(20);
  text("and the game Begins",200,100);
  Player.getDetails();
  if(details!== undefined){
    var displayP = 200;
    for(var Plr in details) {
      if(Plr == "player" + player.index){
        fill ("green");
      }
      else{
        fill("black");
      }
     displayP = displayP + 20;
     textSize(20);
     text(details[Plr].name + ":" + details[Plr].distance);
    }
  }
  if(keyIsDown(UP_ARROW) && player.index!== null) {
    player.distance = player.distance + 35;
    player.update();
  }
}

}
