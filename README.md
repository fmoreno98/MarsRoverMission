Mars Rover Mission

Funcionamiento:

El mapa de Marte es estudiado desde el principio y se sabe que hay un total de 50 obstaculos y que tiene una medida de 20x20. La ubicación de los 
obstáculos es completamente aleatoria.

Desde la base de la tierra se envían unos comandos que pueden ser F, B, L o R referiendose a las direcciones en las que el rover es capaz de moverse.
Estos comandos son interpretados y leidos por el rover y se mueve siguiendo paso a paso cada uno de ellos. Si nos equivocamos no pasa nada, él mismo
es capaz de ver si está o no en mayúscula, ya que solo los entiende así, y si hay algún comando erróneo. De haber algun comando erróneo, el rover
lo leerá y cortará la secuencia deteniendose en el ultimo comando antes del fallo. Avisará que no es capaz de leer dicho fallo y dejará seguir enviando 
nuevas comandas.

Si el rover colisiona con algún obstaculo de la superficie de Marte o el borde del mapa este volverá a su última posición libre y se detendrá para ser reparado. Luego enviará mensaje a la base de la tierra informando de la localización del obstáculo y su ubicación de detención.

Podrá moverse libre siempre que no colisone con nada. Mientras sea capaz de moverse se le podrán seguir dando comandas nuevas.


Herramientas utilizadas:

-React
-Javascript
-HTML
-CSS

Proyecto diseñado por Fran Moreno Cazadilla