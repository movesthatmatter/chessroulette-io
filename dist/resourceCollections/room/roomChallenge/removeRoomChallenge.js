"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRoomChallenge = void 0;
var roomRecord_1 = require("../../../records/roomRecord");
var resource_1 = require("../../../sdk/resource");
var records_1 = require("./records");
var RemoveRoomChallenge;
(function (RemoveRoomChallenge) {
    var request = records_1.updateRequest;
    var response = roomRecord_1.roomRecord;
    RemoveRoomChallenge.resource = new resource_1.Resource(request, response);
})(RemoveRoomChallenge = exports.RemoveRoomChallenge || (exports.RemoveRoomChallenge = {}));
//# sourceMappingURL=removeRoomChallenge.js.map