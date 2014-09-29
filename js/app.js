$(document).ready( function() {

  $("#start").click( function () {
    $("#intro").fadeOut("fast", function() {
      $("#quiz").fadeIn("fast");
    });
  });

  $("#photo1").click( function() {
    $("#photo1").addClass("correct");
    $("#photo2").addClass("wrong");
    $(".results").fadeIn("fast");
  });

  startQuiz();
});

var questions = getQuestions();
var currentQuestion;

function startQuiz() {
  currentQuestion = 0;
  displayCurrentQuestion();
}

function displayCurrentQuestion() {
  question = getCurrentQuestion();
  $(".question").html(question.questionText);
  $("#photo1").attr("src",question.option1.picture);
  $("#photo2").attr("src",question.option2.picture);
}

function getCurrentQuestion() {
  return questions[currentQuestion];
}

function getQuestions() {
  var question1 = new Question("Whichhh one is poison ivy?",
    new Option("images/test2.jpg", true, "Correct! Poison ivy has leaves of 3."),
    new Option("images/test1.jpg", false, "Sorry. You chose fox something.  Poison ivy has leaves of 3."));

  return [ question1 ];
}

function Question(questionText, option1, option2) {
  this.questionText = questionText;
  this.option1 = option1;
  this.option2 = option2;
}

function Option(picture, isCorrect, resultText) {
  this.picture = picture;
  this.isCorrect = isCorrect;
  this.resultText = resultText;
}