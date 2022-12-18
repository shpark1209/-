var mapx=0;
var rightPressed = false;
var leftPressed = false;
var char=new Image();
var charwidth;
var chardx=8;
var stagex=[100, 350, 600];
var stage=1;
var sizeportal=[50, 50, 50];
var portalheight=[380, 380, 380];
var mapbackgroundImage = new Image();
mapbackgroundImage.src = 'source/biome/icebiome3.png';
mapbackgroundImage.width = width;
mapbackgroundImage.height = height;
char.src='source/char/워리어1.png';
charwidth=char.width;


var pgif_index=0;
function drawPortal(num) {
        var portalGif = new Image();
        pgif_index++;
        if (pgif_index>=8*4) {
            pgif_index = 0;
        }
        portalGif.src = portal_giff[Math.floor(pgif_index/4)%8]; 
        portal = { x: stagex[num], y: portalheight[num]};
        mapContext.drawImage(portalGif,  portal.x,  portal.y, sizeportal[num], sizeportal[num]);    
}


document.addEventListener("keydown", mapKeyDownHandler, false);
document.addEventListener("keyup", mapKeyUpHandler, false);

function mapKeyDownHandler(e) {
    if (e.code == "ArrowRight") {
        char.src = 'source/char/워리어1.png';
        rightPressed = true;
    }
    else if (e.code == 'ArrowLeft') {
        char.src = 'source/char/워리어2.png';
        leftPressed = true;
    }
}

function mapKeyUpHandler(e) {
    if (e.code == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.code == 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawMapCanvas(){
    mapContext.clearRect(0, 0, width, height);
    mapContext.drawImage(mapbackgroundImage, 0, 0, width, height);
    drawChar();
    if(rightPressed && mapx+chardx < width-charwidth) {
        mapx += chardx;
    }
    else if(leftPressed && mapx > 0) {
        mapx -= chardx;
    }
    if(alertCount != 0) {
        alertCount++;
        if(alertCount == 300) {
            alertCount = 0;
            $(".popupOnGame").fadeOut(1000);
        }
    }
}


function whichStage(num){                                                   
    if(sizeportal[num-1]==150){}                                               
    else{
        sizeportal[num-1]=150;
        portalheight[num-1]=portalheight[num-1]-75;
    } 
    if(num>1){                                                             
        sizeportal[num-2]=50;
        portalheight[num-2]=portalheight[num-2]+75;
    }
    if(stageClear==false && flag==true){                                     
        stageClear=true;
        console.log("last chance at onMap = "+flag);
        mapx=mapx-100;
        flag=false;
    }
    
    if(mapx>=stagex[num-1] && stageClear==true && stage==num)
    {
        portalaudio.pause();               
        console.log("enter Stage");
        console.log("스테이지 "+stage+" 전개");
        goToStage();
        mapx=stagex[num-1]+50;
    }
}

function resetMap(){
     sizeportal=[50, 50, 50];
     portalheight=[380, 380, 380];
     mapx=0;
     drawChar();
     stageClear=true;
     stage=1;
}

function drawChar(){
    drawPortal(0);
    drawPortal(1);
    drawPortal(2);
    mapContext.drawImage(char, mapx, 380, 50,50);
    if(mapx>=stagex[0]-50 && stage==1){
        portalaudio.play();
        whichStage(1);
       
       /* sizeportal[0]=100;
        portalheight[0]=portalheight[0]-50;
        //스테이지 1 전개 함수 여기에
        if(mapx>=stagex[0]){
            goToStage();
            mapx=stagex[0]; 
            console.log("스테이지 1 전개");
            stage=2;
        }*/
    }
    else if(mapx<stagex[0]-50 && stage==1){    
        portalaudio.pause();                            
        if(sizeportal[0]==150){
            portalheight[0]=portalheight[0]+75;
            sizeportal[0]=50;
        }
    }
    else if(mapx>=stagex[1]-50 && stage==2)
    {
        /*sizeportal[1]=100;
        portalheight[0]=portalheight[0]+50;
        sizeportal[0]=sizeportal[0]-50;
        portalheight[1]=portalheight[1]-50;
        //스테이지 2전개 함수 여기에
        goToStage();
        mapx=stagex[1];
        console.log("스테이지 2 전개");
        stage=3;*/
        portalaudio.play();
        whichStage(2);
    }
    else if(mapx<stagex[1]-50 && stage==2){
        portalaudio.pause(); 
        if(sizeportal[1]==150){
            portalheight[1]=portalheight[1]+75;
            sizeportal[1]=50;
        }
    }
    else if(mapx>=stagex[2]-50 && stage==3)
    {
        /*sizeportal[2]=100;
        portalheight[1]=portalheight[1]+50;
        sizeportal[1]=sizeportal[1]-50;
        portalheight[2]=portalheight[2]-50;
        //스테이지 3 전개 함수 여기에
        goToStage();
        mapx=0;
        console.log("스테이지 3 전개");
        portalheight[2]=portalheight[2]+50;
        sizeportal[2]=sizeportal[2]-50;
        //다음 난이도로 넘어가야함
        stage=1;*/
        portalaudio.play();
        whichStage(3);
    }
    else if(mapx<stagex[2]-50 && stage==3){
        portalaudio.pause(); 
        if(sizeportal[2]==150){
            portalheight[2]=portalheight[2]+75;
            sizeportal[2]=50;
        }
    }
}
