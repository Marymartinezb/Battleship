//Controller Constructor

var GameHandler = function(pModel, pView){
    this.model = pModel;
    this.view = pView;
    this.ships;
    this.table;
}

GameHandler.prototype={

    init: function(){
        this.ships = this.model.create();
        this.view.renderShip(this.ships);
        this.view.startMsg();
        this.view.renderGrid.getInstance();
        this.table = this.view.getTable();
        this.view.randomShips(this.ships);
    },
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