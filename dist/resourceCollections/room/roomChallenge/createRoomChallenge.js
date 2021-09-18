"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomChallenge = void 0;
var resource_1 = require("../../../sdk/resource");
var records_1 = require("./records");
var CreateRoomChallenge;
(function (CreateRoomChallenge) {
    var request = records_1.createRequest;
    var response = records_1.createOrUpdateResponse;
    CreateRoomChallenge.resource = new resource_1.Resource(request, response);
})(CreateRoomChallenge = exports.CreateRoomChallenge || (exports.CreateRoomChallenge = {}));
//# sourceMappingURL=createRoomChallenge.js.map