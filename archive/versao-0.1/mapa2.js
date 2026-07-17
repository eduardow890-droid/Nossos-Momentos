const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const sprite = new Image();
sprite.src = "personagem.png";

const mapa = new Image();

const jogador = {

    x: 170,
    y: 540,

    largura: 80,
    altura: 80,

    velocidade: 4

};
const camera = {

    x: 0,
    y: 0

};

mapa.onload = () => {
    console.log("MAPA CARREGADO");
};

mapa.onerror = (e) => {
    console.log("ERRO", e);
};

mapa.src = "./mapa.jpeg";

const larguraMapa = 1536;
const alturaMapa = 1024;

const teclas = {};

window.addEventListener("keydown",(e)=>{
    teclas[e.code] = true;
});

window.addEventListener("keyup",(e)=>{
    teclas[e.code] = false;
});

const locais = [

{
    nome: "Casa",
    arquivo: "casa.html",

    x: 50,
    y: 180,

    largura: 180,
    altura: 180
},

{
    nome: "Colegio",
    arquivo: "escola.html",

    x: 450,
    y: 80,

    largura: 300,
    altura: 220
},

{
    nome: "Shopping",
    arquivo: "shopping.html",

    x: 1180,
    y: 420,

    largura: 260,
    altura: 220
},

{
    nome: "Parque Realengo",
    arquivo: "parque.html",

    x: 410,
    y: 400,

    largura: 450,
    altura: 350
},

{
    nome: "Condominio",
    arquivo: "condominio.html",

    x: 980,
    y: 760,

    largura: 450,
    altura: 250
},

{
    nome: "Colinas",
    arquivo: "colinas.html",

    x: 40,
    y: 720,

    largura: 420,
    altura: 280
}

];

function atualizar(){

    if(teclas["ArrowRight"]){
        jogador.x += jogador.velocidade;
    }

    if(teclas["ArrowLeft"]){
        jogador.x -= jogador.velocidade;
    }

    if(teclas["ArrowUp"]){
        jogador.y -= jogador.velocidade;
    }

    if(teclas["ArrowDown"]){
        jogador.y += jogador.velocidade;
    }

}

function atualizarCamera(){

    camera.x =
        jogador.x - canvas.width / 2;

    camera.y =
        jogador.y - canvas.height / 2;

}
function redimensionar(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener(
    "resize",
    redimensionar
);

redimensionar();

function mostrarMensagem(){

    const caixa = document.getElementById("mensagem");

    let pertoDeLocal = false;

    for(const local of locais){

        if(
            jogador.x < local.x + local.largura &&
            jogador.x + jogador.largura > local.x &&
            jogador.y < local.y + local.altura &&
            jogador.y + jogador.altura > local.y
        ){

            pertoDeLocal = true;
            break;
        }
    }

    caixa.style.display =
        pertoDeLocal ? "block" : "none";
}

function perto(local){

    return (

        jogador.x < local.x + local.largura &&
        jogador.x + jogador.largura > local.x &&
        jogador.y < local.y + local.altura &&
        jogador.y + jogador.altura > local.y

    );

}
document.addEventListener("keydown", (e) => {

    if(e.code === "KeyE"){

        for(const local of locais){

            if(perto(local)){

                window.location.href = local.arquivo;
                break;

            }

        }

    }


});

function desenharJogador(){

    ctx.drawImage(
        sprite,
        jogador.x,
        jogador.y,
        jogador.largura,
        jogador.altura
    );

}


function atualizarCamera(){

    camera.x =
        jogador.x -
        canvas.width / 2;

    camera.y =
        jogador.y -
        canvas.height / 2;

    camera.x = Math.max(
        0,
        Math.min(
            camera.x,
            larguraMapa - canvas.width
        )
    );

    camera.y = Math.max(
        0,
        Math.min(
            camera.y,
            alturaMapa - canvas.height
        )
    );

}


function desenhar(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.save();

    ctx.translate(
        -camera.x,
        -camera.y
    );

    desenharMapa();

    desenharJogador();

    ctx.restore();

    mostrarMensagem();


}
function desenharMapa(){

    ctx.drawImage(
        mapa,
        0,
        0,
        larguraMapa,
        alturaMapa
    );

}
function loop(){

    atualizar();

    atualizarCamera();

    desenhar();

    requestAnimationFrame(loop);

}

loop();