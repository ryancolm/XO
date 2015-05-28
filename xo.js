var gameOver = false;
$(document).ready(function() {

    console.log("ready ...");

    var nextTurn = 'X';


    var takeTurn = function(event) {
        //console.log($(this).attr('id'));

        $("#" + $(this).attr('id')).html(nextTurn);

        if (nextTurn == 'X') {
            nextTurn = 'O';
        } else {
            nextTurn = 'X';
        }

        checkGame();
    };

    $("#newGameButton").click(function() {
        reset();
    });

    $(document).off("click", ".col-sm-6", takeTurn);
    $(document).on("click", ".col-sm-6", takeTurn);


});

function reset() {
    console.log("reset ...");
    for (i = 1; i <= 3; i++) {
        for (z = 1; z <= 3; z++) {
            var divId = "R" + i + "C" + z;
            $("#" + divId).html("");
        }
    }
    $("#gameMessage").html("reset");

}

function checkGame() {
    console.log("checking ...");

    // check rows & cols
    for (i = 1; i <= 3; i++) {
        var divId1 = "#R" + i + "C" + 1;
        var divId2 = "#R" + i + "C" + 2;
        var divId3 = "#R" + i + "C" + 3;

        var divId4 = "#R" + 1 + "C" + i;
        var divId5 = "#R" + 2 + "C" + i;
        var divId6 = "#R" + 3 + "C" + i;

        if (!gameOver) {
            gameOver = compare($(divId1).html(), $(divId2).html(), $(divId3).html(), 'Row' + i);
        }
        if (!gameOver) {
            gameOver = compare($(divId4).html(), $(divId5).html(), $(divId6).html(), 'Column' + i);
        }
    }

    var divId1 = "#R" + 1 + "C" + 1;
    var divId2 = "#R" + 2 + "C" + 2;
    var divId3 = "#R" + 3 + "C" + 3;

    var divId4 = "#R" + 1 + "C" + 3;
    var divId5 = "#R" + 2 + "C" + 2;
    var divId6 = "#R" + 3 + "C" + 1;
    console.log("diag " + $(divId1).html());

    if (!gameOver) {
        gameOver = compare($(divId1).html(), $(divId2).html(), $(divId3).html(), 'Diagonal (L -> R)');
    }
    if (!gameOver) {
        gameOver = compare($(divId4).html(), $(divId5).html(), $(divId6).html(), 'Diagonal (R -> L)');
    }

}

function compare(val1, val2, val3, type) {
    console.log("comparing " + val1 + " " + val2 + " " + val3 + " " + type)

    if (val1 != "" && val2 != "" && val3 != "") {
        if (val1 == val2 && val2 == val3) {
            $("#gameMessage").html("we have a winner : " + val1 + " (" + type + ")");
            gameOver = true;

            endGame();
        }
    }
}

function endGame() {
    console.log("endGame ...");
    $(document).off("click", ".col-sm-6", takeTurn);
    return false;
}