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
const correctSticker = document.querySelector('#correct-gif')
const incorrectSticker = document.querySelector('#incorrect-gif')


let randomAnswer;
let currentQuesValue;

// our fetch
function initialize() {
  return fetch(url).then((resp) => resp.json());
}

// displays new question
function randomQuestion() {
  initialize().then((data) => {
    // console.log(data[0]);
    if (data[0].question === "" || data[0].question === "[video clip]") {
      randomQuestion();
    } else {
      question.innerText = data[0].question;
    }

    randomAnswer = data[0].answer;
    if (randomAnswer.charAt(0) === '<') {
      randomAnswer = randomAnswer.slice(3, -4)
    }

    currentQuesValue = data[0].value;
    console.log(randomAnswer)
    questionValue.innerText = `Value: ${parseInt(data[0].value)}`;
    // console.log(parseInt(data[0].value));
    h3.innerText = `Category: ${data[0].category.title}`;
  });
}


randomQuestion();

// displays correct answer
function corAns() {
  const p = document.createElement("p");
  p.id = "correctAnswer";
  p.innerText = `Answer:  ${randomAnswer}`;
  quesForm.appendChild(p);
}
const h4 = document.createElement("h4");
h4.innerText = 0;
startButton.appendChild(h4);

// handles answer submission and compares user answer to correct answer; also swaps form with next ? button; also adds value to score; also displays correct/incorrect sticker
function handleSubmit(e) {
  e.preventDefault();
  let value = e.target.answer.value;
  if (equalAnswers(randomAnswer) === equalAnswers(value)) {
    
    corAns();
    h4.innerText = parseInt(h4.innerText) + parseInt(currentQuesValue);
    correctSticker.style.display = 'block'
    setTimeout(()=>correctSticker.style.display = "none", 3000)
    // console.log(h4.innerText);
  } else {
    corAns();
    incorrectSticker.style.display = 'block'
    setTimeout(()=>incorrectSticker.style.display = "none", 3000)
  }
  quesForm.replaceChild(button2, form);
  e.target.reset();
}

//different answer scenerio - dont forget the answer is in the #quesForm
// the Bay of Biscay
// <i>The Fourth Musketeer</i>
// the <i>Appassionata</i>
// "The Jazz Singer"
// "Magic" Johnson
// 15 (9 + 6)
// 1918 (World War I)
// (George) Luger
// British Columbia & the Yukon Territory
// a View-Master

// rowed/rode - what to do?
// Margaret O\'Brien

// puts user answer and correct answer in same format
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

// starts the game
function handleClick() {
  quesForm.style.display = "block";
  h4.style.display = 'block';
  h2.style.display = 'block';
  button.style.display = 'none';
  startButton.style.display = 'block';
}

// next question button
function buttonClick() {
  randomQuestion();
  quesForm.replaceChild(form, button2);
  const ans = document.querySelector("#correctAnswer");
  quesForm.removeChild(ans);
}

// resets the score
function resetClick() {
  h4.innerText = 0;
}

form.addEventListener("submit", handleSubmit);
button.addEventListener("click", handleClick);
button2.addEventListener("click", buttonClick);
reset.addEventListener("click", resetClick);
