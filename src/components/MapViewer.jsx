import React from 'react';

const MapViewer = ({ map, mapside, side, pos, rover }) => {
    const cellSize = 20; //tamaño de la casilla
    const mapWindow = []; //array de las filas de casillas del mapa

    const startX = Math.max(0, pos[0]); //numero de la casilla superior izquierda del mapa, no puede ser menor a 0 (eje X)
    const startY = Math.max(0, pos[1]); //numero de la casilla superior izquierda del mapa, no puede ser menor a 0 (eje Y)
    const endX = Math.min(mapside, startX + side); //numero de la casilla inferior derecha (eje X)
    const endY = Math.min(mapside, startY + side); // numero de la casilla inferior derecha (eje Y)

    for (let y = startY - (pos[1] < 0 ? Math.abs(pos[1]) : 0); y < startY + side && y < mapside; y++) { // maneja que no haya valores negativos en pos[1] y que esté dentro del tamaño de la cuadricula
        const row = [];
        for (let x = startX - (pos[0] < 0 ? Math.abs(pos[0]) : 0); x < startX + side && x < mapside; x++) { // maneja que no haya valores negativos en pos[0] y que esté dentro del tamaño de la cuadricula
            let backgroundColor;

            if (x === rover[0] && y === rover[1]) {
                // rover
                backgroundColor = 'blue';
            } else if (x >= startX && x < endX && y >= startY && y < endY) { //se asegura que x e y este denro de los limites de la cuadricula
                // cuadricula del mapa
                const value = map[y * mapside + x]; //busca el resulado para ver si es 1 y saber si es obstaculo
                backgroundColor = value === 1 ? 'red' : 'gray'; //si la casilla es de obstaculo la marca roja, si no, gris
            }

            row.push(
                <div
                    key={`${x}` - `${y}`}
                    style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        backgroundColor,
                        display: 'inline-block',
                        border: '1px solid #ddd'
                    }}
                />
            );// a cada div (casilla) le da su color añadiendolo al array row 
        }
        mapWindow.push(
            <div key={y} style={{ display: 'flex' }}>
                {row}
            </div>
        ); // añade las rows al array mapWindow
    }
    return (
        <div>
            {mapWindow}
        </div>
    );
};

export default MapViewer;