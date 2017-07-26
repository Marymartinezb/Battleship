//Controller
window.addEventListener('load', function() {
    battleship_view.startMsg();       
    battleship_view.renderGrid.getInstance();   
    var ship = battleship_model.create();        
    battleship_view.renderShip(ship);
});

document.getElementById('btnStart').addEventListener('click', battleship_view.showEnemyGrid);