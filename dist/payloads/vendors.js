"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserRequestPayload = exports.vendorsAuthenticationRedirectUrlResponsePayload = void 0;
var io = require("io-ts");
exports.vendorsAuthenticationRedirectUrlResponsePayload = io.type({
    redirectUrl: io.string,
});
exports.verifyUserRequestPayload = io.type({
    token: io.string,
});
//# sourceMappingURL=vendors.js.map