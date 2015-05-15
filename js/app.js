
$(document).ready(function(){
	var currentNumber;
	var count;
	var lastDiff;

	newGame();
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

	$(document).on("keypress", 'form', function (e) {
		var code = e.keyCode || e.which;
		if (code == 13) {
			e.preventDefault();
			guessNumber();
			return false;
		}
	});
});

function newGame(){
	currentNumber = parseInt((Math.random() * 100));
	count = 0;
	$("#feedback").text("Make your Guess!");
	$("#count").text(0);
	$("#userGuess").val("");
	$("#guessList").empty();
}

function guessNumber(){
	var guess = +$("#userGuess").val();
	if (isNaN(guess) || typeof guess !== "number" || guess > 100 || guess < 1 || parseInt(guess, 10) !== guess ){
		alert("Please enter a valid integer between 1 and 100");
		return;
	}

	count++;

	if (count !== 1){
		$("#guessList").append(", ");
	}
	$("#guessList").append("<li>" + guess + "</li>");
	$("#count").text(count);
	
	var diff = Math.abs(guess - currentNumber)
	if (count === 1){
		if (diff === 0){
			$("#feedback").text("You're right!  The answer is " + currentNumber +".  You guessed correctly in " + count + " tries.");
		} else if (diff > 50){
			writeOutput("Ice Cold: ", guess)
		} else if (diff > 30){
			writeOutput("Cold: ", guess);
		} else if (diff > 20){
			writeOutput("Warm: ", guess);
		} else if (diff > 10){
			writeOutput("Hot: ", guess);
		} else{
			writeOutput("Very Hot: ", guess);
		}	
	} else {
		if (diff === 0){
			$("#feedback").text("You're right!  The answer is " + currentNumber +".  You guessed correctly in " + count + " tries.");		
		} else if (lastDiff == diff){
			writeOutput("No Change: ", guess);
		} else if (lastDiff < diff){
			writeOutput("Colder: ", guess);
		} else {
			writeOutput("Warmer: ", guess);
		}
	}

	lastDiff = diff;
}

function writeOutput(text, currentGuess){
	$("#feedback").text(text + ((currentGuess>currentNumber) ? "Too High" : "Too Low"));
}