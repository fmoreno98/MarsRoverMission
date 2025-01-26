import { useEffect, useState } from 'react';
import { createWorld } from './components/helpers';
import MapViewer from './components/MapViewer';
import './App.css'

const side = 20; // lado del cuadrado
const obstacles = 50; //numero de obstaculos
let initialRoverPosition = [Math.floor(side / 2), Math.floor(side / 2)] // pone la posicion del rover en el centro dado el lado que sea
const emptyWorld = createWorld(side, obstacles, initialRoverPosition); // genera un array donde los 1 son obstaculos y los 0 por donde se puede mover el rover

function App() {
  const [windowPos, setWindowPos] = useState([0, 0]); // esquina superior izquierda de la cuadricula del mapa
  const [rover, setRover] = useState(initialRoverPosition); // posicion inicial del rover
  const [map, setMap] = useState(emptyWorld); //mapa generado
  const [commands, setCommands] = useState(''); // las indicaciones que sigue el rover para moverse (L=Left, R=Right, F=Forward, B=Backwards) 
  const [stop, setStop] = useState(false); // si es true no deja que el rover se siga moviendo
  const [msg, setMsg] = useState("")
  const [roverPos, setRoverPos] = useState("")
  const windowSize = side; //tamaño de la vista del mapa (medira lo mismo que el mapa)

  // Mira si la posicion contiene un obstaculo
  const isObstacle = (x, y) => {
    console.log(`Comprobando si hay un obstáculo en la posición ${x}, ${y}`);
    return map[y * side + x] === 1; //comprueba que la posicion es = 1 por lo tanto es un obstaculo
  };

  // conprueba que el rover se mueve dentro del mapa y no choca con ningun obstaculo
  const moveRover = (dx, dy) => {
    setRover(prevPos => {
      const newX = prevPos[0] + dx;
      const newY = prevPos[1] + dy;

      if (newX < 0 || newX >= side || newY < 0 || newY >= side || isObstacle(newX, newY)) {
        setMsg(`El rover se ha chocado en la posición: [${newX},${newY}] y ha vuelto a la posición [${prevPos}] para detenerse.`)
        setStop(true); //cambia el state a true para que no pueda seguir moviendose
        return prevPos; // devuelve el rover a la posicion antigua
      }
      setRoverPos(`Posición del rover: [${newX},${newY}]`)
      return [newX, newY];
    });
  };

  // mover el rover en funcion a los comandos dados
  const start = (commands) => {
    const commandsArray = commands.split("") // separa cada una de las letras dadas en el comando para poder leerlas una a una
    console.log(commandsArray)
    setMsg("")
    if (stop) {
      setMsg("El rover esta averiado y no va a moverse más.")
    }
    followCommands(commandsArray)
  }

  const followCommands = (commandsArray) => { // funcion para leer los comandos que se ponen en el input
    for (const command of commandsArray) {
      if (stop) {
        console.log("stop: ", stop)
        break;
      } else { // sumara o restara una posicion a la posicon previa que tenia el rover 
        if (command === 'F') {
          console.log("adelante")
          moveRover(0, -1);
        } else if (command === 'B') {
          console.log("atrás")
          moveRover(0, 1);
        } else if (command === 'L') {
          console.log("izquierda")
          moveRover(-1, 0);
        } else if (command === 'R') {
          console.log("derecha")
          moveRover(1, 0);
        } else {
          setMsg(`No se ha llevado a cabo toda la secuenccia de movimiento ya que la indicacón ${command} no es válida`)
          return
        }
      }
    };
  }
  function replaceSpace(commands) {
    const str = commands.replace(/ /g, "")
    return str
  }

  return (
    <>
      <div className='container'>
        <div className="row">
          <h4>{roverPos}</h4>
        </div>
        <div className='row'>
          <MapViewer map={map} mapside={side} pos={windowPos} side={windowSize} rover={rover} />
        </div>
        <div className='row'>
          <label htmlFor="">L = Left | </label>
          <label htmlFor="">R = Right | </label>
          <label htmlFor="">F = Forward | </label>
          <label htmlFor="">B = Backwards</label>
          <br />
        </div>
        <div>
          <h3>{msg}</h3>
        </div>
        <div className='row'>
          <input type="text" value={commands} onChange={(e) => setCommands(replaceSpace(e.target.value.toUpperCase()))} />
        </div>
        <br />
        <div className='row'>
          <button className='start' onClick={() => start(commands)}>{'Start'}</button>
        </div>
      </div>
    </>
  );
}
export default App;