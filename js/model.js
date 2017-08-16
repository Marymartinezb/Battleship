/**
 * @function battleship_model
 * @description
 * This is the module pattern to set all the functionatity on the Model for MVC pattern
 * This is the stogare data for our game
 */
var battleship_model = (function() {
    var userShips = [];

    /**
     * @function createShips
     * @description
     * Create and storage the ships in the ships array
     */
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

     /**
     * @function insertShip
     * @description
     * Create and storage the user ships in the ships array
     */   
    function insertShip(ship) {
        userShips.push(ship);
    }
    
    return {
        create: createShips,
        insertShip: insertShip,
        returnShip: function() {
            return userShips;
        }
    }

}());