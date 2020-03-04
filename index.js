
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
                <img src=${currentQues.photo} alt="image of city" class="photo">
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
            <li id="js-answered"> Question Number: ${STORE.currentQuestion + 1} of ${STORE.questions.length} </li>
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
                <label for="options">${currentQues.options[i]}</label> <br/>

        `);
    }
}

function handleQuestions() {
    $('body').on('click','#next-ques', (event) => {
      STORE.currentQuestion === STORE.questions.length ? displayResults() : renderAQuestion();
    });
  }

  function displayResults() {
      const resultHtml = $(
          `
        <fieldset class="center">
          <div class="elements-in-box-adjust">
              <legend>Your score is: ${STORE.score} / ${STORE.questions.length}</legend>
          </div>
          <div class="js-options options"> </div>
          <div>
              <button type="submit" id="restart">Restart Quiz</button>
          </div>
          <div class="feedback"> </div>
        </fieldset>          
          `)
          STORE.currentQuestion = 0;
          STORE.score = 0;

          $("main").html(resultHtml);
  }

  function restartQuiz() {
      $('body').on("click", "#restart", function(event){
          renderAQuestion();
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
    restartQuiz();
}

$(handleQuizApp);
