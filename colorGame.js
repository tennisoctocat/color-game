/* colorGame.js
Cynthia Hom
7/23/17
JS for game based on RGB color system
User picks the color that matches the 
numbers for RGB

Concepts: DOM manipulation
	1. Using JS, CSS, HTML together!!
	2. JS events

*/

//select h1
var h1 = document.querySelector("h1");

//number of squares to display
var numSquares = 6;

// random list of colors array- param. is number
//of values to generate
var colors = [];
// make the color to be found show up in header
var pickedColor;  //var for correct color

// select all squares
var squares = document.querySelectorAll(".square");
//select the span to manipulate the correct color's RGB values
var colorDisplay = document.getElementById("colorDisplay");
//select span with the correct/incorrect messages
var messageDisplay = document.querySelector("#message");
// button to reset game
var resetButton = document.querySelector("#reset");
// easy/harwd buttons
var  modeButtons = document.querySelectorAll(".mode");


init();

// set up the page- like a run() function
function init()
{
	setupModeButtons();
	setupSquares();

	// make reset button work
	resetButton.addEventListener("click", function()
	{
		reset();
	})

	reset();
}

function setupSquares()
{

	//loop through squares array, and
	//assign colors and click listneners
	for (var index = 0; index < squares.length; index++)
	{	
		//add click listneners to squares to change appearance
		//depending if correct or incorrect
		squares[index].addEventListener("click", function()
		{
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare to pickedColor (correct color)
			if(clickedColor === pickedColor)
			{
				// display correct message
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				//change reset button to "play again?"
				resetButton.textContent = "Play Again?";
			}
			else
			{
				//make square disappear
				this.style.background = "#232323";
				// make the message have a try again message
				message.textContent = "Try again";	
			}
		})
	}
}

function setupModeButtons()
{
	// add liseners to easy/hard buttons
	for(var i = 0; i < modeButtons.length; i++)
	{
		modeButtons[i].addEventListener("click", function()
		{
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			// change the value of numSquares 
			//depending on level clicked
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		})
	}
}


function reset()
{
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();

	resetButton.textContent = "New Colors";

	///change color display to match picked color
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	// for each value in array, loop thru and assign a color
	for (var i = 0; i < squares.length; i++)
	{
		// if there is a color in the array at that index,
		//make the square color equal to the 
		//color in the array
		if (colors[i])
		{
			// make sure squares are visiblez
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else
		{
			// hide bottom 3 squares in easy mode
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}


// changes all colors to the color passed in
function changeColors(color)
{
	//loop thru all squares, change each color
	// to match given color
	for (var index = 0; index < colors.length; index++)
	{
		squares[index].style.background = color;
	}
}

// picks a color at random to be the correct 
//one from the colors array
function pickColor()
{
	//pick a random number
	var random = Math.floor(Math.random() * colors.length);
	//use to access the color in the array
	return colors[random];
}


//generates a random array of numbers (rgb values)
function generateRandomColors(num)
{
	//make an array
	var arr = [];
	//loop thru num times
	for (var i = 0; i < num; i++)
	{
		//get color and push random color into array
		arr.push(randomColor());
	}
	//return array
	return arr;
}

//randomColor is to generate the random color
function randomColor()
{
	//pick a red value
	var r = Math.floor(Math.random() * 256);
	//'' green
	var g = Math.floor(Math.random() * 256);
	//'' blue
	var b = Math.floor(Math.random() * 256);
	//construct string and return
	return "rgb(" + r + ", " + g + ", " + b + ")";
}