let setLocal;
let winAud = document.getElementById("winAudio"); 
let loseAud= document.getElementById("loseAudio");

function winPlayAudio() { 
  winAud.play(); 
} 
function losePlayAudio() { 
    loseAud.play();
} 
let winLoseSelect=document.querySelector(".winLose");

let timerSelect = document.getElementById("timer");

let downSelect = document.querySelector(".forOpacity");

let c=500;

function timerFunc(){
    c=c-1;
    if(c<500){
        timerSelect.innerHTML=c;
    }
     if(c<1)
    {
        clearInterval(update);
        downSelect.style.opacity="0.3";
        for (let i = 0; i < 36; i++) 
        {
            downboxes[i].onclick=function(){
                return false;
            }
        }
        document.getElementById("topmen").classList.remove("topmenu");
        document.getElementById("topmen").classList.remove("reset");
        document.getElementById("topmen").innerHTML="";
        winLoseSelect.innerHTML='<span class="lose"> You Lost!</span><br><br><br><div class="reset"><a style="text-decoration: none;" href="grid_6.html" >Play Again!</a></div><br><br><div class="reset"><a style="text-decoration: none;" href="index.html" >Go To Home Page!</a></div>';
        losePlayAudio();
    }
}

let colors=["green","red","blue","orange","yellow","brown","white"];

let update = setInterval("timerFunc()",1000);

let boxColors = colors.concat(colors);
boxColors = boxColors.concat(boxColors);
boxColors = boxColors.concat(colors);

resetColor();
function resetColor(){
    boxColors.sort(() => Math.random() - 0.5);
}

let upboxes = document.getElementById("up3x3").querySelectorAll('.upbox');

let upColors=boxColors.slice(16);
for (let i = 0; i < 16; i++) 
{
    upboxes[i].style.backgroundColor = upColors[i];
}

resetColor();

let downboxes = document.getElementById("down5x5").querySelectorAll('.downbox');

let boxSize = document.querySelector('.downbox').style.width;

let ani;

if(boxSize==60)
{
    ani=10;
}
if(boxSize==45)
{
    ani=5;
}
let animate=null,position=0,elemMover=null,boxNumber=null,topValue=0,leftValue=0,emptyBox=downboxes[35],empNum=35,mover=null;
let numMoves=0;
for (let i = 0; i < 36; i++) 
{
    downboxes[i].style.backgroundColor = boxColors[i];
    downboxes[i].onclick=function(){
        clickedBox(i);
        numMoves++;
    };
}
function clickedBox(i)
 {  
    let x1=Math.floor(i/6),y1=i%6,x2=Math.floor(empNum/6),y2=empNum%6;
    if(boxMover(x1,y1,x2,y2))
    {
        boxNumber=i;
        elemMover=downboxes[boxNumber];
        clearInterval(animate);
        animate = setInterval(gameRepeat, 6);
    }  
 }
function leftMover()
{
    leftValue+=ani;
    elemMover.style.left=leftValue+"px";
}
function rightMover()
{
    leftValue-=ani;
    elemMover.style.left=leftValue+"px";    
}
function topMover()
{
    topValue+=ani;
    elemMover.style.top=topValue+"px";
}
function bottomMover()
{
    topValue-=ani;
    elemMover.style.top=topValue+"px";    
}
function gameRepeat() {
    if (position == boxSize) {
        clearInterval(animate);
        emptyBox.style.backgroundColor=elemMover.style.backgroundColor;
        elemMover.style.backgroundColor="transparent";        
        elemMover.style.top="0px";
        elemMover.style.left="0px";
        empNum=boxNumber;
        emptyBox=downboxes[empNum];
        position=0;
        topValue=0;
        leftValue=0;
        if(isWon())
        {
            let scoreCounter=((c*10)-(numMoves/100));
            //GAME WON
            clearInterval(update);
            downSelect.style.opacity="0.3";
            for (let i = 0; i < 36; i++) 
            {
            downboxes[i].onclick=function(){
                return false;
            }
            }
        document.getElementById("topmen").classList.remove("topmenu");
        document.getElementById("topmen").classList.remove("reset");
        document.getElementById("topmen").innerHTML="";
            winLoseSelect.innerHTML=`<span class="lose"> You Won! Congratulations!</span><br><br><span class="lose"> Your Score is ${scoreCounter}</span><br><div class="reset"><a style="text-decoration: none;" href="grid_6.html" >Play Again!</a></div><br><br><div class="reset"><a style="text-decoration: none;" href="index.html" >Go To Home Page!</a></div>`;
            winPlayAudio();
            if (localStorage.getItem("score_6") === null) {
                setLocal=scoreCounter;
                window.localStorage.setItem("score_6",JSON.stringify(setLocal));
            }
        else{
            if(parseFloat(window.localStorage.getItem("score_6"))<scoreCounter)
            {
                window.localStorage.setItem("score_6",JSON.stringify(scoreCounter));
            }    
        }       
        }
    } 
    else
    {
        position+=ani; 
        mover();
    }
  }
function boxMover(x1,y1,x2,y2)
{
    if(x1==x2)
    {
        if(y1+1==y2)
        {
            mover=leftMover;
        }
        else if(y1-1==y2)
        {
            mover=rightMover;
        }
        else
        {
            return false;
        }
    }
    else if(y1==y2)
    {
        if(x1+1==x2)
        {
            mover=topMover;
        }
        else if(x1-1==x2)
        {
            mover=bottomMover;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
    return true;
}
let centreBox=[7,8,9,10,13,14,15,16,19,20,21,22,25,26,27,28];
function isWon()
{
    for (let i = 0; i < 16; i++) {
        let answer=downboxes[centreBox[i]].style.backgroundColor, question=upColors[i];
        if(answer!=question)
            return false;    
    }
    return true; 
}
let  displayHighScore = document.getElementById("Hscore");

if (localStorage.getItem("score_6") === null)
{
    displayHighScore.innerHTML="0";
}
else{
    displayHighScore.innerHTML=`${window.localStorage.getItem("score_6")}`;
}