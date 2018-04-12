'use strict';

let firstNum = randomNum(6, 9);
let secondNum = randomNum(11, 14) - firstNum;
let sumNum = firstNum + secondNum;
let axis = document.querySelector(".axis");

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//example
let example = document.querySelector('.example');
example.innerHTML = `<span class="first-num">${firstNum}</span> + <span class="second-num">${secondNum}</span>  =  <span class="sum">?</span>`;

let exampleFirstNum = example.querySelector('.first-num');
let exampleSecondNum = example.querySelector('.second-num');
let amount = example.querySelector('.sum');

//Canvas
let convCont = axis.querySelector('.cnvs-box');
let canvas = document.querySelector('.cnvs');
let ctx = canvas.getContext('2d');


let cm = 41.2;


let centerFirstArc = (cm * firstNum) / 2; //координаты центра первой дуги
let bendFirstArc = -70; // Изгиб первой дуги
let endFirstArc = cm * firstNum; // Координаты конца первой дуги

let centerSecondArc = ((cm * firstNum) + ((cm * firstNum) + (cm * secondNum))) / 2; //Координаты центра второй дуги
let bendSecondArc = -70 / 2; //Изгиб второй дуги
let endSecondArc = (cm * secondNum) + (cm * firstNum); // Координаты конца второй дуги

(function createFirstArc() { //Рисуем первую дугу
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.moveTo(0, 85); //левый нижний угол canvas
    ctx.quadraticCurveTo(centerFirstArc, bendFirstArc, endFirstArc, 85);
    ctx.stroke();

    ctx.beginPath(); // Рисуем стрелку первой дуге
    ctx.moveTo(endFirstArc, 85);
    ctx.lineTo(endFirstArc - 15, 80);
    ctx.moveTo(endFirstArc, 85);
    ctx.lineTo(endFirstArc - 2, 72);
    ctx.stroke();
})();

function createSecondArc() { //Рисуем вторую дугу
    ctx.beginPath();
    ctx.moveTo(endFirstArc, 85);
    ctx.quadraticCurveTo(centerSecondArc, bendSecondArc, endSecondArc, 85);
    ctx.stroke();

    ctx.beginPath(); // Рисуем стрелку второй дуге
    ctx.moveTo(endSecondArc, 85);
    ctx.lineTo(endSecondArc - 15, 80);
    ctx.moveTo(endSecondArc, 85);
    ctx.lineTo(endSecondArc - 2, 73);
    ctx.stroke();
};

//Inputs
let firstNumberInput = document.createElement('input');
firstNumberInput.setAttribute("type", "text");
firstNumberInput.setAttribute("maxlength", "1");
firstNumberInput.classList.add('number-input');
convCont.append(firstNumberInput);
firstNumberInput.style.left = ((centerFirstArc - firstNumberInput.clientWidth/2) + 'px');
firstNumberInput.style.top = (bendFirstArc + 'px'); //Расположение первого input над дугой

let secondNumberInput = document.createElement('input');

let equallyInput = document.createElement('input');
equallyInput.setAttribute("type", "text");
equallyInput.setAttribute("maxlength", "2");
equallyInput.classList.add('equallyInput');

function checkValue(inputValue, spanValue, span) { // Проверка значения input
    if (inputValue.value != spanValue) {
        inputValue.classList.add('input--error');
        span.classList.add('span---error');
    } else {
        inputValue.disabled = true;
        console.log(span);
        inputValue.classList.remove('input--error');
        span.classList.remove('span---error');
        appendInputValue();
    };

    if (firstNumberInput.disabled === true && secondNumberInput.disabled === true) {
        amount.after(equallyInput); //выводим input суммы.
        amount.remove();
    };

};

function appendInputValue() { // Проверка оставшихся input
    let inputs = document.querySelectorAll('input');
    for (let input of inputs) {

        if (!input.disabled) {
            return;
        } else if (input.disabled) {
            secondNumberInput.setAttribute("type", "text");
            secondNumberInput.setAttribute("maxlength", "1");
            secondNumberInput.classList.add('number-input');
            convCont.append(secondNumberInput);
            secondNumberInput.style.left = ((centerSecondArc - secondNumberInput.clientWidth) + 'px');
            secondNumberInput.style.top = (bendFirstArc / 1.5 + 'px'); //Расположение второго input над дугой
            createSecondArc(); // Рисуем дугу
        }
    };
};

function checkSumNumbers() { // Проверка input с суммой
    if (equallyInput.value === String(sumNum)) {
        equallyInput.disabled = true;
        equallyInput.classList.remove('input--error');
    } else {
        equallyInput.classList.add('input--error');
    }
};

firstNumberInput.oninput = () => checkValue(firstNumberInput, firstNum, exampleFirstNum);
secondNumberInput.oninput = () => checkValue(secondNumberInput, secondNum, exampleSecondNum);
equallyInput.oninput = checkSumNumbers;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBmaXJzdE51bSA9IHJhbmRvbU51bSg2LCA5KTtcclxubGV0IHNlY29uZE51bSA9IHJhbmRvbU51bSgxMSwgMTQpIC0gZmlyc3ROdW07XHJcbmxldCBzdW1OdW0gPSBmaXJzdE51bSArIHNlY29uZE51bTtcclxubGV0IGF4aXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF4aXNcIik7XHJcblxyXG5mdW5jdGlvbiByYW5kb21OdW0obWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59O1xyXG5cclxuLy9leGFtcGxlXHJcbmxldCBleGFtcGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4YW1wbGUnKTtcclxuZXhhbXBsZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJmaXJzdC1udW1cIj4ke2ZpcnN0TnVtfTwvc3Bhbj4gKyA8c3BhbiBjbGFzcz1cInNlY29uZC1udW1cIj4ke3NlY29uZE51bX08L3NwYW4+ICA9ICA8c3BhbiBjbGFzcz1cInN1bVwiPj88L3NwYW4+YDtcclxuXHJcbmxldCBleGFtcGxlRmlyc3ROdW0gPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5maXJzdC1udW0nKTtcclxubGV0IGV4YW1wbGVTZWNvbmROdW0gPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmQtbnVtJyk7XHJcbmxldCBhbW91bnQgPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5zdW0nKTtcclxuXHJcbi8vQ2FudmFzXHJcbmxldCBjb252Q29udCA9IGF4aXMucXVlcnlTZWxlY3RvcignLmNudnMtYm94Jyk7XHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY252cycpO1xyXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5cclxubGV0IGNtID0gNDEuMjtcclxuXHJcblxyXG5sZXQgY2VudGVyRmlyc3RBcmMgPSAoY20gKiBmaXJzdE51bSkgLyAyOyAvL9C60L7QvtGA0LTQuNC90LDRgtGLINGG0LXQvdGC0YDQsCDQv9C10YDQstC+0Lkg0LTRg9Cz0LhcclxubGV0IGJlbmRGaXJzdEFyYyA9IC03MDsgLy8g0JjQt9Cz0LjQsSDQv9C10YDQstC+0Lkg0LTRg9Cz0LhcclxubGV0IGVuZEZpcnN0QXJjID0gY20gKiBmaXJzdE51bTsgLy8g0JrQvtC+0YDQtNC40L3QsNGC0Ysg0LrQvtC90YbQsCDQv9C10YDQstC+0Lkg0LTRg9Cz0LhcclxuXHJcbmxldCBjZW50ZXJTZWNvbmRBcmMgPSAoKGNtICogZmlyc3ROdW0pICsgKChjbSAqIGZpcnN0TnVtKSArIChjbSAqIHNlY29uZE51bSkpKSAvIDI7IC8v0JrQvtC+0YDQtNC40L3QsNGC0Ysg0YbQtdC90YLRgNCwINCy0YLQvtGA0L7QuSDQtNGD0LPQuFxyXG5sZXQgYmVuZFNlY29uZEFyYyA9IC03MCAvIDI7IC8v0JjQt9Cz0LjQsSDQstGC0L7RgNC+0Lkg0LTRg9Cz0LhcclxubGV0IGVuZFNlY29uZEFyYyA9IChjbSAqIHNlY29uZE51bSkgKyAoY20gKiBmaXJzdE51bSk7IC8vINCa0L7QvtGA0LTQuNC90LDRgtGLINC60L7QvdGG0LAg0LLRgtC+0YDQvtC5INC00YPQs9C4XHJcblxyXG4oZnVuY3Rpb24gY3JlYXRlRmlyc3RBcmMoKSB7IC8v0KDQuNGB0YPQtdC8INC/0LXRgNCy0YPRjiDQtNGD0LPRg1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmVkJztcclxuICAgIGN0eC5tb3ZlVG8oMCwgODUpOyAvL9C70LXQstGL0Lkg0L3QuNC20L3QuNC5INGD0LPQvtC7IGNhbnZhc1xyXG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oY2VudGVyRmlyc3RBcmMsIGJlbmRGaXJzdEFyYywgZW5kRmlyc3RBcmMsIDg1KTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7IC8vINCg0LjRgdGD0LXQvCDRgdGC0YDQtdC70LrRgyDQv9C10YDQstC+0Lkg0LTRg9Cz0LVcclxuICAgIGN0eC5tb3ZlVG8oZW5kRmlyc3RBcmMsIDg1KTtcclxuICAgIGN0eC5saW5lVG8oZW5kRmlyc3RBcmMgLSAxNSwgODApO1xyXG4gICAgY3R4Lm1vdmVUbyhlbmRGaXJzdEFyYywgODUpO1xyXG4gICAgY3R4LmxpbmVUbyhlbmRGaXJzdEFyYyAtIDIsIDcyKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVNlY29uZEFyYygpIHsgLy/QoNC40YHRg9C10Lwg0LLRgtC+0YDRg9GOINC00YPQs9GDXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKGVuZEZpcnN0QXJjLCA4NSk7XHJcbiAgICBjdHgucXVhZHJhdGljQ3VydmVUbyhjZW50ZXJTZWNvbmRBcmMsIGJlbmRTZWNvbmRBcmMsIGVuZFNlY29uZEFyYywgODUpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKTsgLy8g0KDQuNGB0YPQtdC8INGB0YLRgNC10LvQutGDINCy0YLQvtGA0L7QuSDQtNGD0LPQtVxyXG4gICAgY3R4Lm1vdmVUbyhlbmRTZWNvbmRBcmMsIDg1KTtcclxuICAgIGN0eC5saW5lVG8oZW5kU2Vjb25kQXJjIC0gMTUsIDgwKTtcclxuICAgIGN0eC5tb3ZlVG8oZW5kU2Vjb25kQXJjLCA4NSk7XHJcbiAgICBjdHgubGluZVRvKGVuZFNlY29uZEFyYyAtIDIsIDczKTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxufTtcclxuXHJcbi8vSW5wdXRzXHJcbmxldCBmaXJzdE51bWJlcklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuZmlyc3ROdW1iZXJJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuZmlyc3ROdW1iZXJJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgXCIxXCIpO1xyXG5maXJzdE51bWJlcklucHV0LmNsYXNzTGlzdC5hZGQoJ251bWJlci1pbnB1dCcpO1xyXG5jb252Q29udC5hcHBlbmQoZmlyc3ROdW1iZXJJbnB1dCk7XHJcbmZpcnN0TnVtYmVySW5wdXQuc3R5bGUubGVmdCA9ICgoY2VudGVyRmlyc3RBcmMgLSBmaXJzdE51bWJlcklucHV0LmNsaWVudFdpZHRoLzIpICsgJ3B4Jyk7XHJcbmZpcnN0TnVtYmVySW5wdXQuc3R5bGUudG9wID0gKGJlbmRGaXJzdEFyYyArICdweCcpOyAvL9Cg0LDRgdC/0L7Qu9C+0LbQtdC90LjQtSDQv9C10YDQstC+0LPQviBpbnB1dCDQvdCw0LQg0LTRg9Cz0L7QuVxyXG5cclxubGV0IHNlY29uZE51bWJlcklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbmxldCBlcXVhbGx5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5lcXVhbGx5SW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbmVxdWFsbHlJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgXCIyXCIpO1xyXG5lcXVhbGx5SW5wdXQuY2xhc3NMaXN0LmFkZCgnZXF1YWxseUlucHV0Jyk7XHJcblxyXG5mdW5jdGlvbiBjaGVja1ZhbHVlKGlucHV0VmFsdWUsIHNwYW5WYWx1ZSwgc3BhbikgeyAvLyDQn9GA0L7QstC10YDQutCwINC30L3QsNGH0LXQvdC40Y8gaW5wdXRcclxuICAgIGlmIChpbnB1dFZhbHVlLnZhbHVlICE9IHNwYW5WYWx1ZSkge1xyXG4gICAgICAgIGlucHV0VmFsdWUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWVycm9yJyk7XHJcbiAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdzcGFuLS0tZXJyb3InKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRWYWx1ZS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coc3Bhbik7XHJcbiAgICAgICAgaW5wdXRWYWx1ZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcclxuICAgICAgICBzcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ3NwYW4tLS1lcnJvcicpO1xyXG4gICAgICAgIGFwcGVuZElucHV0VmFsdWUoKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGZpcnN0TnVtYmVySW5wdXQuZGlzYWJsZWQgPT09IHRydWUgJiYgc2Vjb25kTnVtYmVySW5wdXQuZGlzYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgICBhbW91bnQuYWZ0ZXIoZXF1YWxseUlucHV0KTsgLy/QstGL0LLQvtC00LjQvCBpbnB1dCDRgdGD0LzQvNGLLlxyXG4gICAgICAgIGFtb3VudC5yZW1vdmUoKTtcclxuICAgIH07XHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gYXBwZW5kSW5wdXRWYWx1ZSgpIHsgLy8g0J/RgNC+0LLQtdGA0LrQsCDQvtGB0YLQsNCy0YjQuNGF0YHRjyBpbnB1dFxyXG4gICAgbGV0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XHJcbiAgICBmb3IgKGxldCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuXHJcbiAgICAgICAgaWYgKCFpbnB1dC5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dC5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBzZWNvbmROdW1iZXJJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuICAgICAgICAgICAgc2Vjb25kTnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgc2Vjb25kTnVtYmVySW5wdXQuY2xhc3NMaXN0LmFkZCgnbnVtYmVyLWlucHV0Jyk7XHJcbiAgICAgICAgICAgIGNvbnZDb250LmFwcGVuZChzZWNvbmROdW1iZXJJbnB1dCk7XHJcbiAgICAgICAgICAgIHNlY29uZE51bWJlcklucHV0LnN0eWxlLmxlZnQgPSAoKGNlbnRlclNlY29uZEFyYyAtIHNlY29uZE51bWJlcklucHV0LmNsaWVudFdpZHRoKSArICdweCcpO1xyXG4gICAgICAgICAgICBzZWNvbmROdW1iZXJJbnB1dC5zdHlsZS50b3AgPSAoYmVuZEZpcnN0QXJjIC8gMS41ICsgJ3B4Jyk7IC8v0KDQsNGB0L/QvtC70L7QttC10L3QuNC1INCy0YLQvtGA0L7Qs9C+IGlucHV0INC90LDQtCDQtNGD0LPQvtC5XHJcbiAgICAgICAgICAgIGNyZWF0ZVNlY29uZEFyYygpOyAvLyDQoNC40YHRg9C10Lwg0LTRg9Cz0YNcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2hlY2tTdW1OdW1iZXJzKCkgeyAvLyDQn9GA0L7QstC10YDQutCwIGlucHV0INGBINGB0YPQvNC80L7QuVxyXG4gICAgaWYgKGVxdWFsbHlJbnB1dC52YWx1ZSA9PT0gU3RyaW5nKHN1bU51bSkpIHtcclxuICAgICAgICBlcXVhbGx5SW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGVxdWFsbHlJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXF1YWxseUlucHV0LmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZmlyc3ROdW1iZXJJbnB1dC5vbmlucHV0ID0gKCkgPT4gY2hlY2tWYWx1ZShmaXJzdE51bWJlcklucHV0LCBmaXJzdE51bSwgZXhhbXBsZUZpcnN0TnVtKTtcclxuc2Vjb25kTnVtYmVySW5wdXQub25pbnB1dCA9ICgpID0+IGNoZWNrVmFsdWUoc2Vjb25kTnVtYmVySW5wdXQsIHNlY29uZE51bSwgZXhhbXBsZVNlY29uZE51bSk7XHJcbmVxdWFsbHlJbnB1dC5vbmlucHV0ID0gY2hlY2tTdW1OdW1iZXJzOyJdLCJmaWxlIjoibWFpbi5qcyJ9
