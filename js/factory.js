//Ships Factory

function Factory(){
    this.createShips = function(type) {
        var ship;

        if (type === "aircraftcarrier") {
            ship = new aircraftcarrier();
        } else if (type === "battleship"){
            ship = new battleship();
        } else if (type === "frigate"){
            ship = new frigate();
        } else if (type === "submarine"){
            ship = new submarine();
        } else if (type === "minesweeper"){
            ship = new minesweeper();
        }

        ship.type = type;

        return ship;
    }
};

var aircraftcarrier = function(){
    this.space = 5;
    this.name = "aircraftcarrier";
};

var battleship = function(){
    this.space = 4;
    this.name = "battleship";
};

var frigate = function(){
    this.space = 3;
    this.name = "frigate";
};

var submarine = function(){
    this.space = 3;
    this.name = "submarine";
};

var minesweeper = function(){
    this.space = 2;
    this.name = "minesweeper";
};