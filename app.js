// Variables
const setTime = $('.setTime');
const startTime = $('.startTime');
const btn = $('button');
let changeWorkIntvl = null;
let workSecs = 0;
let restSecs = 0;
let workSeconds = 0;
let restSeconds = 0;
let round = 0;
let rounds = 0;
let totalTim = 0;
let totalTime = 0;
let totalSec = 0;
let totalMin = 0;
let totalIntvl = null;

function changeTotal(){
  if(totalTime <= 0){
    clearInterval(totalIntvl);
  }
  totalMin = Math.floor(totalTime / 60);
  totalSec = totalTime % 60;
  totalTime--;
}

// Change the work time
function changeWork(){
  $('.counter-name')[0].innerHTML = 'Work';
  $('.rounds')[0].innerHTML = rounds;
  const minutes = Math.floor(workSeconds / 60);
  const seconds = (workSeconds % 60);
  if(rounds > 0 && workSeconds > 0){
    $('.counter-time')[0].innerHTML = `
      <span>${("0" + minutes).slice(-2)}:</span>
      <span>${("0" + seconds).slice(-2)}</span>
      <p>${('0'+totalMin).slice(-2)}:${('0'+totalSec).slice(-2)}</p>
    `;
  } else if(rounds == 1){
    resetTimer();
    workIntvlManager(false);
  } else {
    restIntvlManager(true);
    changeTheme();
    workIntvlManager(false);
  }
  workSeconds--;
}

// Change the rest time
function changeRest(){
  $('.counter-name')[0].innerHTML = 'Rest';
  const minutes = Math.floor(restSeconds / 60);
  const seconds = Math.floor(restSeconds % 60);
  if(rounds > 0 && restSeconds > 0){
    $('.counter-time')[0].innerHTML = `
      <span>${("0" + minutes).slice(-2)}:</span>
      <span>${("0" + seconds).slice(-2)}</span>
      <p>${('0'+totalMin).slice(-2)}:${('0'+totalSec).slice(-2)}</p>
    `;
  } else {
    workIntvlManager(true);
    changeTheme();
    restIntvlManager(false);
  }
  restSeconds--;
}

// Reset the timer and display restart option
function resetTimer(){
  $('.rounds').css('display', 'none');
  $('.counter-name').css('display', 'none');
  $('.counter-time')[0].innerHTML = '<span>Congo!</span><p>Your workout is complete</p><button style="background-color:#31A620;color:#99E98D" onclick=\'rounds=round;totalTime = totalTim;changeTotal();totalIntvl=window.setInterval(changeTotal,1000);workIntvlManager(true);$(".rounds").css("display", "flex");$(".counter-name").css("display", "block")\'>RESTART</button>';
}

// Change theme function
function changeTheme(){
  if($('header').hasClass('blue')){
    $('header').removeClass('blue');
    $('.counter').removeClass('blue');
    $('body').removeClass('blue');
    $('.rounds').removeClass('blue');
  } else {
    $('header').addClass('blue');
    $('.counter').addClass('blue');
    $('body').addClass('blue');
    $('.rounds').addClass('blue');
  }
}

// Event listeners
btn.on('click', (e) => {
  startTime.removeClass('hide');
  setTime.addClass('hide');

  round = $('#input-round')[0].value;
  workSecs = Number($('#input-work-second')[0].value) + (Number($('#input-work-minute')[0].value) * 60);
  restSecs = Number($('#input-rest-second')[0].value) + (Number($('#input-rest-minute')[0].value) * 60);
  totalTim = (workSecs * round) + (restSecs * (round-1));

  rounds = round;
  totalTime = totalTim;
  changeTotal();
  totalIntvl = window.setInterval(changeTotal, 1000);
  workIntvlManager(true);
});

// Work interval manager function
function workIntvlManager(flag){
  if(flag){
    workSeconds = workSecs;
    changeWork();
    changeWorkIntvl = window.setInterval(changeWork, 1000);
  } else {
    clearInterval(changeWorkIntvl);
  }
}

// Rest interval manager function
function restIntvlManager(flag){
  if(flag){
    restSeconds = restSecs;
    changeRest();
    rounds--;
    changeRestIntvl = window.setInterval(changeRest, 1000);
  } else {
    clearInterval(changeRestIntvl);
  }
}