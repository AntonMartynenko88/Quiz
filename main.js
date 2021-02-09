const option1 = document.querySelector('.option1'),  //All answer options
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');


const optionElements = document.querySelectorAll('.option'); //All our options

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индех текущего вопроса
    indexOfPage = 0; // индех текущей страниц
    
const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0;  // Результат  викторины

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Кто из знаменитых художников за жизнь продал всего одну картину?',
        options: [
            'Винсент Ван Гог','Пьер Огюст Ренуар','Пабло Пикассо', 'Франсиско де Гойя',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое молоко никто не пил? ',
        options: [
            'Лошадиное', 'Козье', 'Птичье', 'Оленье',
        ],
        rightAnswer: 2
    },
    {
        question: 'Из чего сделан щит Капитана Америки?',
        options: [
            'Адамантиум','Карбонадий','Прометий','Вибраниум',
        ],
        rightAnswer: 3 
    },
    {
        question: 'Какой из этих городов - родина Казановы?',
        options: [
            'Неаполь','Милан','Венеция','Флоренция',
        ],
        rightAnswer: 2 
    },
    {
        question: 'Кто из этих знаменитых людей не является тезкой остальных?',
        options: [
            'Боярский','Лермонтов','Горбачёв','Дудь',
        ],
        rightAnswer: 3 
    },
    {
        question: 'У кого из "вампиров" кровь пьют только самки? ',
        options: [
            'Летучие мыши','Пиявки','Комары','Клещи',
        ],
        rightAnswer: 2 
    },
    {
        question: 'Какую позицию на поле называют "голкипер"?',
        options: [
            'Защитник','Нападающий','Вратарь','Полузащитник',
        ],
        rightAnswer: 2 
    },
    {
        question: 'Маленький мук из сказки был...?',
        options: [
            'Подростком','Лилипутом','Ребёнком','Карликом',
        ],
        rightAnswer: 3 
    },
    {
        question: '	Сколько горошин войдут в стакан ?',
        options: [
            'Столько, сколько влезет','Нисколько','Горошины не ходят','Смотря сколько горошин',
        ],
        rightAnswer: 2 
    },
    {
        question: 'Из какого меxа сделаны шапки королевскиx гвардейцев Великобритании?',
        options: [
            'Медвежий','Волчий','Овечий','Соболиный',
        ],
        rightAnswer: 0
    },
    
]; 


numberOfAllQuestion.innerHTML = questions.length ; //выводим кол-во вопросов


const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //Cам вопрос

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // Установка номера текущей страницы
    indexOfPage++; //Увеличения  страницы
};

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();        
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
            
        };
        if(completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    };
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {    
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct')
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong')
    }
    disableOptions();
}

const disableOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct','wrong');
    })

};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {   
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
};

btnNext.addEventListener('click', validate);

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();    
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load' , () => {    
    randomQuestion();
    answerTracker();
})