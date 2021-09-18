"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomChallenge = void 0;
var resource_1 = require("../../../sdk/resource");
var payloads_1 = require("../../../payloads");
var records_1 = require("./records");
var CreateRoomChallenge;
(function (CreateRoomChallenge) {
    var request = payloads_1.baseCreateChallengeRequest;
    var response = records_1.createOrUpdateResponse;
    CreateRoomChallenge.resource = new resource_1.Resource(request, response);
})(CreateRoomChallenge = exports.CreateRoomChallenge || (exports.CreateRoomChallenge = {}));
//# sourceMappingURL=createRoomChallenge.js.map