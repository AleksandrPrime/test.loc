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
let exampleSecondNum = example.querySelector('.second-numb');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBmaXJzdE51bSA9IHJhbmRvbU51bSg2LCA5KTtcclxubGV0IHNlY29uZE51bSA9IHJhbmRvbU51bSgxMSwgMTQpIC0gZmlyc3ROdW07XHJcbmxldCBzdW1OdW0gPSBmaXJzdE51bSArIHNlY29uZE51bTtcclxubGV0IGF4aXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF4aXNcIik7XHJcblxyXG5mdW5jdGlvbiByYW5kb21OdW0obWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59O1xyXG5cclxuLy9leGFtcGxlXHJcbmxldCBleGFtcGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4YW1wbGUnKTtcclxuZXhhbXBsZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJmaXJzdC1udW1cIj4ke2ZpcnN0TnVtfTwvc3Bhbj4gKyA8c3BhbiBjbGFzcz1cInNlY29uZC1udW1cIj4ke3NlY29uZE51bX08L3NwYW4+ICA9ICA8c3BhbiBjbGFzcz1cInN1bVwiPj88L3NwYW4+YDtcclxuXHJcbmxldCBleGFtcGxlRmlyc3ROdW0gPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5maXJzdC1udW0nKTtcclxubGV0IGV4YW1wbGVTZWNvbmROdW0gPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmQtbnVtYicpO1xyXG5sZXQgYW1vdW50ID0gZXhhbXBsZS5xdWVyeVNlbGVjdG9yKCcuc3VtJyk7XHJcblxyXG4vL0NhbnZhc1xyXG5sZXQgY29udkNvbnQgPSBheGlzLnF1ZXJ5U2VsZWN0b3IoJy5jbnZzLWJveCcpO1xyXG5sZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNudnMnKTtcclxubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHJcbmxldCBjbSA9IDQxLjI7XHJcblxyXG5cclxubGV0IGNlbnRlckZpcnN0QXJjID0gKGNtICogZmlyc3ROdW0pIC8gMjsgLy/QutC+0L7RgNC00LjQvdCw0YLRiyDRhtC10L3RgtGA0LAg0L/QtdGA0LLQvtC5INC00YPQs9C4XHJcbmxldCBiZW5kRmlyc3RBcmMgPSAtNzA7IC8vINCY0LfQs9C40LEg0L/QtdGA0LLQvtC5INC00YPQs9C4XHJcbmxldCBlbmRGaXJzdEFyYyA9IGNtICogZmlyc3ROdW07IC8vINCa0L7QvtGA0LTQuNC90LDRgtGLINC60L7QvdGG0LAg0L/QtdGA0LLQvtC5INC00YPQs9C4XHJcblxyXG5sZXQgY2VudGVyU2Vjb25kQXJjID0gKChjbSAqIGZpcnN0TnVtKSArICgoY20gKiBmaXJzdE51bSkgKyAoY20gKiBzZWNvbmROdW0pKSkgLyAyOyAvL9Ca0L7QvtGA0LTQuNC90LDRgtGLINGG0LXQvdGC0YDQsCDQstGC0L7RgNC+0Lkg0LTRg9Cz0LhcclxubGV0IGJlbmRTZWNvbmRBcmMgPSAtNzAgLyAyOyAvL9CY0LfQs9C40LEg0LLRgtC+0YDQvtC5INC00YPQs9C4XHJcbmxldCBlbmRTZWNvbmRBcmMgPSAoY20gKiBzZWNvbmROdW0pICsgKGNtICogZmlyc3ROdW0pOyAvLyDQmtC+0L7RgNC00LjQvdCw0YLRiyDQutC+0L3RhtCwINCy0YLQvtGA0L7QuSDQtNGD0LPQuFxyXG5cclxuKGZ1bmN0aW9uIGNyZWF0ZUZpcnN0QXJjKCkgeyAvL9Cg0LjRgdGD0LXQvCDQv9C10YDQstGD0Y4g0LTRg9Cz0YNcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JlZCc7XHJcbiAgICBjdHgubW92ZVRvKDAsIDg1KTsgLy/Qu9C10LLRi9C5INC90LjQttC90LjQuSDRg9Cz0L7QuyBjYW52YXNcclxuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKGNlbnRlckZpcnN0QXJjLCBiZW5kRmlyc3RBcmMsIGVuZEZpcnN0QXJjLCA4NSk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpOyAvLyDQoNC40YHRg9C10Lwg0YHRgtGA0LXQu9C60YMg0L/QtdGA0LLQvtC5INC00YPQs9C1XHJcbiAgICBjdHgubW92ZVRvKGVuZEZpcnN0QXJjLCA4NSk7XHJcbiAgICBjdHgubGluZVRvKGVuZEZpcnN0QXJjIC0gMTUsIDgwKTtcclxuICAgIGN0eC5tb3ZlVG8oZW5kRmlyc3RBcmMsIDg1KTtcclxuICAgIGN0eC5saW5lVG8oZW5kRmlyc3RBcmMgLSAyLCA3Mik7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTZWNvbmRBcmMoKSB7IC8v0KDQuNGB0YPQtdC8INCy0YLQvtGA0YPRjiDQtNGD0LPRg1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbyhlbmRGaXJzdEFyYywgODUpO1xyXG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oY2VudGVyU2Vjb25kQXJjLCBiZW5kU2Vjb25kQXJjLCBlbmRTZWNvbmRBcmMsIDg1KTtcclxuICAgIGN0eC5zdHJva2UoKTtcclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7IC8vINCg0LjRgdGD0LXQvCDRgdGC0YDQtdC70LrRgyDQstGC0L7RgNC+0Lkg0LTRg9Cz0LVcclxuICAgIGN0eC5tb3ZlVG8oZW5kU2Vjb25kQXJjLCA4NSk7XHJcbiAgICBjdHgubGluZVRvKGVuZFNlY29uZEFyYyAtIDE1LCA4MCk7XHJcbiAgICBjdHgubW92ZVRvKGVuZFNlY29uZEFyYywgODUpO1xyXG4gICAgY3R4LmxpbmVUbyhlbmRTZWNvbmRBcmMgLSAyLCA3Myk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcbn07XHJcblxyXG4vL0lucHV0c1xyXG5sZXQgZmlyc3ROdW1iZXJJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbmZpcnN0TnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbmZpcnN0TnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIFwiMVwiKTtcclxuZmlyc3ROdW1iZXJJbnB1dC5jbGFzc0xpc3QuYWRkKCdudW1iZXItaW5wdXQnKTtcclxuY29udkNvbnQuYXBwZW5kKGZpcnN0TnVtYmVySW5wdXQpO1xyXG5maXJzdE51bWJlcklucHV0LnN0eWxlLmxlZnQgPSAoKGNlbnRlckZpcnN0QXJjIC0gZmlyc3ROdW1iZXJJbnB1dC5jbGllbnRXaWR0aC8yKSArICdweCcpO1xyXG5maXJzdE51bWJlcklucHV0LnN0eWxlLnRvcCA9IChiZW5kRmlyc3RBcmMgKyAncHgnKTsgLy/QoNCw0YHQv9C+0LvQvtC20LXQvdC40LUg0L/QtdGA0LLQvtCz0L4gaW5wdXQg0L3QsNC0INC00YPQs9C+0LlcclxuXHJcbmxldCBzZWNvbmROdW1iZXJJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblxyXG5sZXQgZXF1YWxseUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuZXF1YWxseUlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG5lcXVhbGx5SW5wdXQuc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIFwiMlwiKTtcclxuZXF1YWxseUlucHV0LmNsYXNzTGlzdC5hZGQoJ2VxdWFsbHlJbnB1dCcpO1xyXG5cclxuZnVuY3Rpb24gY2hlY2tWYWx1ZShpbnB1dFZhbHVlLCBzcGFuVmFsdWUsIHNwYW4pIHsgLy8g0J/RgNC+0LLQtdGA0LrQsCDQt9C90LDRh9C10L3QuNGPIGlucHV0XHJcbiAgICBpZiAoaW5wdXRWYWx1ZS52YWx1ZSAhPSBzcGFuVmFsdWUpIHtcclxuICAgICAgICBpbnB1dFZhbHVlLmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xyXG4gICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnc3Bhbi0tLWVycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0VmFsdWUuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGlucHV0VmFsdWUuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWVycm9yJyk7XHJcbiAgICAgICAgc3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdzcGFuLS0tZXJyb3InKTtcclxuICAgICAgICBhcHBlbmRJbnB1dFZhbHVlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChmaXJzdE51bWJlcklucHV0LmRpc2FibGVkID09PSB0cnVlICYmIHNlY29uZE51bWJlcklucHV0LmRpc2FibGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgYW1vdW50LmFmdGVyKGVxdWFsbHlJbnB1dCk7IC8v0LLRi9Cy0L7QtNC40LwgaW5wdXQg0YHRg9C80LzRiy5cclxuICAgICAgICBhbW91bnQucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGVuZElucHV0VmFsdWUoKSB7IC8vINCf0YDQvtCy0LXRgNC60LAg0L7RgdGC0LDQstGI0LjRhdGB0Y8gaW5wdXRcclxuICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xyXG4gICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7XHJcblxyXG4gICAgICAgIGlmICghaW5wdXQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgc2Vjb25kTnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgICAgICAgICAgIHNlY29uZE51bWJlcklucHV0LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBcIjFcIik7XHJcbiAgICAgICAgICAgIHNlY29uZE51bWJlcklucHV0LmNsYXNzTGlzdC5hZGQoJ251bWJlci1pbnB1dCcpO1xyXG4gICAgICAgICAgICBjb252Q29udC5hcHBlbmQoc2Vjb25kTnVtYmVySW5wdXQpO1xyXG4gICAgICAgICAgICBzZWNvbmROdW1iZXJJbnB1dC5zdHlsZS5sZWZ0ID0gKChjZW50ZXJTZWNvbmRBcmMgLSBzZWNvbmROdW1iZXJJbnB1dC5jbGllbnRXaWR0aCkgKyAncHgnKTtcclxuICAgICAgICAgICAgc2Vjb25kTnVtYmVySW5wdXQuc3R5bGUudG9wID0gKGJlbmRGaXJzdEFyYyAvIDEuNSArICdweCcpOyAvL9Cg0LDRgdC/0L7Qu9C+0LbQtdC90LjQtSDQstGC0L7RgNC+0LPQviBpbnB1dCDQvdCw0LQg0LTRg9Cz0L7QuVxyXG4gICAgICAgICAgICBjcmVhdGVTZWNvbmRBcmMoKTsgLy8g0KDQuNGB0YPQtdC8INC00YPQs9GDXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrU3VtTnVtYmVycygpIHsgLy8g0J/RgNC+0LLQtdGA0LrQsCBpbnB1dCDRgSDRgdGD0LzQvNC+0LlcclxuICAgIGlmIChlcXVhbGx5SW5wdXQudmFsdWUgPT09IFN0cmluZyhzdW1OdW0pKSB7XHJcbiAgICAgICAgZXF1YWxseUlucHV0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBlcXVhbGx5SW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWVycm9yJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVxdWFsbHlJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcclxuICAgIH1cclxufTtcclxuXHJcbmZpcnN0TnVtYmVySW5wdXQub25pbnB1dCA9ICgpID0+IGNoZWNrVmFsdWUoZmlyc3ROdW1iZXJJbnB1dCwgZmlyc3ROdW0sIGV4YW1wbGVGaXJzdE51bSk7XHJcbnNlY29uZE51bWJlcklucHV0Lm9uaW5wdXQgPSAoKSA9PiBjaGVja1ZhbHVlKHNlY29uZE51bWJlcklucHV0LCBzZWNvbmROdW0sIGV4YW1wbGVTZWNvbmROdW0pO1xyXG5lcXVhbGx5SW5wdXQub25pbnB1dCA9IGNoZWNrU3VtTnVtYmVyczsiXSwiZmlsZSI6Im1haW4uanMifQ==
