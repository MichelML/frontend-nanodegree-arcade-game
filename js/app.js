/******************************
      OBJECT CONSTRUCTORS (CLASSES) FOR THE GAME
    *******************************/
/*
      This is a constructor to create and control actions of the top menu 
      displaying lives, level, stats (highscores), game info, and sound controls
    */
var TopMenu = function() {
    var topMenu = this;
    this.topMenu = document.getElementById("menu");
    this.livesOnTopMenu = document.getElementById("lives");
    this.levelOnTopMenu = document.getElementById("level");
    this.infoIconOnTopMenu = document.getElementById("info");
    this.statsIconOnTopMenu = document.getElementById("stats");
    this.musicIconOnTopMenu = document.getElementById("song-sound");
    this.soundIconOnTopMenu = document.getElementById("game-sound");

    this.updateLivesOnTopMenu = function(player) {
        if (player.lives > 1) topMenu.livesOnTopMenu.innerHTML = player.lives + " lives";
        else if (player.lives === 1) topMenu.livesOnTopMenu.innerHTML = player.lives + " live";
        else topMenu.livesOnTopMenu.innerHTML = "0 live";
    };

    this.updateLevelOnTopMenu = function(levels) {
        topMenu.levelOnTopMenu.innerHTML = "Level " + levels.currentLevel;
    };

};

/*
  This is a constructor to create and control actions of the message appearing when the player hits a bug 
*/
var BugCollisionMessage = function() {
    var bugCollisionMessageObject = this;
    this.message = document.getElementById('bug-collision');
    this.showMessage = function() {
        var message = bugCollisionMessageObject.message;
        message.innerHTML = "OUCH!";
        message.style.display = "block";
        setTimeout(function() {
            message.innerHTML = "-1";
        }, 500);
        setTimeout(function() {
            message.style.display = "none";
        }, 800);
    };
};

/*
  This is a constructor to create all sounds (and music) and control their behaviors during the game
*/
var Audios = function() {
    var audiosObject = this;
    this.song = document.getElementById("music-sound"); // music of the game
    this.bugCollisionSound = document.getElementById("error-sound"); // when player hits a bug
    this.gemCollisionSound = document.getElementById("success-sound"); // when player hits a gem or heart
    this.gameoverSound = document.getElementById("gameover-sound"); // when player is game over
    this.levelPassedSound = document.getElementById("levelpassed-sound"); // when player passes a level
    this.gemCollisionSound.volume = 0.5;
    this.levelPassedSound.volume = 0.5;
    this.bugCollisionSound.volume = 0.5;
    this.song.volume = 0.75;

    this.playLevelPassedSound = function() {

        audiosObject.levelPassedSound.currentTime = 0.90;
        audiosObject.levelPassedSound.play();
    };
};

/*
  This is the message board constructor that is used to create and control the message 
  board actions that depends on various events during the game
*/
var MessageBoard = function() {

    /*
      Utility function for making strings multicolor
    */
    function multicolorise(str) {
        var colors = ["red", "blue", "orange", "green"];
        return str.split('')
            .map(function(val) {
                return '<span style="color:' + colors[Math.floor(Math.random() * colors.length)] + '">' + val + '</span>';
            })
            .join('');
    }

    /*
      All DOM Elements to be manipulated on the message board
    */
    this.messageBoard = document.getElementById("message-board");
    this.topMessageOnBoard = document.getElementById("success-main-message");
    this.secondaryMessageOnBoard = document.getElementById("success-next-level");
    this.arrowKeyMessageOnBoard = document.getElementById('arrow-message');
    this.possibleSuccessMessagesOnBoard = ["Good job", "Fantastic", "Marvelous", "Amazing", "Great work", "Great", "Breathtaking", "Sensational", "Spectacular", "Remarkable", "Excellent", "Splendid", "Wonderful", "Magnificient", "Superb", "Glorious", "Stunning", "Terrific", "Divine", "Ace", "You're a master", "Perfect"];
    this.starOnBoard = document.getElementById('star');

    /*
      Functions to display or hide DOM elements on board
    */
    this.displayElementsOnBoard = function(domElements) {
        domElements.forEach(function(element) {
            element.style.display = 'block';
        });
    };

    this.hideElementsOnBoard = function(domElements) {
        domElements.forEach(function(element) {
            element.style.display = 'none';
        });
    };

    /*
      Functions to display the type of messages that could appear on the message board
    */
    this.showCompletedLevelMessageOnBoard = function(messageboard, levelObject, keyHidingListener) {
        messageboard.displayElementsOnBoard([messageboard.messageBoard,
            messageboard.topMessageOnBoard,
            messageboard.secondaryMessageOnBoard,
            messageboard.starOnBoard,
            messageboard.arrowKeyMessageOnBoard
        ]);

        messageboard.topMessageOnBoard.innerHTML =
            multicolorise(messageboard.possibleSuccessMessagesOnBoard[Math.floor(Math.random() * messageboard.possibleSuccessMessagesOnBoard.length)] + '!');

        messageboard.secondaryMessageOnBoard.innerHTML = 'Now try completing <strong>Level ' + levelObject.currentLevel + '</strong>';
        messageboard.arrowKeyMessageOnBoard.innerHTML = 'press any arrow key to continue';

        keyHidingListener();

    };

    /*
      This is the message board constructor that is used to create and control the message 
      board actions that depends on various events during the game
    */
    this.showHighScoresOnBoard = function(messageboard, playerObject, keyHidingListener) {
        messageboard.displayElementsOnBoard([messageboard.messageBoard,
            messageboard.topMessageOnBoard,
            messageboard.arrowKeyMessageOnBoard
        ]);

        messageboard.hideElementsOnBoard([messageboard.secondaryMessageOnBoard,
            messageboard.starOnBoard
        ]);

        messageboard.topMessageOnBoard.innerHTML = 'All Time Records<br><br>' +
            'Lives: ' + multicolorise(playerObject.highScoreAllTimeLives.toString()) +
            '<br>' +
            'Level: ' + multicolorise(playerObject.highScoreAllTimeLevel.toString());
        messageboard.arrowKeyMessageOnBoard.innerHTML = 'press any arrow key to continue';
        keyHidingListener();
    };

    this.showGameInstructionsOnBoard = function(messageboard, gameStartButtonListener) {
        var instructions = "<div id='start-message-start'>1. Dodge the ladybugs with the arrow keys<br>2. Reach the water by any way you can find<br>3. Don't forget to grab your life bonus on the way<br>4. Try to go as far as you can in the game</div><div id='start-message-end'>Have fun Ladybug Ninja!<br><button id='start-button' class='btn btn-success btn-lg'>Start Playing</button></div>";
        var welcomeMessage = "<div style='font-size:0.5em;line-height:40px;'>Welcome to<br><strong style='font-size:1.1em;'>" + multicolorise("LadyBugger AllStar!") + "</strong></div>";

        messageboard.topMessageOnBoard.innerHTML = welcomeMessage;
        messageboard.secondaryMessageOnBoard.innerHTML = instructions;

        messageboard.displayElementsOnBoard([messageboard.messageBoard,
            messageboard.topMessageOnBoard,
            messageboard.secondaryMessageOnBoard
        ]);

        messageboard.hideElementsOnBoard([messageboard.starOnBoard,
            messageboard.arrowKeyMessageOnBoard
        ]);

        gameStartButtonListener();
    };

    this.showGameOverMessageOnBoard = function(messageboard, levelObject, playerObject) {
        messageboard.displayElementsOnBoard([messageboard.messageBoard,
            messageboard.topMessageOnBoard,
            messageboard.secondaryMessageOnBoard
        ]);

        messageboard.hideElementsOnBoard([messageboard.starOnBoard,
            messageboard.arrowKeyMessageOnBoard
        ]);

        messageboard.topMessageOnBoard.innerHTML = '<span style="color:red;">Game Over!</span>';
        messageboard.secondaryMessageOnBoard.innerHTML = '<div id="highscore">Highest Level: ' +
            levelObject.currentLevel + '<br>' +
            'Maximum Lives: ' + player.maximumLives + '</div>' +
            '<div id="gameover-question">Play another game?</div>' +
            '<button id="gameover-button" class="btn btn-success btn-lg">Restart</button><br><div style="font-size:18px;margin-top:10px;color:#999">press the button or space bar</div>';
    };

};

/*
  This is the EventListeners constructor that is used to create all necessary listeners of events during the game
  It is taking all other objects of the game as arguments so it can listen for events or call functions 
  related to them
*/
var EventListeners = function(messageboard, topmenu, player, levels, audios, canvas, bugcollisionmessage, bonus) {

    var eventListenersObject = this;

    /*
      This function will resize the canva and make the board game bigger or smaller depending on 
      the window width and height. It will be used inside the window.resize utility 
    */
    this.resizeCanva = function() {
        if (window.innerWidth < 400) {
            canvas.numCols = 4;
            canvas.width = 404;
        } else {
            canvas.numCols = Math.floor(window.innerWidth / 100);
            canvas.width = canvas.numCols * 101;
        }

        if (window.innerHeight < 400) {
            canvas.numRows = 4;
            canvas.height = 404;
        } else {
            canvas.numRows = Math.floor(window.innerHeight / 100);
            canvas.height = canvas.numRows * 101;
        }
    };

    /*
      This will be triggered when the page loads OR when the player clicks on the info icon
    */
    this.gameStartButton = function() {
        function startGame() {
            messageboard.hideElementsOnBoard([messageboard.messageBoard]);
            document.getElementById('start-button').removeEventListener('click', startGame);
            eventListenersObject.statsIconOnTopMenu(true);
            eventListenersObject.infoIconOnTopMenu(true);
            eventListenersObject.keysForPlayingGame(true);
        }

        document.getElementById('start-button').addEventListener('click', startGame);
        eventListenersObject.musicIconOnTopMenu(true);
        eventListenersObject.soundIconOnTopMenu(true);
    };

    /*The function buttonWhenGameOver will be triggered when the player has no lives left*/
    this.buttonWhenGameOver = function() {
        //attach the function to the eventListenersObject to be usable by spacebarWhenGameOver function
        eventListenersObject.buttonWhenGameOver.restartGame = function() {
            levels.resetLevels();
            levels.bugSpeed = [75, 100, 125]; //reset bug speed
            levels.setNumberOfBugs(1);
            player.resetLives();
            topmenu.levelOnTopMenu.innerHTML = "Level " + levels.currentLevel;
            topmenu.livesOnTopMenu.innerHTML = player.lives + " lives";
            messageboard.hideElementsOnBoard([messageboard.messageBoard]);
            audios.song.currentTime = 0;
            if (topmenu.musicIconOnTopMenu.style.color === "green") audios.song.play();
            eventListenersObject.keysForPlayingGame(true);
            eventListenersObject.infoIconOnTopMenu(true);
            eventListenersObject.statsIconOnTopMenu(true);
            eventListenersObject.musicIconOnTopMenu(true);
            eventListenersObject.soundIconOnTopMenu(true);
            document.getElementById('gameover-button').removeEventListener('click', eventListenersObject.buttonWhenGameOver);
            window.removeEventListener('keyup', eventListenersObject.spacebarWhenGameOver);
        }

        document.getElementById('gameover-button').addEventListener('click', eventListenersObject.buttonWhenGameOver.restartGame);
    };

    /*The function spacebarWhenGameOver will be triggered when the player has no lives left*/
    //spacebarWhenGameOver work differently since it is attached to the window object
    this.spacebarWhenGameOver = function() {
        event.preventDefault();
        if (event.keyCode === 32) {
            eventListenersObject.buttonWhenGameOver.restartGame();
        }
    };

    /*
      This function will handle the arrow keys events while the game is playing
    */
    function keyEventFunction(e) {
        e.preventDefault();
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    }

    /*
      This function will handle the arrow keys events at specific moments in the game, such as 
      when a user click on the high scores icon, or when the player just completed a level. 
      It will hide the message board when the player will make a move
    */
    function keyEventFunctionForHidingMessageBoard(e) {
        e.preventDefault();
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        if (allowedKeys[e.keyCode]) {
            messageboard.hideElementsOnBoard([messageboard.messageBoard]);
            eventListenersObject.keysForHidingBoard(false);
        }
    }

    /*function to listen to the allowed keys when the player is playing the game*/
    this.keysForPlayingGame = function(bool) {
        //see at the beginning of the 
        if (bool) document.addEventListener('keydown', keyEventFunction);
        /*see above for 
                   keyEventFunction functionalities*/
        else if (!bool) document.removeEventListener('keydown', keyEventFunction);
        /*see 
                   above for keyEventFunction functionalities*/
        else console.log("boolean argument missing for keysForPlayingGame function");
    };

    /*function to listen to the allowed keys to hide the board and allow the player to move at the same time*/
    this.keysForHidingBoard = function(bool) {
        if (bool) document.addEventListener('keydown', keyEventFunctionForHidingMessageBoard);
        /*see above 
                   for keyEventFunctionForHidingMessageBoard functionalities*/
        else if (!bool) document.removeEventListener('keydown', keyEventFunctionForHidingMessageBoard);
        /*see
                   above for keyEventFunctionForHidingMessageBoard functionalities*/
        else console.log("boolean argument missing for keysForHidingBoard function");
    }

    /*for infoIconOnTopMenu listener, function must be inside a variable to remove the listener
    properly*/
    var showInfoMessageOnBoard = function() {
        messageboard.showGameInstructionsOnBoard(messageboard, eventListenersObject.gameStartButton)
    };

    /*infoIconOnTopMenu allows to remove or add an event listener for when the stats Icon is clicked*/
    this.infoIconOnTopMenu = function(bool) {
        if (bool) topmenu.infoIconOnTopMenu.addEventListener('click', showInfoMessageOnBoard);
        else if (!bool) topmenu.infoIconOnTopMenu.removeEventListener('click', showInfoMessageOnBoard);
        else console.log("boolean argument missing for infoIconOnTopMenu function");
    };


    /*for statsIconOnTopMenu listener, function must be inside a variable to remove the listener
    properly*/
    var showStatsMessageOnBoard = function() {
        messageboard.showHighScoresOnBoard(messageboard, player, function() {
            setTimeout(function() {
                eventListenersObject.keysForHidingBoard(true);
            }, 500);
        });
    }

    /*statsIconOnTopMenu allows to remove or add an event listener for when the stats Icon is clicked*/
    this.statsIconOnTopMenu = function(bool) {
        if (bool) topmenu.statsIconOnTopMenu.addEventListener('click', showStatsMessageOnBoard);
        else if (!bool) topmenu.statsIconOnTopMenu.removeEventListener('click', showStatsMessageOnBoard);
        else console.log("boolean argument missing for infoIconOnTopMenu function");
    };

    /* changeIconColorAndMusicState is a function that will be used inside the music Icon listener to display
    the appropriate icon color and change the music state (pause, play) of the song */
    function changeIconColorAndMusicState() {
        if (topmenu.musicIconOnTopMenu.style.color === "green") {
            topmenu.musicIconOnTopMenu.style.color = "red";
            audios.song.pause();
        } else {
            topmenu.musicIconOnTopMenu.style.color = "green";
            audios.song.currentTime = 0;
            audios.song.play();
        }
    }

    /*musicIconOnTopMenu allows to remove or add an event listener for when the music Icon is clicked*/
    this.musicIconOnTopMenu = function(bool) {
        if (bool) topmenu.musicIconOnTopMenu.addEventListener('click', changeIconColorAndMusicState);
        else if (!bool) topmenu.musicIconOnTopMenu.removeEventListener('click', changeIconColorAndMusicState);
    };

    function changeIconColorAndMuteGameSounds() {
        var shouldWeMute = (topmenu.soundIconOnTopMenu.style.color === "green") ? true : false;
        if (shouldWeMute) topmenu.soundIconOnTopMenu.style.color = "red";
        else topmenu.soundIconOnTopMenu.style.color = "green";
        audios.gemCollisionSound.muted = shouldWeMute;
        audios.bugCollisionSound.muted = shouldWeMute;
        audios.levelPassedSound.muted = shouldWeMute;
        audios.gameoverSound.muted = shouldWeMute;
    }

    /*soundIconOnTopMenu allows to remove or add an event listener for when the sound Icon is clicked*/
    this.soundIconOnTopMenu = function(bool) {
        if (bool) topmenu.soundIconOnTopMenu.addEventListener('click', changeIconColorAndMuteGameSounds);
        else topmenu.soundIconOnTopMenu.removeEventListener('click', changeIconColorAndMuteGameSounds);
    };


    //adjustGameElementsPosition work differently since it is a function attached to the window.onload and 
    // window.resize utilies. It makes sure that the game is properly render all the time
    this.adjustGameElementsPosition = function() {
        topmenu.topMenu.style.left = canvas.getBoundingClientRect().left + "px";
        messageboard.messageBoard.style.left = (window.innerWidth / 2) - (505 / 2) + "px";
        bugcollisionmessage.message.style.left = (window.innerWidth / 2) - (300 / 2) + "px";
        bugcollisionmessage.message.style.top = (window.innerHeight / 2) - 30 + "px";
        topmenu.topMenu.style.width = canvas.width + "px";
    };




    /*not a real event listener here, but checkPlayerCollisionsWithBug will be used to 
    check for collisions between the player and bugs. It will be used in the game engine - engine.js*/
    this.checkPlayerCollisionsWithBug = function(abug) {
        if (abug.x < player.x + player.width && abug.x + abug.width > player.x && abug.y < player.y + player.height && abug.y + abug.height > player.y) {

            audios.bugCollisionSound.play();
            eventListenersObject.keysForPlayingGame(false);
            player.y = canvas.numRows * 83 - 95; //reset player position
            player.lives = player.lives - 1;

            if (player.lives >= 1) {
                bugcollisionmessage.showMessage();
                topmenu.updateLivesOnTopMenu(player);
                setTimeout(function() {
                    eventListenersObject.keysForPlayingGame(true);
                }, 400);
            } else {
                //do something when game over here
                eventListenersObject.keysForPlayingGame(false);
                audios.song.pause();
                setTimeout(function() {
                    audios.gameoverSound.play();
                }, 800);
                topmenu.updateLivesOnTopMenu(player);
                messageboard.showGameOverMessageOnBoard(messageboard, levels, player);
                eventListenersObject.musicIconOnTopMenu(false);
                eventListenersObject.soundIconOnTopMenu(false);
                eventListenersObject.buttonWhenGameOver();
                eventListenersObject.statsIconOnTopMenu(false);
                eventListenersObject.infoIconOnTopMenu(false);
                eventListenersObject.buttonWhenGameOver();
                window.addEventListener('keyup', eventListenersObject.spacebarWhenGameOver);
            }
        };
    };

    /*not a real event listener here, but checkPlayerCollisionsWithGems will be used to 
    check for collisions between the player and bugs. It will be used in the game engine - engine.js*/
    this.checkPlayerCollisionsWithGems = function() {
        if (bonus.x < player.x + player.width && bonus.x + bonus.width > player.x && bonus.y < player.y + player.height && bonus.y + bonus.height > player.y) {
            if (levels.bonusPerLevel < 1) {
                levels.bonusPerLevel = bonus.lifePoint;
                audios.gemCollisionSound.play();
                player.lives = (player.lives) ? player.lives + bonus.lifePoint : 0;
                player.updateMaximumLivesCurrentGame();
                player.checkIfNewAllTimeLives();
                if (player.lives >= 1) {
                    if (bonus.lifePoint === 1) bonus.image = "images/plusonet.png";
                    else if (bonus.lifePoint === 2) bonus.image = "images/plustwot.png";
                    else if (bonus.lifePoint === 3) bonus.image = "images/plusthreet.png";
                    else if (bonus.lifePoint === 5) bonus.image = "images/plusfivet.png";
                    topmenu.updateLivesOnTopMenu(player);
                }
                setTimeout(function() {
                    bonus.hide()
                }, 333);
            }
        };
    };

    /*Again, not a real eventlistener, but this will be triggered when the player reach 
    the water row in the game */
    this.playerCompletesLevel = function() {
        audios.playLevelPassedSound();
        levels.setCurrentLevel(levels.currentLevel + 1);
        levels.bonusPerLevel = 0;
        levels.setNumberOfBugs();
        levels.setNewBugsSpeed();
        messageboard.showCompletedLevelMessageOnBoard(messageboard, levels, function() {
            setTimeout(function() {
                eventListeners.keysForHidingBoard(true);
            }, 500);
        });
        player.checkIfNewAllTimeLevel();
        topmenu.updateLevelOnTopMenu(levels);
        setTimeout(function() {
            bonus.setBonus(levels)
        }, 400);
        allEnemies.forEach(function(enemy) {
            enemy.resetCurrentPosition();
        });
        eventListenersObject.keysForPlayingGame(false);
        setTimeout(function() {
            eventListenersObject.keysForPlayingGame(true);
        }, 500);
    };
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here
    var possibleYsForBugs = [60, 143, 226, 226 + 83],
        possibleXsForBugs = [0, 0, 50, 50, 100, 150, 150, 200, 250, 250, 300, 350, 350, 400];

    this.x = possibleXsForBugs[Math.floor(Math.random() * possibleXsForBugs.length)];
    this.y = possibleYsForBugs[Math.floor(Math.random() * possibleYsForBugs.length)];
    this.width = 50;
    this.height = 50;
    //the levels object will be declared before our enemies are created, so we are good here
    this.speed = levels.bugSpeed[Math.floor(Math.random() * levels.bugSpeed.length)];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images - see resources.js
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > canvas.numCols * 101) {
        this.resetStartingPosition();
        this.speed = levels.bugSpeed[Math.floor(Math.random() * levels.bugSpeed.length)];
    }
    this.x = this.x + this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//reset starting position when level is completed or when bug has passed the right limit of the canva
Enemy.prototype.resetStartingPosition = function() {
    this.x = [-30, -50, -80, -90, -120, -150][Math.floor(Math.random() * 6)];
    var y_s = [60],
        i = 1;
    for (; i < canvas.numRows - 2; i++) {
        y_s.push(i * 83 + 60)
    }
    this.y = y_s[Math.floor(Math.random() * (y_s.length))];

};

//reset starting position on resize
Enemy.prototype.resetCurrentPosition = function() {
    var x_s = [50],
        j = 1;
    for (; j < canvas.numCols; j++) {
        x_s.push(j * 101 + 50)
    }
    this.x = x_s[Math.floor(Math.random() * (x_s.length - 1))];
    var y_s = [60],
        i = 1;
    for (; i < canvas.numRows - 2; i++) {
        y_s.push(i * 83 + 60)
    }
    this.y = y_s[Math.floor(Math.random() * (y_s.length))];

}



// player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.lives = 10;
    this.x = 202;
    this.y = 405;
    this.maximumLives = 10;
    this.highScoreAllTimeLives = (localStorage["highest-lives"]) ? localStorage["highest-lives"] : this.lives;
    this.highScoreAllTimeLevel = (localStorage["highest-level"]) ? localStorage["highest-level"] : 1;
    this.playerImage = 'images/char-boy.png';
    this.width = 50;
    this.height = 50;

    this.updateMaximumLivesCurrentGame = function() {
        if (this.lives > this.maximumLives) this.maximumLives = this.lives;
    };

    this.checkIfNewAllTimeLives = function() {
        if (this.lives > this.highScoreAllTimeLives) this.highScoreAllTimeLives = this.lives;
    };

    this.checkIfNewAllTimeLevel = function() {
        if (levels.currentLevel > this.highScoreAllTimeLevel) this.highScoreAllTimeLevel = levels.currentLevel;
    };

    this.restartPosition = function() {
        this.x = (canvas.numCols % 2 === 0) ? canvas.numCols * 101 / 2 : canvas.numCols * 101 / 2 + 50.5;
        this.y = canvas.numRows * 83 - 95;
    };

    this.resetLives = function() {
        this.lives = 10;
    };

};

/*this function takes a direction (string being either 'right','left','down', 'up') as argument and
updates the player location according to the direction indicated*/
Player.prototype.update = function(direction) {
    var isRight = (direction === 'right'),
        isLeft = (direction === 'left'),
        isDown = (direction === 'down'),
        isUp = (direction === 'up'),
        player = this,
        value = (direction === 'right' || direction === 'left') ? 101 : 83;
    if ((player.x === 0 && isLeft) || (player.x === (canvas.numCols * 101 - 101) && isRight) || (player.y > canvas.numRows * 83 - 100 && isDown)) return null;
    else if (player.y < 1) {
        player.completeLevel();
        player.restartPosition();
    } else if (direction === 'right') player.x = player.x + value;
    else if (direction === 'left') player.x = player.x - value;
    else if (direction === 'down') player.y = player.y + value;
    else if (direction === 'up') player.y = player.y - value;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImage), this.x, this.y);
};


//player handle input, required method for game
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' || direction === 'up') this.update(direction);
    if (direction === 'right' || direction === 'down') this.update(direction);

};


Player.prototype.completeLevel = function() {
    eventListeners.playerCompletesLevel();
}

// Bonus class
// This class is used to handle the gems and heart that will be collected by the player during the game
var Bonus = function(levels) {
    var bonus = this;
    this.images = ['images/Heart.png', 'images/GemBlue.png', 'images/GemGreen.png', 'images/GemOrange.png'];
    this.image = 'images/Heart.png';
    this.lifePoints = [1, 2, 3, 5]; // a heart is worth 1 life, blue gem 2 lives, green gem 3 lives and orange gem
    // 5 lives
    this.lifePoint = 1;
    this.height = 50;
    this.width = 50;
    this.x = -1000;
    this.y = -1000;
    this.possibleXsForGems = [0];
    this.possibleYsForGems = [0];
    this.hide = function() {
        bonus.x = -1000;
        bonus.y = -1000;
    };
    this.setBonus = function() {
        bonus.possibleXsForGems = (function() {
            var x_s = [102],
                i = 1;
            for (; i < canvas.numCols; i++) {
                x_s.push(i * 101 + 102);
            }
            return x_s;
        })();
        bonus.possibleYsForGems = (function() {
            var y_s = [70],
                i = 1;
            for (; i < canvas.numRows - 2; i++) {
                y_s.push(i * 83 + 70);
            }
            return y_s;
        })();

        bonus.x = bonus.possibleXsForGems[Math.floor(Math.random() * bonus.possibleXsForGems.length)];
        bonus.y = bonus.possibleYsForGems[Math.floor(Math.random() * bonus.possibleYsForGems.length)];

        if (levels.currentLevel % 3 === 0) {

            bonus.image = bonus.images[1];
            bonus.lifePoint = bonus.lifePoints[1];
        } else if (levels.currentLevel % 4 === 0) {
            bonus.image = bonus.images[2];
            bonus.lifePoint = bonus.lifePoints[2];
        } else if (levels.currentLevel % 5 === 0) {
            bonus.image = bonus.images[3];
            bonus.lifePoint = bonus.lifePoints[3];
        } else {
            bonus.image = bonus.images[0];
            bonus.lifePoint = bonus.lifePoints[0];
        }
    };
    this.renderBonus = function() {
        if (levels.currentLevel > 1) ctx.drawImage(Resources.get(bonus.image), bonus.x, bonus.y);
    };
}


//the Levels class will be used to describe and assign proper level features as the player advances in the game
var Levels = function() {
    var levels = this;
    this.bonusPerLevel = 0;
    this.currentLevel = 1;
    this.numberOfBugs = 1;
    this.bugSpeed = [75, 100, 125];
    this.setCurrentLevel = function(newLevel) {
        levels.currentLevel = newLevel;
    };
    this.setNumberOfBugs = function(numberofbugs) {
        levels.numberOfBugs = (!numberofbugs) ? parseInt(levels.currentLevel * 1.8 / 1.9) : 1;
        allEnemies = [];
        var i = 0;
        for (; i < levels.numberOfBugs; i++) {
            allEnemies.push(new Enemy())
        }
    };
    this.setNewBugsSpeed = function() {
        levels.bugSpeed = [levels.bugSpeed[0] * 1.03, levels.bugSpeed[1] * 1.05, levels.bugSpeed[2] * 1.06];
        allEnemies.forEach(function(value) {
            value.speed = levels.bugSpeed[Math.floor(Math.random() * levels.bugSpeed.length)];
        })
    };

    this.resetLevels = function() {
        levels.currentLevel = 1;
    };

};

//create a canva element and assign the initial number of rows and columns for the game, as well as the width 
// and height, and finally an attribute for easier DOM manipulation
var canvas = document.createElement('canvas');
canvas.numRows = 6;
canvas.numCols = 5;
canvas.width = 505;
canvas.height = 606;
canvas.setAttribute("id", "game");

/****************************
INSTANTIATING ALL OBJECTS OF THE GAME
*****************************/
var audios = new Audios();
var levels = new Levels();
var bonus = new Bonus(levels);
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var i = 0;
for (; i < levels.numberOfBugs; i++) {
    allEnemies.push(new Enemy())
}
// Place the player object in a variable called player
var player = new Player();
var topMenu = new TopMenu();
var messageBoard = new MessageBoard();
var bugCollisionMessage = new BugCollisionMessage();
var eventListeners = new EventListeners(messageBoard, topMenu, player, levels, audios, canvas, bugCollisionMessage, bonus);

//the functions inside onresize assure that the elements of the game are always properly displayed
window.onresize = function() {
    eventListeners.resizeCanva();
    eventListeners.adjustGameElementsPosition();
    player.restartPosition();
    allEnemies.forEach(function(enemy) {
        enemy.resetCurrentPosition();
    });
    bonus.setBonus(levels);

};

//all appropriate functions are declared onload to start the game, assuring proper rendering and functionalities
window.onload = function() {
    topMenu.topMenu.style.top = 0 + "px";
    topMenu.updateLevelOnTopMenu(levels);
    topMenu.updateLivesOnTopMenu(player);
    topMenu.musicIconOnTopMenu.style.color = "green";
    topMenu.soundIconOnTopMenu.style.color = "green";
    messageBoard.messageBoard.style.top = 90 + "px";
    messageBoard.showGameInstructionsOnBoard(messageBoard, eventListeners.gameStartButton);
    audios.song.play();
    eventListeners.resizeCanva();
    eventListeners.adjustGameElementsPosition();
    player.restartPosition();
    allEnemies.forEach(function(enemy) {
        enemy.resetStartingPosition();
    });
};

/*this is a simple utility for the player to save his highscores in case he leaves the game and 
come back later*/
window.onbeforeunload = function(e) {
    localStorage["highest-level"] = player.highScoreAllTimeLevel;
    localStorage["highest-lives"] = player.highScoreAllTimeLives;
};