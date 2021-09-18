"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRoomChallenge = void 0;
var resource_1 = require("../../../sdk/resource");
var records_1 = require("./records");
var RemoveRoomChallenge;
(function (RemoveRoomChallenge) {
    var request = records_1.updateRequest;
    var response = records_1.createOrUpdateResponse;
    RemoveRoomChallenge.resource = new resource_1.Resource(request, response);
})(RemoveRoomChallenge = exports.RemoveRoomChallenge || (exports.RemoveRoomChallenge = {}));
//# sourceMappingURL=removeRoomChallenge.js.map