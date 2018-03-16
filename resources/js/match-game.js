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
  // Keeps track of the flipped cards, initialized to an empty array
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

  // Call .flipCard() whenever a card is clicked
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });

};


//  Flips over a given card and checks to see if two cards are flipped over.
//  Updates styles on flipped cards depending whether they are a match or not.
MatchGame.flipCard = function($card, $game) {

  // Ensure that the card being flipped is not already flipped over
  if ($card.data('isFlipped')) {
    return;
  }

  // Modify the card being flipped so that it appears flipped over
  // Change the background color of the card to be the color stored on the card
  $card.css('background-color', $card.data('color'))
    // Change the text of the card to be the value stored on the card
    .text($card.data('value'))
    // Update the data on the card to indicate that it has been flipped over
    .data('isFlipped', true);

  var flippedCards = $game.data('flippedCards');
  // Add the newly-flipped card to an array of flipped cards stored on the game object
  flippedCards.push($card);

  // Check if the game has two flipped cards
  if (flippedCards.length === 2) {
    // If two cards are flipped, check to see if they are the same value
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      // Gray out the cards if a match is made
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    // If the two cards are not a match, flip them back over
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];

      // Use .setTimeout() to add a delay to the flip, giving the user time to look at the second card
      window.setTimeout(function() {
        // Set the text to an empty string & update the data to reflect that the card has not been flipped over
        card1.css('background-color', 'rgb(32, 64, 86)')
          .text('')
          .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
          .text('')
          .data('isFlipped', false);
      }, 350);
    }
    // Clear the game's array of flipped cards to get ready for the next pair
    $game.data('flippedCards', []);
  }

};
