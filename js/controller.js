/**
 * @function GameHandler
 * @description
 * Constructor pattern used as a Controller in MVC pattern game
 */
var GameHandler = function(pModel, pView){
    this.model = pModel;
    this.view = pView;
    this.ships;
    this.table;
}

GameHandler.prototype={

    /**
     * @function init
     * @description
     * Initializes all the dependencies functions in the game
     */
    init: function(){
        this.ships = this.model.create();
        this.view.renderShip(this.ships);
        this.view.startMsg();
        this.view.renderGrid.getInstance();
        this.table = this.view.getTable();
        this.view.randomShips(this.ships);
        this.view.enemyShoots(this.ships);
    },
    /**
     * @function shipsEventHandler
     * @description
     * Takes all the td elements in the tShips container, and gives then
     * the click event handler, to validate the position to place the ships
     */
    shipsEventHandler : function(){
        var tdShips = this.table['tShips'];
        var ln = tdShips.length;
        for (var i = 0; i < ln; i++)  {
            var element = document.getElementById(tdShips[i]); //casting para volver a html
            element.self = this;
            element.addEventListener('click', function (e) {
                var myShip = this.self.view.userShips();
                if(myShip == undefined) {
                    alert('Selecciona un barco');
                } else {
                    if(this.self.view.isValid()) {
                        this.self.model.insertShip(myShip);
                        this.self.view.saveData(this.self.model.returnShip());
                    } else {
                        alert('Esta posicion es invalida');
                        return;
                    }
                }
            });
        }
    },
    /**
     * @function shootsEventHandler
     * @description
     * Takes all the td elements in the tShoots container, and gives then
     * the click event handler, to use userShoots(), to validate the shoots made by user
     */
    shootsEventHandler : function(){
        var tdShoots = this.table['tShoots'];
        var ln = tdShoots.length;
        for (var i = 0; i < ln; i++)  {
            var element = document.getElementById(tdShoots[i]); //casting para volver a html
            element.self = this;
            element.addEventListener('click', function (e) {
                this.self.view.userShoots(e);
            });
        }
    }
};