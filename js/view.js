// View Module pattern
var battleship_view = (function () {
    var currentShip = {}; //Barco actualmente seleccionado
    var table = {}; //Toda la tabla
    var enableSetShip = false;
    this.ships; // Constructor
    var dataShip = {};
    var dataUserShips = [];
    var valid = true;
    var headers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    var dataComputerShips = [];
    var fullEnemShips = []; //Array de barcos del enemigo
    var usedId = []; //Ids usados por la maquina
    var userShoootsCounter = 0;


    /**
     * @function renderShip
     * @param {array} ships
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
     */
    function mouseover(event, currentShip) {
        // ToDo: Chekear rotacion
        var target = event.target;
        var elements = [target];
        var targetId = target.id.replace('tShips', '');
        var elLetter = targetId.slice(0,1);
        var elNumber = parseInt(targetId.slice(1,3));         
        for (var i = 1; currentShip.space > i; i++) {
            if(elNumber+i > 10) {
                // Este if valida que no se haya pasado de 10, el maximo del juego
                // Si fuese el caso de que lo hizo, borra del objeto de barcos las posiciones dadas
                dataShip = {
                    'pos': []
                };
                return; //Detiene la funcion
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
     */
    function mouseout(event, currentShip) {
        // ToDo: Chekear rotacion
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
     */
    function showEnemyGrid() {
        document.getElementById('tShoots').classList.remove('hidden');
        document.getElementById('btnStart').classList.add('hidden');
        //randomShips();
        //no deberia ser clickeable hasta que se acomoden todos los barcos
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
            if(pos.length == 0) {
                // Si el objeto de barcos de posiciones fue borrado
                // pos.length seria igual a 0, por ende no deberia dejar 
                // insertar ningun barco ademas deberia de avisa de cierta 
                // por que lo que hace no es valido
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
     */    
    function getTable() {
        return table;   
    }

    /**
     * @function saveData
     */
    function saveData(data) {
        dataUserShips = data;
    }

    /**
     * @function saveDataComputer
     */
    function saveDataComputer(data){
        dataComputerShips = data;
    }

    /**
     * @function validPos
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
     */
    function userShoots (e) {
        //Verificar en que td se hizo click guardar en una var
        //Compara ese td con las posiciones en el aray de enemyships 'if coincide' entonces
        //Envia un mensaje y cambiar de color
        //borrar ese id del array
        //y permite un click mas
        //cuando ese array quede en 0 gana el usuario
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
    function enemyShoots () {
        //random para elegir un id 'asemeja un click'
        //Compara ese td con las posiciones en el aray de userShips 'if coincide' entonces
        //Envia un mensaje y cambiar de color
        //borrar ese id del array
        //y permite un click mas que es el id + 1 para que sea un tiro a la derecha
        //cuando ese array quede en 0 gana el usuario

        var rowNum = Math.floor(Math.random() * (10 - e.space)) + 1;
        row = headers[rowNum];
        var col = Math.floor(Math.random() * (10 - e.space)) + 1;
        var id = 'tShoots'+ row + String(col);
        if(dataUserShips.find(id)) { //arreglar
            getElementById(id).style.backgroundColor = 'red';
            var index = dataUserShips.indexOf(id);
            dataUserShips.splice(index);
            enemyShoots();
        } else {
            alert('Tiro fallido')
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
    }
}());