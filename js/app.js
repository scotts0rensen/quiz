$(document).ready( function() {
  $("#start").click( startQuiz );
  $(".photos img").click( chooseOption );
});

var questions = getQuestions();
var currentQuestionIndex;

function startQuiz() {
  // switch from introduction to quiz if applicable
  if ($("#intro").is(":visible")) {
    $("#intro").fadeOut("fast", function() {
      $("#quiz").fadeIn("fast");
    });
  }

  currentQuestionIndex = 0;
  setCurrentQuestion();
}

function setCurrentQuestion() {
  var question = getCurrentQuestion();
  $(".question").html(question.questionText);

  setOption($("#photo1"), question.option1);
  setOption($("#photo2"), question.option2);
}

function setOption(photo, option) {
  photo.data("option", option);
  photo.attr("src", option.picture);
}

function chooseOption() {
  var option = $(this).data("option");
  if (option.isCorrect)
    $(this).addClass("correct");
  else
    $(this).addClass("wrong");
  $(".results").fadeIn("fast");
};

function getCurrentQuestion() {
  return questions[currentQuestionIndex];
}

function getQuestions() {
  var question1 = new Question("Which one is poison ivy?",
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