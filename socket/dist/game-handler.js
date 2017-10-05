"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../../models");
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.startingHandSize = 5;
    }
    GameHandler.prototype.HandleAction = function (message) {
        var result;
        if (message.trigger === models_1.GameTrigger.GameStart) {
            this.player1.deck.availableList = this.player1.deck.startingList;
            this.player1.deck.Shuffle();
            result.name = "Draw starting hand";
            result.trigger = models_1.GameTrigger.GameStart;
            for (var i = 0; i < this.startingHandSize; i++) {
                result.actions.concat({
                    source: {
                        player: 1
                    },
                    card: this.player1.deck.Draw()
                });
            }
        }
        return result;
    };
    return GameHandler;
}());
exports.GameHandler = GameHandler;
