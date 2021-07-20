"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCollaboratorsByPlatform = void 0;
var io = require("io-ts");
var NumberFromString_1 = require("io-ts-types/lib/NumberFromString");
var resource_1 = require("../../sdk/resource");
var collaboratorRecord_1 = require("../../records/collaboratorRecord");
var GetCollaboratorsByPlatform;
(function (GetCollaboratorsByPlatform) {
    var request = io.type({
        platform: collaboratorRecord_1.collaboratorPlatform,
        pageSize: NumberFromString_1.NumberFromString,
        currentIndex: NumberFromString_1.NumberFromString,
    });
    var response = resource_1.withPaginatorResponse(collaboratorRecord_1.collaboratorRecord);
    GetCollaboratorsByPlatform.resource = new resource_1.Resource(request, response);
})(GetCollaboratorsByPlatform = exports.GetCollaboratorsByPlatform || (exports.GetCollaboratorsByPlatform = {}));
//# sourceMappingURL=getCollaboratorsByPlatform.js.map