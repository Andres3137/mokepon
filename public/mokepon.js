const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");

const sectionReiniciar = document.getElementById("reiniciar");

const botonMascotaJugador = document.getElementById("boton-mascota");

const botonReiniciar = document.getElementById("boton-reiniciar");

sectionReiniciar.style.display = "none";

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);

const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");

const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");

const ataquesDelJugador = document.getElementById("ataques-del-jugador");

const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

const contenedorTarjetas = document.getElementById("contenedorTarjetas");

const contenedorAtaques = document.getElementById("contenedorAtaques");

const sectionVerMapa = document.getElementById("ver-mapa");

const mapa = document.getElementById("mapa");

let jugadorId = null;
let enemigoId = null;

let mokepones = [];
let mokeponesEnemigos = [];

let ataqueJugador = [];

let ataqueEnemigo = [];

let opcionDeMokepones;

let inputHipodoge;

let inputCapipepo;

let inputRatigueya;

let mascotaJugador;

let mascotaJugadorObjeto;

let ataquesMokepon;

let ataquesMokeponEnemigo;

let botonFuego;

let botonAgua;

let botonTierra;

let botones = [];

let indexAtaqueJugador;

let indexAtaqueEnemigo;

let victoriasJugador = 0;

let victoriasEnemigo = 0;

let vidasJugador = 3;

let vidasEnemigo = 3;

let lienzo = mapa.getContext("2d");

let intervalo;

let mapaBackground = new Image();

mapaBackground.src = "./img/mokemap.png";

let alturaQueBuscamos;

let anchoDelMapa = window.innerWidth - 20;

const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;

mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;

    this.nombre = nombre;

    this.foto = foto;

    this.vida = vida;

    this.ataques = [];

    this.ancho = 40;

    this.alto = 40;

    this.x = aleatorio(0, mapa.width - this.ancho);

    this.y = aleatorio(0, mapa.height - this.alto);

    this.mapaFoto = new Image();

    this.mapaFoto.src = fotoMapa;

    this.velocidadX = 0;

    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "img/hipodoge.png ",
  5,
  "./img/hipodogecopia.png"
);

let capipepo = new Mokepon(
  "Capipepo",

  "img/capipepo.png",

  5,

  "./img/capipepocopia.png"
);

let ratigueya = new Mokepon(
  "Ratigueya",

  "img/ratigueya.png",

  5,

  "./img/ratigueyacopia.png"
);

const HIPODOGE_ATAQUES = [
  { nombre: `💧`, id: `boton-agua` },

  { nombre: `💧`, id: `boton-agua` },

  { nombre: `💧`, id: `boton-agua` },

  { nombre: `🔥`, id: `boton-fuego` },

  { nombre: `☘️`, id: `boton-tierra` },
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);

const CAPIPEPO_ATAQUES = [
  { nombre: `☘️`, id: `boton-tierra` },

  { nombre: `☘️`, id: `boton-tierra` },

  { nombre: `☘️`, id: `boton-tierra` },

  { nombre: `💧`, id: `boton-agua` },

  { nombre: `🔥`, id: `boton-fuego` },
];

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
  { nombre: `🔥`, id: `boton-fuego` },

  { nombre: `🔥`, id: `boton-fuego` },

  { nombre: `🔥`, id: `boton-fuego` },

  { nombre: `💧`, id: `boton-agua` },

  { nombre: `☘️`, id: `boton-tierra` },
];

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";

  sectionVerMapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `

    <input class="boton-mascota" type="radio" name="mascota" id=${mokepon.nombre}>

    <label class="tarjeta-mokepon" for=${mokepon.nombre}>

      <p>${mokepon.nombre}</p>

      <img src=${mokepon.foto} alt=${mokepon.nombre}>

    </label>

    `;

    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById("Hipodoge");

    inputCapipepo = document.getElementById("Capipepo");

    inputRatigueya = document.getElementById("Ratigueya");
  });

  botonMascotaJugador.addEventListener("click", () => {
    if (jugadorId) {
      seleccionarMascotaJugador();
    } else {
      alert(
        "conectando al servidor... por favor , espere un momento y vuelva a intentar"
      );
    }
  });

  botonReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://192.168.1.71:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;

    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;

    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;

    mascotaJugador = inputRatigueya.id;
  } else {
    alert("no seleccionaste mascota");
    return;
  }
  sectionSeleccionarMascota.style.display = "none";

  seleccionarMokepon(mascotaJugador);

  extraerAtaques(mascotaJugador);

  sectionVerMapa.style.display = "flex";

  iniciarmapa();
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://192.168.1.71:8080/mokepon/${jugadorId}`, {
    method: "post",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

function extraerAtaques(mascotaJugador) {
  let ataques;

  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `

    <button id=${ataque.id} class="botonataque BATaque">${ataque.nombre}</button>

    `;

    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById("boton-fuego");

  botonAgua = document.getElementById("boton-agua");

  botonTierra = document.getElementById("boton-tierra");

  botones = document.querySelectorAll(".BATaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");

        console.log(ataqueJugador);

        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("AGUA");

        console.log(ataqueJugador);

        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");

        console.log(ataqueJugador);

        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    });
  });
}
function enviarAtaques() {
  fetch(`http://192.168.1.71:8080/mokepon/${jugadorId}/ataques`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://192.168.1.71:8080/mokepon/${jugadorId}/ataques`) // <-- Usar jugadorId, no enemigoId aquí, ya que el servidor te dará los ataques de AMBOS
    .then(function (res) {
      if (res.ok) {
        return res.json();
      } else if (res.status === 202) {
        console.log("Esperando que el enemigo complete sus ataques...");
        return null;
      }
      throw new Error("Error en la respuesta del servidor o estado inesperado");
    })
    .then(function (data) {
      if (data && data.ataquesJugador && data.ataquesEnemigo) {
        ataqueJugador = data.ataquesJugador;
        ataqueEnemigo = data.ataquesEnemigo;
        combate();
      }
    })
    .catch((error) => {
      console.error("Error al obtener ataques:", error);
    });
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  console.log("Ataque enemigo", ataquesMokeponEnemigo);
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }

  console.log(ataqueEnemigo);

  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];

  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  clearInterval(intervalo);
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);

      crearMensaje(" - EMPATE");

      victoriasJugador++;

      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "FUEGO" &&
      ataqueEnemigo[index] === "TIERRA"
    ) {
      indexAmbosOponentes(index, index);

      crearMensaje("GANASTE");

      victoriasJugador++;

      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "AGUA" &&
      ataqueEnemigo[index] === "FUEGO"
    ) {
      indexAmbosOponentes(index, index);

      crearMensaje("GANASTE");

      victoriasJugador++;

      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "TIERRA" &&
      ataqueEnemigo[index] === "AGUA"
    ) {
      indexAmbosOponentes(index, index);

      crearMensaje("GANASTE");

      victoriasJugador++;

      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);

      crearMensaje("PERDISTE");

      victoriasEnemigo++;

      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("ESTO ES UN EMPATE ");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICITACIONES! GANASTE 🥳🎆🎉");
  } else {
    crearMensajeFinal("PERDISTE 😢😢😢  ");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");

  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;

  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;

  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);

  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;

  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height);

  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  mascotaJugadorObjeto.pintarMokepon();

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
    revisarColision(mokepon);
  });
}

function enviarPosicion(x, y) {
  fetch(`http://192.168.1.71:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        console.log("Respuesta del servidor:", enemigos);
        mokeponesEnemigos = enemigos
          .map(function (enemigo) {
            console.log("procesando enemigo:", enemigo);
            if (!enemigo.mokepon) {
              return null; // Si no tiene mokepon, no crear objeto
            }
            let mokeponEnemigo = null;
            const mokeponNombre = enemigo.mokepon.nombre;

            if (mokeponNombre === "Hipodoge") {
              mokeponEnemigo = new Mokepon(
                "Hipodoge",
                "img/hipodoge.png",
                5,
                "./img/hipodogecopia.png",
                enemigo.id
              );
            } else if (mokeponNombre === "Capipepo") {
              mokeponEnemigo = new Mokepon(
                "Capipepo",
                "img/capipepo.png",
                5,
                "./img/capipepocopia.png",
                enemigo.id
              );
            } else if (mokeponNombre === "Ratigueya") {
              mokeponEnemigo = new Mokepon(
                "Ratigueya",
                "img/ratigueya.png",
                5,
                "./img/ratigueyacopia.png",
                enemigo.id
              );
            }

            mokeponEnemigo.x = enemigo.x;
            mokeponEnemigo.y = enemigo.y;

            return mokeponEnemigo;
          })
          .filter(Boolean); // Elimina los null
      });
    }
  });
}

function moverderecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function moverizquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;

  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();

      break;

    case "ArrowDown":
      moverAbajo();

      break;

    case "ArrowLeft":
      moverizquierda();

      break;

    case "ArrowRight":
      moverderecha();

      break;
  }
}

function iniciarmapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);

  console.log(mascotaJugadorObjeto, mascotaJugador);

  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", sePresionoUnaTecla);

  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;

  const abajoEnemigo = enemigo.y + enemigo.alto;

  const derechaEnemigo = enemigo.x + enemigo.ancho;

  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;

  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;

  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;

  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }

  detenerMovimiento();

  clearInterval(intervalo);

  console.log("se detecto una colision");

  enemigoId = enemigo.id;
  sectionSeleccionarAtaque.style.display = "flex";

  sectionVerMapa.style.display = "none";

  seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);
