'use strict'

const   Wrapper = document.querySelector('.wrapper'),
        Container = document.querySelector('.container'),
        FullpageSlide = Container.children,
        FullpageSlideCount = FullpageSlide.length,
        Pager = document.createElement('ul'),
        Top_Logo = document.querySelector('.logo'),
        Top_SNS = document.querySelector('.top_sns'),
        Scroll = document.querySelector('.scroll'),
        Btn_app_down = document.querySelector('.fixed_app_down'),
        Btn_rider = document.querySelector('.btn_rider');
let Currentidx = 0,
    WheelTimeOut = 0;

for(let i = 0; i < FullpageSlideCount; i++){
    FullpageSlide[i].style.top = 100 * i + '%';
    Pager.innerHTML += '<li></li>';
}

Pager.classList.add('pager');
Wrapper.append(Pager);

function MovePage(idx){
    Container.style.top = -100 * idx + '%';
    Container.classList.add('on');
    setTimeout(() => FullpageSlide[idx].classList.add('animation'), 200);
    Currentidx = idx;
    Pager_On(idx);
    Btn_on(idx);
    if(idx == FullpageSlideCount - 1){
        Top_Logo.style.opacity = '0';
        Top_SNS.style.opacity = '0';
        Scroll.style.opacity = '0';
    }else{
        Top_Logo.style.opacity = '1';
        Top_SNS.style.opacity = '1';
        Scroll.style.opacity = '1';}
}
function Pager_On(idx){
    for(let i = 0; i < FullpageSlideCount; i++){
        Pager.children[i].classList.remove('on');
    }
    if(idx == 0 || idx == FullpageSlideCount - 1){
        Pager.style.opacity = 0;
    }else{
        Pager.style.opacity = 1;
    }
    
    Pager.children[idx].classList.add('on');
}

function Btn_on(idx){
    if(idx > 0){
        Btn_app_down.style.display = 'block';
        Btn_rider.style.opacity = 0;
        setTimeout(() => {
            Btn_rider.style.display = 'none';
            Btn_app_down.style.opacity = 1;
        }, 500);
    }else{
        Btn_rider.style.display = 'block';
        Btn_app_down.style.opacity = 0;
        setTimeout(() => {
            Btn_rider.style.opacity = 1;
            Btn_app_down.style.display = 'none';
        }, 500);
    }
}

// 이벤트시 움직이는 값 함수
function MoveIdx(a, b){
    if(a > b){
        if(Currentidx >= FullpageSlideCount - 1){
            return
        }else{
            MovePage(Currentidx + 1);
        }
    }else{
        if(Currentidx <= 0){
            return
        }else{
            MovePage(Currentidx - 1);
        }
    }
}

// 휠 이벤트
Container.addEventListener('wheel', (delta) => {
    clearTimeout(WheelTimeOut);
    WheelTimeOut = setTimeout(() => MoveIdx(delta.deltaY, 0), 200);
});


// 모바일 슬라이드
let startY = '',
    endY = '';

Container.addEventListener('touchstart', (event) => {
    startY = event.touches[0].screenY;
});

Container.addEventListener('touchend', (event) => {
    endY = event.changedTouches[0].screenY;
    MoveIdx(startY, endY);
});

MovePage(0);

// 모달창
const   Modal = document.querySelector('.modal'),
        ModalContainer = document.querySelector('.modal_container'),
        Modal_Close_Btn = document.querySelector('.modal_close');

window.onload = function(){
    setTimeout(() => {
        Modal.style.display = 'block';
        setTimeout(() => ModalContainer.style.bottom = '0', 100);
    } ,6000);
}
Modal_Close_Btn.addEventListener('click',(e) => {
    e.preventDefault();
    Modal.style.display = 'none';
});