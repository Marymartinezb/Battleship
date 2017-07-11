function Factory(){
    this.createShips = function(type) {
        var ships;

        if (type === "aircraftcarrier") {
            ships = new aircraftcarrier();
        } else if (type === "battleship"){
            ships = new battleship();
        } else if (type === "frigate"){
            ships = new frigate();
        } else if (type === "submarine"){
            ships = new submarine();
        } else if (type === "minesweeper"){
            ships = new minesweeper();
        }

        ships.type = type;
        ships.say = function(){
            log.add(this.type + " : " + this.space + "  spaceGrid")
        }

        return ships;
    }
};

var aircraftcarrier = function(){
    this.space = 5;
};

var battleship = function(){
    this.space = 4;
};

var frigate = function(){
    this.space = 3;
};

var submarine = function(){
    this.space = 3;
};

var minesweeper = function(){
    this.space = 2;
};

// log helper 
var log = (function(){
    var log = "";

    return {
        add: function(msg){log += msg + "\n";},
        show: function() {alert(log); log = "";}
    }
})();

function run(){

    var ships = [];
    var factory = new Factory();

    ships.push(factory.createShips("aircraftcarrier"));
    ships.push(factory.createShips("battleship"));
    ships.push(factory.createShips("frigate"));
    ships.push(factory.createShips("submarine"));
    ships.push(factory.createShips("minesweeper"));

    ships.forEach(function(element){
       var ship = document.createElement('div');
       ship.style.backgroundColor = 'gray';
       ship.style.width = element.space * 30 + 'px';
       ship.style.height = 30 + 'px';
       ship.style.border = '1px solid #fff';
       var shipsContainer = document.getElementById('shipsContainer');
       shipsContainer.appendChild(ship);
    });

    for(var i = 0, len = ships.length; i < len; i++) {

        ships[i].say()
    }

    log.show();

}

run();