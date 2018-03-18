
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

var deck = new Array();

var players = new Array();

var currentPlayerIndex = 0;

var numCardsToDeal = 2;

function createDeck() {

  deck = new Array();

  for (var i = 0; i < values.length; i++) {

    for (var x = 0; x < suits.length; x++) {

      var weight = parseInt(values[i]);

      if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
        weight = 10;
      }

      if (values[i] == "A") {
        weight = 11;
      }

      var card = { Value: values[i], Suit: suits[x], Weight: weight };

      deck.push(card);
    }
  }
}

function createPlayers(numberOfPlayers) {

  players = new Array();

  numberOfPlayers -= 1;

  for (var i = 1; i <= numberOfPlayers; i++) {

    var hand = new Array();

    var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };

    players.push(player);
  }
}

function createPlayersUI() {

  document.getElementById('players').innerHTML = '';

  for (var i = 0; i < players.length; i++) {


    var div_playerid = document.createElement('div');

    div_playerid.innerHTML = players[i].ID;



    var div_hand = document.createElement('div');

    div_hand.id = 'hand_' + i;



    var div_points = document.createElement('div');

    div_points.className = 'points';

    div_points.id = 'points_' + i;



    var div_player = document.createElement('div');

    div_player.id = 'player_' + i;

    div_player.className = 'player';

    div_player.appendChild(div_playerid);

    div_player.appendChild(div_hand);

    div_player.appendChild(div_points);




    document.getElementById('players').appendChild(div_player);
  }
}

function shuffle() {

  for (var i = 0; i < 1000; i++) {

    var location1 = Math.floor((Math.random() * deck.length));

    var location2 = Math.floor((Math.random() * deck.length));

    var tmp = deck[location1];

    deck[location1] = deck[location2];

    deck[location2] = tmp;
  }
}

function start() {

  currentPlayerIndex = 0;

  createDeck();

  shuffle();

  createPlayers(2);

  createPlayersUI();

  updateStatusOnScreen('');

  dealHands();

  setActivePlayer(currentPlayerIndex);
}

function dealHands() {

  for (var i = 0; i < numCardsToDeal; i++) {

    for (var x = 0; x < players.length; x++) {

      var card = deck.pop();

      players[x].Hand.push(card);

      renderCard(card, x);

      updatePointsOnScreen();
    }
  }

  updateDeckOnScreen();
}

function renderCard(card, player) {

  var hand = document.getElementById('hand_' + player);

  hand.appendChild(createCardUI(card));
}

function createCardUI(card) {

  var cardDiv = document.createElement('div');

  cardDiv.className = 'card';

  cardDiv.innerHTML = card.Suit + ' ' + card.Value;

  return cardDiv;
}


function calculatePointsForPlayer(playerIndex) {

  var points = 0;

  for (var i = 0; i < players[playerIndex].Hand.length; i++) {

    points += players[playerIndex].Hand[i].Weight;
  }

  players[playerIndex].Points = points;

  return points;
}

function updatePointsOnScreen() {

  for (var i = 0; i < players.length; i++) {

    calculatePointsForPlayer(i);

    var pointsDiv = document.getElementById('points_' + i);

    pointsDiv.innerHTML = players[i].Points;
  }
}

function hitCurrentPlayer() {

  var card = deck.pop();

  players[currentPlayerIndex].Hand.push(card);

  renderCard(card, currentPlayerIndex);

  updatePointsOnScreen();

  updateDeckOnScreen();

  checkCurrentPlayerScore();
}

function currentPlayerStay() {

  currentPlayerIndex += 1;

  dealerTurn();
}

function getPlayerDiv(playerIndex) {

  return document.getElementById('player_' + playerIndex);
}

function setActivePlayer(playerIndex) {

  getPlayerDiv(currentPlayerIndex).classList.remove('active');

  currentPlayerIndex = playerIndex;

  getPlayerDiv(currentPlayerIndex).classList.add('active');
}

function dealerTurn() {

  while (isDealerFinished(currentPlayerIndex) === false) {
    
    hitCurrentPlayer();
  }

  endGame();
}

function isDealerFinished(playerIndex) {
  
  var result = false;
  
  if (players[playerIndex].Points > 17) {
 
    result = true;
  }
  
  return result;
}



function endGame() {

  var winnerIndex = -1;

  var winningScore = 0;

  for (var i = 0; i < players.length; i++) {

    if (players[i].Points > winningScore && players[i].Points < 22) {

      winnerIndex = i;
    }

    winningScore = players[i].Points;
  }

  updateStatusOnScreen('Winner: Player ' + players[winnerIndex].ID);
}

function checkCurrentPlayerScore() {

  if (players[currentPlayerIndex].Points > 21) {

    var status = 'Player: ' + players[currentPlayerIndex].ID + ' BUSTED';

    updateStatusOnScreen(status);
  }
}

function updateStatusOnScreen(status) {

  document.getElementById('status').innerHTML = status;
}

function updateDeckOnScreen() {

  document.getElementById('deckcount').innerHTML = deck.length;
}



window.addEventListener('load', function () {

  createDeck();

  shuffle();

  createPlayers(2);
});