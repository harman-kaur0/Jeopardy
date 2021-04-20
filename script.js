const question = document.querySelector("#question");
const url = "http://jservice.io/api/random";
const form = document.querySelector("form");
const button = document.querySelector("button");
const quesForm = document.querySelector("#questionForm");
const categories = document.querySelector("#categories");
const h3 = document.querySelector("h3");
const button2 = document.createElement("button");
button2.innerText = "next Question";

let randomAnswer;

function initialize() {
  return fetch(url).then((resp) => resp.json());
}

function randomQuestion() {
  initialize().then((data) => {
    console.log(data[0].answer);
    question.innerText = data[0].question;
    randomAnswer = data[0].answer;
    h3.innerText = `Category: ${data[0].category.title}`;
  });
}
//different answer scenerio
// the Bay of Biscay
// <i>The Fourth Musketeer</i>
// "The Jazz Singer"
// 15 (9 + 6)
// 1918 (World War I)
// (George) Luger

randomQuestion();

function corAns() {
  const p = document.createElement("p");
  p.id = "correctAnswer";
  p.innerText = `Answer:  ${randomAnswer}`;
  quesForm.appendChild(p);
}

function handleSubmit(e) {
  e.preventDefault();
  let value = e.target.answer.value;
  if (value === randomAnswer) {
    corAns();
    alert("You are a genius!!!");
  } else {
    corAns();
  }
  quesForm.replaceChild(button2, form);
  e.target.reset();
}

function handleClick() {
  quesForm.style.display = "block";
}

function buttonClick() {
  randomQuestion();
  quesForm.replaceChild(form, button2);
  const ans = document.querySelector("#correctAnswer");
  quesForm.removeChild(ans);
}

form.addEventListener("submit", handleSubmit);
button.addEventListener("click", handleClick);
button2.addEventListener("click", buttonClick);
