// 게임의 변수들
let gameCanvasInterval;
let mapCanvasInterval;
var MAX_MONSTER_HP;
var MAX_PLAYER_HP;

// screen size
var width = 800
var height = 500

/* Ball */
var ballColor = "#0095DD";
let x, y, dx, dy;
var ballSpeed;
x = 100; y = 300;
const ballRadius = 10;

//boss attack ball
let attackdy=-1;
var attackX = 300;
var attackY = 100;

/* Paddle */
let paddleHeight = 70;
let paddleWidth = 170;
let paddleX =100;
const paddledx = 10;
var paddleImage = new Image()
paddleImage.src = 'source/paddle/sword2.png' // 블럭 이미지 선택

/* Keyboard */
var rightPressed = false;
var leftPressed = false;

/* Canvas */
let stageCanvas
let stageContext;
var mapCanvas
var mapContext;

/* Bricks */
var ice_brick = ['눈벽돌', '보라얼음블럭', '분홍얼음블럭', '붉은얼음블럭', '얼음벽돌', '얼음블럭']
var brickRowCount = 3;//5
var brickColumnCount = 12;//8
const brickWidth = 50;
const brickHeight = 50;
const brickPadding = 10;
const brickOffsetTop = 30;

let brickOffsetLeft;
let bricks = [];
var blockSrc = 'source/block/'
for (let i = 0; i < ice_brick.length; i++) {
    ice_brick[i] = blockSrc + ice_brick[i] + '.png';
}

/* on game variable */
let score = 0;
let phase = 0;
let monster;


//LUNATIC (ice level 1 monster) source/monster/gifFolder/Lunatic-1.png
const lunatic_giff = []
for (let i = 1; i <= 3; i++) {
    lunatic_giff[i-1] = 'source/monster/gifFolder/Lunatic-'+i+'.png';
}

//iceQueen (ice level 2 monster) source/monster/gifFolder/Ice_Queen-40.png
const iceQueen_giff = []
for (let i = 1; i <= 40; i++) {
    iceQueen_giff[i-1] = 'source/monster/gifFolder/Ice_Queen-'+i+'.png';
}

//boss
let boss_src_array = ['source/monster/Lunatic.gif', 'source/monster/Ice_Queen.gif','source/monster/신성 보스.gif']
//boss gif 분활
const boss_giff = []
for (let i = 1; i <= 63; i++) {
    boss_giff[i-1] = 'source/monster/gifFolder/신성 보스-'+i+'.png';
}
const fire_giff = []
for (let i = 1; i <= 7; i++) {
    fire_giff[i-1] = 'source/monster/gifFolder/fireBall-'+i+'.png';
}
let BOSS_WIDTH;
let BOSS_HEIGHT;

//monster attack
const lunatic_attack_giff = []
for (let i = 1; i <= 4; i++) {
    lunatic_attack_giff[i-1] = 'source/monster/gifFolder/Ghast-'+i+'.png';
}

const iceQueen_attack_giff = []
for (let i = 1; i <= 4; i++) {
    iceQueen_attack_giff[i-1] = 'source/monster/gifFolder/IceQueen_attack-'+i+'.png';
}

const boss_attack_giff = []
for (let i = 1; i <= 3; i++) {
    boss_attack_giff[i-1] = 'source/monster/gifFolder/Blaster-'+i+'.png';
}

//portal gif 
var portal;
const portal_giff=[];
for(let i=1;i<=8;i++){
    portal_giff[i-1]="source/portal/portalgif-"+i+".png";
}






var moveForce = 30; // max popup movement in pixels
var rotateForce = 20; // max popup rotation in deg
var language = 0; //0 한국 1 영어
$(document).mousemove(function(e) {
    var docX = $(document).width();
    var docY = $(document).height();
    
    var moveX = (e.pageX - docX/2) / (docX/2) * -moveForce;
    var moveY = (e.pageY - docY/2) / (docY/2) * -moveForce;
    
    var rotateY = (e.pageX / docX * rotateForce*2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce*2) - rotateForce);
    
    $('.popup')
        .css('left', moveX+'px')
        .css('top', moveY+'px')
        .css('transform', 'rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');
});
//--------------------------------------------------------
//----------------------------------------------------
var red_value=0;
var green_value=0;
var blue_value=0;
var audio = new Audio('source/music/game_start.mp3');
audio.volume = 0.75;
var first_audio = new Audio('source/music/Second Run.mp3');
var story_1 = new Audio("source/music/더빙1.mp3");
var story_2 = new Audio("source/music/더빙2.mp3");
var story_3 = new Audio("source/music/더빙3.mp3");
var FX_knife_skill = new Audio('source/music/칼스킬.mp3');
FX_knife_skill.volume = 1;

$(document).ready(function(){
    $("#page").hide();
        // 설정 버튼
        $(".enter-button").click(function(){
            first_audio = new Audio('source/music/Second Run.mp3');
            first_audio.play();
            first_audio.loop=true;
        });
        $("#setting_button").click(function(){
            updateColor();
            $("#popup").fadeIn();
            updateColor();
            $("#Red").change(function (e) { 
            red_value = $(this).val();
            updateColor();
            });
            $("#Green").change(function (e) { 
                green_value = $(this).val();
                updateColor();
            });
            $("#Blue").change(function (e) { 
                blue_value = $(this).val();
                updateColor();
            });
        });
        $(".exit").click(function(){
            $("#popup").fadeOut();
            if($('input[name="rad2"]:checked').val()=='eng'){
                language=1;
            }
            else{
                language=0;
            }
            if($('input[name="rad"]:checked').val()=='on'){
                first_audio.play();
                first_audio.loop=true;
                Bossaudio.volume = 0.75;
            }
            else{
                // music off
                Bossaudio.volume =0;
                first_audio.pause();
                audio.volume = 0;

            }
            if (language==0) {
                story_1 = new Audio("source/music/더빙1.mp3");
                story_2 = new Audio("source/music/더빙2.mp3");
                story_3 = new Audio("source/music/더빙3.mp3");
            }
            else{
                story_1 = new Audio("source/music/dubbing1.mp3");
                story_2 = new Audio("source/music/dubbing2.mp3");
                story_3 = new Audio("source/music/dubbing3.mp3");
            }
        });

        $(".popup-content").click(function (e) {
            first_audio.pause();
            story_1.play();
            $("#wrapper").hide();
            $(".story").show();
            $(".story3").hide();
            $(".story2").hide();
        });
        $("#arrow-down1").click(function (e) {
            story_1.pause()
            story_2.play();
            $(".story2").show();
            $(".story1").hide();
        });
        $("#arrow-down2").click(function (e) {
            story_2.pause();
            story_3.play();
            $(".story3").show();
            $(".story2").hide();
        });
        $("#arrow-down3").click(function (e) { 
            story_3.pause();
            $(".story").hide();
            //난이도 선택
            audio.play();
            $("#mode").show();
        });

        //보통 난이도
        $("#select_normal").click(function (e) { 
            $("#mode").hide();
            $("#page").show();
            ballSpeed = 4;
            dx = ballSpeed
            dy = ballSpeed
            MAX_MONSTER_HP = 5;
            MAX_PLAYER_HP = 5;
            FX_knife_skill.play();
            // 게임 부분
            document.addEventListener("mousemove", mouseMoveHandler, false);
            stageCanvas = document.getElementById("stageCanvas");
            stageContext = stageCanvas.getContext("2d");
            stageCanvas.width = width;
            stageCanvas.height = height;
            brickOffsetLeft = (width - brickColumnCount * (brickWidth + brickPadding)) / 2;
            updatePlayerHp();
            updateMonsterHp();
            
            // 맵부분
            mapCanvas = document.getElementById("mapCanvas")
            mapContext = mapCanvas.getContext("2d");
            mapCanvas.width = width;
            mapCanvas.height = height;
            mapCanvasInterval=setInterval(drawMapCanvas, 20);
        });
        //쉬움 난이도
        $("#select_easy").click(function (e) { 
            //추후 수정
            brickRowCount = 3;//5
            brickColumnCount = 3;//8
            FX_knife_skill.play();
            ballSpeed =2.5;
            MAX_PLAYER_HP=10;
            playerHp=10;
            MAX_MONSTER_HP=1;
            monsterHp=1;
            $("#mode").hide();
            $("#page").show();
            dx = ballSpeed
            dy = ballSpeed
            FX_knife_skill.play();
            // 게임 부분
            document.addEventListener("mousemove", mouseMoveHandler, false);
            stageCanvas = document.getElementById("stageCanvas");
            stageContext = stageCanvas.getContext("2d");
            stageCanvas.width = width;
            stageCanvas.height = height;
            brickOffsetLeft = (width - brickColumnCount * (brickWidth + brickPadding)) / 2;
            updatePlayerHp();
            updateMonsterHp();
            
            // 맵부분
            mapCanvas = document.getElementById("mapCanvas")
            mapContext = mapCanvas.getContext("2d");
            mapCanvas.width = width;
            mapCanvas.height = height;
            mapCanvasInterval=setInterval(drawMapCanvas, 20);

        });
        //어려움 난이도
        $("#select_hard").click(function (e) { 
            //추후 수정
            FX_knife_skill.play();
            ballSpeed =6;
            dx = ballSpeed
            dy = ballSpeed
            MAX_PLAYER_HP=1;
            playerHp=1;
            MAX_MONSTER_HP = 5;
            MAX_PLAYER_HP = 5;
            $("#mode").hide();
            $("#page").show();
            updatePlayerHp();
            updateMonsterHp();
            FX_knife_skill.play();
            // 게임 부분
            document.addEventListener("mousemove", mouseMoveHandler, false);
            stageCanvas = document.getElementById("stageCanvas");
            stageContext = stageCanvas.getContext("2d");
            stageCanvas.width = width;
            stageCanvas.height = height;
            brickOffsetLeft = (width - brickColumnCount * (brickWidth + brickPadding)) / 2;
            updatePlayerHp();
            updateMonsterHp();
            
            // 맵부분
            mapCanvas = document.getElementById("mapCanvas")
            mapContext = mapCanvas.getContext("2d");
            mapCanvas.width = width;
            mapCanvas.height = height;
            mapCanvasInterval=setInterval(drawMapCanvas, 20);
        });

        $(".popupOnGame").click(function (e) { 
            $(".popupOnGame").hide();
        });

});

function updateColor(){
    ballColor = 'rgb('+red_value+','+green_value+','+blue_value+')';
    $("#setting_color").css('background-color', ballColor );
}

//----------------------------------------------------
$(function(){
	var welcomSection = $('.welcome-section'),
    enterButton = welcomSection.find('.enter-button');
    
    setTimeout(function(){
    welcomSection.removeClass('content-hidden');},800);
    enterButton.on('click',function(e){
        e.preventDefault();
        welcomSection.addClass('content-hidden').fadeOut();
    });
})
//----------------------------------------------------