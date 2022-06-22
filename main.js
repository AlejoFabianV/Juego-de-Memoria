//inicio de variables
let tarjertasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0; 
let temporizador = false;
let timer = 30;
let timerInicial = timer; 
let tiempoRegresivoId = null;

//sounds
let victoryAudio = new Audio(`./sounds/victory.wav`);
let aciertosAudio = new Audio(`./sounds/aciertos.wav`);
let loseAudio = new Audio(`./sounds/lose.wav`);
let errorAudio = new Audio(`./sounds/error.wav`);
let touchAudio = new Audio(`./sounds/touch.wav`);

//conectando el HTML 
let mostrarMovimientos = document.getElementById(`movimientos`);
let mostrarAciertos = document.getElementById(`aciertos`);
let mostrarTiempo = document.getElementById(`t-restante`);

//numbers random
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random() -0.5});
console.log(numbers);

//functions
function contarTiempo(){
    tiempoRegresivoId = setInterval(() =>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000)
}

function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numbers[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//function principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjertasDestapadas++;
    console.log(tarjertasDestapadas);

    if(tarjertasDestapadas == 1){
        //mortar el primer numero 
        tarjeta1 = document.getElementById(id);
        primerResultado = numbers[id]
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">`;
        touchAudio.play();

        //desabilitar primer boton
        tarjeta1.disabled = true;
    } else if(tarjertasDestapadas == 2){
        //mostrar el segundo numnero 
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers[id];
        tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt="">`;
        touchAudio.play();

        //desabilitar segundo boton
        tarjeta2.disabled = true;

        //incremento de movimientos 
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            tarjertasDestapadas = 0;

            //aumento de aciertos 
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            aciertosAudio.play();

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🥳` 
                mostrarTiempo.innerHTML = `Solo tardaste ${timerInicial - timer} segundos🤯`
                victoryAudio.play();
            }
        }else{
            errorAudio.play();
            //mostrar valores y volver a tapar 
            setTimeout(() => {
                tarjeta1.innerHTML = ``;
                tarjeta2.innerHTML = ``;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjertasDestapadas = 0; 
            },800);
        }
    }
}