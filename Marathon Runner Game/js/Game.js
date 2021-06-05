class Game {
  constructor(){

  }

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
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,100);
    player1.addImage("player1",player1_img);
    player1.scale = 0.2
    player2 = createSprite(100,200);
    player2.scale=0.8
    player2.addImage("player2",player2_img);
    player3 = createSprite(100,300);
    player3.addImage("player3",player3_img);
    player3.scale= 1.6
    player4 = createSprite(100,400);
    player4.addImage("player4",player4_img);
    player4.scale=0.2
    players = [player1, player2, player3, player4]
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    //player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,displayHeight-920,0,displayWidth*5, displayHeight);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y = 110;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 110;
        //use data form the database to display the cars in y direction
        x = displayHeight - allPlayers[plr].distance-750;
        players[index-1].x = x;
        players[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
          camera.position.y = displayWidth/2;
          camera.position.x = players[index-1].x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3650){
      gameState = 2;
      player.rank+=1
      Player.updateCount(player.rank)
      alert(player.name+" The Game Is Over")
      alert("Your Rank Is "+player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
