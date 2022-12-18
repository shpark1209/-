
//Last Chance
var flag=false;
var last_chance = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            flag=true;
            console.log("last chance used");
        }
    };
})();

//sound effect
var FX_ice = new Audio('source/music/iceBrick.mp3');
FX_ice.volume = 1;
var FX_player_hit = new Audio('source/music/Player_Hit.mp3');
FX_player_hit.volume = 1;
var FX_knife = new Audio('source/music/knife_hit.mp3');
FX_knife.volume = 1;
var FX_bounce = new Audio('source/music/bounce.mp3');
FX_bounce.volume = 1;
var FX_fire = new Audio('source/music/fire.mp3');
FX_fire.volume = 1;
var FX_monster_Hit = new Audio('source/music/monster_Hit.mp3');
FX_monster_Hit.volume = 1;


// hp
var playerHp = MAX_PLAYER_HP;
var monsterHp = MAX_MONSTER_HP;
var stageClear=true;


const boss_audio = new Audio('source/music/Boss.mp3');

// boss_audio.play();

function goToStage() { // map canvas -> game canvas
    document.removeEventListener("keydown", mapKeyDownHandler, false);
    document.removeEventListener("keyup", mapKeyUpHandler, false);
    document.addEventListener("keydown", stageKeyDownHandler, false);
    document.addEventListener("keyup", stageKeyUpHandler, false);
    clearInterval(mapCanvasInterval);
    mapCanvas.style.display = 'none';
    gameCanvasInterval = setInterval(drawGameCanvas, 10);
    stageCanvas.style.display = 'block';
    $(".popupOnGame").fadeOut();
    //브금 전환
    monsterHp = stage*3;
    audio.pause();
    Bossaudio.play();
    portalaudio.pause();
}



function goToMap() { // game canvas -> map canvas
    document.removeEventListener("keydown", stageKeyDownHandler, false);
    document.removeEventListener("keyup", stageKeyUpHandler, false);
    document.addEventListener("keydown", mapKeyDownHandler, false);
    document.addEventListener("keyup", mapKeyUpHandler, false);
    clearInterval(gameCanvasInterval)
    stageCanvas.style.display = 'none';
    mapCanvas.style.display = 'block';
    mapCanvasInterval = setInterval(drawMapCanvas, 10);

    // 브금 전환
    audio.play();
    Bossaudio.pause();
    portalaudio.pause();
}


var Bossaudio = new Audio('source/music/Boss.mp3');
audio.volume = 0.75;
var portalaudio=new Audio('source/music/portalsfx.mp3');
portalaudio.volume=0.75;