let hero;
let monster;
let boss;
let creep;
let map;
let start = 1;
let gameover = false;

class Entity{
    constructor(height, width, x, y){
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
    }

    display(r, g, b){
        noStroke();
        fill(color(r, g, b));
        rect(this.x, this.y, this.width, this.height)
    }

    attack(){
        if(this.x + 20 >= hittable_monster.x && this.x <= hittable_monster.x + 20 && this.y + 20 >= hittable_monster.y && this.y <= hittable_monster.y + 20){
            return true;
        }
    }

    hit(){
        if(this.x + 20 >= monster.x && this.x <= monster.x + 20 && this.y + 20 >= monster.y && this.y <= monster.y + 20){
            return true;
        }

        if(this.x + 20 >= monster2.x && this.x <= monster2.x + 20 && this.y + 20 >= monster2.y && this.y <= monster2.y + 20){
            return true;
        }

        if(this.x + 20 >= boss.x && this.x <= boss.x + 40 && this.y + 20 >= boss.y && this.y <= boss.y + 40){
            return true;
        }

        if(this.x + 20 >= creep.x && this.x <= creep.x + 10 && this.y + 20 >= creep.y && this.y <= creep.y + 10){
            return true;
        }

        if(this.x + 20 >= creep2.x && this.x <= creep2.x + 10 && this.y + 20 >= creep2.y && this.y <= creep2.y + 10){
            return true;
        }
    }

    moveRight(){
        if(keyIsDown(RIGHT_ARROW)){
            if(this.x == 470){
                this.x += 0
            }
            else{
                this.x += 5
            }
        }
    }

    moveLeft(){
        if(keyIsDown(LEFT_ARROW)){
            if(this.x == 0){
                this.x += 0
            }
            else{
                this.x -= 5
            }
        }
    }

    moveDown(){
        if(keyIsDown(DOWN_ARROW)){
            if(this.y == 470){
                this.y += 0
            }
            else{
                this.y += 5
            }
        }
    }

    moveUp(){
        if(keyIsDown(UP_ARROW)){
            if(this.y == 0){
                this.y -= 0
            }
            else{
                this.y -= 5
            }
        }
    }
}

class Level{
    constructor(currentLevel, latestLevel, maxLevel){
        this.currentLevel = currentLevel;
        this.latestLevel = latestLevel;
        this.maxLevel = maxLevel;
    }

    setLevel(){

    }

    getCurrentLevel(){
        
    }
}

class Monster extends Entity{
    constructor(life, color, effect, type){
        this.life = life;
        this.color = color;
        this.effect = effect;
        this.type = type;
    }

    moveRandom(){

    }

    saveScore(){

    }
}

class Hero extends Entity{
    constructor(life, score, skill){
        this.life = life;
        this.score = score;
        this.skill = skill;
    }

    increaseScore(){

    }

    calculateLife(){

    }

    saveScore(){

    }
}

class Map{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    init(){

    }

    move(){
        
    }
}

function draw() {
    if(start == 1){
        background(0);
        map.init();
    }

    if(start == 2){
        background(0);
        lvl.displayLevel();

        monster.display(255, 0 ,0);
        monster.moveRandom();
        monster.saveScore();

        monster2.display(255, 0 ,0);
        monster2.moveRandom();
        monster2.saveScore();

        boss.display(255,0,0);
        boss.moveRandom();
        
        hero.display(0, 255, 0);
        hero.moveDown();
        hero.moveUp();
        hero.moveLeft();
        hero.moveRight();
        hero.increaseScore();
        hero.hit();
        hero.calculateLife();

        hittable_monster.display(255,255,0)
        hittable_monster.moveRandom();

        if(hero.score == 500){
            monster.setSpeed(2);
            boss.setSpeed(2);
            lvl.setLevel(2);
        }

        if(hero.score > 1000){
            creep.display(255,0,0)
            creep.moveRandom();
        }

        if(hero.score == 1000){
            lvl.setLevel(3);
        }

        if(hero.score == 2500){
            creep.setSpeed(3);
            monster.setSpeed(3);
            lvl.setLevel(4);
        }

        if(hero.score > 5000){
            creep2.display(255,0,0)
            creep2.moveRandom();
        }

        if(hero.score == 5000){
            lvl.setLevel(5);
        }

        if(hero.score ==  10000){
            boss.setSpeed(5);
            monster.setSpeed(5);
            creep.setSpeed(5);
            lvl.setLevel(6);

        }

        if(hero.life == 0){
            start = 3;
            }
        }

    else if(start == 3){
        hero.saveScore();
        map.move();
        if(map.move()==true){
            lvl.setLevel(1);
            hero.life = 100;
            hero.score = 0;
            start = 1;
        }
    }
}
