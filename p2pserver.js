const WebSocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2pServer {
    constructor(blockChain) {
        this.sockets = []
        this.blockChain = blockChain
    }

    listen() {
        const server = new WebSocket.Server({
            port: P2P_PORT
        })
        server.on('connection', socket => {
            this.connectSocket(socket)
            // 1. connect socket
            //2. connect peers
        })
        this.connectPeers()
        console.log('Listening on p2p on : ', P2P_PORT)
    }

    connectPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer)
            socket.on('open', () => {
               this.connectSocket(socket)
            })
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket)
        console.log("Socket connected")
        this.messageHandler(socket)
        this.sendChain(socket)
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockChain.chain))
    }

    messageHandler(socket) {
        socket.on('message', message => {
            console.log('message ===>', message)
            const receivingChain = JSON.parse(message)
            this.blockChain.replace(receivingChain)
        })
    }
}

module.exports = P2pServer