import {Server} from 'socket.io';
import Redis from 'ioredis' 


const pub = new Redis({
    host: 'redis-9828e57-mishraaditya675-1365.a.aivencloud.com',
    port: 16941,
    username: 'default',
    password: 'AVNS_n4k3FxoEZePapot4BlU',
});
const sub = new Redis({
    host: 'redis-9828e57-mishraaditya675-1365.a.aivencloud.com',
    port: 16941,
    username: 'default',
    password: 'AVNS_n4k3FxoEZePapot4BlU',
});

class socketService{
    private _io: Server;
    constructor() {
        console.log("INIT Socket Server");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });

        sub.subscribe("MESSAGE");


    }
    public initListener() {
        const io = this.io;
        console.log('INIT socket listener...');


        
        io.on('connect', socket => {
            console.log(`new socket connected`, socket.id);

            socket.on('event:message', async ({message}: {message: String}) => {
                console.log('new message rec.', message);
                await pub.publish("MESSAGE", JSON.stringify({message}));

            });
        });
        sub.on('message', (channel, message ) =>{
            if (channel === 'MESSAGE') {
                io.emit('message', message);

            }
        })
    }




    get io() {
        return this._io;
    }
}

export default socketService;