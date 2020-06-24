
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

    player1 = createSprite(10,200,50,40);
    player2 = createSprite(10,500,50,60);
    players = [player1, player2];

    InvisibleGround = createSprite(100,210,displayWidth*10,20)
  //  InvisibleGround.visible = false
    InvisibleGround2 = createSprite(100,500,displayWidth*10,20)
  //  InvisibleGround2.visible = false

    player1.addImage(playerImage)
    player1.scale=0.1
    player2.addImage(playerImage)
    player2.scale = 0.1
    for (var i = 600; i<6000; i = i+ 700){
      var obstacle1 = createSprite(i,447)
      obstacleGroup1.add(obstacle1)
      var obstacle2 = createSprite(i,147)
      obstacleGroup2.add(obstacle2)
    }
  }

  play(){
    form.hide();
    distance.html(player.name+":"+player.distance)
   
    Player.getPlayerInfo();
    //player.getRank();
 
    if(allPlayers !== undefined){
    background("white")
   //   image(trackImage2,0,displayHeight,displayWidth*2,displayHeight*5)
      player1.collide(InvisibleGround)
      player2.collide(InvisibleGround2)
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      
      var x = 50;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

       // x = x + 200;

       // y = displayHeight - allPlayers[plr].distance;
       x = 460-allPlayers[plr].distance
       players[index-1].x = x
        if (index === player.index){
         // stroke(12)
         // fill("red")
         // ellipse(x,y,100,100)
          players[index - 1].tint = "red";
          camera.position.x = players[index-1].x
          camera.position.y = players[index-1].y
          if(keyDown("space")){
            players[index-1].velocityY = -10
            console.log("space"+players[index-1].velocityY)
          }
          players[index-1].velocityY = players[index-1].velocityY+0.5
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null && gameState !== 2){
      player.distance -=10
      player.update();
        }


    drawSprites();
    if(player.distance<-6000){
      gameState = 2
      player.rank = player.rank+1
      Player.updateRank(player.rank);
    }
 
  }
  end(){
    console.log("gameEnded"+player.index)
    console.log(player.distance)  
    distance.html(player.name+":"+player.rank)
    distance.position(displayWidth/5,50)

  }  
}

