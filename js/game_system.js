//產生亂數function
function rand(start, end){
    let difference = end - start;
    let val = start + Math.floor(Math.random() * difference);
    return val;
}

//初始化
var music_statis;
var font_size;
var game_status;
var score_value;
var fule;
var game_time;
var game_over;
function initalize(){
    music_status = true;
    font_size = 20;
    canvas_wrap.style.fontSize = font_size;
    score_value = 0;
    fule = 15;
    game_time = 0;
    game_status = false;
}

function how_to_play(){
    var start_battle = document.getElementById("start_battle_interface");
    start_battle.style.display = "none";

    var rule_interface = document.getElementById("rule_interface");
    rule_interface.style.display = "block";
}

function start_game(){
    game_status = true;
    var start_battle = document.getElementById("start_battle_interface");
    start_battle.style.display = "none";

    var rule_interface = document.getElementById("rule_interface");
    rule_interface.style.display = "none";
}

function game_over(){
    document.getElementById("inter_name").style.display = "block";
}

function Continue(){
    var name = document.getElementById("name").value;
    if(name != ""){
        var arr = new Array();
        var obj = new Object;
        obj.name = name;
        obj.time = game_time;
        obj.score = score_value;
        arr = arr.concat(obj);
        var json = JSON.stringify(arr);
        
        var xmlhttp = new XMLHttpRequest;
        xmlhttp.open("POST","register.php",true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("json=" + json);
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                rank_sort(this.responseText);
            }
        }
    }
}

function rank_sort(json){
    var rank = JSON.parse(json);

    rank.sort(function(a, b){
        return b.score - a.score;
    });

    for(i = 0 ; i <= rank.length - 1 ; i ++){
        for(i2 = 0 ; i2 <= rank.length - 2 ; i2 ++){
            if(rank[i2].score == rank[i2 + 1].score && rank[i2].time < rank[i2 + 1].time){
                var id_ram = rank[i2].id;
                var id_name = rank[i2].name;
                var id_score = rank[i2].score;
                var id_time = rank[i2].time;

                rank[i2].id = rank[i2 + 1].id;
                rank[i2].name = rank[i2 + 1].name;
                rank[i2].score = rank[i2 + 1].score;
                rank[i2].time = rank[i2 + 1].time;

                rank[i2 + 1].id = id_ram;
                rank[i2 + 1].name = id_name;
                rank[i2 + 1].score = id_score;
                rank[i2 + 1].time = id_time;
            }
        }
    }

    var test = JSON.stringify(rank);
    alert(test);
}

const canvas = document.getElementById("background");
const space = canvas.getContext("2d");

const canvas_wrap = document.getElementById("canvas_wrap");
const touch_layer = document.getElementById("touch_layer");

const bgmusic = document.getElementById("bgmusic");


//設置遊戲背景
function set_background(){
    //背景
    let background = new Image();
    background.src = "images/background-1.jpg";
    space.drawImage(background, 0, 0);
}

//設置遊戲畫面
function set_infromation(){
    //方向鍵
    let manipulation_icon = new Image();
    manipulation_icon.src = "images/manipulation.png";
    space.drawImage(manipulation_icon, 50, 420, 150, 150);

    //發射鍵
    let fire_icon = new Image();
    fire_icon.src = "images/icon1.png";
    space.drawImage(fire_icon, 800, 440, 120, 120);

    //logo
    let logo = new Image();
    logo.src = "logo/logo-02.png"
    space.drawImage(logo, 415, 10, 130,100);

    //得分
    let scroe_icon = new Image();
    scroe_icon.src = "images/infromation_icon.png";
    space.drawImage(scroe_icon, 305, 10, 80, 80);

    //燃料
    let fule_icon = new Image();
    fule_icon.src = "images/fuel.png";
    space.drawImage(fule_icon, 10, 10, 30, 40);
    space.fillStyle= "red";
    space.fillRect(50,20,fule * 6,20);

    //遊戲狀態
    let status_button = new Image();
    status_button.src = "images/infromation_icon.png";
    space.drawImage(status_button, 575, 10, 80, 80);
    let game_statu_button = new Image();
    if(game_status){
        game_statu_button.src = "images/stop.png";
    }else{
        game_statu_button.src = "images/start.png";
    }
    space.drawImage(game_statu_button, 600, 35, 30, 30);

    //遊戲時間
    let time_icon = new Image();
    time_icon.src = "images/infromation_icon.png";
    space.drawImage(time_icon, 665, 10, 80, 80);

    //字體大小
    let font_size_icon = new Image();
    font_size_icon.src = "images/font_size.png";
    space.drawImage(font_size_icon, 290, 530, 400, 70);

    //音樂狀態
    let music_status_icon = new Image();
    if(music_status){
        music_status_icon.src = "images/music_play.png";
    }else{
        music_status_icon.src = "images/music_stop.png";
    }
    space.drawImage(music_status_icon, 900, 10, 50, 50);
}

//得分
function score(value){
    score_value += value;
    document.getElementById("score").innerHTML = score_value;
}

//燃料
var fule_time = 0;
function fule_value(value){
    
    if(fule_time == 1000){
        fule -= 1;
        fule_time = 0;
    }else if(game_status){
        fule_time += 10;
    }

    if(fule + value > 30){
        fule = 30;
    }else if(fule + value <= 0){
        fule = 0;
    }else{
        fule += value;
    }
    
    document.getElementById("fule").innerHTML = fule;

    if(fule == 0){
        game_status = false;
        game_over();
    }
}

//遊戲時間
var time_delay = 0;
function time(){
    if(game_status){
        time_delay += 10;
        if(time_delay == 1000){
            game_time += 1;
            time_delay = 0;
        }
    }
    if(game_time < 60){
        if(game_time % 60 < 10){
            document.getElementById("time").innerHTML = "00" + ":0" + game_time % 60;
        }else{
            document.getElementById("time").innerHTML = "00" + ":" + game_time % 60;
        }
    }else{
        if(game_time % 60 < 10){
            document.getElementById("time").innerHTML = "0" + Math.floor(game_time / 60) + ":0" + game_time % 60;
        }else{
            document.getElementById("time").innerHTML = "0" + Math.floor(game_time / 60) + ":" + game_time % 60;
        }
    }
}

//建立補給
var supply = [];
function set_supply(){
    var config = {
        x : rand(50,700),
        y : 50
    };

    supply.push(config);
}

//補給移動
function supply_move(){
    var speed = 0.5;

    supply[0].y += speed;

    if(supply[0].y > 600){
        reset_supply();
    }
}

//重置補給
function reset_supply(){
    supply[0].x = rand(50,700);
    supply[0].y = 50;
}

//繪製補給
function supply_draw(){
    var supply_img = new Image();
    supply_img.src = "images/fuel.png";
    space.drawImage(supply_img, supply[0].x, supply[0].y, 30, 40);
}

//補給程序
function supply_system(){
    if(game_status){
        supply_move();
    }
    supply_draw();
}

//太空艦變數
var ship_config = [];

//設置太空艦
function set_ship(){
    var config = {
        x : 150,
        y : 300,
    }

    ship_config.push(config);
}

//太空艦移動狀態
var up = false;
var down = false;
var left = false;
var right = false;

//太空艦移動
function ship_move(){
    var ship = new Image();
    ship.src = "images/spaceship-reference_5.svg";

    if(game_status){
        if(up && ship_config[0].y > 50){
            ship_config[0].y -= 3.5;
        }
        if(down && ship_config[0].y < 500){
            ship_config[0].y += 3.5;
        }
        if(left && ship_config[0].x > 10){
            ship_config[0].x -= 3.5;
        }
        if(right && ship_config[0].x < 550){
            ship_config[0].x += 3.5;
        }
    }

    if(ship_config[0].x + 55 > memteorites[0].x && ship_config[0].x + 55 < memteorites[0].x + 100 && ship_config[0].y + 30 > memteorites[0].y && ship_config[0].y + 30 < memteorites[0].y + 100){
        var hit = document.getElementById("hit");
        hit.currentTime = 0;
        hit.play();
        reset_memteorite(0);
        fule_value(-15);
    }
    if(ship_config[0].x + 55 > enemys[0].x && ship_config[0].x + 55 < enemys[0].x + 90 && ship_config[0].y + 30 > enemys[0].y && ship_config[0].y + 30 < enemys[0].y + 80){
        var hit = document.getElementById("hit");
        hit.currentTime = 0;
        hit.play();
        reset_enemy();
        fule_value(-15);
    }
    if(supply[0].x + 15 > ship_config[0].x && supply[0].x + 15 < ship_config[0].x + 110 && supply[0].y + 10 > ship_config[0].y && supply[0].y + 10 < ship_config[0].y + 60){
        fule_value(15);
        reset_supply();
    }

    space.drawImage(ship, ship_config[0].x, ship_config[0].y, 110, 60);
}

//敵人變數
var enemys = [];

//設置敵人
function set_enemy(){
    var inf = {
        x : 1000,
        y : rand(50,500),
        enemy_no : "enemy_1.png"
    };

    enemys.push(inf);
}

//敵人位置更改
function enemy_move(){
    var speed = 1;
    enemys[0].x -= speed;

    if(enemys[0].x < -100){
        reset_enemy();
    }
}

//敵人發射
var enemy_fire_reday = true;
var enemy_fire_delay = 0;
function enemy_fire(){
    if(ship_config[0].y > enemys[0].y && ship_config[0].y < enemys[0].y + 80){
        if(enemy_fire_reday){
            set_shoot(1);
            enemy_fire_delay = 0;
            enemy_fire_reday = false;
        }else{
            enemy_fire_delay += 10;
            if(enemy_fire_delay == 800){
                enemy_fire_reday = true;
            }
        }
    }
}

//重置敵人
function reset_enemy(){
    enemys[0].x = 1000;
    enemys[0].y = rand(50,500);
}

//繪製敵人
function enemy_draw(){
    var enemy_image = new Image();
    enemy_image.src = "images/" + enemys[0].enemy_no;
    space.drawImage(enemy_image, enemys[0].x, enemys[0].y, 90, 80);
}

//敵人程序
function enemy_system(){
    if(game_status){
        enemy_move();
        enemy_fire();
    }
    enemy_draw();
}

//子彈變數
var shoots = [];

//設置子彈
function set_shoot(type){
    if(type == 0){
        var config = {
            x : ship_config[0].x + 100,
            y : ship_config[0].y + 25,
            type : 0,
            shoot_kind : "images/shoot.png"
        }
    }else if(type == 1){
        var config = {
            x : enemys[0].x,
            y : enemys[0].y + 25,
            type : 1,
            shoot_kind : "images/enemy_shoot.png"
        }
    }
    shoots.push(config);
}

//子彈移動
function shoot_move(){
    if(shoots.length > 0 && game_status){
        for(i = 0 ; i <= shoots.length - 1; i ++){
            var shoot = new Image();
            shoot.src = shoots[i].shoot_kind;
            space.drawImage(shoot, shoots[i].x, shoots[i].y);
            
            if(shoots[i].type == 0){
                if(shoots[i].x > memteorites[0].x + 10 && shoots[i].x < memteorites[0].x + 90 && shoots[i].y > memteorites[0].y && shoots[i].y < memteorites[0].y + 100){
                    var hit = document.getElementById("hit");
                    hit.currentTime = 0;
                    hit.play();
                    shoots.splice(i, 1);

                    memteorites[0].hit -= 1;
                    if(memteorites[0].hit <= 0){
                        score(10);
                        reset_memteorite(0);
                    }
                }else if(shoots[i].x > enemys[0].x + 10 && shoots[i].x < enemys[0].x + 70 && shoots[i].y > enemys[0].y && shoots[i].y < enemys[0].y + 80){
                    var hit = document.getElementById("hit");
                    hit.currentTime = 0;
                    hit.play();
                    shoots.splice(i, 1);

                    reset_enemy();
                    score(5);
                }else{
                    shoots[i].x += 10;
                    if(shoots[i].x > 960){
                        shoots.splice(i, 1);
                    }
                }

            }else if(shoots[i].type == 1){
                if(shoots[i].x < ship_config[0].x + 100 && shoots[i].x > ship_config[0].x && shoots[i].y > ship_config[0].y && shoots[i].y < ship_config[0].y + 100){
                    fule_value(-15);

                    shoots.splice(i, 1);   
                }else{
                    shoots[i].x -= 10;
                    if(shoots[i].x < 0){
                        shoots.splice(i, 1);
                    }
                }
            }
            
        }
    }
}

//星球變數
var planets = [];
var planets_kind = [
    ["003-science-2.png", false],
    ["004-science-1.png", false],
    ["005-science.png", false],
    ["007-planet-earth-1.png", false],
    ["011-planet-earth.png", false],
    ["001-global.png", false],
    ["002-travel.png", false],
    ["006-mars.png", false],
    ["008-earth-globe.png", false],
    ["009-saturn.png", false],
    ["010-uranus.png", false],
    ["012-jupiter.png", false]
];

//設置星球
function set_planets(){
    for(i = 0 ; i <= 5 ; i ++){
        do{
            if(i < 2){
                var kind = rand(0,4);
            }else{
                var kind = rand(5,11);
            }
            var repeat = planets_kind[kind][1]
        }while(repeat)

        planets_kind[kind][1] = true;

        var x_pos = rand(50,900);
        var y_pos = rand(50,500);
        if(i != 0){
            for(i2 = 0 ; i2 <= i - 1 ; i2 ++){
                var overlapping = true;
                while(overlapping){
                    if(x_pos > planets[i2].x + 100 || x_pos < planets[i2].x - 100 || y_pos > planets[i2].y + 100 || y_pos < planets[i2].y - 100){
                        overlapping = false;
                    }else{
                        x = x_pos = rand(50,900);
                        y = y_pos = rand(50,500);
                        i2 = 0;
                    }
                }
            }
        }

        var config = {
            x : x_pos,
            y : y_pos,
            planet_no : kind
        };
        planets.push(config);
    }
}

//星球移動
function planets_move(){
    var small_planet_speed = 0.2;
    var big_planet_speed = 0.3;

    for(i = 0 ; i <= 5 ; i ++){
        var planet = new Image();
        var planet_no = planets[i].planet_no;
        planet.src = "images/planets/" + planets_kind[planet_no][0];

        if(planet.width > 100 || planet.height > 100){
            width = 85;
            height = 85;
        }else{
            width = planet.width;
            height = planet.height;
        }

        space.drawImage(planet, planets[i].x, planets[i].y, width, height);
        if(game_status){
            if(i < 2){
                planets[i].x -= small_planet_speed;
                small_planet_speed += 0.05;
            }else{
                planets[i].x -= big_planet_speed;
                big_planet_speed += 0.1;
            }
        }

        if(planets[i].x < -100){
            reset_planet(i);
        }
        
    }
}

//重設星球
function reset_planet(id){
    var planet_no = planets[id].planet_no;
    planets_kind[planet_no][1] = false;

    do{
        if(i < 2){
            var kind = rand(0,4);
        }else{
            var kind = rand(5,11);
        }
        var repeat = planets_kind[kind][1];
    }while(repeat)

    planets_kind[kind][1] = true;

    planets[id].x = 960;
    planets[id].y = rand(50,500);
    planets[id].planet_no = kind;
}

//隕石變數
var memteorites = [];
var memteorites_kind = [
    ["aestroid_brown.png",false],
    ["aestroid_dark.png",false],
    ["aestroid_gray.png",false],
    ["aestroid_gray_2.png",false]
];

//設置隕石
function set_memteorite(){
    do{
        var kind = rand(0,3);
        var repeat = memteorites_kind[kind][1];
    }while(repeat)

    memteorites_kind[kind][1] = true;

    var config = {
        x : 500,
        y : rand(50,500),
        hit : 2,
        memteorite_no : kind
    };
    memteorites.push(config);
}

//隕石移動
function memteorite_move(){
    var speed = 0.5;

    var memteroite = new Image();
    var memteorite_no = memteorites[0].memteorite_no;
    memteroite.src = "images/" + memteorites_kind[memteorite_no][0];
    space.drawImage(memteroite, memteorites[0].x, memteorites[0].y, 100, 100);

    if(game_status){
        memteorites[0].x -= speed;
        if(memteorites[0].x < -100){
            reset_memteorite(0);
        }
    }
}

//隕石重設
function reset_memteorite(id){
    memteorite_no = memteorites[id].memteorite_no;
    memteorites_kind[memteorite_no][1] = false;

    do{
        var kind = rand(0,3);
        repeat = memteorites_kind[kind][1];
    }while(repeat)

    memteorites_kind[kind][1] = false;

    memteorites[id].x = 960;
    memteorites[id].y = rand(50,500);
    memteorites[id].hit = 2;
    memteorites[id].memteorite_no = kind;
}

//判斷裝置
if(/(Android)/i.test(navigator.userAgent)){
    var device = "phone";
}else{
    var device = "pc";
}


var click = false;
//手機點擊監聽事件
touch_layer.addEventListener('touchstart', function(e){
    if(device == "phone"){
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
        type = 0;
        click = true;
        touch_event(x, y, type);
    }
}, false);

//手機拖滑監聽事件
touch_layer.addEventListener('touchmove',function(e){
    if(device == "phone"){
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
        type = 1;
        if(click){
            touch_event(x, y, type);
        }
    }
}, false);

//手機離開螢幕監聽事件
touch_layer.addEventListener('touchend',function(e){
    if(device == "phone"){
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
        type = 2;
        click = false;
        touch_event(x, y, type);
    }
}, false);

//滑鼠點擊監聽事件
touch_layer.addEventListener('mousedown',function(e){
    if(device == "pc"){
        x = e.layerX;
        y = e.layerY;
        type = 0;
        click = true;
        touch_event(x, y, type);
    }
}, false)

//滑鼠移動監聽事件
touch_layer.addEventListener('mousemove',function(e){
    if(device == "pc"){
        x = e.layerX;
        y = e.layerY;
        type = 1;
        if(click){
            touch_event(x, y, type);
        }
    }
}, false)

//滑鼠離開監聽事件
touch_layer.addEventListener('mouseup',function(e){
    if(device == "pc"){
        x = e.layerX;
        y = e.layerY;
        type = 2;
        click = false;
        touch_event(x, y, type);
    }
}, false)



//點擊位置事件
function touch_event(x, y, type){
    //更改遊戲狀態
    if(x > 575 && x < 655 && y > 10 && y < 90 && type == 0){
        if(game_status){
            game_status = false;
            bgmusic.pause();
        }else{
            game_status = true;
            bgmusic.play();
        }   
    }

    if(game_status){
        //字體大小
        if(x > 290 && x < 490 && y > 530 && y < 600 && type == 0){
            if(font_size > 16){
                font_size -= 2;
                canvas_wrap.style.fontSize = font_size;
            }
        }
        if(x > 490 && x < 690 && y > 530 && y < 600 && type == 0){
            if(font_size < 26){
                font_size += 2;
                canvas_wrap.style.fontSize = font_size;
            }
        }
        
        //更改音樂狀態
        if(x > 900 && x < 950 && y > 10 && y < 60 && type == 0){
            if(music_status){
                music_status = false;
                bgmusic.pause();
            }else{
                music_status = true;
                bgmusic.play();
            }
        }

        //發射
        if(x > 800 && x < 920 && y > 440 && y < 560 && type == 0){
            var shoot = document.getElementById("shoot");
            shoot.currentTime = 0;
            shoot.play();
            fire = false;
            set_shoot(0);
        }

        //太空艦移動-點擊
        if(x > 50 && x < 200 && y > 420 && y < 470 && type == 0){
            up = true;
            down = false;
        }

        if(x > 50 && x < 200 && y > 520 && y < 570 && type == 0){
            down = true;
            up = false;
        }

        if(x > 50 && x < 100 && y > 420 && y < 570 && type == 0){
            left = true;
            right = false;
        }

        if(x > 150 && x < 200 && y > 420 && y < 570 && type == 0){
            right = true;
            left = false;
        }

        //太空艦移動-拖滑
        if(x > 100 && x < 150 && y > 420 && y < 470 && type == 1){
            up = true;
            down = false;
            left = false;
            right = false;
        }

        if(x > 100 && x < 150 && y > 520 && y < 570 && type == 1){
            up = false;
            down = true;
            left = false;
            right = false;
        }

        if(x > 50 && x < 100 && y > 470 && y < 520 && type == 1){
            up = false;
            down = false;
            left = true;
            right = false;
        }

        if(x > 150 && x < 200 && y > 470 && y < 520 && type == 1){
            up = false;
            down = false;
            left = false;
            right = true;
        }

        if(x > 50 && x < 100 && y > 420 && y < 470 && type == 1){
            up = true;
            down = false;
            left = true;
            right = false;
        }

        if(x > 150 && x < 200 && y > 420 && y < 470 && type == 1){
            up = true;
            down = false;
            left = false;
            right = true;
        }

        if(x > 50 && x < 100 && y > 520 && y < 570 && type == 1){
            up = false;
            down = true;
            left = true;
            right = false;
        }

        if(x > 150 && x < 200 && y > 520 && y < 570 && type == 1){
            up = false;
            down = true;
            left = false;
            right = true;
        }

        if(type == 2){
            up = false;
            down = false;
            left = false;
            right = false;
        }
    }   
}

//鍵盤按下監聽事件
var fire = true;
document.onkeydown = function(e){

    if(e && e.keyCode == 80){
        if(game_status){
            game_status = false;
            bgmusic.pause();
        }else{
            game_status = true;
            bgmusic.play();
        }  
    }

    if(game_status){
        //控制
        if(e && e.keyCode == 38){
            up = true;
        }
        if(e && e.keyCode == 40){
            down = true;
        }
        if(e && e.keyCode == 39){
            right = true;
        }
        if(e && e.keyCode == 37){
            left = true;
        }

        //發射
        if(e && e.keyCode == 32 && fire){
            var shoot = document.getElementById("shoot");
            shoot.currentTime = 0;
            shoot.play();
            fire = false;
            set_shoot(0);
        }
    }
}

//鍵盤放開監聽事件
document.onkeyup = function(e){
    if(game_status){
        //控制
        if(e && e.keyCode == 38){
            up = false;
        }
        if(e && e.keyCode == 40){
            down = false;
        }
        if(e && e.keyCode == 39){
            right = false;
        }
        if(e && e.keyCode == 37){
            left = false;
        }

        //發射
        if(e && e.keyCode == 32){
            fire = true;
        }
    }
}


initalize();
set_planets();
set_memteorite();
set_ship();
set_enemy();
set_supply();

setInterval(function(){
    set_background();

    planets_move();
    memteorite_move();
    ship_move();
    enemy_system();
    supply_system();
    shoot_move();
    score(0);
    fule_value(0);
    time();

    set_infromation();
}, 10)
