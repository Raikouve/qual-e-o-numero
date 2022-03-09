const API_URL = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300;'

const displayNumber = document.getElementById('number');
const input = document.getElementById('input');
const sendButton = document.getElementById('send-button');
let feedback = document.getElementById('feedback');
let newGameBtn = document.getElementById('new-game-button');

// A variável result recebe o valor do número aleatório.
let result = 0;
// A viariável randomNumber recebe o corpo da requisição.
let randomNumber = {};
// A variável finish recebe o valor true quando o usuário acertar o número ou a requisição retornar um erro.
let finish = false;

// A função abaixo (getRandomNumber) é responsável por fazer a requisição da API e retornar um número aleatório entre 1 e 300 (inclusive) e alterar o estado da variável result para o valor retornado. Além disso, verifica se o resultado é undefined, se for, mostra uma mensagem de erro, desabilita o botão de enviar e finaliza o jogo.
const getRandomNumber = async () => {
  const request = await fetch(API_URL);
  const response = await request.json();
  randomNumber = response;
  result = response.value;
  if (result === undefined) {
    number.innerHTML = randomNumber.StatusCode;
    feedback.innerHTML = 'Erro';
    feedback.classList.add('red');
    displayNumber.classList.add('red');
    sendButton.disabled = true;
    sendButton.className = 'disabled';
    finish = true;
    verifiIfIsFinish();
  }
  return response;
}

getRandomNumber();

// A função abaixo (setFeedback) é responsável por alterar o estado da variável feedback segundo os critérios definidos. Além disso, faz algumas verificações como se o valor passado no input é um número, se o valor é maior que o resultado e se o valor é menor que o resultado.
const setFeedback = (number) => {
  const inputParsed = parseInt(input.value);
  if (!input.value.match(/^[0-9]+$/)) {
    feedback.innerHTML = 'Digite apenas números positivos';
    feedback.classList.add('red');
    displayNumber.classList.add('red');
  } else {
    if (number < inputParsed) {
      feedback.innerHTML = 'É menor';
      feedback.className = 'orange';
      displayNumber.classList.remove('red');
    } else if (number > inputParsed) {
      feedback.innerHTML = 'É maior';
      feedback.className = 'orange';
      displayNumber.classList.remove('red');
    } else {
      feedback.innerHTML = 'Você acertou!!!';
      feedback.className = 'green';
      displayNumber.classList.add('green');
      sendButton.disabled = true;
      sendButton.className = 'disabled';
      finish = true;
    }
  }
}

// Evento que é executado quando o usuário clicar no botão de jogar novamente. Ao clicar, o jogo é reiniciado, os valores são resetados e uma nova requisição é feita.
newGameBtn.addEventListener('click', () => {
  getRandomNumber();
  feedback.innerHTML = '';
  displayNumber.classList.remove('red');
  displayNumber.classList.remove('green');
  displayNumber.innerHTML = 0;
  sendButton.disabled = false;
  sendButton.className = '';
  finish = false;
  newGameBtn.classList.add('hidden');
});

const verifiIfIsFinish = () => {
  if (finish) {
    newGameBtn.classList.remove('hidden');
  }
}

// Evento que é executado quando o usuário clicar no botão de enviar. Ao clicar, a função setFeedback é chamada e o valor do input é passado como parâmetro. Além disso, o valor do input é limpo e é verificado se o jogo já acabou.
sendButton.addEventListener('click', async () => {
  setFeedback(result);
  displayNumber.innerHTML = input.value;
  input.value = '';
  verifiIfIsFinish();
}
);
