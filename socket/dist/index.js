"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var game_handler_1 = require("./game-handler");
exports.GameHandler = game_handler_1.GameHandler;
var server = new server_1.Server();
exports.default = server.app;
