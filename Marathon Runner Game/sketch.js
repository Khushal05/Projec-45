var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players, player1, player2, player3, player4;

var track, player1_img, player2_img, player3_img, player4_img;

function preload(){
  track = loadImage("images/track.jpg");
  player1_img = loadImage("images/Man 1 1.png","images/Man 1 2.png","images/Man 1 3.png","images/Man 1 4.png",
  "images/Man 1 5.png","images/Man 1 6.png","images/Man 1 7.png","images/Man 1 8.png");
  player2_img = loadImage("images/Man 2 1.png","images/Man 2 2.png","images/Man 2 3.png","images/Man 2 4.png",
  "images/Man 2 5.png","images/Man 2 6.png","images/Man 2 7.png","images/Man 2 8.png");
  player3_img = loadImage("images/Man 3 1.png","images/Man 3 2.png","images/Man 3 3.png","images/Man 3 4.png",
  "images/Man 3 5.png","images/Man 3 6.png","images/Man 3 7.png","images/Man 3 8.png");
  player4_img = loadImage("images/Man 4 1.png","images/Man 4 2.png","images/Man 4 3.png","images/Man 4 4.png",
  "images/Man 4 5.png","images/Man 4 6.png","images/Man 4 7.png","images/Man 4 8.png");
  //ground = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth*4.8, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
