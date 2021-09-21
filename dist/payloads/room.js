"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchRoomActivityRequestPayload = exports.peerJoinedRoomPayload = exports.leaveRoomRequestPayload = exports.joinRoomFailurePayload = exports.joinRoomSuccessPayload = exports.joinRoomRequestPayload = exports.joinedRoomAndGameUpdatedPayload = exports.joinedRoomUpdatedPayload = exports.roomResponsePayload = exports.publicRoomsResponsePayload = exports.privateRoomResponsePayload = exports.publicRoomResponsePayload = exports.createRoomResponse = exports.createRoomRequest = void 0;
var io = require("io-ts");
var chessGame_1 = require("../chessGame");
var gameRecord_1 = require("../records/gameRecord");
var peerRecord_1 = require("../records/peerRecord");
var roomRecord_1 = require("../records/roomRecord");
exports.createRoomRequest = io.intersection([
    io.type({
        userId: io.string,
        type: roomRecord_1.roomType,
    }),
    io.union([
        io.type({
            activityType: io.literal('play'),
            gameSpecs: chessGame_1.gameSpecsRecord,
        }),
        io.type({
            activityType: io.literal('analysis'),
        }),
        io.type({
            activityType: io.literal('none'),
        }),
    ]),
    io.partial({
        name: io.string,
    }),
    roomRecord_1.roomActivityCreationRecord,
]);
exports.createRoomResponse = roomRecord_1.roomRecord;
exports.publicRoomResponsePayload = roomRecord_1.publicRoomRecord;
exports.privateRoomResponsePayload = roomRecord_1.privateRoomRecord;
exports.publicRoomsResponsePayload = io.array(roomRecord_1.publicRoomRecord);
exports.roomResponsePayload = roomRecord_1.roomRecord;
// SOCKET
exports.joinedRoomUpdatedPayload = io.type({
    kind: io.literal('joinedRoomUpdated'),
    content: roomRecord_1.roomRecord,
});
exports.joinedRoomAndGameUpdatedPayload = io.type({
    kind: io.literal('joinedRoomAndGameUpdated'),
    content: io.type({
        room: roomRecord_1.roomRecord,
        game: gameRecord_1.gameRecord,
    }),
});
// This is different b/c the client is like a client request
//  while the others are server responses.
//  Not sure I need to make a distinction between them (yet).
exports.joinRoomRequestPayload = io.type({
    kind: io.literal('joinRoomRequest'),
    content: io.type({
        roomId: io.string,
        code: io.union([io.string, io.undefined]),
    }),
});
exports.joinRoomSuccessPayload = io.type({
    kind: io.literal('joinRoomSuccess'),
    content: io.type({
        room: roomRecord_1.roomRecord,
        me: peerRecord_1.peerRecord,
    }),
});
exports.joinRoomFailurePayload = io.type({
    kind: io.literal('joinRoomFailure'),
    content: io.keyof({
        WrongCode: null,
        InexistentRoom: null,
        InexistentPeer: null,
        OtherRoomAlreadyJoined: null,
    }),
});
exports.leaveRoomRequestPayload = io.type({
    kind: io.literal('leaveRoomRequest'),
    content: io.undefined,
});
// TODO: Not sure this is still needed
// TODO: @deprecate in favor of roomStatsPayload?
exports.peerJoinedRoomPayload = io.type({
    kind: io.literal('peerJoinedRoom'),
    content: io.type({
        roomId: io.string,
        peerId: io.string,
    }),
});
exports.switchRoomActivityRequestPayload = io.type({
    kind: io.literal('switchJoinedRoomActivityRequest'),
    content: roomRecord_1.roomActivityCreationRecord,
});
//# sourceMappingURL=room.js.map