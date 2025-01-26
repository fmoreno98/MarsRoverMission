export function createWorld(side, obstacles, initialRoverPosition) {
    const size = side * side; // area del cuadrado
    const array = new Array(size).fill(0); // array del mapa

    // funcion para marcar que posicion ocuparan los obstaculos en el array de forma aleatoria
    function getRandomIndices(arraySize, numIndices) {
        const indices = new Set(); // utilizo un set para que no puedan haber repetidos
        while (indices.size < numIndices) {
            indices.add(Math.floor(Math.random() * arraySize)); // añadirlos aleatoriamente
        }
        return Array.from(indices);
    }

    const indices = getRandomIndices(size, obstacles);

    // donde este el indice habra un 1 que funciona como obstaculo
    indices.forEach(index => {
        array[index] = 1;
    });

    // convertir la posicion iunicial del rover en un indice
    const roverIndex = initialRoverPosition[1] * side + initialRoverPosition[0];

    // si la posicion inicial del rover es un obstaculo convertirla en 0
    if (array[roverIndex] === 1) {
        array[roverIndex] = 0;
    }

    return array;
}