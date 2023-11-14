const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#7cb1e9', '#c8ddf5', '#c4dbf5', '#b6d6fa', '#5da2ec']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) =>
{
    event.preventDefault()
    screens[0].classList.add('up')
})


timeList.addEventListener('click', event =>
{
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createCircle()
    }
})


function startGame(){
    createCircle()
    setInterval(decreaceTime, 1000)
    setTime(time)
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Your score: <span class = "primary">${score}</span></h1>`
}

function decreaceTime(){
    if (time === 0){
        finishGame()
    }
    else{
        let current = --time
        if(current < 10){
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function getColor(){
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function createCircle(){
    const circle = document.createElement('div')
    const size = getRandomNum(10, 50)
    const {width, height}= board.getBoundingClientRect()
    const color = getColor()

    const x = getRandomNum(0, width - size)
    const y = getRandomNum(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = color

    board.append(circle)
}

function getRandomNum(min, max){
    return Math.round(Math.random()*(max-min) + min)
}