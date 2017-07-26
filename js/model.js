// Model
var battleship_model = (function() {
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
    
    // Datos concisos o cualquier otra cosa que necesite
    return {
        create: createShips,
    }

}());