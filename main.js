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

    setLevel(currentLevel){
        this.currentLevel = currentLevel;
    }

    getCurrentLevel(){
        return this.currentLevel
    }

    displayLevel(){
        fill(255);
        text('Level : ' + this.currentLevel , 30, 16);
    }
}

class Monster extends Entity{
    constructor(life, color, effect, type, height, width, x, y,speed=1, xDir=1, yDir=1){
        super(height, width, x, y);
        this.speed = speed;
        this.xDirection = xDir;
        this.yDirection = yDir;
        this.life = life;
        this.color = color;
        this.effect = effect;
        this.type = type;
    }

    setSpeed(speed){
        this.speed = speed;
    }

    moveRandom(){
        this.x += this.speed*this.xDirection;
        this.y += this.speed*this.yDirection;
        if (this.x>=width || this.x <= 0)
        this.xDirection *= -1;
    
        if (this.y>=height || this.y <= 0)
        this.yDirection *= -1;
    }

    saveScore(){
        fill(255);
        text('Score : ' + hero.score, 450, 16);
        text('Health : ' + hero.life, 250, 16);
    }
}

class Hero extends Entity{
    constructor(life, score, height, width, x, y){
        super(height, width, x, y);
        this.life = life;
        this.score = score;
    }

    increaseScore(){
        if(this.attack() == true){
        this.score += 1;
        }
    }

    calculateLife(){
        if(hero.hit()==true){
            this.life -= 1;
        }
    }
  

    saveScore(){
        background(0);
        fill(color(255,255,0))
        textAlign(CENTER);
        text('GAME OVER', width / 2, height / 3);
        text('SCORE : '+ this.score, width / 2, height / 2.5);
        text('LATEST LEVEL : '+ lvl.getCurrentLevel(), width / 2, height / 2.3);
        text('Nama : Iqbal Al Hafidzu Rahman (2117051019)', width / 2, height / 1.8)
        text('Nama : Muhammad Rafi Satria (2117051046)', width / 2, height / 1.65)
        text('Nama : Enjelita Aini Natasya (2117051028)', width / 2, height / 1.53)
        text('Press down arrow to restart', width / 2, height / 1.1)
    }
}

class Map{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }

    init(){
        background(0);
        fill(color(255,255,0))
        textAlign(CENTER);
        text('THE YELLOW HUNTER GAME!!!', width / 2, height / 2.2);
        text('Press up arrow to start', width / 2, height / 1.95);
        if(keyIsDown(UP_ARROW)){
            start = 2;
        }

    }

    move(){
        if(keyIsDown(DOWN_ARROW)){
            return true;
        }
    }

  }

function setup() {
  map = new Map(500,500);

  createCanvas(map.width, map.height);

  xdir= Math.pow(-1,Math.floor(Math.random()*10));
  ydir= Math.pow(-1,Math.floor(Math.random()*10));

  hero = new Hero(100, 0, 30, 30, 250, 250);
  monster = new Monster(1, 255, 0, 'monster', 30, 30, 70, 30, 2, xdir, ydir)
  boss = new Monster(1, 255, 0, 'bos', 50, 50, 350, 480, 1, xdir, ydir)
  creep = new Monster(1, 255, 0, 'creep', 20, 20, 490, 400, 2, xdir, ydir)
  creep2 = new Monster(1, 255, 0, 'creep_2', 20, 20, 350, 400, 2, xdir, ydir)
  monster2 = new Monster(1, 255, 0, 'monster_2', 30, 30, 200, 100, 2, xdir, ydir)
  hittable_monster = new Monster(1, 255, 0, 'point_monster', 30, 30, 247, 230, 1, xdir, ydir)
  lvl = new Level(1 , 0, 5)

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
