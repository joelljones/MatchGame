var MatchGame = {};

//  Sets up a new game after HTML document has loaded.
//  Renders a 4x4 board of cards.
$(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});


//  Generates and returns an array of matching card values.
MatchGame.generateCardValues = function () {

  // Create a sequentially-ordered — in ascending order — array with two copies of every number from 1 through 8
  var sequentialValues = [];
  for (var value = 1; value <= 8; value++) {
    sequentialValues.push(value);
    sequentialValues.push(value);
  }

  // Randomly transfer those values to a new array
  var cardValues = [];
  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  // Return the randomly-ordered array
  return cardValues;
};


//  Converts card values to jQuery card objects and adds them to the supplied game object.
MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ];

  // Empty the $game object's HTML
  $game.empty();
  $game.data('flippedCards', []);

  // Generate jQuery objects for each card, including data about the value, color, and flipped status of each card
  for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    var value = cardValues[valueIndex];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    // Add the card objects to the $game object
    $game.append($cardElement);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};


//  Flips over a given card and checks to see if two cards are flipped over.
//  Updates styles on flipped cards depending whether they are a match or not.
MatchGame.flipCard = function($card, $game) {

};
