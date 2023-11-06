import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(0, {
    cors: {
        origin: '*'
    }
})
export class webSocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer() server: Server;

    afterInit(server: any) {
        console.log('SOCKET iniciado');
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('Cliente conectado');
    }

    handleDisconnect(client: any) {
        console.log('Cliente desconectado')
    }

    @SubscribeMessage('join_establecimiento')
    handleJoinRoom(client: Socket, id: string) {
        console.log(id)
        client.join(`${id}`);
    }

    @SubscribeMessage('left_establecimiento')
    handleRoomLeave(client: Socket, id: string) {
        client.leave(`${id}`);
    }
    
    @SubscribeMessage('parcela')
    parcela(client: Socket, data: any) {
        client.to(`${data.id}`).emit('new_parcela', data.response);
    }

    @SubscribeMessage('sembrar')
    sembrar(client: Socket, data: any) {
        client.to(`${data.id}`).emit('new_sembrar', data.response);
    }
    
    @SubscribeMessage('actividad')
    actividad(client: Socket, data: any) {
        client.to(`${data.id}`).emit('new_actividad', data.response);
    }

    @SubscribeMessage('cosechar')
    cosecha(client: Socket, data: any) {
        client.to(`${data.id}`).emit('new_cosecha', data.response);
    }

    
    @SubscribeMessage('msg')
    message(client: Socket, data: any) {
        console.log(data)
        client.broadcast.emit('new_msg', data.msg);
    }
}