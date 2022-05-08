class IndexMap1 {
    valueByIndex = [];
    valueByKey = {};

    add(key, value) {
        this.valueByIndex.push(value)
        this.valueByKey[key] = value;
    }

    set(key, value) { 
        this.add(key, value)
        return this;
    } 
    
    has(key) {
    return !!this.valueByKey[key];
        
    }

    get(key) {
        if (this.valueByKey[key]) return this.valueByKey[key];
        if (this.valueByIndex[key]) return this.valueByIndex[key];
        return null; 
    }

    getByKey(key){
        return this.valueByKey[key]

    }

    getByIndex(index){
        return this.valueByIndex[index]
    }
    
    
    remove(key) {
        return delete this.valueByKey[key]; 
    }

}


const SPEED_LIMIT = {
DEFAULT: 5,
FAST: 20
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let x = 100;
let y = 100;
let speed = SPEED_LIMIT.DEFAULT;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let timer;

let countActionCounts = 0;


let moveInfo = {
from: undefined,
to: undefined,
duration: 0,
speed: undefined
} 

const CONTROLLERS_CODE = {
KEY_ARROW_LEFT: 37,
KEY_ARROW_UP: 38,
KEY_ARROW_RIGHT: 39,
KEY_ARROW_DOWN: 40,
KEY_SHIFT: 16
}

const indexMap = new IndexMap1();


document.addEventListener('keydown', function(e) {
movement(e)
});

document.addEventListener('keyup', (e) => {
if (e.keyCode === CONTROLLERS_CODE.KEY_ARROW_LEFT || e.keyCode === CONTROLLERS_CODE.KEY_ARROW_RIGHT){
    moveInfo.to = x;
    trackAction(moveInfo.from, moveInfo.to, moveInfo.duration);
    clearInterval(timer);
    }

if (e.keyCode === CONTROLLERS_CODE.KEY_ARROW_UP || e.keyCode === CONTROLLERS_CODE.KEY_ARROW_DOWN){
    moveInfo.to = y;
    trackAction(moveInfo.from, moveInfo.to, moveInfo.duration);
    clearInterval(timer);
    }

if (e.keyCode == CONTROLLERS_CODE.KEY_SHIFT){
    speed = SPEED_LIMIT.DEFAULT;

}
});

function object() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'red';
ctx.fillRect(x, y, 10, 10);
}

setInterval(object, 1000 / 30)



function movement(e) {
    
    if (x >= canvas.width || x <= 0 || y >= canvas.height || y <= 0){
       // return;
    }

    if ((e.keyCode === CONTROLLERS_CODE.KEY_ARROW_LEFT || e.keyCode === CONTROLLERS_CODE.KEY_ARROW_RIGHT) && !moveInfo.from )
    {
        moveInfo.from = x ;
        secondCounter();
    }

    if ((e.keyCode === CONTROLLERS_CODE.KEY_ARROW_UP || e.keyCode === CONTROLLERS_CODE.KEY_ARROW_DOWN) && !moveInfo.from )
    {
        moveInfo.from = y ;
        secondCounter();
    }

    if(e.keyCode === CONTROLLERS_CODE.KEY_ARROW_LEFT)
    {
        x = x <= 0 ? x : x - speed;
    }
    
    else if (e.keyCode === CONTROLLERS_CODE.KEY_ARROW_UP)
    {
        y = y <= 0 ? y : y - speed;
    }

    else if (e.keyCode === CONTROLLERS_CODE.KEY_ARROW_RIGHT)
    {
        x = x >= canvas.width - 100 ? x : x + speed;
    }

    else if (e.keyCode === CONTROLLERS_CODE.KEY_ARROW_DOWN)
    {
        y = y >= canvas.height - 100 ? y : y + speed;
    }


    if (e.keyCode === CONTROLLERS_CODE.KEY_SHIFT){
        speed = SPEED_LIMIT.FAST;
        
    }

}


function secondCounter() {

if (timer) clearInterval(timer)
timer = setInterval(()=> { 
    console.log('duration do', moveInfo.duration);

    moveInfo.duration += 1;
    console.log('duration posle', moveInfo.duration);
}, 1)

}

function trackAction( from, to, duration) {
const maxPos = from > to ? from : to;
const minPos = from < to ? from : to;
console.log('duration track', duration);
const calcDuration = duration / 100;
console.log('duration track', calcDuration);
const speed = (maxPos - minPos) / calcDuration;
countActionCounts++;

indexMap.set(countActionCounts, {from, to, calcDuration, speed}) 

moveInfo = {
    from: undefined,
    to: undefined,
    duration: 0,
    speed: undefined
} 

clearInterval(timer);
//console.log('get', indexMap.get(countActionCounts));
//console.log('get(index)', indexMap.get(0));
//console.log('getByIndex()', indexMap.getByIndex(0));
console.log('getByKey()', indexMap.getByKey(countActionCounts));
}
