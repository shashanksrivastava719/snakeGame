alert("Are you ready to face the MAZE?")
const cvs = document.getElementById('snake');
const ctx = cvs.getContext("2d");
const box = 40;
const ground = new Image();
ground.src = "chess5.png";

const foodImg= new Image();
foodImg.src = "crown2.png";
const dead = new Audio();
const eat = new Audio();
dead.src = "die.wav";
eat.src = "eat.wav";

let snake = [];
snake [0] ={
    x : 8 * box,
    y : 8 * box
}

let food ={
    x : Math.floor(Math.random()*15 + 1) * box,
    y : Math.floor(Math.random()*15 + 1) * box
}
if(((food.y < 6*box  && food.y > 4*box ) &&  (food.x > 3*box && food.x < 13*box )) 
|| ((food.y < 12*box  && food.y > 10*box ) &&  (food.x > 3*box && food.x < 13*box )) 
|| ((food.y < 7*box  && food.y > 5*box ) && 
 (food.x > 3*box && food.x < 5*box ) || (food.y < 7*box  && food.y > 5*box ) && (food.x > 11*box && food.x < 13 * box))
  || (food.y < 11*box  && food.y > 9*box ) && (food.x > 11*box && food.x < 13 * box)
  || (food.y < 11*box  && food.y > 9*box ) &&  (food.x > 3*box && food.x < 5*box ) )
  {
    food ={
        x : Math.floor(Math.random()*15 + 1) * box,
        y : Math.floor(Math.random()*15 + 1) * box
    }
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
        if(((food.y < 6*box  && food.y > 4*box ) &&  (food.x > 3*box && food.x < 13*box )) 
|| ((food.y < 12*box  && food.y > 10*box ) &&  (food.x > 3*box && food.x < 13*box )) 
|| ((food.y < 7*box  && food.y > 5*box ) && 
 (food.x > 3*box && food.x < 5*box ) || (food.y < 7*box  && food.y > 5*box ) && (food.x > 11*box && food.x < 13 * box))
  || (food.y < 11*box  && food.y > 9*box ) && (food.x > 11*box && food.x < 13 * box)
  || (food.y < 11*box  && food.y > 9*box ) &&  (food.x > 3*box && food.x < 5*box ) )
  {
    food ={
        x : Math.floor(Math.random()*15 + 1) * box,
        y : Math.floor(Math.random()*15 + 1) * box
    }
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
     if(snakeX < box || snakeX > 15 * box || snakeY < box || snakeY > 15*box || collision(newHead,snake) 
     || ((snakeY < 6*box  && snakeY > 4*box ) &&  (snakeX > 3*box && snakeX < 13*box )) 
      || ((snakeY < 12*box  && snakeY > 10*box ) &&  (snakeX > 3*box && snakeX < 13*box )) 
      || ((snakeY < 7*box  && snakeY > 5*box ) && 
       (snakeX > 3*box && snakeX < 5*box ) || (snakeY < 7*box  && snakeY > 5*box ) && (snakeX > 11*box && snakeX < 13 * box))
        || (snakeY < 11*box  && snakeY > 9*box ) && (snakeX > 11*box && snakeX < 13 * box)
        || (snakeY < 11*box  && snakeY > 9*box ) &&  (snakeX > 3*box && snakeX < 5*box ) )
     {
        dead.play();
         clearInterval(game);
     }
 
    
    
    snake.unshift(newHead)

    ctx.fillStyle = "white";
    ctx.font = "30px Changa one";
    ctx.fillText("     "+score, 1*box,1*box);
    
}

let game = setInterval(draw,100);