function configurarBotao(id, tecla){

    const botao =
    document.getElementById(id);

    if(!botao) return;

    botao.addEventListener("pointerdown",()=>{
        teclas[tecla] = true;
    });

    botao.addEventListener("pointerup",()=>{
        teclas[tecla] = false;
    });

    botao.addEventListener("pointerleave",()=>{
        teclas[tecla] = false;
    });

    botao.addEventListener("pointercancel",()=>{
        teclas[tecla] = false;
    });

}

configurarBotao("up","ArrowUp");
configurarBotao("down","ArrowDown");
configurarBotao("left","ArrowLeft");
configurarBotao("right","ArrowRight");

const enterButton =
document.getElementById("enter");

if(enterButton){

    enterButton.addEventListener(
        "click",
        ()=>{

            document.dispatchEvent(
                new KeyboardEvent(
                    "keydown",
                    {
                        code:"KeyE"
                    }
                )
            );

        }
    );

}