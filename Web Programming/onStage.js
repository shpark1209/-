// brick 생성
const BRICK_PHASE = 0;
const MONSTER_PHASE = 1;
const BALL_START_X = 250;
const BALL_START_Y = 250;
let alertCount = 0;

function detectColision() {
    if (phase == BRICK_PHASE) {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    /* case 1 */
                    if (x + ballRadius >= b.x + brickWidth && x - ballRadius <= b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dx = -dx;
                        b.status = 0;
                        FX_ice.play();
                    }
                    /* case 2 */
                    if (x - ballRadius <= b.x && x + ballRadius >= b.x && y > b.y && y < b.y + brickHeight) {
                        dx = -dx;
                        b.status = 0;
                        FX_ice.play();
                    }
                    /* case 3 */
                    if (x > b.x && x < b.x + brickWidth && y - ballRadius <= b.y && y + ballRadius >= b.y) {
                        dy = -dy;
                        b.status = 0;
                        FX_ice.play();
                    }
                    /* case 4 */
                    if (x > b.x && x < b.x + brickWidth && y + ballRadius >= b.y + brickHeight && y - ballRadius <= b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        FX_ice.play();
                    }
                    if (b.status == 0) {
                        score++;
                    }
                    if (score == brickColumnCount * brickRowCount)
                        phase = MONSTER_PHASE;
                }
            }
        }
    }
    else if (phase == MONSTER_PHASE) {
        /* 몬스터 충돌 검사 */
        var hit = false;
        if (x + ballRadius >= monster.x + BOSS_WIDTH && x - ballRadius <= monster.x + BOSS_WIDTH && y > monster.y && y < monster.y + BOSS_HEIGHT) {
            dx = -dx;
            hit = true;
            FX_monster_Hit.play();
        }
        /* case 2 */
        if (x - ballRadius <= monster.x && x + ballRadius >= monster.x && y > monster.y && y < monster.y + BOSS_HEIGHT) {
            dx = -dx;
            hit = true;
            FX_monster_Hit.play();
        }
        /* case 3 */
        if (x > monster.x && x < monster.x + BOSS_WIDTH && y - ballRadius <= monster.y && y + ballRadius >= monster.y) {
            dy = -dy;
            hit = true;
            FX_monster_Hit.play();
        }
        /* case 4 */
        if (x > monster.x && x < monster.x + BOSS_WIDTH && y + ballRadius >= monster.y + BOSS_HEIGHT && y - ballRadius <= monster.y + BOSS_HEIGHT) {
            dy = -dy;
            hit = true;
            FX_monster_Hit.play();
        }
        if(hit) {
            monsterHp--;
        }
        updateMonsterHp();
    }
}

/* Game Display */

let difficulty;
var stagebackgroundImage = new Image()
stagebackgroundImage.src = 'source/biome/icebiome3.png'
stagebackgroundImage.width = width;
stagebackgroundImage.height = height;

function stageKeyDownHandler(e) {
    if (e.code == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.code == 'ArrowLeft') {
        leftPressed = true;
    }
    else if (e.code == 'Escape') {
        Test_goToNextPhase();
    }
    else if (e.code == 'KeyQ') {
        sword_skill();
    }

}

function stageKeyUpHandler(e) {
    if (e.code == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.code == 'ArrowLeft') {
        leftPressed = false;
    }
}

function resetBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            b.status = 1;
        }
    }
}

function resetEnvironment() {
    score = 0;
    phase = BRICK_PHASE;
    x = BALL_START_X;
    y = BALL_START_Y;
    dx = ballSpeed;
    dy = ballSpeed;
    monsterHp = MAX_MONSTER_HP;
    playerHp = MAX_PLAYER_HP;
    updateMonsterHp();
    updatePlayerHp();
}

function resetGameData() {
    resetBricks();
    resetEnvironment();
    //기술 사용가능 횟수 초기화
    oppertunity_of_skill = 1;
}

function Test_goToNextPhase() {
    if (phase == BRICK_PHASE) {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                b.status = 0;
            }
        }
        score = brickColumnCount * brickRowCount;
        phase = MONSTER_PHASE;
    } else if (phase == MONSTER_PHASE) {
        resetGameData();
        stage++;
        goToMap();
        if(stage==4){
            resetMap();
            stageClear=true;
            goToStart();
        }
        monsterHp = 0;
    }
}

function drawBall() {
    stageContext.beginPath();
    stageContext.arc(x, y, ballRadius, 0, Math.PI * 2);
    stageContext.fillStyle = ballColor;
    stageContext.fill();
    stageContext.closePath();
}




function drawBossAttack() {
    //보스의 공격이 검을 맞을때 방어완료
    attackY -= attackdy;
    var bossAttack = new Image();
    if (stage == 1) {
        bossAttack.src = lunatic_attack_giff[Math.floor(gif_index / 4) % lunatic_attack_giff.length]; // 몬스터 이미지 선택
        bossAttack.width = 1;
    }
    else if (stage == 2) {
        bossAttack.src = iceQueen_attack_giff[Math.floor(gif_index / 4) % iceQueen_attack_giff.length]; // 몬스터 이미지 선택
        bossAttack.width = 1;
    }
    else if (stage == 3) {
        bossAttack.src = boss_attack_giff[Math.floor(gif_index / 4) % boss_attack_giff.length]; // 몬스터 이미지 선택
        bossAttack.width = 1;
    }

    stageContext.drawImage(bossAttack, attackX, attackY);
    if (attackY + attackdy > height - (bossAttack.height + 50 + paddleHeight) && attackX > paddleX && attackX < paddleX + paddleWidth) { /* 공이 패들의 상단에 튕겼을 때 */
        attackY = -100;
        attackX = Math.floor((Math.random() * 600)) + 100;
        FX_fire.play();
    }
    else if (attackY + attackdy >= height) {
        FX_player_hit.play();
        playerHp--;
        updatePlayerHp();
        attackY = -100;
        attackX = Math.floor((Math.random() * 600)) + 100;
        FX_fire.play();
    }
}

function drawScore() {
    stageContext.font = "16px Arial";
    stageContext.fillStyle = "#ffffff";
    stageContext.fillText("Score: " + score, 8, 20);
}

function drawPaddle() {
    if (rightPressed && paddleX < width - paddleWidth) {
        paddleX += paddledx;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= paddledx;
    }
    stageContext.drawImage(paddleImage, paddleX, height - paddleImage.height)
}

gif_index = 0;
var pageI = 0
function drawMonster() {
    if (bossHp != 0) {
        if (phase == MONSTER_PHASE) {
            if (pageI++ == 0) {
                audio.pause();
                Bossaudio.play();
                //보스 출현
            }
            var monsterImage = new Image();
            gif_index++;
            if (gif_index >= 400) {
                gif_index = 0;
            }
            if (stage == 1) {
                monsterImage.src = lunatic_giff[Math.floor(gif_index / 10) % lunatic_giff.length]// 몬스터 이미지 선택
                BOSS_WIDTH = 42; BOSS_HEIGHT = 60;
                monster = { x: (width - BOSS_WIDTH) / 2, y: (height / 2 - BOSS_HEIGHT) }
            }
            else if (stage == 2) {
                monsterImage.src = iceQueen_giff[Math.floor(gif_index / 4) % iceQueen_giff.length] // 몬스터 이미지 선택
                BOSS_WIDTH = 170; BOSS_HEIGHT = 140;
                monster = { x: (width - BOSS_WIDTH) / 2, y: (height / 2 - BOSS_HEIGHT) }
            }
            else if (stage == 3) {
                monsterImage.src = boss_giff[Math.floor(gif_index / 2) % 63]; // 몬스터 이미지 선택
                BOSS_WIDTH = 200; BOSS_HEIGHT = 100;
                monster = { x: (width - BOSS_WIDTH) / 2, y: (height / 2 - BOSS_HEIGHT) }
            }
            stageContext.drawImage(monsterImage, monster.x, monster.y, BOSS_WIDTH, BOSS_HEIGHT);
            drawBossAttack();
        }
    }
}

let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        var index = parseInt(Math.random() * ice_brick.length);
        bricks[c][r] = { x: 0, y: 0, status: 1, src: ice_brick[index] };
    }
}

function drawBricks() {
    if (phase == BRICK_PHASE) {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    var brickImage = new Image();
                    brickImage.src = bricks[c][r].src;
                    stageContext.drawImage(brickImage, brickX, brickY)
                }
            }
        }
    }
}

// var barX = (CANVAS_WIDTH - barWidth)/2;
/* 마우스 컨트롤 함수 */
function mouseMoveHandler(e) {
    var relativeX = e.clientX - stageCanvas.getBoundingClientRect().left;
    if (relativeX - paddleWidth / 2 > 0 && relativeX < width - paddleWidth / 2) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawGameCanvas() {
    stageContext.clearRect(0, 0, width, height);
    stageContext.drawImage(stagebackgroundImage, 0, 0)
    drawBricks();
    drawMonster();
    drawBall();
    drawPaddle();
    drawScore();
    detectColision();
    moveBall();
    // 벽돌을 다 부쉈을때 -> 보스전
    // 곱한것이 총 벽돌갯수 
    if (score == (brickRowCount * brickColumnCount)) {
        // const boss_audio = new Audio('source/music/Boss.mp3');
        // boss_audio.volume = 0.75;
        // boss_audio.play();
        // score++;
    }
}

function moveBall() {
    if (x + dx >= width - ballRadius || x + dx <= ballRadius) { /* 공이 좌, 우 벽에 튕겼을 때 */
        dx = -dx;
        FX_bounce.play();
    }
    if (y + dy <= ballRadius) { /* 공이 천장에 튕겼을 때 */
        dy = -dy;
        FX_bounce.play();
    }
    //공이 칼에 맞았을때
    if (y + dy > height - (ballRadius + paddleHeight) && x + dx > paddleX && x + dx < paddleX + paddleWidth) { /* 공이 패들의 상단에 튕겼을 때 */
        y = height - (ballRadius + paddleHeight)
        dy = -dy;
        FX_knife.play();
    }
    if (y + dy >= height) { /* 공이 바닥에 떨어졌을 때 */
        playerHp--;
        FX_player_hit.play();
        updatePlayerHp();
        x = 100; y = 300;
        dx = ballSpeed;
        dy = ballSpeed;
    }
    x += dx; y += dy;
}

function updatePlayerHp() {
    $("#hp").empty();
    var ch = new Image();
    ch.src = 'source/char/워리어1.png';
    ch.width = 50;
    $("#hp").append(ch);
    for (i = 0; i < playerHp; i++) {
        var heart = new Image();
        heart.src = 'source/heart.png';
        heart.width = 30;
        $("#hp").append(heart);
    }
    if (playerHp <= 0) {
        resetGameData();
        stageClear = false;
        last_chance();
        if(flag==true){
            $("#finalChance").fadeIn(1000);
            alertCount = 1;
            goToMap();
            stage=currentStage;
            whichStage(currentStage);
        }
        else {
            $("#gameOver").fadeIn(1000);
            clearInterval(gameCanvasInterval);
            setTimeout(()=>{
                alertCount = 1;
                $("#page").hide();
                $("#mode").show();
                goToMap();
                resetGameData();
                resetMap();
                clearInterval(mapCanvasInterval);
                $("#gameOver").fadeOut();
                flag=true;
            } , 3000);
            //사망하면 메인으로 
        }
        
    }/*플레이어 사망*/
}

function updateMonsterHp() {
    $("#bossHp").empty();
    if (phase == MONSTER_PHASE) {
        $("#bossHp").show();
    }
    else {
        $("#bossHp").hide();
    }
    var boss = new Image();
    boss.src = boss_src_array[stage - 1];
    boss.height = 50;
    $("#bossHp").append(boss);
    for (i = 0; i < monsterHp; i++) {
        var bossHeart = new Image();
        bossHeart.src = 'source/boss_heart.gif';
        bossHeart.width = 30;
        $("#bossHp").append(bossHeart);
    }
    if (monsterHp <= 0) {
        resetGameData();
        goToMap();
        stage++;
        if (stage == 4) {
            $("#gameClear").fadeIn(1000);
            clearInterval(mapCanvasInterval);
            clearInterval(gameCanvasInterval);
            stageClear = true;
            alertCount = 1;
            /////////여
            /////////기
            /////////에
            /////////필
            setTimeout(() => {
                $("#epilouge").fadeIn(8000);
                $("#page").fadeOut(8000);
            }, 3000);
            $("#epButton").click(function (e) { 
                location.reload();
            });
            /////////로
            /////////그
            //// 있으면 이 밑에꺼 지우고 작성

        } else {
            $("#stageClear").text("STAGE "+(stage-1)+" CLEAR");
            $("#stageClear").fadeIn(1000);
            alertCount = 1;
        }
    }
}

function goToStart(){
    clearInterval(mapCanvasInterval);
    $("page").hide();
    $("#wrapper").show();
    $(".moving-zone").hide();
    $(".setting").hide();
}

function goToMain() {
    resetMap()
    goToMap();
    $("#mode").show();
    $("#page").hide();
}

//라운드 당 기회 한번
var oppertunity_of_skill = 1;
function sword_skill() {
    if (oppertunity_of_skill-- == 1) {
        clearInterval(drawGameCanvas);
        
        FX_knife_skill.play();
        var brick_count = 0;
        for (let i = brickRowCount - 1; i >= 0; i--) {
            for (let j = 0; j < brickColumnCount; j++) {
                if (brick_count >= 5) {
                    break;
                }
                if (bricks[j][i].status == 1) {
                    FX_ice.play();
                    brick_count++;
                    bricks[j][i].status = 0;
                    score++;
                    if (score == brickColumnCount * brickRowCount)
                        phase = MONSTER_PHASE;
                }
            }
        }
    }
}