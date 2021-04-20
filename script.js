const question = document.querySelector("#question");
const startButton = document.querySelector("#startButton");
const url = "http://jservice.io/api/random";
const form = document.querySelector("form");
const button = document.querySelector("button");
const quesForm = document.querySelector("#questionForm");
const categories = document.querySelector("#categories");
const h3 = document.querySelector("h3");
const questionValue = document.querySelector("#value");
const button2 = document.createElement("button");
button2.innerText = "next Question";
const h2 = document.querySelector('h2')

let randomAnswer;
let currentQuesValue;

function initialize() {
  return fetch(url).then((resp) => resp.json());
}

function randomQuestion() {
  initialize().then((data) => {
    // console.log(data[0]);
    if (data[0].question === "" || data[0].question === "[video clip]") {
      randomQuestion();
    } else {
      question.innerText = data[0].question;
    }

    randomAnswer = data[0].answer;
    currentQuesValue = data[0].value;
    console.log(randomAnswer)
    questionValue.innerText = `Value: ${parseInt(data[0].value)}`;
    // console.log(parseInt(data[0].value));
    h3.innerText = `Category: ${data[0].category.title}`;
  });
}


randomQuestion();

function corAns() {
  const p = document.createElement("p");
  p.id = "correctAnswer";
  p.innerText = `Answer:  ${randomAnswer}`;
  quesForm.appendChild(p);
}
const h4 = document.createElement("h4");
h4.innerText = 0;
startButton.appendChild(h4);

function handleSubmit(e) {
  e.preventDefault();
  let value = e.target.answer.value;
  if (equalAnswers(randomAnswer) === equalAnswers(value)) {
    
    corAns();
    h4.innerText = parseInt(h4.innerText) + parseInt(currentQuesValue);
    console.log(h4.innerText);
  } else {
    corAns();
  }
  quesForm.replaceChild(button2, form);
  e.target.reset();
}

//different answer scenerio - dont forget the answer is in the #quesForm
// the Bay of Biscay
// <i>The Fourth Musketeer</i>
// "The Jazz Singer"
// "Magic" Johnson
// 15 (9 + 6)
// 1918 (World War I)
// (George) Luger
// British Columbia & the Yukon Territory
// a View-Master

// rowed/rode - what to do?

function equalAnswers(ans) {
  ans = ans.toLowerCase()
  if (ans.charAt(0) === '<') {
    ans = ans.slice(3, -4)
  } else if (ans.indexOf('(')!== -1) {
    ans = ans.split('')
    const openParen = ans.indexOf('(')
    const closeParen = ans.indexOf(')')
    ans.splice(openParen, closeParen - openParen + 1)
    ans = ans.join('').trim()
  }
  ans = ans.split('')
  ans = ans.filter(char => char.match(/[A-Za-z0-9&.,-]|\s|\'/g))
  ans = ans.join('')
  console.log(ans)
  return ans
}

function handleClick() {
  quesForm.style.display = "block";
  h4.style.display = 'block';
  h2.style.display = 'block';
  button.style.display = 'none';
}

function buttonClick() {
  randomQuestion();
  quesForm.replaceChild(form, button2);
  const ans = document.querySelector("#correctAnswer");
  quesForm.removeChild(ans);
}

function resetClick() {
  h4.innerText = 0;
}

form.addEventListener("submit", handleSubmit);
button.addEventListener("click", handleClick);
button2.addEventListener("click", buttonClick);
reset.addEventListener("click", resetClick);
