// Model Module pattern
var battleship_model = (function() {
    var userShips = [];

    function createShips() {
        var ships = [];
        var factory = new Factory();
        ships.push(factory.createShips("aircraftcarrier"));
        ships.push(factory.createShips("battleship"));
        ships.push(factory.createShips("frigate"));
        ships.push(factory.createShips("submarine"));
        ships.push(factory.createShips("minesweeper"));
        return ships;
    }
    
    function insertShip(ship) {
        userShips.push(ship);

        console.log('Ships in model', userShips);
    }
    
   
    // Datos concisos o cualquier otra cosa que necesite
    return {
        create: createShips,
        insertShip: insertShip,
        returnShip: function() {
            return userShips;
        }
    }

}());