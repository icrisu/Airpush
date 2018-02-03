/* jshint node: true */
'use strict';

import JWT from '../utils/JWT';
import _ from 'lodash';
import safe from 'undefsafe';
import { SOCKET_EVENTS, SOCKET_MESSAGE_TYPES } from '../config';
import shortId from 'shortid';


class SocketManager {
    _io;

    constructor(io) {
        this._io = io;
        this.handleConnection();
    }

    handleConnection() {
        this._io.use((socket, next) => {
            const user = SocketManager.isValidAuth(socket.handshake.query.x__authorization);
            if (!user) {
                return next(new Error('AUTH_ERROR'));    
            }
            socket.user = user;
            const joinedRoomId = socket.handshake.query.joinedRoomId;
            if (joinedRoomId != 'false' && !_.isNil(joinedRoomId) && String(joinedRoomId).length < 30) {
                console.log('CONNECTED & JOINED ROOM: ', joinedRoomId);
                socket.join(joinedRoomId);
                // emit to self
                socket.emit(SOCKET_EVENTS.JOINED_ROOM, { roomId: joinedRoomId });
                // emit to others
                socket.broadcast.to(joinedRoomId).emit(SOCKET_EVENTS.MESSAGE, {
                    type: SOCKET_MESSAGE_TYPES.NEW_USER_JOINED,
                    payload: Object.assign({msgType: SOCKET_MESSAGE_TYPES.NEW_USER_JOINED}, socket.user)
                });
            }
            return next();
        });  
        this._io.on('connection', (socket) => {
            console.log('ON CONNECTION ', socket.user);

            // console.log('CLIENTS  ', this._io.sockets.clients());

            this.handleLeaveRoom(socket);
            this.handleCreateRoom(socket);
            this.handleJoinRoom(socket);
            this.handleDisconnect(socket);
        });        
    }

    // handle create room
    handleCreateRoom(socket) {
        socket.on(SOCKET_EVENTS.CREATE_ROOM, data => {
            const roomId = String(shortId.generate());
            console.log('CREATE ROOM', data, 'room id', roomId);

            socket.room = {
                isCreator: true,
                roomId: roomId
            }
            socket.join(roomId);
            socket.emit(SOCKET_EVENTS.ROOM_CREATED, { roomId });
        });
    }

    // handle join room
    handleJoinRoom(socket) {
        socket.on(SOCKET_EVENTS.JOIN_ROOM, data => {
            console.log(SOCKET_EVENTS.JOIN_ROOM, data, 'SOket', socket.id);
            if (!_.isNil(safe(socket, 'room.roomId'))) {
                // send leave message
                debug('USER LEAVE MESSSAGE');
                socket.broadcast.to(socket.room.roomId).emit(SOCKET_EVENTS.MESSAGE, {
                    type: SOCKET_MESSAGE_TYPES.USER_LEAVED,
                    payload: Object.assign({msgType: SOCKET_MESSAGE_TYPES.USER_LEAVED}, socket.user)
                });
                socket.leave(socket.room.roomId);
            }
            const { roomToJoin } = data;
            if (_.isString(roomToJoin) && String(roomToJoin).length < 20) { 
                socket.room = {
                    isCreator: false,
                    roomId: roomToJoin
                }
                socket.join(roomToJoin);
                // emit to self
                socket.emit(SOCKET_EVENTS.JOINED_ROOM, { roomId: roomToJoin });
                // emit to others
                socket.broadcast.to(roomToJoin).emit(SOCKET_EVENTS.MESSAGE, {
                    type: SOCKET_MESSAGE_TYPES.NEW_USER_JOINED,
                    payload: Object.assign({msgType: SOCKET_MESSAGE_TYPES.NEW_USER_JOINED}, socket.user)
                });
            }
        });
    }    

    // handle disconnect
    handleDisconnect(socket) {
        socket.on(SOCKET_EVENTS.DISCONNECT, s => {
            // inform others in the room
            if (!_.isNil(safe(socket, 'room.roomId'))) {
                socket.broadcast.to(socket.room.roomId).emit(SOCKET_EVENTS.MESSAGE, {
                    type: SOCKET_MESSAGE_TYPES.USER_LEAVED,
                    payload: Object.assign({msgType: SOCKET_MESSAGE_TYPES.USER_LEAVED}, socket.user)
                });
                try {
                    socket.leave(socket.room.roomId);
                } catch (e) {};
            }            
            console.log('SOcket server disconnect');
        })
    }

    handleLeaveRoom(socket) {
        socket.on(SOCKET_EVENTS.LEAVE_ROOM, data => {
            // inform others
            if (!_.isNil(safe(socket, 'room.roomId'))) {
                socket.broadcast.to(socket.room.roomId).emit(SOCKET_EVENTS.MESSAGE, {
                    type: SOCKET_MESSAGE_TYPES.USER_LEAVED,
                    payload: Object.assign({msgType: SOCKET_MESSAGE_TYPES.USER_LEAVED}, socket.user)
                });                
                socket.leave(socket.room.roomId);
            }
        })
    }

    // validate auth
    static isValidAuth(x__authorization) {
        const decoded = JWT.isValidToken(x__authorization);
		if (!_.isNil(safe(decoded, '_id'))) {
			return decoded;
        }
        return false;
    }
}

export default SocketManager;
