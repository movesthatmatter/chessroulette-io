"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketPayload = exports.genericFailureResponsePayload = exports.iamResponsePayload = exports.whoamiRequestPayload = exports.connectionOpenedPayload = exports.pingPayload = exports.statsReaderIdentificationPayload = exports.userIdentificationPayload = void 0;
var io = require("io-ts");
var roomRecord_1 = require("../records/roomRecord");
var peerRecord_1 = require("../records/peerRecord");
var challenge_1 = require("./challenge");
var chat_1 = require("./chat");
var game_1 = require("./game");
var peer_1 = require("./peer");
var room_1 = require("./room");
var stats_1 = require("./stats");
var challengeRecord_1 = require("../records/challengeRecord");
var analysis_1 = require("./analysis");
var lichessGame_1 = require("./lichessGame");
exports.userIdentificationPayload = io.type({
    kind: io.literal('userIdentification'),
    content: io.union([
        io.type({
            isGuest: io.literal(true),
            guestUserId: io.string,
        }),
        io.type({
            isGuest: io.literal(false),
            acessToken: io.string,
        }),
    ]),
});
exports.statsReaderIdentificationPayload = io.type({
    kind: io.literal('statsReaderIdentificationPayload'),
    content: io.type({
        userId: io.string,
    }),
});
exports.pingPayload = io.type({
    kind: io.literal('ping'),
    content: io.string,
});
exports.connectionOpenedPayload = io.type({
    kind: io.literal('connectionOpened'),
    content: io.type({
        me: peerRecord_1.peerRecord,
    }),
});
exports.whoamiRequestPayload = io.type({
    kind: io.literal('whoami'),
    content: io.unknown,
});
exports.iamResponsePayload = io.type({
    kind: io.literal('iam'),
    content: io.intersection([
        io.type({
            peer: peerRecord_1.peerRecord,
            latencyInMs: io.number,
        }),
        io.union([
            io.type({
                hasJoinedRoom: io.literal(true),
                room: roomRecord_1.roomRecord,
            }),
            io.type({
                hasJoinedRoom: io.literal(false),
            }),
        ]),
        io.union([
            io.type({
                hasActiveChallenge: io.literal(true),
                challenge: challengeRecord_1.challengeRecord,
            }),
            io.type({
                hasActiveChallenge: io.literal(false),
            }),
        ]),
    ]),
});
exports.genericFailureResponsePayload = io.type({
    kind: io.literal('genericRequestFailure'),
    content: io.unknown,
});
exports.socketPayload = io.union([
    exports.userIdentificationPayload,
    exports.statsReaderIdentificationPayload,
    exports.pingPayload,
    exports.genericFailureResponsePayload,
    // Business Logic
    exports.connectionOpenedPayload,
    exports.whoamiRequestPayload,
    exports.iamResponsePayload,
    // Challenges
    challenge_1.challengeAcceptedPayload,
    // Room
    room_1.peerJoinedRoomPayload,
    room_1.joinRoomRequestPayload,
    room_1.joinRoomSuccessPayload,
    room_1.joinRoomFailurePayload,
    room_1.leaveRoomRequestPayload,
    room_1.joinedRoomUpdatedPayload,
    room_1.switchRoomActivityRequestPayload,
    // Chat
    chat_1.broadcastChatMessagePayload,
    // Game Actions
    game_1.gameActionRequestPayload,
    game_1.joinedGameUpdatedPayload,
    //Lichess Game
    lichessGame_1.lichessGameRequestPayloads,
    // Analysis
    analysis_1.analysisMoveRequestPayload,
    analysis_1.analysisRefocusRequestPayload,
    analysis_1.analysisDrawnShapesUpdatedRequestPayload,
    analysis_1.analysisUpdatedResponsePayload,
    // Room & Game
    room_1.joinedRoomAndGameUpdatedPayload,
    // Stats
    stats_1.statsSocketPayload,
    peer_1.myStatsPayload,
]);
//# sourceMappingURL=socket.js.map