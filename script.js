var rounds=1;
let winsnum=0;
let losesnum=0;
let score=0;
let timecounter=35;
done=[];
eventsImages=[];
classesNames=[];
var x=true;
arr=[null,  "1.png","2.jpg","3.png","4.png",
            "5.png","6.jpg","7.png","8.png",
            "1.png","2.jpg","3.png","4.png",
            "5.png","6.jpg","7.png","8.png"];
function changeRandomely(){
    var pos1=0; var pos2=0;
    for(var x=0;x<11;x++){
        pos1=Math.floor(Math.random()*16)+1
        pos2=Math.floor(Math.random()*16)+1
        var temp=arr[pos1];
        arr[pos1]=arr[pos2];
        arr[pos2]=temp;
    }
}
function clearDone(){
    let size=done.length;
    for(var i=0;i<size;i++)
        done.pop();
}
function clear(){
    for(let x=1;x<=16;x++)
        document.getElementsByClassName(String(x))[0].style="background-image:none";
}
function show(){
    for(let x=1;x<=16;x++)
        document.getElementsByClassName(String(x))[0].style.backgroundImage=`url(${arr[x]})`;
    let time=5;
    tgtimer=document.getElementsByClassName("timetg")[0];
    let t=setInterval(function(){
        time--;
        tgtimer.textContent=String(time);
        if(time==0){
            tgtimer.textContent="let's go";
            clear();
            clearInterval(t);
        }
    },1000)
}
function time(){
    if(rounds==10){
        return true ;
    }
    show()
    score=0;
    let setIervaL=setInterval(function(){
        timecounter--;  
        var timer=document.getElementsByClassName("timer")[0];
        if(timecounter<=30&&timecounter>=0){
            timer.textContent=String(timecounter);
        }
        if(score==8){
            ++rounds;++winsnum;
            document.getElementsByClassName('rounds')[0].textContent=rounds;
            clearInterval(setIervaL);
            document.getElementsByClassName("winsnum")[0].textContent=winsnum;
            timer.textContent="your are winner!!";
            document.querySelector("span").textContent="0";
            timecounter+=35;
            changeRandomely();
            clearDone();
            time();
        }
        else if(timecounter==0){
            ++rounds;++losesnum;
            document.getElementsByClassName('rounds')[0].textContent=rounds;
            clearInterval(setIervaL);
            document.getElementsByClassName("losesnum")[0].textContent=losesnum;
            timer.textContent="Game Over !!";
            document.querySelector("span").textContent="0";
            timecounter+=35;
            clearDone();
            time();
        }
    },1000)
}
function isInDone(cls){
    for(var i=0;i<done.length;i++){
        if(done[i]==cls) return true;
    }
    return false;
}
function eventMaker(className){
    var div=document.getElementsByClassName(className)[0];
    div.addEventListener("click",function(){
        div.style.backgroundImage=`url(${arr[className]})`;
        classesNames.push(className)
        eventsImages.push(div.style.backgroundImage)
        if(eventsImages.length==2){
                    var firstImgName=eventsImages.pop();
                    var secondImgName=eventsImages.pop();
                    var class1=classesNames.pop();
                    var class2=classesNames.pop();
                    //pressing in two matched cards again
                    if(firstImgName===secondImgName&class1!==class2&&(!isInDone(class1)&&!isInDone(class2))){
                        done.push(class1);
                        done.push(class2);
                        document.querySelector("span").textContent=++score;
                    }//pressing in matched card and unmatched card or vice versa
                    else if(firstImgName!==secondImgName){
                        if(!isInDone(class1)){

                            setTimeout(()=>{
                                document.getElementsByClassName(class1)[0].style.backgroundImage="";
                            },300)
                        }
                        if(!isInDone(class2)){
                            setTimeout(() => {
                                
                                document.getElementsByClassName(class2)[0].style.backgroundImage="";
                            },300 );
                        }
                    }//pressing in the same card twice
                    else if(firstImgName==secondImgName&&class1==class2&&(!isInDone(class1))){
                        setTimeout(function(){
                            document.getElementsByClassName(class1)[0].style.backgroundImage="";
                        },300)
                        
                    }
                }
            })
        }
function addingevents(){
    for(let i=1;i<=16;i++)
        eventMaker(String(i))
}
changeRandomely();
addingevents();
time();