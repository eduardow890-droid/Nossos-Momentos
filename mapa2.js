const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const sprite = new Image();
sprite.src = "images/personagem.png";

const mapa = new Image();

const jogador = {

    x: 100,
    y: 370,

    largura: 80,
    altura: 80,

    velocidade: 4

};
const camera = {

    x: 0,
    y: 0

};

let escalaMapa = 1;

const falas = [

"Amor... preciso te contar uma coisa.",

"Eu estava organizando nosso álbum de fotografias hoje.",

"Mas aconteceu algo estranho... todas as nossas fotos desapareceram.",

"As fotos do Colégio onde nos conhecemos.",

"As fotos dos finais de semana que passávamos no Shopping.",

"As fotos do nosso primeiro encontro no Parque Realengo.",

"E até aquelas dos momentos simples que vivíamos no Condomínio.",

"Eu sei que parece impossível... mas sinto que essas lembranças ainda estão por aí.",

"Talvez cada fotografia esteja escondida no lugar onde aquela memória aconteceu.",

"Se conseguirmos visitar esses lugares novamente, talvez possamos recuperá-las.",

"Por favor... me ajude a encontrar nossas memórias.",

"A primeira pista aponta para o Colégio.",

"Foi lá que tudo começou."

];
let falaAtual = 0;
let dialogoAtivo = true;


const mapaColisao = new Image();
mapaColisao.src = "images/mapa_colisao.jpeg";

const canvasColisao = document.createElement("canvas");
const ctxColisao = canvasColisao.getContext("2d");

mapaColisao.onload = () => {

    canvasColisao.width = larguraMapa;
    canvasColisao.height = alturaMapa;

    ctxColisao.drawImage(
        mapaColisao,
        0,
        0,
        larguraMapa,
        alturaMapa
    );

};

mapa.onload = () => {
    console.log("MAPA CARREGADO");
};

mapa.onerror = (e) => {
    console.log("ERRO", e);
};

mapa.src = "images/mapa.jpeg";

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
    desbloqueado: true,

    x: 50,
    y: 180,

    largura: 180,
    altura: 180
},

{
    nome: "Colegio",
    arquivo: "escola.html",
    desbloqueado: true,

    x: 450,
    y: 80,

    largura: 300,
    altura: 220
},

{
    nome: "Shopping",
    arquivo: "shopping.html",
    desbloqueado: false,

    x: 1180,
    y: 420,

    largura: 260,
    altura: 220
},

{
    nome: "Parque Realengo",
    arquivo: "parque.html",
    desbloqueado: false,

    x: 410,
    y: 400,

    largura: 450,
    altura: 350
},

{
    nome: "Condominio",
    arquivo: "condominio.html",
    desbloqueado: false,
    
    x: 980,
    y: 760,

    largura: 450,
    altura: 250
},

{
    nome: "Colinas",
    arquivo: "colinas.html",
    desbloqueado: false,

    x: 40,
    y: 720,

    largura: 420,
    altura: 280
}

];

const hitbox = {
    x: 15,
    y: 15,
    largura: 50,
    altura: 50
};



const progresso = {

    colegio: false,
    shopping: false,
    parque: false,
    condominio: false,
    colinas: false

};

const salvo =
JSON.parse(
    localStorage.getItem("progresso")
);

if(salvo){

    Object.assign(
        progresso,
        salvo
    );

}

if(progresso.colegio){

    locais.find(
        l => l.nome === "Shopping"
    ).desbloqueado = true;
}

if(progresso.shopping){

    locais.find(
        l => l.nome === "Parque Realengo"
    ).desbloqueado = true;
}

if(progresso.parque){

    locais.find(
        l => l.nome === "Condominio"
    ).desbloqueado = true;
}

if(progresso.condominio){

    locais.find(
        l => l.nome === "Colinas"
    ).desbloqueado = true;
}

function mostrarDialogoInicial(){

    const caixa =
    document.getElementById("dialogo");

    const texto =
    document.getElementById("textoDialogo");

    caixa.style.display = "block";

    escreverTexto(falas[falaAtual]);
}

function proximaFala(){

    falaAtual++;

    if(falaAtual < falas.length){

        escreverTexto(
            falas[falaAtual]
        );

    }else{

        dialogoAtivo = false;

        document.getElementById(
            "dialogo"
        ).style.display = "none";

    }

}


function atualizar(){

    if(dialogoAtivo){
    return;
}

    let novoX = jogador.x;
    let novoY = jogador.y;

    if(teclas["ArrowRight"]){
        novoX += jogador.velocidade;
    }

    if(teclas["ArrowLeft"]){
        novoX -= jogador.velocidade;
    }

    if(teclas["ArrowUp"]){
        novoY -= jogador.velocidade;
    }

    if(teclas["ArrowDown"]){
        novoY += jogador.velocidade;
    }

    // Movimento horizontal
    if(podeMover(novoX, jogador.y)){
        jogador.x = novoX;
    }

    // Movimento vertical
    if(podeMover(jogador.x, novoY)){
        jogador.y = novoY;
    }

}

function podeAndar(x, y){

    if(
        canvasColisao.width === 0
    ){
        return true;
    }

    const pixel =
    ctxColisao.getImageData(
        Math.floor(x),
        Math.floor(y),
        1,
        1
    ).data;

    return pixel[0] > 200;
}

function podeMover(x, y){

    return (
        podeAndar(x + 15, y + 15) &&
        podeAndar(x + 65, y + 15) &&
        podeAndar(x + 15, y + 65) &&
        podeAndar(x + 65, y + 65)
    );

}
function escreverTexto(frase){

    const texto =
    document.getElementById("textoDialogo");

    texto.innerHTML = "";

    let i = 0;

    const intervalo = setInterval(() => {

        texto.innerHTML += frase[i];

        i++;

        if(i >= frase.length){

            clearInterval(intervalo);

        }

    },30);

}


function atualizarObjetivo(){

    const historia =
    document.getElementById("historia");

    if(!historia) return;

    if(!progresso.colegio){

        historia.innerHTML =
        "Vá ao Colégio procurar a primeira foto.";

    }

    else if(!progresso.shopping){

        historia.innerHTML =
        "Agora procure a memória do Shopping.";

    }

    else if(!progresso.parque){

        historia.innerHTML =
        "Encontre a foto do primeiro encontro no Parque Realengo.";

    }

    else if(!progresso.condominio){

        historia.innerHTML =
        "Procure lembranças no Condomínio.";

    }

    else if(!progresso.colinas){

        historia.innerHTML =
        "Uma pista leva você até as Colinas.";

    }

    else{

        historia.innerHTML =
        "Todas as memórias foram recuperadas.";

    }

}


function redimensionar(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    escalaMapa = Math.max(
        canvas.width / larguraMapa,
        canvas.height / alturaMapa
    );

}

window.addEventListener(
    "resize",
    redimensionar
);

redimensionar();

function mostrarMensagem(){

    const caixa =
    document.getElementById("mensagem");

    let pertoDeLocal = false;

    for(const local of locais){

        if(
            perto(local) &&
            local.desbloqueado
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

            if(
                perto(local) &&
                local.desbloqueado
            ){

                window.location.href =
                local.arquivo;

                break;
            }

        }

    }

});

function desenharJogador(){

    ctx.drawImage(
        sprite,
        jogador.x * escalaMapa,
        jogador.y * escalaMapa,
        jogador.largura * escalaMapa,
        jogador.altura * escalaMapa
    );

}


function atualizarCamera(){

    const larguraVisivel = canvas.width / escalaMapa;
    const alturaVisivel = canvas.height / escalaMapa;

    camera.x =
        jogador.x -
        larguraVisivel / 2;

    camera.y =
        jogador.y -
        alturaVisivel / 2;

    camera.x = Math.max(
        0,
        Math.min(
            camera.x,
            larguraMapa - larguraVisivel
        )
    );

    camera.y = Math.max(
        0,
        Math.min(
            camera.y,
            alturaMapa - alturaVisivel
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
        -camera.x * escalaMapa,
        -camera.y * escalaMapa
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
        larguraMapa * escalaMapa,
        alturaMapa * escalaMapa
    );

}
function loop(){

    atualizar();

    atualizarObjetivo();

    atualizarCamera();

    desenhar();

    
    requestAnimationFrame(loop);
    
}
const introVista =
localStorage.getItem("introVista");

if(introVista !== "true"){

    mostrarDialogoInicial();

    localStorage.setItem(
        "introVista",
        "true"
    );

}else{

    dialogoAtivo = false;

    const dialogo =
    document.getElementById("dialogo");

    if(dialogo){
        dialogo.style.display = "none";
    }

}

loop();