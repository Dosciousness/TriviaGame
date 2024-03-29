$(document).ready(function() {
  console.log("Top of the Mornin");
  let questions = [
    {
      question: "What is the capital of California",
      answers: ["Los Angeles", "San Francisco", "Sacramento", "San Diego"],
      correctAnswer: "Sacramento"
    },
    {
      question: "What is the capitol of Maryland?",
      answers: ["Annapolis", "Baltimore", "Washington DC", "Columbia"],
      correctAnswer: "Washington DC"
    },
    {
      question: "What is the capital of Alabama?",
      answers: ["Mobile", "Birmingham", "Auburn", "Montgomery"],
      correctAnswer: "Montgomery"
    },
    {
      question: "What is the capital of New York",
      answers: ["Buffalo", "Albany", "Rochester", "New York"],
      correctAnswer: "Albany"
    },
    {
      question: "What is the capital of Arizona?",
      answers: ["Phoenix", "Scottsdale", "Tempe", "Tucson"],
      correctAnswer: "Phoenix"
    },
    {
      question: "What is the capital of Wyoming?",
      answers: ["Jackson", "Casper", "Cheyenne", "Laramie"],
      correctAnswer: "Cheyenne"
    }
  ];


  let timer;
  let countStartNum = 30;

  var viewPort = $("#quiz-area");

  var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNum,
    correct: 0,
    incorrect: 0,

    countdown: function() {
      game.counter--;
      $("#counterNum").text(game.counter);
      if (game.counter === 0) {
        console.log("TIME IS UP!! A Little Too Slow");
        game.timeUp();
      }
    },

    loadQuestion: function() {
      timer = setInterval(game.countdown, 1000);

      viewPort.html(
        "<h2>" + questions[this.currentQuestion].question + "</h2>"
      );

      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
        viewPort.append(
          "<button class='answer-button' id='button' data-name='" +
            questions[this.currentQuestion].answers[i] +
            "'>" +
            questions[this.currentQuestion].answers[i] +
            "</button>"
        );
      }
    },

    nextQuestion: function() {
      game.counter = countStartNum;
      $("#counterNum").text(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },

    timeUp: function() {
      clearInterval(timer);

      $("#counterNum").html(game.counter);

      viewPort.html("<h2>Out of Time; Are You Related To A Turtle?!</h2>");
      viewPort.append(
        "<h3>The Legit Answer Was: " +
          questions[this.currentQuestion].correctAnswer
      );

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 5 * 1000);
      } else {
        setTimeout(game.nextQuestion, 5 * 1000);
      }
    },

    results: function() {
      clearInterval(timer);

      viewPort.html(
        "<h2>Quiz Wrapped up, here is how it panned out for you!</h2>"
      );

      $("#counterNum").text(game.counter);

      viewPort.append("<h3>Correct Answers: " + game.correct + "</h3>");
      viewPort.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
      viewPort.append(
        "<h3>Unanswered: " +
          (questions.length - (game.incorrect + game.correct)) +
          "</h3>"
      );
      viewPort.append(
        "<br><button id='start-over'>Instant Replay it Up?</button>"
      );
    },

    clicked: function(e) {
      clearInterval(timer);
      if (
        $(e.target).attr("data-name") ===
        questions[this.currentQuestion].correctAnswer
      ) {
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },

    answeredIncorrectly: function() {
      game.incorrect++;

      clearInterval(timer);

      viewPort.html(
        "<h2 style='color:red'>Step your game up; thats Incorrect!!!</h2>"
      );
      viewPort.append(
        "<h3>The Proper and Legitimate Answer was: " +
          questions[game.currentQuestion].correctAnswer +
          "</h3>"
      );

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 6 * 1000);
      } else {
        setTimeout(game.nextQuestion, 6 * 1000);
      }
    },

    answeredCorrectly: function() {
    clearInterval(timer);

    game.correct++;

    viewPort.html(
        "<h2 style='color:green'>Lightweight Skills, thats CORRECT!</h2>"
    );    

    if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 2 * 1000);
    } else {
        setTimeout(game.nextQuestion, 2 * 1000);
    }
    },

    reset: function() {
      this.currentQuestion = 0;
      this.counter = countStartNum;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };

  $(document).on("click", "#start-over", function() {
    game.reset();
  });

  $(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
  });

  $(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counterNum'>30</span> Seconds</h2>"
    );
    game.loadQuestion();
  });
});
