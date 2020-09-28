/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameIsPlaying, lastRoll, winScore;
var dieStyle = document.querySelectorAll('.dice')

init();

// roll function and add to score
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameIsPlaying) {
        
        //1. Random number
        var dice = [Math.floor(Math.random() * 6) + 1,Math.floor(Math.random() * 6) + 1];
        console.log(activePlayer, lastRoll, dice);

        //2. Display the result
        var diceDOM = document.querySelectorAll('.dice');
        diceDOM[0].style.display = 'inline-block';
        diceDOM[0].src = 'dice-' + dice[0] + '.png';
        diceDOM[1].style.display = 'inline-block';
        diceDOM[1].src = 'dice-' + dice[1] + '.png';
        
        //2a. check that two 6's have not been rolled in a row
        if (dice[0] === 6 && lastRoll || dice[1] === 6 && lastRoll || dice[0] === 6 && dice[1] === 6) {
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer] = 0;
            nextPlayer();
        //3. Update the round score IF the rolled number was NOT a 1
        } else if (dice[0] !== 1 && dice[1] !== 1) { 
            // Add score
            roundScore += dice[0] + dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if (dice[0] === 6 || dice[1] === 6) {
                lastRoll = true;
            } else {
                lastRoll = false;
            }
        } else {
            //Next player
            nextPlayer();

        }
    }
});

// next step - add hold function
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameIsPlaying) {
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        console.log(scores,winScore);

        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = ' Winner!';
            dieStyle[0].style.display = dieStyle[1].style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameIsPlaying = false;
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastRoll = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    dieStyle[0].style.display = dieStyle[1].style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
   
    winScore = document.getElementById('winning-score').value;
    
    scores = [0,0];
    roundScore = 0;
    lastRoll = 0;
    activePlayer = 0; // 0 will be player 1, 1 will be player 2.  Remember: arrays start at position 0!
    document.getElementById('score-0').textContent = 0; // another (faster) way to select an element by its ID
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    dieStyle[0].style.display = dieStyle[1].style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    if (winScore > 0) {
        gameIsPlaying = true;
    }
}

//document.querySelector('#current-' + activePlayer).textContent = dice; // this updates the dice number in the "current" score location for the active player.  This is also called a setter.
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent; // this is called a getter as it is only reading.

/*
YOUR 3 CHALLENGES
Change the game to follwo these rules:
1. A player loses his ENTIRE score when he rolls two 6 in a row.  After that, it's the next player's urn.  (Hint: Always save the previous dice roll in a separate variable).
2. Add an input field to the HTML where the players can set the winning score, so that they can change the predefined score of 100.  (Hint: you can read that the value with the .value property in JavaScript).  This is a good opportunity to use google to figure this out.
3. Add another die to the game, so that there are two dice.  The player loses his current score when one of them is a 1.  (Hint: you will need CSS to position the second die, so take a look at the CSS code for the first one.)
*/