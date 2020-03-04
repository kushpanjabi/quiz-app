
/* when user clicks on the start quiz button */

function startQuiz() {
    $('#start').on('click', function(event) {
        renderAQuestion();

    });
}

/* renders a question (and updates the que and score tracker) */

function renderAQuestion() {

    updateQuestionAndScore();
    let currentQues = STORE.questions[STORE.currentQuestion];
    
    const questionHtml = $(`
    
    <form id="js-questions" class="question-form">

        <fieldset class="center">
            <div class="elements-in-box-adjust">
                <legend>${currentQues.question}</legend>
            </div>
            <div class="js-options options"> </div>
            <div>
                <button type="submit" id="answer">Submit</button>
                <button type="submit" id="next-ques">Next</button>
            </div>
            <div class="feedback"> </div>
        </fieldset>
    </form>
    `)

    $('main').html(questionHtml);
    updateOptions();
    $("#next-ques").hide();
}

/* updates the question tracker and score */

function updateQuestionAndScore() {
    const questionAndScoreHtml = $(
        `<ul>
            <li id="js-answered"> Question Number: ${STORE.currentQuestion + 1} / ${STORE.questions.length} </li>
            <li id="js-score"> Score: ${STORE.score} / ${STORE.questions.length} </li> 
        </ul>
        `)


    $('.question-and-score').html(questionAndScoreHtml);
    }

/* updates the multiple choice radio options for the current question */

function updateOptions() {
    let currentQues = STORE.questions[STORE.currentQuestion];
    
    for (let i = 0; i < currentQues.options.length; i++) {
        $('.js-options').append(`
            <input type="radio" name="options" id="option${i+1}" value="${currentQues.options[i]}" tabindex="${i+1}">
                <label for="option${i+1}">${currentQues.options[i]}</label> <br/>
                <span id="js-r${i+1}"></span>

        `);
    }
}

function handleQuestions() {
    $('body').on('click','#next-ques', (event) => {
      STORE.currentQuestion === STORE.questions.length ? displayResults() : renderAQuestion();
    });
  }
  

function handleSelectOption() {
    $('body').on("submit", "#js-questions", function(event){
        event.preventDefault();
        let currentQues = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val();

        if (!selectedOption) {
            alert("You must choose an option!");
            return;
        }

        if(selectedOption === currentQues.answer) {
            STORE.score++;
            $('.feedback').append(`You are correct!<br/>`);
        } else {
            $('.feedback').append(`You got it wrong! <br/> The answer is actually "${currentQues.answer}"</br>`);
        }

        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score} / ${STORE.questions.length}`);
        $('#answer').hide();
        $("input[type=radio]").attr('disabled', true);
        $("#next-ques").show();

    });
}

function handleQuizApp() {
    startQuiz();
    handleQuestions();
    handleSelectOption();
}

$(handleQuizApp);
