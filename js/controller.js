//Controller
window.addEventListener('load', function() {
    var ships = battleship_model.create();
    battleship_view.renderShip(ships);
    battleship_view.startMsg();
    battleship_view.renderGrid.getInstance();
    var table = battleship_view.getTable();
    table['tShips'].forEach(function(element) {
        document.getElementById(element).addEventListener('click', function () {
            var myShip = battleship_view.userShips();
            if(myShip == undefined) {
                alert('Selecciona un barco');
            } else {
                battleship_model.insertShip(myShip);
            }
        });
    });
});
document.getElementById('btnStart').addEventListener('click', battleship_view.showEnemyGrid);