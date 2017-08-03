//Controller
window.addEventListener('load', function() {
    var ships = battleship_model.create();
    battleship_view.renderShip(ships);
    battleship_view.startMsg();
    battleship_view.renderGrid.getInstance();   
});

document.getElementById('btnStart').addEventListener('click', battleship_view.showEnemyGrid);