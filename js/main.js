//Main

var gameHandler = new GameHandler(battleship_model, battleship_view);

gameHandler.init();
gameHandler.shipsEventHandler();
gameHandler.shootsEventHandler();

document.getElementById('btnStart').addEventListener('click', battleship_view.showEnemyGrid);