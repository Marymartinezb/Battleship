// View
var battleship_view = (function () {
    var currentShip = {};
    var table = {};
    var enableSetShip = false;
    this.ships; // Constructor
    var dataShip = {};

    /**
     * @function renderShip
     * @param {array} ships
     */
    function renderShip(ships) {
        ships.forEach(function (element) {
            var ship = document.createElement('div');
            ship.ships = ships;
            ship.style.backgroundColor = 'gray';
            ship.style.width = element.space * 30 + 'px';
            ship.style.height = 30 + 'px';
            ship.style.border = '1px solid #fff';
            var shipsContainer = document.getElementById('shipsContainer');
            shipsContainer.appendChild(ship);
            ship.setAttribute("id", element.name);
            ship.addEventListener('click', drag);
        });
    }

    /**
     * @function gridSingleton
     */
    var renderGrid = (function () {

        // Instance stores a reference to the Singleton
        var instance;
        var tShips = document.getElementById('tShips');
        var tShoots = document.getElementById('tShoots');
        var headers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

        function init() {
            _composeHead(tShips);
            _composeBody(tShips);

            _composeHead(tShoots);
            _composeBody(tShoots);

            // Eliminar
            tShoots.addEventListener('click', function (e) {
                console.log(e.target.id);
            })
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
            // Get the Singleton instance if one exists
            // or create one if it doesn't
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
     */
    function startMsg() {
        alert('Por favor posicione sus barcos')
    }

    /**
     * @function drag
     * @param {*} event 
     */
    function drag(event) {
        var element = event.target.id;
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

    function mouseover(event, currentShip) {
        // ToDo: Chekear rotacion
        // No funcione sobre uno ya posicionado
        // tratar de hacerlo reutilizable
        var target = event.target;  
        var elements = [target];
        var targetId = target.id.replace('tShips', '');
        var elLetter = targetId.slice(0,1);         
        var elNumber = parseInt(targetId.slice(1,3));         
        for (var i = 1; currentShip.space > i; i++) {
            var nextElement = document.getElementById('tShips'+elLetter+(elNumber+i));
            elements.push(nextElement);
        }
        elements.forEach(function(node) {
            node.style.backgroundColor = '#000';
        });  
        dataShip = {
            'name': [],
            'pos': []
        };
        dataShip['pos'] = elements;
    }

    function mouseout(event, currentShip) {
        // ToDo: Chekear rotacion
        // No funcione sobre uno ya posicionado
        var target = event.target;  
        var elements = [target];
        var targetId = target.id.replace('tShips', '');
        var elLetter = targetId.slice(0,1);         
        var elNumber = parseInt(targetId.slice(1,3));         
        for (var i = 1; currentShip.space > i; i++) {
            var nextElement = document.getElementById('tShips'+elLetter+(elNumber+i));
            elements.push(nextElement);
        }
        elements.forEach(function(node) {
            node.style.backgroundColor = '#fff';
        });
    }
 

    /**
     * @function showEnemyGrid
     */
    function showEnemyGrid() {
        document.getElementById('tShoots').classList.remove('hidden');
        document.getElementById('btnStart').classList.add('hidden');
    }

    /**
     * @function userShips
     */
    function userShips() {
        if (!enableSetShip) {
            return;
        } else {
            enableSetShip = false;
            var pos = dataShip['pos'];
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
     */    
    function getTable() {
        return table;   
    }

    // Drag and drop
    return {
        renderShip: renderShip,
        renderGrid: renderGrid,
        startMsg: startMsg,
        showEnemyGrid: showEnemyGrid,
        drag: drag,
        userShips: userShips,
        getTable: getTable
    }
}());