// =================================
// document ready (events for buttons)
$(document).ready( function() {
  $("#start").click( startQuiz );
  $(".photos img").click( answer );
  $("#next").click( next );
});

// =================================
// global game
var game = new Game();

// =================================
function startQuiz() {
  // switch from introduction screen to quiz if applicable
  if ($("#intro").is(":visible")) {
    $("#intro").fadeOut("fast", function() {
      $("#quiz").fadeIn("fast");
    });
  }

  displayQuestion(game.resetGame());
}

// =================================
function displayQuestion(question) {
  // remove existing photo highlights
  $(".photos img").removeClass("wrong");
  $(".photos img").removeClass("correct");

  // hide results
  $(".results").fadeOut("fast");

  // display question
  $("#question-index").html( question.number );
  $("#question-count").html( game.getQuestionsSize() );
  $("#score").text( game.score );
  $(".question").html( question.questionText );
  displayPhoto($("#photo1"), question.option1);
  displayPhoto($("#photo2"), question.option2);
}

// =================================
function displayPhoto(photo, option) {
  photo.data("option", option);
  photo.attr("src", option.picture);
}

// =================================
function answer() {
  var question = game.getCurrentQuestion();
  var option = $(this).data("option");

  // don't allow question to be answered more than once
  if (question.answered)
    return;

  question.answered = true;

  // highlight photos wrong or right
  if (option.isCorrect) {
    $(this).addClass("correct");
    game.score++;
  }
  else {
    $(this).addClass("wrong");
    $(this).siblings().addClass("correct");
  }

  displayResults(option);
}

// =================================
function displayResults(option) {
  $("#score").text( game.score );
  $(".results-text").text(option.resultText);
  $(".results").fadeIn("fast");
  $("#next").text( game.onLastQuestion() ? "Finish" : "Next");
}

// =================================
function next() {
  var question = game.onLastQuestion() ? game.resetGame() : game.incrementQuestion();
  displayQuestion(question);
}

// =================================
// Classes

// =================================
function Game() {
  this.currentQuestionIndex = 0;
  this.score = 0;

  this.resetGame = function() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.resetQuestions();
    return this.getCurrentQuestion();
  };

  this.resetQuestions = function() {
    for (var i = 0; i < this.questions.length; i++)
      this.questions[i].answered = false;
  }

  this.getQuestionsSize = function() {
    return this.questions.length;
  };

  this.getCurrentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
  };

  this.incrementQuestion = function () {
    if (!this.onLastQuestion()) {
      this.currentQuestionIndex++;
    }
    return this.getCurrentQuestion();
  };

  this.onLastQuestion = function () {
    return this.currentQuestionIndex === this.getQuestionsSize() - 1;
  };

  this.createQuestions = function() {
    var question1 = new Question(1, "Which one is poison ivy?",
      new Option("images/test2.jpg", true, "Correct! Poison ivy has leaves of 3."),
      new Option("images/test1.jpg", false, "Sorry. You chose the wrong one.  Poison ivy has leaves of 3."));

    var question2 = new Question(2, "Yo... pick the poison ivy dude!",
      new Option("images/test1.jpg", true, "Right on! Poison ivy has 3 leaves."),
      new Option("images/test2.jpg", false, "Sorry. You chose a boxelder tree."));

    return [ question1, question2 ];
  };

  this.questions = this.createQuestions();
  this.resetGame();
}

// =================================
function Question(number, questionText, option1, option2) {
  this.number = number;
  this.questionText = questionText;
  this.option1 = option1;
  this.option2 = option2;
  this.answered = false;
}

// =================================
function Option(picture, isCorrect, resultText) {
  this.picture = picture;
  this.isCorrect = isCorrect;
  this.resultText = resultText;
}