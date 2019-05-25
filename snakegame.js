const cvs = document.getElementById('snake');
const ctx = cvs.getContext("2d");
const box = 40;
const ground = new Image();
ground.src = "chess6.png";

const foodImg= new Image();
foodImg.src = "crown2.png";

//load audio file

const dead = new Audio();
const eat = new Audio();
dead.src = "die.wav";
eat.src = "eat.wav";

let snake = [];
snake [0] ={
    x : 8 * box,
    y : 6 * box
}

let food ={
    x : Math.floor(Math.random()*15 + 1) * box,
    y : Math.floor(Math.random()*15 + 1) * box
}

let score = 0;

//to control snake

let d;
document.addEventListener("keydown",direction);
function direction(event)
{
    let key = event.keyCode;
    if(key == 37 && d != "right")
    {
        d = "left";
    }
    else if(key == 38 && d != "down")
    {
        d = "up";
    }
    else if(key == 39 && d != "left")
    {
        d = "right";
    }
    else if(key == 40 && d != "up")
    {
        d = "down";
    }
}
//check collision
function collision(head,array)
{
    for(let i=0;i<array.length;i++)
    {
        if(head.x == array[i].x && head.y == array[i].y)
        {
            return true;
        }
    }
    return false;
}
function draw()
{
    ctx.drawImage(ground,0,0);

    for(let i=0;i < snake.length ; i++ )
    {
        ctx.fillStyle = (i==0) ? "rgb(78, 8, 190)" : "rgb(255,223,0)";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg,food.x,food.y);

    let snakeX= snake[0].x;
    let snakeY = snake[0].y;
    //INCREMENT IF SNAKE EATS FOOD

    if(snakeX == food.x && snakeY == food.y)
    {
        score++;
        eat.play();
        food ={
            x : Math.floor(Math.random()*15 + 1) * box,
            y : Math.floor(Math.random()*15 + 1) * box
        }
        //we don't remove its tail
    }
    else
    {
    // remove the tail

    snake.pop();
    }

    //direction control

    if(d == "left") snakeX -= box;
    if(d == "up") snakeY -= box;
    if(d == "right") snakeX += box;
    if(d == "down") snakeY += box;
    
    //new head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
     //game over
     if(snakeX < box || snakeX > 15 * box || snakeY < box || snakeY > 15*box || collision(newHead,snake))
     {
         
        clearInterval(game);
        dead.play();

     }
 

    
    snake.unshift(newHead)

    ctx.fillStyle = "white";
    ctx.font = "30px Changa one";
    ctx.fillText("     " + score, 1*box,1*box);
}

let game = setInterval(draw,100);