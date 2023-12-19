"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const ioredis_1 = __importDefault(require("ioredis"));
const pub = new ioredis_1.default({
    host: 'redis-9828e57-mishraaditya675-1365.a.aivencloud.com',
    port: 16941,
    username: 'default',
    password: 'AVNS_n4k3FxoEZePapot4BlU',
});
const sub = new ioredis_1.default({
    host: 'redis-9828e57-mishraaditya675-1365.a.aivencloud.com',
    port: 16941,
    username: 'default',
    password: 'AVNS_n4k3FxoEZePapot4BlU',
});
class socketService {
    constructor() {
        console.log("INIT Socket Server");
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        sub.subscribe("MESSAGE");
    }
    initListener() {
        const io = this.io;
        console.log('INIT socket listener...');
        io.on('connect', socket => {
            console.log(`new socket connected`, socket.id);
            socket.on('event:message', ({ message }) => __awaiter(this, void 0, void 0, function* () {
                console.log('new message rec.', message);
                yield pub.publish("MESSAGE", JSON.stringify({ message }));
            }));
        });
        sub.on('message', (channel, message) => {
            if (channel === 'MESSAGE') {
                io.emit('message', message);
            }
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = socketService;
