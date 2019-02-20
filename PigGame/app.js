/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

******************************************************************
* Notes

//selects a dom object by "id" textContent sets the text part (can only set plain text no html)
//innerHTML can set html text, <em></em> makes it italic
document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//this will get the value of the document element
var x = document.querySelector('#current-0').textContent;
console.log(x);

//add or remove classes
document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

*/

/****************************************************************
 * Variables
 */

//player scores
var scores;

//current round score
var roundScore;

//first player is 0 second is 1
var activePlayer;

//the amount needed to win
var winAmount;

//is the game state playing used to ignore button clicks if the game is won
//var gamePlaying = false;

/****************************************************************
 * Initialization
 */

Init();

/*****************************************************************
 * Functions
 */

document.querySelector('.btn-new').addEventListener('click', Init);

function Init() {
    //set all the scores
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    winAmount = null;

    document.getElementById('goal-amount').disabled = false;

    //1. turn the buttons back on and the dice off
    document.querySelector(".btn-roll").style.display = 'block';
    document.querySelector(".btn-hold").style.display = 'block';

    //this will get the css object and change [method].[property]
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice-two").style.display = "none";

    //get element by id doent require the #, and its "faster"
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //3. update the ui
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //need to remove active first to make sure we dont add a second one
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
}

//Roll Dice Button Clicked
document.querySelector(".btn-roll").addEventListener('click', function() 
{
    //as soon as they roll that value is locked in
    if(winAmount === null) {
        winAmount = document.getElementById('goal-amount').value;
    }

    //lock out the goal amount so it cant be changed mid play
    document.getElementById('goal-amount').disabled = true;

    //1. get the random number
    //math random gets 0-1 so * 6 +1 gets 1-6 floor cuts off the decimal
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceSecond = Math.floor(Math.random() * 6) + 1;

    //2. display results
    var diceDom = document.querySelector('.dice');
    var diceDomSecond = document.querySelector('.dice-two');

    //this will get the css object and change [method].[property]
    diceDom.style.display = 'block';
    diceDomSecond.style.display = 'block';

    diceDom.src = 'dice-' + dice + '.png';
    diceDomSecond.src = 'dice-' + diceSecond + '.png';

    //3. update score if roll was not a one
    if (dice !== 1 && diceSecond !== 1)
    {
        //if they roll two 6's you lose it all
        if (dice == 6 && diceSecond == 6)
        {
            //lose everything
            clearActivePlayer();

            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = "0";
            document.getElementById('current-' + activePlayer).textContent = "0";
            return;
        } 

        //Add score
        roundScore += dice + diceSecond;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } 
    else
    {
        clearActivePlayer();
    }
});

//Roll Dice Button Clicked
document.querySelector('.btn-hold').addEventListener('click', function() {
    // if(gamePlaying === false)
    //     return;

    //turn the roll dice back on
    document.querySelector('.btn-roll').style.display = 'block';

    //1. add score to active players global score
    scores[activePlayer] += roundScore;

    //2. update the UI 
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //3. check for win condition
    if(scores[activePlayer] >= winAmount)
    {
        playerWon();
        return;
    }

    //4. clear the current core and change the player
    changePlayer();
});

function changePlayer() {
    //set the round score back to 0 and the curernt 
    //round score back to 0
    document.getElementById("current-" + activePlayer).textContent = 0;
    roundScore = 0;

    //change the active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //toggle the backgrounds
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function clearActivePlayer() {
    //set the round score
    roundScore = 0;

    //set the current value to 0
    document.getElementById('current-' + activePlayer).textContent = 0;

    //disable roll button and only allow hold button
    document.querySelector('.btn-roll').style.display = 'none'
}

function playerWon() {
    //gamePlaying = false;

    //hide the roll and hold buttons and dice
    document.querySelector(".btn-roll").style.display = 'none';
    document.querySelector(".btn-hold").style.display = 'none';
    document.querySelector(".dice").style.display = "none";

    //add the winning classes
    document.getElementById('name-' + activePlayer).textContent = 'WINNER!';

    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
}

