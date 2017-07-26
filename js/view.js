// View
var battleship_view = (function () {

    /**
     * @function renderShip
     * @param {array} ships
     */
    function renderShip(ships) {
        ships.forEach(function (element) {
            var ship = document.createElement('div');
            ship.style.backgroundColor = 'gray';
            ship.style.width = element.space * 30 + 'px';
            ship.style.height = 30 + 'px';
            ship.style.border = '1px solid #fff';
            var shipsContainer = document.getElementById('shipsContainer');
            shipsContainer.appendChild(ship);
        });
    }

    /**
     * @function gridSingleton
     */
    var gridSingleton = (function () {

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
     * @function showEnemyGrid
     */
    function showEnemyGrid() {
        document.getElementById('tShoots').classList.remove('hidden');
        document.getElementById('btnStart').classList.add('hidden');
    }
    
    // Drag and drop
    return {
        renderShip: renderShip,
        renderGrid: gridSingleton,
        startMsg: startMsg,
        showEnemyGrid: showEnemyGrid,
    }
}());