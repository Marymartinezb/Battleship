// View
var battleship_view = (function () {
    var droppable = false;
   this.ships;

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
                    td.id = headers[i] + counter;
                    tr.appendChild(td);
                    counter++;
                    td.addEventListener('mouseover', function () {
                        if (droppable) {
                            mouseover(event, myShip)
                        }
                    });
                    td.addEventListener('mouseout', function () {
                        if (droppable) {
                            mouseout(event, myShip)
                        }
                    });
                    td.addEventListener('click', function() {
                        droppable = false;
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

    var ship = {};

    function drag(event) {
        var element = event.target.id;
        if (element == "aircraftcarrier") {
            ship = this.ships[0];
                    console.log(ship.space);
        } else if (element == "battleship"){
            ship = this.ships[1];
        } else if (element == "frigate"){
            ship = this.ships[2];
        } else if (element == "submarine"){
            ship = this.ships[3];
        } else if (element == "minesweeper"){
            ship = this.ships[4];
        }
        console.log('drag')
        droppable = true;
    }

    function mouseover(event, ship) {
        // debe chekear si esta rotado porque la forma de conseguir el elemento es diferente,
        // si lo consigue horizontalmente solo deberia de moverse un td a la derecha,
        // si lo consigue verticalmente debe moverse un tr abajo
        var target = event.target;
        var element = document.getElementById(target.id);
        var elements = [element];
        for (var i = 0; ship.space - 1 > i; i++) {
            var adyElement = document.getElementById(parseInt(target.id) + 1); // Pensar mejor
            console.log(adyElement);
            elements.push(adyElement);
        }
        elements.forEach(function (node) {
            node.style.backgroundColor = '#000'; // Sirve pero que funcione mas como un over
        });
        // elements, a cada nodo le pinto un background
        console.log('Elements', elements);
        console.log('Ship', ship);
    }

    function mouseout(event, ship) {
        // debe chekear si esta rotado porque la forma de conseguir el elemento es diferente,
        // si lo consigue horizontalmente solo deberia de moverse un td a la derecha,
        // si lo consigue verticalmente debe moverse un tr abajo
        var target = event.target;
        var element = document.getElementById(target.id);
        var elements = [element];
        for (var i = 0; ship.space - 1 > i; i++) {
            var adyElement = document.getElementById(parseInt(target.id) + 1); // Pensar mejor
            console.log(adyElement);
            elements.push(adyElement);
        }
        elements.forEach(function (node) {
            node.style.backgroundColor = 'blue'; // Sirve pero que funcione mas como un over
        });
    }
 

    /**
     * @function showEnemyGrid
     */
    function showEnemyGrid() {
        document.getElementById('tShoots').classList.remove('hidden');
        document.getElementById('btnStart').classList.add('hidden');
    }
    
    // Drag and drop
    return {
        renderShip: renderShip,
        renderGrid: renderGrid,
        startMsg: startMsg,
        showEnemyGrid: showEnemyGrid,
        drag: drag
    }
}());