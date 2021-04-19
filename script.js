const question = document.querySelector("#question");
const url = "http://jservice.io/api/random";
const form = document.querySelector("form");
const button = document.querySelector("button");
const quesForm = document.querySelector("#questionForm");
let randomAnswer;

function initialize() {
  return fetch(url).then((resp) => resp.json());
}

function randomQuestion() {
  initialize().then((data) => {
    // console.log(data[0]);
    question.innerText = data[0].question;
    randomAnswer = data[0].answer;
  });
}
randomQuestion();

function handleSubmit(e) {
  e.preventDefault();
  let value = e.target.answer.value;
  if (value === randomAnswer) {
    alert("You got it right");
  } else {
    alert("Better luck next time!");
  }
  e.target.reset();
  randomQuestion();
}

function handleClick() {
  quesForm.style.display = "block";
}

form.addEventListener("submit", handleSubmit);
button.addEventListener("click", handleClick);
