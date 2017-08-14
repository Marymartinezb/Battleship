//Main

var gameHandler = new GameHandler(battleship_model, battleship_view);

gameHandler.init();
gameHandler.addEventHandler();

document.getElementById('btnStart').addEventListener('click', battleship_view.showEnemyGrid);