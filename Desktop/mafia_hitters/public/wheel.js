// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    'outerRadius'     : 212,        // Set outer radius so wheel fits inside the background.
    'innerRadius'     : 75,         // Make wheel hollow so segments don't go all way to center.
    'textFontSize'    : 24,         // Set default font size for the segments.
    'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
    'textAlignment'   : 'outer',    // Align text to outside of wheel.
    'numSegments'     : 15,         // Specify number of segments.
    'segments'        :             // Define segments including colour and text.
    [                               // font size and test colour overridden on backrupt segments.
        {'fillStyle' : '#adedd5', 'text' : 'HIT'},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#fbee97', 'text' : 'wl'},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#fbee97', 'text' : 'HIT'},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#adedd5', 'text' : 'TRY AGAIN', 'textFontSize' : 12, 'textFillStyle' : '#ffffff'},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#adedd5', 'text' : 'HIT'},
        {'fillStyle' : '#fbee97', 'text' : 'wl'},
        {'fillStyle' : '#fbee97', 'text' : 'YOU MISS', 'textFontSize' : 12},
        {'fillStyle' : '#fbee97', 'text' : 'HIT'},
    ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 10,    // Duration in seconds.
        'spins'    : 5,     // Default number of complete spins.
        'callbackFinished' : alertPrize,
        'callbackSound'    : playSound,   // Function to call when the tick sound is to be triggered.
        'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
    },
    'pins' :				// Turn pins on.
    {
        'number'     : 15,
        'fillStyle'  : 'silver',
        'outerRadius': 4,
    }
});

// Loads the tick audio sound in to an audio object.
let audio = new Audio('tick.mp3');

// This function is called when the sound is to be played.
function playSound()
{
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
}

// Vars used by the code in this page to do power controls.
let wheelPower    = 0;
let wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel)
{
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false) {
        // Reset all to grey incase this is not the first time the user has selected the power.
        document.getElementById('pw1').className = "";
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";

        // Now light up all cells below-and-including the one selected by changing the class.
        if (powerLevel >= 1) {
            document.getElementById('pw1').className = "pw1";
        }

        if (powerLevel >= 2) {
            document.getElementById('pw2').className = "pw2";
        }

        if (powerLevel >= 3) {
            document.getElementById('pw3').className = "pw3";
        }

        // Set wheelPower var used when spin button is clicked.
        wheelPower = powerLevel;

        // Light up the spin button by changing it's source image and adding a clickable class to it.
        document.getElementById('spin_button').src = "./images/spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        if (wheelPower == 1) {
            theWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            theWheel.animation.spins = 6;
        } else if (wheelPower == 3) {
            theWheel.animation.spins = 10;
        }

        // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').src       = "./images/spin_on.png";
        document.getElementById('spin_button').className = "";

        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;
        // document.getElementsByClassName('wheel_table')[0].style.display = 'none';
        // document.getElementsByClassName('spin_response')[0].style.display = 'flex';
    }
    
}

const spinny = Array.from(document.getElementsByClassName('spin_prize'));
var spin2 = spinny[Math.floor(Math.random()*spinny.length)];

// 
// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";
    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.

    document.getElementsByClassName('star_prize')[0].style.display = 'none'; 
    document.getElementsByClassName('wheel_table')[0].style.display = 'flex';
        document.getElementById('root').style.display = 'block';
    // document.getElementsByClassName('spin_prize').style.display = 'none';
    spin2.style.display = 'none';
    spin2 = spinny[Math.floor(Math.random()*spinny.length)];
}



// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because 
// I specified callback in the parameters.
// -------------------------------------------------------
function alertPrize(indicatedSegment)
{
    // Just alert to the user what happened.
    if (indicatedSegment.text == 'TRY AGAIN') { 
        generateCode();
        document.getElementsByClassName('star_prize')[0].style.display = 'block'; 
        document.getElementsByClassName('wheel_table')[0].style.display = 'none';
        document.getElementById('root').style.display = 'none';
    } else if (indicatedSegment.text == 'YOU MISS'||'wl' || 'HIT') {
        document.getElementsByClassName('wheel_table')[0].style.display = 'none';
        document.getElementById('root').style.display = 'none';
        // document.getElementsByClassName('spin_response')[0].style.display = 'block';
        return (spin2.style.display = 'block') 
    } else {
        document.getElementsByClassName('wheel_table')[0].style.display = 'flex';
        // return (spin2.style.display = 'block') 
    }
}



var counter = ['A', 'F', 'H', 'I', 'M', 'R', 'S', 'T', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '#'];
var code = document.getElementById('code');
    function randomStr(len, arr) {

        var ans = '';
        for (var i = len; i > 0; i--) {
            ans +=
                arr[Math.floor(Math.random() * arr.length)];
        }
        return ans;
    }
    function generateCode() {
        code.innerHTML = randomStr(6, counter);
    }



// let api_url = 'https://6308-105-112-61-116.eu.ngrok.io/api/'

// async function getapi(){
//     let response = await fetch(api_url, {
//         method: 'GET',
//     })
//     let data = await response.json()
//     console.log(data)
//     if(response.ok){
//         return data
//     }
// }

// function getdata(data){
//     getapi().then(data => {
//         console.log(data)

// }

