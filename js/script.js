/*global $*/

window.latestRandomNumber = -1;

$('select').chosen();

var dropdown = $( '#dropdown' );
var button = $( '#generate-quote' );
var $quote = $( '.quote' );

button.click(function() {
    var dropdownText = dropdown.val();

    var selectedItem = dropdown.find( 'option:selected' );
    var selectedGroup = selectedItem.parent( 'optgroup' );
    var label = selectedGroup.attr( 'label' );

    // Background image logic
    if ( label === 'Movie Quotes' ) {
        $( 'body' ).removeClass().addClass( 'cinema-bg' );
    } else if ( label === 'Book Quotes' ) {
        $( 'body' ).removeClass().addClass( 'library-bg' );
    } else {
        $( 'body' ).removeClass();
    }

    // Quote logic
    var quotesArray = window.quotes[ dropdownText ];

    if ( quotesArray ) {
        var quoteNumber = getRandomNumber( 0, quotesArray.length );
        var quote = quotesArray[ quoteNumber ];

        quoteAnimation( quote );
    } else {
        // If we can't find any quotes, reset the text
        quoteAnimation( 'Click for an awesome random quote.' );
    }
});

function quoteAnimation( quote ) {
    $quote.fadeOut(function() {
        $quote.html( quote );
        $quote.fadeIn();
    });
}

function getRandomNumber(min, max) {
    if ( max === 1 ) {
        return 0;
    }

    var min = Math.ceil(min);
    var max = Math.floor(max);
    var number = Math.floor(Math.random() * (max - min)) + min;

    if ( number === window.latestRandomNumber ) {
        number = getRandomNumber( min, max );
    } else {
        window.latestRandomNumber = number;
    }

    return number;
}
