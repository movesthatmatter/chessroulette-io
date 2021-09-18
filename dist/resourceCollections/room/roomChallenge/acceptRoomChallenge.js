"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptRoomChallenge = void 0;
var resource_1 = require("../../../sdk/resource");
var records_1 = require("./records");
var AcceptRoomChallenge;
(function (AcceptRoomChallenge) {
    var request = records_1.updateRequest;
    var response = records_1.removeOrAcceptResponse;
    AcceptRoomChallenge.resource = new resource_1.Resource(request, response);
})(AcceptRoomChallenge = exports.AcceptRoomChallenge || (exports.AcceptRoomChallenge = {}));
//# sourceMappingURL=acceptRoomChallenge.js.map