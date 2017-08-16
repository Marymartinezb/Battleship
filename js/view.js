/**
 * @function battleship_view
 * @description
 * This is the module pattern to set all the functionatity on the View for MVC pattern
 * It renders all the funcionality on the screen
 */
var battleship_view = (function () {
    var currentShip = {}; // Current ship
    var table = {}; // Complete table
    var enableSetShip = false;
    this.ships; // Constructor
    var dataShip = {};
    var dataUserShips = [];
    var valid = true;
    var headers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    var dataComputerShips = [];
    var fullEnemShips = []; // Enemy ships array
    var usedId = []; // Ids used by the machine
    var userShoootsCounter = 0;
    var enemyShootsCounter = 0;


    /**
     * @function renderShip
     * @param {array} ships
     * @description
     * This function creates the images necesaries to drag to the grid
     */
    function renderShip(ships) {
        ships.forEach(function (element) {
            var ship = document.createElement('img');
            ship.ships = ships;
            ship.setAttribute('src', 'img/' + element.name + '.png');
            var shipsContainer = document.getElementById('shipsContainer');
            shipsContainer.appendChild(ship);
            ship.setAttribute("id", element.name);
            ship.addEventListener('click', drag);
        });
    }

    /**
     * @function gridSingleton
     * @description
     * Used to compose the grids enemy an user grid, gives to the td's the listener of click
     */
    var renderGrid = (function () {

        // Instance stores a reference to the Singleton
        var instance;
        var tShips = document.getElementById('tShips');
        var tShoots = document.getElementById('tShoots');

        function init() {
            _composeHead(tShips);
            _composeBody(tShips);

            _composeHead(tShoots);
            _composeBody(tShoots);

        };

        function _composeHead(target) {
            var tr = document.createElement('tr');
            var empty = document.createElement('th');
            var thead = document.createElement('thead');
            tr.appendChild(empty);
            headers.forEach(function (element, index) {
                var th = document.createElement('th');
                th.textContent = index + 1;
                th.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            target.appendChild(thead);
        }

        function _composeBody(target) {
            var tbody = document.createElement('tbody');
            table[target.id] = [];
            for (var i = 0; i < headers.length; i++) {
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
                th.textContent = headers[i];
                tr.appendChild(th);
                for (var j = 0; j < headers.length; j++) {
                    var td = document.createElement('td');
                    var counter = parseInt(j) + 1;
                    var elId = target.id + headers[i] + counter;
                    td.id = elId;
                    table[target.id].push(elId);
                    tr.appendChild(td);
                    counter++;
                    td.addEventListener('mouseover', function () {
                        if (enableSetShip) {
                            mouseover(event, currentShip)
                        }
                    });
                    td.addEventListener('mouseout', function () {
                        if (enableSetShip) {
                            mouseout(event, currentShip)
                        }
                    });
                };
                tbody.appendChild(tr);
                target.appendChild(tbody);
            }
        }
        
        return {
            getInstance: function () {
                if (!instance) {
                    instance = init();
                }
                return instance;
            }
        };
    })();

    /**
     * @function startMsg
     * @description
     * Render initial msn
     */
    function startMsg() {
        alert('Por favor posicione sus barcos')
    }

    /**
     * @function drag
     * @param {*} event 
     * @description
     * Takes the target of the click element, depending on the clicked element
     * takes the properties that it has, to use in @function mouseover and mouseout
     */
    function drag(event) {
        var element = event.target.id;
        for(var i = 0; i < dataUserShips.length; i++) {
            if(element == dataUserShips[i].name) {
                this.removeEventListener('click', drag);
                return;
            }
        }
        if (element == "aircraftcarrier") {
            currentShip = this.ships[0];
        } else if (element == "battleship"){
            currentShip = this.ships[1];
        } else if (element == "frigate"){
            currentShip = this.ships[2];
        } else if (element == "submarine"){
            currentShip = this.ships[3];
        } else if (element == "minesweeper"){
            currentShip = this.ships[4];
        }
        enableSetShip = true;
    }

    /**
     * @function mouseover
     * @param {*} event, currentShip
     * @description
     * Mouse over acept the target of the td clicked, and gives the number of spaces to give then
     * the color by position, to simulate that is a ship there
     */
    function mouseover(event, currentShip) {
        var target = event.target;
        var elements = [target];
        var targetId = target.id.replace('tShips', '');
        var elLetter = targetId.slice(0,1);
        var elNumber = parseInt(targetId.slice(1,3));         
        for (var i = 1; currentShip.space > i; i++) {
            if(elNumber+i > 10) {
                dataShip = {
                    'pos': []
                };
                return;
            }
            var nextElement = document.getElementById('tShips'+elLetter+(elNumber+i));
            elements.push(nextElement);
        };
        validPos(elements);
        if(!valid) return;
        elements.forEach(function(node) {
            node.style.backgroundColor = '#000';
        });  
        dataShip = {
            'name': [],
            'pos': []
        };
        dataShip['pos'] = elements;

    }
    
    /**
     * @function mouseout
     * @param {*} event, currentShip
     * @description
     * Mouse out acept the target of the td clicked, when you are out of a td returns the
     * initial color to simulate that is not a ship there
     */
    function mouseout(event, currentShip) {
        var target = event.target;  
        var elements = [target];
        var targetId = target.id.replace('tShips', '');
        var elLetter = targetId.slice(0,1);         
        var elNumber = parseInt(targetId.slice(1,3));         
        for (var i = 1; currentShip.space > i; i++) {
            if(elNumber+i > 10) {return;};
            var nextElement = document.getElementById('tShips'+elLetter+(elNumber+i));
            elements.push(nextElement);
        }
        validPos(elements);
        if(!valid) return;
        elements.forEach(function(node) {
            node.style.backgroundColor = '#fff';
        });
    }
 

    /**
     * @function showEnemyGrid
     * @description
     * Shows and hidde the enemy gid
     */
    function showEnemyGrid() {
        document.getElementById('tShoots').classList.remove('hidden');
        document.getElementById('btnStart').classList.add('hidden');
    }

    /**
     * @function userShips
     * @description
     * Clean data to insert every position ship
     */
    function userShips() {
        if (!enableSetShip) {
            return;
        } else {
            enableSetShip = false;
            var pos = dataShip['pos'];
            if(pos.length == 0) {
                alert('Hey');
                return;
            }
            dataShip = {
                'name': [],
                'pos': []
            };
            dataShip['name'] = currentShip.name;
            dataShip['pos'] = pos;
            return dataShip;
        };
        
    }


    /**
     * @function getTable
     * @description
     * Return the table
     */    
    function getTable() {
        return table;   
    }

    /**
     * @function saveData
     * @param {*} data
     * @description
     * Save the ships in the data user ship for view
     */
    function saveData(data) {
        dataUserShips = data;
    }

    /**
     * @function saveDataComputer
     * @param {*} data
     * @description
     * Save the ships in the data computer ship for view
     */
    function saveDataComputer(data){
        dataComputerShips = data;
    }

    /**
     * @function validPos
     * @param {*} element
     * @description
     * Takes the element and valid if is in the user ships array
     */
    function validPos(element) {
        valid = true;
        for (var i = 0; i < dataUserShips.length; i++) {
            for (var j = 0; j < dataUserShips[i].pos.length; j++) {
                for (var k = 0; k < element.length; k++) {
                    if (dataUserShips[i].pos[j] == element[k]) {
                        valid = false;
                    }
                }
            }
        }
    }

    /**
     * @function randomShips
     * @param {*} ships, min, max
     * @description
     * Create a number and letter random to compose a new id, validate if this id is in
     * the enemys ships array
     * Use a while to confirm if the id is in the usable id's, so discard the
     * repit id and set a new one
     * save the id in fullEnemShips
     */
    function randomShips(ships, min, max){
        var usable = false;
        ships.forEach(function(e){
            var enemyElem = [];
            var rowNum = Math.floor(Math.random() * (10 - e.space)) + 1;
            var row = headers[rowNum];
            var colNum = Math.floor(Math.random() * (10 - e.space)) + 1;           
            for (var i = 0; e.space > i; i++) {
                usable = false;
                var col = colNum + i;
                var id = 'tShoots'+ row + String(col);     
                while(!usable) {
                    if(usedId.length > 0) {
                        for(var l = 0; l < usedId.length; l++) {
                            if(usedId[l] !== id) {
                                usable = true;
                            } else {
                                row = headers[Math.floor(Math.random() * (10 - e.space)) + 1]
                                col = Math.floor(Math.random() * (10 - e.space)) + 1;
                                id = 'tShoots'+ row + String(col+i);
                            }      
                        }   
                    } else {
                        usable = true;   
                    }
                }
                enemyElem.push(id);
                usedId.push(id);
            };
            fullEnemShips.push(enemyElem);

        });
    }

    /**
     * @function userShoots
     * @param {*} e
     * @description
     * Confirm the usuary cliked td to validate if is inside of the enemy ships array
     * if match with one position in the ships sunk the ships
     */
    function userShoots (e) {
        var target = e.target;
        var id = target.id;
        var element = document.getElementById(id);
        for (var i = 0; i < fullEnemShips.length; i++) {
            for (var j = 0; j < fullEnemShips[i].length; j++){
                if(id !== fullEnemShips[i][j]) {
                    element.classList.add('fail');
                } else if (id == fullEnemShips[i][j]){
                    element.classList.add('sunk');
                    userShoootsCounter++;
                    if (userShoootsCounter >= usedId.length){
                        alert('Has ganado la partida');
                    }
                }
            }
        }
        console.log(fullEnemShips);
    }

    /**
     * @function fullEnemShips
     */
    function enemyShoots (ships) {
        var rowNum = Math.floor(Math.random() * (10 - ships.space)) + 1;
        row = headers[rowNum];
        var col = Math.floor(Math.random() * (10 - ships.space)) + 1;
        var id = 'tShips'+ row + String(col);
         for (var i = 0; i < dataUserShips.length; i++) {
            for (var j = 0; j < dataUserShips[i].length; j++){
                if(id !== 'tShipsa1') {
                    element.classList.add('fail');
                } else if (id == 'tShipsa1'){
                    element.classList.add('sunk');
                    enemyShootsCounter++;
                    if (enemyShootsCounter >= usedId.length){
                        alert('Has perdido');
                    }
                }
            }
            console.log(ships);
        }
    }

    return {
        renderShip: renderShip,
        renderGrid: renderGrid,
        startMsg: startMsg,
        showEnemyGrid: showEnemyGrid,
        drag: drag,
        userShips: userShips,
        getTable: getTable,
        saveData: saveData,
        isValid: function(){
            return valid;
        },
        randomShips: randomShips,
        userShoots: userShoots,
        enemyShoots: enemyShoots,
    }
}());