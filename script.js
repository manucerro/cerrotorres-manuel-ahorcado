class JuegoAhorcado {
  constructor() {
    this.palabras = [
      "JUEGO", "PROGRAMAR", "JAVASCRIPT", "CANVAS", "FUNCION",
      "VARIABLE", "ALGORITMO", "COMPUTADORA", "APRENDER", "AHORCADO",
      "HTML", "CSS", "CODIGO", "SOFTWARE", "OBJETO",
      "CLASE", "METODO", "BUCLE", "DEBUG", "GITHUB"
    ];
    this.palabra = "";
    this.intentosFallidos = 0;
    this.intentosMaximos = 6;
    this.letrasIntentadas = [];
    this.lienzo = null;
    this.contexto = null;
  }

  iniciarJuego() {
    this.inicializarLienzo();
    this.palabra = this.obtenerPalabraAleatoria();
    this.intentosFallidos = 0;
    this.letrasIntentadas = [];
    this.limpiarLienzo();
    this.dibujarBase();
    this.actualizarPalabraOculta();
    this.generarBotonesLetras();
  }

  obtenerPalabraAleatoria() {
    const indice = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indice];
  }

  inicializarLienzo() {
    this.lienzo = document.getElementById("lienzo");
    this.contexto = this.lienzo.getContext("2d");
  }

  dibujarBase() {
    const ctx = this.contexto;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 350); 
    ctx.lineTo(250, 350);
    ctx.moveTo(100, 350); 
    ctx.lineTo(100, 50);
    ctx.lineTo(200, 50); 
    ctx.lineTo(200, 80); 
    ctx.stroke();
  }

  dibujarMonigote() {
    const ctx = this.contexto;
    ctx.lineWidth = 2;
    ctx.beginPath();

    switch (this.intentosFallidos) {
      case 1: 
        ctx.arc(200, 110, 30, 0, Math.PI * 2); 
      break; // Cabeza

      case 2: ctx.moveTo(200, 140); 
        ctx.lineTo(200, 250); 
      break; // Cuerpo

      case 3: ctx.moveTo(200, 160); 
        ctx.lineTo(160, 200); 
      break; // Brazo izquierdo

      case 4: ctx.moveTo(200, 160); 
        ctx.lineTo(240, 200); 
      break; // Brazo derecho

      case 5: ctx.moveTo(200, 250); 
        ctx.lineTo(160, 300); 
      break; // Pierna izquierda

      case 6: 
        ctx.moveTo(200, 250); 
        ctx.lineTo(240, 300); 
      break; // Pierna derecha
    }

    ctx.stroke();
  }

  limpiarLienzo() {
    this.contexto.clearRect(0, 0, this.lienzo.width, this.lienzo.height);
  }

  actualizarPalabraOculta() {
    let palabraOculta = "";
    for (let i = 0; i < this.palabra.length; i++) {
      const letra = this.palabra[i];
      if (this.letrasIntentadas.includes(letra)) {
        palabraOculta += letra + " ";
      } else {
        palabraOculta += "_ ";
      }
    }
    document.getElementById("palabra-oculta").textContent = palabraOculta.trim();

    if (!palabraOculta.includes("_")) {
      const palabraGanada = this.palabra;
      setTimeout(() => {
        alert("¡Ganaste! La palabra era: " + palabraGanada);
        this.iniciarJuego();
      }, 100);
    }
  }

  generarBotonesLetras() {
    const contenedor = document.getElementById("botones-letras");
    contenedor.innerHTML = "";
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    alfabeto.split("").forEach((letra) => {
      const boton = document.createElement("button");
      boton.textContent = letra;
      boton.onclick = () => this.intentarLetra(letra, boton);
      contenedor.appendChild(boton);
    });
  }

  intentarLetra(letra, boton) {
    if (this.letrasIntentadas.includes(letra) || this.intentosFallidos >= this.intentosMaximos) {
      return;
    }

    this.letrasIntentadas.push(letra);
    boton.classList.add("deshabilitado");
    boton.disabled = true;

    if (this.palabra.includes(letra)) {
      this.actualizarPalabraOculta();
    } else {
      this.intentosFallidos++;
      this.dibujarMonigote();

      if (this.intentosFallidos === this.intentosMaximos) {
        this.dibujarMonigote();
        setTimeout(() => {
          alert("¡Perdiste! La palabra era: " + this.palabra);
          this.iniciarJuego();
        }, 500);
      }
    }
  }
}

// Inicializa el juego cuando se carga la página
const juego = new JuegoAhorcado();
window.onload = () => juego.iniciarJuego();