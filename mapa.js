// =========================
// CANVAS
// =========================
console.log("MAPA JS CARREGADO");

const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


const camera = {
    x: 0,
    y: 0
}

const larguraMapa = 1800;
const alturaMapa = 1200;


window.addEventListener("resize", redimensionar);
redimensionar();


// =========================
// PERSONAGEM
// =========================

const jogador = {

    x:170,
    y:540,

    largura:48,
    altura:48,

    velocidade:4

};
const sprite = new Image();
sprite.src = "personagem.png";


// =========================
// TECLADO
// =========================

const teclas = {};


window.addEventListener("keydown", function(e){

    console.log(e.code);

    teclas[e.code] = true;

});


window.addEventListener("keyup", function(e){

    teclas[e.code] = false;

});

// =========================
// LOCAIS
// =========================

const locais = [

{
    nome:"Casa",
    arquivo:"casa.html",

    x:60,
    y:520,

    largura:170,
    altura:130,

    cor:"#A0522D"
},

{
    nome:"Escola",
    arquivo:"escola.html",

    x:350,
    y:80,

    largura:220,
    altura:140,

    cor:"#F39C12"
},

{
    nome:"Shopping",
    arquivo:"shopping.html",

    x:1200,
    y:450,

    largura:220,
    altura:150,

    cor:"#3498DB"
},

{
    nome:"Parque",
    arquivo:"parque.html",

    x:750,
    y:650,

    largura:240,
    altura:170,

    cor:"#2ECC71"
},

{
    nome:"Realengo",
    arquivo:"realengo.html",

    x:1150,
    y:800,

    largura:180,
    altura:120,

    cor:"#8E5B3A"
},

{
    nome:"Colinas",
    arquivo:"colinas.html",

    x:300,
    y:850,

    largura:220,
    altura:120,

    cor:"#7F8C8D"
}

];


// =========================
// COLISÃO
// =========================

function colidiu(a,b){

    return (

        a.x < b.x+b.largura &&

        a.x+a.largura > b.x &&

        a.y < b.y+b.altura &&

        a.y+a.altura > b.y

    );

}


// =========================
// PERTO DO LOCAL
// =========================

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


function perto(local){

    return(

        jogador.x < local.x+local.largura+25 &&

        jogador.x+jogador.largura > local.x-25 &&

        jogador.y < local.y+local.altura+25 &&

        jogador.y+jogador.altura > local.y-25

    );

}


// =========================
// ABRIR MINIGAME
// =========================

function abrirMinigame(arquivo){

    window.location.href = arquivo;

}


// =========================
// TECLA E
// =========================

document.addEventListener("keydown",(e)=>{

    if(e.code=="KeyE"){

        for(const local of locais){

            if(perto(local)){

                abrirMinigame(local.arquivo);

            }

        }

    }

});


// =========================
// ATUALIZAÇÃO
// =========================

function atualizar(){

    console.log(teclas);

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
//=========================================
// DECORAÇÕES DO MAPA
//=========================================

const arvores = [];


const areasVerdes = [

    // canto superior esquerdo
    {
        x:0,
        y:0,
        largura:180,
        altura:300
    },

    // canto superior direito
    {
        x:1200,
        y:0,
        largura:400,
        altura:300
    },

    // parte inferior esquerda
    {
        x:0,
        y:900,
        largura:500,
        altura:250
    },

    // perto do lago
    {
        x:1300,
        y:350,
        largura:400,
        altura:400
    }

];


for(let i=0;i<60;i++){

    let area =
    areasVerdes[
        Math.floor(Math.random()*areasVerdes.length)
    ];


    arvores.push({

        x:
        area.x +
        Math.random()*area.largura,


        y:
        area.y +
        Math.random()*area.altura

    });

}

const flores = [];

for (let i = 0; i < 100; i++) {

    flores.push({

        x: Math.random() * 1800,
        y: Math.random() * 1200,

        cor: ["#ff4d6d", "#ffd93d", "#ffffff", "#ff99cc"][Math.floor(Math.random() * 4)]

    });

}

const pedras = [];

for (let i = 0; i < 40; i++) {

    pedras.push({

        x: Math.random() * 1800,
        y: Math.random() * 1200,

        r: 5 + Math.random() * 8

    });

}



//=========================================
// DESENHAR GRAMA
//=========================================

function desenharGrama() {

    ctx.fillStyle = "#79c85a";
    ctx.fillRect(0, 0, larguraMapa, alturaMapa);

}



//=========================================
// DESENHAR RUAS
//=========================================

function desenharEstradas() {

    // =====================
    // CALÇADAS
    // =====================

    ctx.fillStyle = "#dcdcdc";

    // horizontal
    ctx.fillRect(0,315,larguraMapa,15);
    ctx.fillRect(0,400,larguraMapa,15);

    // verticais
    ctx.fillRect(185,0,15,alturaMapa);
    ctx.fillRect(270,0,15,alturaMapa);

    ctx.fillRect(635,0,15,alturaMapa);
    ctx.fillRect(720,0,15,alturaMapa);

    ctx.fillRect(1065,0,15,alturaMapa);
    ctx.fillRect(1150,0,15,alturaMapa);


    // =====================
    // RUAS PRINCIPAIS
    // =====================

    ctx.fillStyle = "#8b8b8b";

    // horizontal
    ctx.fillRect(0,330,larguraMapa,70);

    // verticais
    ctx.fillRect(200,0,70,alturaMapa);
    ctx.fillRect(650,0,70,alturaMapa);
    ctx.fillRect(1080,0,70,alturaMapa);


    // =====================
    // CRUZAMENTOS REDONDOS
    // =====================

    ctx.beginPath();
    ctx.arc(235,365,45,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(685,365,45,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1115,365,45,0,Math.PI*2);
    ctx.fill();

    
    ctx.strokeStyle = "#5f5f5f";
    ctx.lineWidth = 3;



    // =====================
    // ESTRADA CURVA
    // REALENGO
    // =====================
ctx.beginPath();

ctx.strokeStyle = "#8b8b8b";
ctx.lineWidth = 50;

ctx.moveTo(1115,500);

ctx.quadraticCurveTo(
    1200,
    650,
    1240,
    860
);

ctx.stroke();


    // =====================
    // ESTRADA CURVA
    // PARQUE
    // =====================




    ctx.beginPath();

    ctx.moveTo(685,365);

    ctx.quadraticCurveTo(
        700,
        520,
        850,
        735
    );

    ctx.stroke();


    // =====================
    // CAMINHO DE TERRA
    // COLINAS
    // =====================

    ctx.beginPath();

    ctx.strokeStyle = "#A67C52";
    ctx.lineWidth = 35;

    ctx.moveTo(685,800);

    ctx.quadraticCurveTo(
        550,
        900,
        410,
        910
    );

    ctx.stroke();


    // =====================
    // FAIXAS
    // =====================

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;

    function faixa(x1, y1, x2, y2) {

        ctx.beginPath();

        ctx.setLineDash([20,20]);

        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);

        ctx.stroke();

        ctx.setLineDash([]);
    }

    faixa(0,365,larguraMapa,365);

    faixa(235,0,235,alturaMapa);
    faixa(685,0,685,alturaMapa);
    faixa(1115,0,1115,alturaMapa);
}



//=========================================
// LAGO
//=========================================

function desenharLago() {

    ctx.fillStyle = "#49b6ff";

    ctx.beginPath();

    ctx.ellipse(
        1450,
        180,
        140,
        90,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

}



//=========================================
// ÁRVORES
//=========================================

function desenharArvores() {

    for (const a of arvores) {

        ctx.fillStyle = "#7b4b24";

        ctx.fillRect(
            a.x + 12,
            a.y + 20,
            10,
            25
        );

        ctx.fillStyle = "#228B22";

        ctx.beginPath();

        ctx.arc(
            a.x + 17,
            a.y + 15,
            22,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}



//=========================================
// FLORES
//=========================================

function desenharFlores() {

    for (const f of flores) {

        ctx.fillStyle = f.cor;

        ctx.beginPath();

        ctx.arc(
            f.x,
            f.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}



//=========================================
// PEDRAS
//=========================================

function desenharPedras() {

    ctx.fillStyle = "#8f8f8f";

    for (const p of pedras) {

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.r,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}
//=========================================
// DESENHO DOS LOCAIS
//=========================================


// CASA
function desenharCasa(local){

    // sombra
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(
        local.x + 10,
        local.y + local.altura - 10,
        local.largura,
        15
    );


    // corpo
    ctx.fillStyle = "#D2691E";

    ctx.fillRect(
        local.x,
        local.y + 35,
        local.largura,
        local.altura - 35
    );


    // telhado
    ctx.fillStyle = "#8B0000";

    ctx.beginPath();

    ctx.moveTo(
        local.x - 20,
        local.y + 35
    );

    ctx.lineTo(
        local.x + local.largura/2,
        local.y - 40
    );

    ctx.lineTo(
        local.x + local.largura + 20,
        local.y + 35
    );

    ctx.closePath();

    ctx.fill();


    // porta
    ctx.fillStyle="#5B2C06";

    ctx.fillRect(
        local.x + local.largura/2 - 20,
        local.y + local.altura - 55,
        40,
        55
    );


    // janela

    ctx.fillStyle="#87CEEB";

    ctx.fillRect(
        local.x+25,
        local.y+65,
        35,
        35
    );

}



// ESCOLA
function desenharEscola(local){

    ctx.fillStyle="#F4B942";

    ctx.fillRect(
        local.x,
        local.y,
        local.largura,
        local.altura
    );


    // telhado

    ctx.fillStyle="#C0392B";

    ctx.beginPath();

    ctx.moveTo(
        local.x-15,
        local.y
    );

    ctx.lineTo(
        local.x+local.largura/2,
        local.y-50
    );

    ctx.lineTo(
        local.x+local.largura+15,
        local.y
    );

    ctx.fill();


    // janelas

    ctx.fillStyle="#3498DB";


    for(let i=0;i<4;i++){

        ctx.fillRect(
            local.x+25+(i*45),
            local.y+45,
            25,
            25
        );

    }


    // porta

    ctx.fillStyle="#6E2C00";

    ctx.fillRect(
        local.x+local.largura/2-20,
        local.y+local.altura-50,
        40,
        50
    );


}



// SHOPPING

function desenharShopping(local){

    ctx.fillStyle="#2980B9";

    ctx.fillRect(
        local.x,
        local.y,
        local.largura,
        local.altura
    );


    // fachada

    ctx.fillStyle="#85C1E9";

    ctx.fillRect(
        local.x+20,
        local.y+40,
        local.largura-40,
        50
    );


    // portas de vidro

    ctx.fillStyle="#154360";

    ctx.fillRect(
        local.x+local.largura/2-40,
        local.y+local.altura-60,
        80,
        60
    );


    // letreiro

    ctx.fillStyle="white";

    ctx.font="20px Arial";

    ctx.fillText(
        "SHOP",
        local.x+local.largura/2-30,
        local.y+30
    );

}



// PARQUE

function desenharParque(local){

    ctx.fillStyle="#27AE60";

    ctx.fillRect(
        local.x,
        local.y,
        local.largura,
        local.altura
    );


    // árvores internas

    for(let i=0;i<5;i++){

        ctx.fillStyle="#795548";

        ctx.fillRect(
            local.x+30+(i*35),
            local.y+60,
            10,
            35
        );


        ctx.fillStyle="#1E8449";

        ctx.beginPath();

        ctx.arc(
            local.x+35+(i*35),
            local.y+50,
            25,
            0,
            Math.PI*2
        );

        ctx.fill();

    }


    // banco

    ctx.fillStyle="#8B4513";

    ctx.fillRect(
        local.x+70,
        local.y+120,
        80,
        15
    );

}



// REALENGO

function desenharRealengo(local){

    ctx.fillStyle="#A569BD";

    ctx.fillRect(
        local.x,
        local.y,
        local.largura,
        local.altura
    );


    // casas menores

    ctx.fillStyle="#FAD7A0";


    ctx.fillRect(
        local.x+20,
        local.y+35,
        50,
        50
    );


    ctx.fillRect(
        local.x+90,
        local.y+35,
        50,
        50
    );


    // telhados

    ctx.fillStyle="#641E16";

    ctx.beginPath();

    ctx.moveTo(
        local.x+10,
        local.y+35
    );

    ctx.lineTo(
        local.x+45,
        local.y
    );

    ctx.lineTo(
        local.x+80,
        local.y+35
    );

    ctx.fill();

}



// COLINAS

function desenharColinas(local){

    ctx.fillStyle="#7F8C8D";

    ctx.fillRect(
        local.x,
        local.y,
        local.largura,
        local.altura
    );


    // montanhas

    ctx.fillStyle="#566573";


    ctx.beginPath();

    ctx.moveTo(
        local.x,
        local.y+local.altura
    );

    ctx.lineTo(
        local.x+60,
        local.y+20
    );

    ctx.lineTo(
        local.x+120,
        local.y+local.altura
    );

    ctx.fill();


    ctx.beginPath();

    ctx.moveTo(
        local.x+70,
        local.y+local.altura
    );

    ctx.lineTo(
        local.x+140,
        local.y+10
    );

    ctx.lineTo(
        local.x+200,
        local.y+local.altura
    );

    ctx.fill();

}



//=========================================
// CHAMAR DESENHO DE CADA LOCAL
//=========================================

function desenharLocais(){

    for(const local of locais){

        switch(local.nome){

            case "Casa":
                desenharCasa(local);
            break;


            case "Escola":
                desenharEscola(local);
            break;


            case "Shopping":
                desenharShopping(local);
            break;


            case "Parque":
                desenharParque(local);
            break;


            case "Realengo":
                desenharRealengo(local);
            break;


            case "Colinas":
                desenharColinas(local);
            break;

        }


        // placa do local

        ctx.fillStyle="rgba(0,0,0,0.65)";

        ctx.fillRect(
            local.x,
            local.y-35,
            local.largura,
            25
        );


        ctx.fillStyle="white";

        ctx.font="18px Arial";

        ctx.fillText(
            local.nome,
            local.x+10,
            local.y-17
        );

    }

}
//=========================================
// DESENHAR PERSONAGEM
//=========================================

function desenharJogador(){

    if(sprite.complete){

        ctx.drawImage(
            sprite,
            jogador.x,
            jogador.y,
            jogador.largura,
            jogador.altura
        );

    }else{

        // caso a imagem ainda não carregou
        ctx.fillStyle="red";

        ctx.fillRect(
            jogador.x,
            jogador.y,
            jogador.largura,
            jogador.altura
        );

    }

}



//=========================================
// MENSAGEM DE INTERAÇÃO
//=========================================

function mostrarMensagem(){

    const caixa = document.getElementById("mensagem");

    let encontrou = false;


    for(const local of locais){


        if(perto(local)){


            encontrou = true;


            caixa.style.display="block";


            break;


        }


    }


    if(!encontrou){

        caixa.style.display="none";

    }


}



//=========================================
// DESENHAR TUDO
//=========================================

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

    // fundo
    desenharGrama();

    // elementos do mapa
    desenharEstradas();

    desenharLago();

    desenharArvores();

    desenharFlores();

    desenharPedras();

    // prédios
    desenharLocais();

    // jogador
    desenharJogador();

    ctx.restore();

    // interface
    mostrarMensagem();

}



//=========================================
// LOOP DO JOGO
//=========================================

function loop(){

    atualizar();

    atualizarCamera();

    desenhar();

    requestAnimationFrame(loop);

}



loop();