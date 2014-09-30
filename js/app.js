// =================================
// document ready (events for buttons)
$(document).ready( function() {
  $("#start").click( startQuiz );
  $(".photos").find("img").click( answer );
  $("#next").click( next );
  $("#again").click( startQuiz );
});

// =================================
// global game
var game = new Game();

// =================================
function startQuiz() {
  // switch from introduction screen to quiz if applicable
  displayQuiz($("#intro"));

  // switch from finish screen to quiz if applicable
  displayQuiz($("#finish"));

  displayQuestion(game.resetGame());
}

// =================================
function displayQuiz(sectionToHide) {
  if (sectionToHide.is(":visible")) {
    sectionToHide.fadeOut("fast", function() {
      $("#quiz").fadeIn("fast");
    });
  }
}

// =================================
function displayQuestion(question) {
  // remove existing photo highlights
  $(".wrong").removeClass("wrong");
  $(".correct").removeClass("correct");

  // hide results
  $(".results").fadeOut("fast");

  // display question
  $(".question-index").html( question.number );
  $(".question-count").html( game.getQuestionsSize() );
  $(".score").text( game.score );
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
  $(".score").text( game.score );
  $(".results-text").text(option.resultText);
  $("#next").text( game.onLastQuestion() ? "Finish" : "Next");
  $(".results").slideDown();
}

// =================================
function next() {
  if (game.onLastQuestion()) {
    displayFinish();
  }
  else
  {
    displayQuestion(game.incrementQuestion());
  }
}

// =================================
function displayFinish() {
  $("#quiz").fadeOut("fast", function() {
    $("#finish").fadeIn("fast");
  });

  $(".score-text").text(game.getScoreText());
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
  };

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

  this.getScoreText = function () {
    var pct = this.score / this.getQuestionsSize();
    if (pct === 1.0)
      return "Congratulations!  Perfect Score!";
    if (pct >= 0.7)
      return "Great Job!  You really know your poison ivy.";
    if (pct >= 0.4)
      return "You have some studying to do.  Be careful out there.";
    if (pct >= 0.1)
      return "Stay home.  It's safer for you indoors.";
    else
      return "Come on buddy.  You failed on purpose.";
  };

  this.createQuestions = function() {
    var question1 = new Question(1, "Which one is poison ivy?",
      new Option("images/virginiacreeper.jpg", false, "Sorry.  This is Virginia Creeper with a group of 5 leaves.  Poison ivy has leaves of 3."),
      new Option("images/poison-ivy1.jpg", true, "Correct!  Poison ivy has leaves of 3.  The other plant is Virginia Creeper."));

    var question2 = new Question(2, "Can you pick the poison ivy?",
      new Option("images/wild_bean.jpg", false, "Incorrect.  While this wild bean plant has leaes of three, the leaves are the wrong shape."),
      new Option("images/poison-ivy2.jpg", true, "Absolutely!  This is poison ivy.  The other photo is wild bean."));

    var question3 = new Question(3, "Only one of these is poison ivy.",
      new Option("images/poison-ivy3.jpg", true, "YES!  This is indeed poison ivy.  The imposter is boxelder."),
      new Option("images/boxelder_2.jpg", false, "Sorry.  This isn't poison ivy.  It's a young boxelder tree.  Can you see the difference?"));

    var question4 = new Question(4, "Which one is poison ivy?",
      new Option("images/boxelder_1.jpg", false, "Nope.  Boxelder again.  Young boxelder trees are often mistaken for poison ivy.  Notice the two leaves lower on the branch opposite each other."),
      new Option("images/poison-ivy4.jpg", true, "Absolutely!  Poison ivy is often seen on vines up a tree.  Can you see the two leaves opposite each other on the boxelder branch?"));

    var question5 = new Question(5, "Which one is NOT safe to touch?",
      new Option("images/poison-ivy5.jpg", true, "YES!  This is indeed poison ivy.  That strawberry plant wants to be touched."),
      new Option("images/strawberryleaves.jpg", false, "Sorry.  You can touch this plant, especially if you love strawberries!"));

    var question6 = new Question(6, "Can you identify the poison ivy?",
      new Option("images/red_poison_ivy.jpg", true, "Bingo!  Poison ivy leaves change color in the fall.  The other plant is wild blackberry.  It's edges are too serrated to be poison ivy."),
      new Option("images/wild_blackberry.jpg", false, "Sorry. This is wild blackberry.  Poison ivy changes color in the fall, and it's leaf edges are not serrated like blackberry."));

    var question7 = new Question(7, "Which one is poison ivy?",
      new Option("images/not_poison_ivy.jpg", false, "This is not poison ivy.  It's leaves are too thin near the stem."),
      new Option("images/poison-ivy7.jpg", true, "Congratulations!  This is poison ivy.  The leaves of the other plant are too narrow close to the stem."));

    var question8 = new Question(8, "Which one is poison ivy?",
      new Option("images/wild_strawberry.jpeg", false, "No.  Sorry.  This is wild strawberry."),
      new Option("images/poison-ivy8.jpg", true, "Absolutely!  You chose the poison ivy.  The other plant is wild strawberry."));

    var question9 = new Question(9, "This is a harder one.  Will the real poison ivy please step forward?",
      new Option("images/hog_peanut.jpg", false, "No.  This is hog peanut.  Notice how the leaves have more of a heart shape?"),
      new Option("images/poison-ivy9.jpg", true, "We can't fool you at all!  The other plant is hog peanut.  It's leaves have more of a heart shape."));

    var question10 = new Question(10, "Poison ivy?",
      new Option("images/Poison_Ivy_movie.jpg", true, "Holy Correct Answer Batman!"),
      new Option("images/catwoman.jpg", false, "What?  You must be a Catwoman fan."));

    return [ question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 ];
    // return [ question1, question2 ];
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