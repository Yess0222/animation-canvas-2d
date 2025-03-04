// Obtiene el elemento canvas del DOM
const canvas = document.getElementById("canvas");

// Obtiene el contexto 2D del canvas, necesario para dibujar
let ctx = canvas.getContext("2d");

// Obtiene el ancho y la altura de la ventana del navegador
const window_width = 300;
const window_height = 300;

// Establece el ancho y la altura del canvas para que coincidan con la ventana
canvas.width = window_width;
canvas.height = window_height;

// Establece el color de fondo del canvas (opcional)
canvas.style.backgroundColor = "#ff8";

// Definición de la clase Circle
class Circle {
    // Constructor de la clase, inicializa las propiedades del círculo
    constructor(x, y, radius, color, text, speed) {
        this.posX = x; // Posición horizontal inicial del círculo
        this.posY = y; // Posición vertical inicial del círculo
        this.radius = radius; // Radio del círculo
        this.color = color; // Color del círculo
        this.text = text; // Texto inicial
        this.number = 1; // Inicializa el número en 1
        this.speed = speed; // Velocidad del círculo

        this.dx = this.speed; // Velocidad horizontal inicial
        this.dy = this.speed; // Velocidad vertical inicial
    }

    // Método para dibujar el círculo en el canvas
    draw(context) {
        context.beginPath(); // Inicia un nuevo camino de dibujo
        context.strokeStyle = this.color; // Establece el color del borde
        context.lineWidth = 2; // Establece el ancho del borde
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2); // Dibuja el círculo
        context.stroke(); // Traza el borde del círculo

        // Configura y dibuja el texto dentro del círculo
        context.fillStyle = this.color;
        context.font = "20px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(`${this.text} ${this.number}`, this.posX, this.posY);

        context.closePath(); // Cierra el camino de dibujo
    }

    // Método para actualizar la posición del círculo y manejar las colisiones con los bordes
    update(context) {
        this.draw(context); // Dibuja el círculo en su posición actual

        // Función para manejar la colisión y actualizar el texto
        const handleCollision = () => {
          this.number++; // Incrementa el número
        };

        // Colisión con el borde derecho
        if (this.posX + this.radius > window_width) {
            this.posX = window_width - this.radius; // Ajusta la posición para evitar que se salga del borde
            this.dx = -this.dx; // Invierte la velocidad horizontal
            handleCollision(); // Incrementa el numero
        }

        // Colisión con el borde izquierdo
        if (this.posX - this.radius < 0) {
            this.posX = this.radius; // Ajusta la posición para evitar que se salga del borde
            this.dx = -this.dx; // Invierte la velocidad horizontal
            handleCollision(); // Incrementa el numero
        }

        // Colisión con el borde inferior
        if (this.posY + this.radius > window_height) {
            this.posY = window_height - this.radius; // Ajusta la posición para evitar que se salga del borde
            this.dy = -this.dy; // Invierte la velocidad vertical
            handleCollision(); // Incrementa el numero
        }

        // Colisión con el borde superior
        if (this.posY - this.radius < 0) {
            this.posY = this.radius; // Ajusta la posición para evitar que se salga del borde
            this.dy = -this.dy; // Invierte la velocidad vertical
            handleCollision(); // Incrementa el numero
        }

        // Actualiza la posición del círculo sumando las velocidades
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// Crea dos instancias de la clase Circle con posiciones y velocidades aleatorias
let randomX1 = Math.random() * (window_width - 100) + 50; // Posición X aleatoria con margen
let randomY1 = Math.random() * (window_height - 100) + 50; // Posición Y aleatoria con margen
let circle1 = new Circle(randomX1, randomY1, 50, "blue", "Tec", 5);

let randomX2 = Math.random() * (window_width - 100) + 50;
let randomY2 = Math.random() * (window_height - 100) + 50;
let circle2 = new Circle(randomX2, randomY2, 30, "red", "Tec", 2);

// Función para actualizar la animación
function animate() {
    requestAnimationFrame(animate); // Llama a la función animate en el próximo fotograma
    ctx.clearRect(0, 0, window_width, window_height); // Limpia el canvas
    circle1.update(ctx); // Actualiza y dibuja el primer círculo
    circle2.update(ctx); // Actualiza y dibuja el segundo círculo
}

animate(); // Inicia el bucle de animación