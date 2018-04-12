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

let l = 41.2;

let centerFirstArc = (l * firstNum) / 2; //координаты центра первой дуги
let bendFirstArc = -70; // Изгиб первой дуги
let endFirstArc = l * firstNum; // Координаты конца первой дуги

let centerSecondArc = ((l * firstNum) + ((l * firstNum) + (l * secondNum))) / 2; //Координаты центра второй дуги
let bendSecondArc = -70 / 2; //Изгиб второй дуги
let endSecondArc = (l * secondNum) + (l * firstNum); // Координаты конца второй дуги

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
firstNumberInput.style.left = (centerFirstArc + 'px');
firstNumberInput.style.bottom = ((bendFirstArc * (-2.5)) + 'px'); //Расположение первого input над дугой

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
            secondNumberInput.style.left = (centerSecondArc + 'px');
            secondNumberInput.style.top = ((bendFirstArc * (-1.5)) + 'px'); //Расположение второго input над дугой
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBmaXJzdE51bSA9IHJhbmRvbU51bSg2LCA5KTtcclxubGV0IHNlY29uZE51bSA9IHJhbmRvbU51bSgxMSwgMTQpIC0gZmlyc3ROdW07XHJcbmxldCBzdW1OdW0gPSBmaXJzdE51bSArIHNlY29uZE51bTtcclxubGV0IGF4aXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF4aXNcIik7XHJcblxyXG5mdW5jdGlvbiByYW5kb21OdW0obWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59O1xyXG5cclxuLy9leGFtcGxlXHJcbmxldCBleGFtcGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4YW1wbGUnKTtcclxuZXhhbXBsZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJmaXJzdC1udW1cIj4ke2ZpcnN0TnVtfTwvc3Bhbj4gKyA8c3BhbiBjbGFzcz1cInNlY29uZC1udW1cIj4ke3NlY29uZE51bX08L3NwYW4+ICA9ICA8c3BhbiBjbGFzcz1cInN1bVwiPj88L3NwYW4+YDtcclxuXHJcbmxldCBleGFtcGxlRmlyc3ROdW0gPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5maXJzdC1udW0nKTtcclxubGV0IGV4YW1wbGVTZWNvbmROdW0gPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5zZWNvbmQtbnVtJyk7XHJcbmxldCBhbW91bnQgPSBleGFtcGxlLnF1ZXJ5U2VsZWN0b3IoJy5zdW0nKTtcclxuXHJcbi8vQ2FudmFzXHJcbmxldCBjb252Q29udCA9IGF4aXMucXVlcnlTZWxlY3RvcignLmNudnMtYm94Jyk7XHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY252cycpO1xyXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5sZXQgbCA9IDQxLjI7XHJcblxyXG5sZXQgY2VudGVyRmlyc3RBcmMgPSAobCAqIGZpcnN0TnVtKSAvIDI7IC8v0LrQvtC+0YDQtNC40L3QsNGC0Ysg0YbQtdC90YLRgNCwINC/0LXRgNCy0L7QuSDQtNGD0LPQuFxyXG5sZXQgYmVuZEZpcnN0QXJjID0gLTcwOyAvLyDQmNC30LPQuNCxINC/0LXRgNCy0L7QuSDQtNGD0LPQuFxyXG5sZXQgZW5kRmlyc3RBcmMgPSBsICogZmlyc3ROdW07IC8vINCa0L7QvtGA0LTQuNC90LDRgtGLINC60L7QvdGG0LAg0L/QtdGA0LLQvtC5INC00YPQs9C4XHJcblxyXG5sZXQgY2VudGVyU2Vjb25kQXJjID0gKChsICogZmlyc3ROdW0pICsgKChsICogZmlyc3ROdW0pICsgKGwgKiBzZWNvbmROdW0pKSkgLyAyOyAvL9Ca0L7QvtGA0LTQuNC90LDRgtGLINGG0LXQvdGC0YDQsCDQstGC0L7RgNC+0Lkg0LTRg9Cz0LhcclxubGV0IGJlbmRTZWNvbmRBcmMgPSAtNzAgLyAyOyAvL9CY0LfQs9C40LEg0LLRgtC+0YDQvtC5INC00YPQs9C4XHJcbmxldCBlbmRTZWNvbmRBcmMgPSAobCAqIHNlY29uZE51bSkgKyAobCAqIGZpcnN0TnVtKTsgLy8g0JrQvtC+0YDQtNC40L3QsNGC0Ysg0LrQvtC90YbQsCDQstGC0L7RgNC+0Lkg0LTRg9Cz0LhcclxuXHJcbihmdW5jdGlvbiBjcmVhdGVGaXJzdEFyYygpIHsgLy/QoNC40YHRg9C10Lwg0L/QtdGA0LLRg9GOINC00YPQs9GDXHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZWQnO1xyXG4gICAgY3R4Lm1vdmVUbygwLCA4NSk7IC8v0LvQtdCy0YvQuSDQvdC40LbQvdC40Lkg0YPQs9C+0LsgY2FudmFzXHJcbiAgICBjdHgucXVhZHJhdGljQ3VydmVUbyhjZW50ZXJGaXJzdEFyYywgYmVuZEZpcnN0QXJjLCBlbmRGaXJzdEFyYywgODUpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKTsgLy8g0KDQuNGB0YPQtdC8INGB0YLRgNC10LvQutGDINC/0LXRgNCy0L7QuSDQtNGD0LPQtVxyXG4gICAgY3R4Lm1vdmVUbyhlbmRGaXJzdEFyYywgODUpO1xyXG4gICAgY3R4LmxpbmVUbyhlbmRGaXJzdEFyYyAtIDE1LCA4MCk7XHJcbiAgICBjdHgubW92ZVRvKGVuZEZpcnN0QXJjLCA4NSk7XHJcbiAgICBjdHgubGluZVRvKGVuZEZpcnN0QXJjIC0gMiwgNzIpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlU2Vjb25kQXJjKCkgeyAvL9Cg0LjRgdGD0LXQvCDQstGC0L7RgNGD0Y4g0LTRg9Cz0YNcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5tb3ZlVG8oZW5kRmlyc3RBcmMsIDg1KTtcclxuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKGNlbnRlclNlY29uZEFyYywgYmVuZFNlY29uZEFyYywgZW5kU2Vjb25kQXJjLCA4NSk7XHJcbiAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpOyAvLyDQoNC40YHRg9C10Lwg0YHRgtGA0LXQu9C60YMg0LLRgtC+0YDQvtC5INC00YPQs9C1XHJcbiAgICBjdHgubW92ZVRvKGVuZFNlY29uZEFyYywgODUpO1xyXG4gICAgY3R4LmxpbmVUbyhlbmRTZWNvbmRBcmMgLSAxNSwgODApO1xyXG4gICAgY3R4Lm1vdmVUbyhlbmRTZWNvbmRBcmMsIDg1KTtcclxuICAgIGN0eC5saW5lVG8oZW5kU2Vjb25kQXJjIC0gMiwgNzMpO1xyXG4gICAgY3R4LnN0cm9rZSgpO1xyXG59O1xyXG5cclxuLy9JbnB1dHNcclxubGV0IGZpcnN0TnVtYmVySW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5maXJzdE51bWJlcklucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG5maXJzdE51bWJlcklucHV0LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBcIjFcIik7XHJcbmZpcnN0TnVtYmVySW5wdXQuY2xhc3NMaXN0LmFkZCgnbnVtYmVyLWlucHV0Jyk7XHJcbmNvbnZDb250LmFwcGVuZChmaXJzdE51bWJlcklucHV0KTtcclxuZmlyc3ROdW1iZXJJbnB1dC5zdHlsZS5sZWZ0ID0gKGNlbnRlckZpcnN0QXJjICsgJ3B4Jyk7XHJcbmZpcnN0TnVtYmVySW5wdXQuc3R5bGUuYm90dG9tID0gKChiZW5kRmlyc3RBcmMgKiAoLTIuNSkpICsgJ3B4Jyk7IC8v0KDQsNGB0L/QvtC70L7QttC10L3QuNC1INC/0LXRgNCy0L7Qs9C+IGlucHV0INC90LDQtCDQtNGD0LPQvtC5XHJcblxyXG5sZXQgc2Vjb25kTnVtYmVySW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cclxubGV0IGVxdWFsbHlJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbmVxdWFsbHlJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcclxuZXF1YWxseUlucHV0LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBcIjJcIik7XHJcbmVxdWFsbHlJbnB1dC5jbGFzc0xpc3QuYWRkKCdlcXVhbGx5SW5wdXQnKTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrVmFsdWUoaW5wdXRWYWx1ZSwgc3BhblZhbHVlLCBzcGFuKSB7IC8vINCf0YDQvtCy0LXRgNC60LAg0LfQvdCw0YfQtdC90LjRjyBpbnB1dFxyXG4gICAgaWYgKGlucHV0VmFsdWUudmFsdWUgIT0gc3BhblZhbHVlKSB7XHJcbiAgICAgICAgaW5wdXRWYWx1ZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZXJyb3InKTtcclxuICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ3NwYW4tLS1lcnJvcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dFZhbHVlLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzcGFuKTtcclxuICAgICAgICBpbnB1dFZhbHVlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1lcnJvcicpO1xyXG4gICAgICAgIHNwYW4uY2xhc3NMaXN0LnJlbW92ZSgnc3Bhbi0tLWVycm9yJyk7XHJcbiAgICAgICAgYXBwZW5kSW5wdXRWYWx1ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZmlyc3ROdW1iZXJJbnB1dC5kaXNhYmxlZCA9PT0gdHJ1ZSAmJiBzZWNvbmROdW1iZXJJbnB1dC5kaXNhYmxlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGFtb3VudC5hZnRlcihlcXVhbGx5SW5wdXQpOyAvL9Cy0YvQstC+0LTQuNC8IGlucHV0INGB0YPQvNC80YsuXHJcbiAgICAgICAgYW1vdW50LnJlbW92ZSgpO1xyXG4gICAgfTtcclxuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRJbnB1dFZhbHVlKCkgeyAvLyDQn9GA0L7QstC10YDQutCwINC+0YHRgtCw0LLRiNC40YXRgdGPIGlucHV0XHJcbiAgICBsZXQgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuICAgIGZvciAobGV0IGlucHV0IG9mIGlucHV0cykge1xyXG5cclxuICAgICAgICBpZiAoIWlucHV0LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHNlY29uZE51bWJlcklucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgICAgICAgICBzZWNvbmROdW1iZXJJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICBzZWNvbmROdW1iZXJJbnB1dC5jbGFzc0xpc3QuYWRkKCdudW1iZXItaW5wdXQnKTtcclxuICAgICAgICAgICAgY29udkNvbnQuYXBwZW5kKHNlY29uZE51bWJlcklucHV0KTtcclxuICAgICAgICAgICAgc2Vjb25kTnVtYmVySW5wdXQuc3R5bGUubGVmdCA9IChjZW50ZXJTZWNvbmRBcmMgKyAncHgnKTtcclxuICAgICAgICAgICAgc2Vjb25kTnVtYmVySW5wdXQuc3R5bGUudG9wID0gKChiZW5kRmlyc3RBcmMgKiAoLTEuNSkpICsgJ3B4Jyk7IC8v0KDQsNGB0L/QvtC70L7QttC10L3QuNC1INCy0YLQvtGA0L7Qs9C+IGlucHV0INC90LDQtCDQtNGD0LPQvtC5XHJcbiAgICAgICAgICAgIGNyZWF0ZVNlY29uZEFyYygpOyAvLyDQoNC40YHRg9C10Lwg0LTRg9Cz0YNcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2hlY2tTdW1OdW1iZXJzKCkgeyAvLyDQn9GA0L7QstC10YDQutCwIGlucHV0INGBINGB0YPQvNC80L7QuVxyXG4gICAgaWYgKGVxdWFsbHlJbnB1dC52YWx1ZSA9PT0gU3RyaW5nKHN1bU51bSkpIHtcclxuICAgICAgICBlcXVhbGx5SW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGVxdWFsbHlJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZXJyb3InKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXF1YWxseUlucHV0LmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1lcnJvcicpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZmlyc3ROdW1iZXJJbnB1dC5vbmlucHV0ID0gKCkgPT4gY2hlY2tWYWx1ZShmaXJzdE51bWJlcklucHV0LCBmaXJzdE51bSwgZXhhbXBsZUZpcnN0TnVtKTtcclxuc2Vjb25kTnVtYmVySW5wdXQub25pbnB1dCA9ICgpID0+IGNoZWNrVmFsdWUoc2Vjb25kTnVtYmVySW5wdXQsIHNlY29uZE51bSwgZXhhbXBsZVNlY29uZE51bSk7XHJcbmVxdWFsbHlJbnB1dC5vbmlucHV0ID0gY2hlY2tTdW1OdW1iZXJzOyJdLCJmaWxlIjoibWFpbi5qcyJ9
