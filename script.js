const board = document.querySelector('.board');
console.log(board)




const randomPosition = () => ~~(Math.random() * 15) +1

let config = {
    speed: 200, //mili second
    player: {
        x: randomPosition(),
        y: randomPosition(),
    },
    food: {
        x: randomPosition(),
        y: randomPosition(),
    },
    velocity: {
        x: 0,
        y: 0,
    },
    randomPosition() {
        return ~~(Math.random() * 30) + 1;
    },
    showText(){
        const text = document.getElementById('text__1')
        text.style.opacity = '1';
        text.style.visibility ='visible';
        text.style.zIndex = '1';
        text.style.color = '#f7f7f7'
        setTimeout(function(){
        text.style.opacity = '0';
        text.style.visibility ='hidden';
        text.style.zIndex = '-1';    
        },3000)
    },
    showText1(){
        const text = document.getElementById('text__2')
        text.style.opacity = '1';
        text.style.visibility ='visible';
        text.style.zIndex = '1';
        text.style.color = '#f7f7f7'
        setTimeout(function(){
        text.style.opacity = '0';
        text.style.visibility ='hidden';
        text.style.zIndex = '-1';    
        },3000)
    },
    // textLevel(){
    //     // let level = document.getElementById('level')
    //     // let body = document.body


    //     const levelLimit = 5;
    //     let levelCounter = 0;

    //     // body.classList.toggle("level")

        
    //     level.textContent = ` Level : ${levelCounter} `


    // }

}

const game =  {
    creatFood(){
        // console.log('food created on position', config.food.x)
        board.innerHTML =`<div class="food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`
    },
    creatPlayer(){
        // console.log('food created on position', config.player.x)
        board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x}" ></div>`
    },
    movePlayer(){
        config.player.x += config.velocity.x
        config.player.y += config.velocity.y
    },
    resetPlayerPosition(){
        if(config.player.x <= 0 || config.player.x > 15 || config.player.y <= 0 || config.player.y > 15){
            config.player.x = randomPosition();
            config.player.y = randomPosition();
            console.log('You Lose')
        }
    },
    isWin(){
        // const text = document.getElementById('text__1');
        if(config.player.x === config.food.x && config.player.y === config.food.y){ 
            config.showText()
            config.showText1()
            return true
           
        }
        return false
    },
    randomFoodPosition(){
        config.food.y = randomPosition();
        config.food.x = randomPosition();
    }
}

function movement(listen){
    // console.log(listen.key)
    switch (listen.key){
        case "ArrowUp":
        config.velocity.y = -1;
        config.velocity.x = 0;
       
        break;

        case "ArrowDown":
        config.velocity.y =1;
        config.velocity.x =0;

        break;

        case "ArrowLeft":
        config.velocity.y = 0;
        config.velocity.x = -1;

        break; 

        case "ArrowRight":
        config.velocity.y = 0;
        config.velocity.x = 1;
        break;
        default:
        break;
    }
    
    // console.log(config.player)
   
}

function headMovement(){
    const playerHead = document.getElementById('player');
    if(config.velocity.x == 1){
        playerHead.style.transform = 'scaleX(-1)';
    }
    if(config.velocity.y == 1){
        playerHead.style.transform = 'rotate(-90deg)';
    }
    if(config.velocity.y == -1){
        playerHead.style.transform = 'rotate(90deg)';
    }
}





function start(){
    game.creatFood()
    game.creatPlayer()
    game.movePlayer();
    headMovement();
   
   
    game.resetPlayerPosition();

    const win = game.isWin()
    if(win){
    console.log('You Juara!')

    // alert('You Win🔥')
    game.randomFoodPosition();
    }
    
    // console.table({player_position: config.player})
   // game.movePlayer()
}

setInterval(start, config.speed)
document.addEventListener("keydown", movement)