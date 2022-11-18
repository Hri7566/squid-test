const squid = require('flying-squid')
const fs = require('fs');
const path = require('path');

const favicon = fs.readFileSync(path.resolve(__dirname, '../server-icon.png')).toString('base64');

class Server {
    static start() {
        this.server = squid.createMCServer({
            motd: 'Node.js server',
            port: 25565,
            'max-players': 25,
            'online-mode': true,
            logging: true,
            gameMode: 1,
            difficulty: 1,
            worldFolder: 'world',
            generation: {
                name: 'superflat',
                options: {
                    worldHeight: 80
                }
            },
            kickTimeout: 10000,
            plugins: {
                // saveOp: require('../plugins/saveOp')
            },
            modpe: false,
            'view-distance': 10,
            'player-list-text': {
                header: 'Node.js Server',
                footer: 'Chimken Birb'
            },
            'everybody-op': false,
            'max-entities': 100,
            'version': '1.16.5',
            favicon: `data:image/png;base64,${favicon}`
        });

        this.server.on('newPlayer', player => { // this should be called join
            console.log(player._events);
            player.on('chat', (msg) => {
                setTimeout(() => {
                    let prefix = '!'
                    msg.a = msg.text;
                    msg.args = msg.a.split(' ');
                    msg.argcat = msg.a.substring(msg.args[0].length).trim();
                    msg.cmd = msg.args[0].substring(prefix.length);
                    console.log(msg.cmd);
                    
                    if (!msg.a.startsWith(prefix)) return;

                    function sendChat(m) {
                        // player.chat(`<Cosmic> ${m}`);
                        player.chat(`<§aServer§r> ${m}`)
                    }

                    switch (msg.cmd) {
                        case 'help':
                            // sendChat('🌠 Info Commands: *help,  *about,  *id,  *color,  *groups');
                            // sendChat('🎆 Fun Commands: *8ball');
                            // sendChat('🎂 Cake Commands: *bake,  *stopbaking,  *inventory,  *balance,  *eat,  *eatallcakes,  *shop');
                            break;
                        case 'about':
                            // sendChat('This bot was made by Hri7566.');
                            break;
                        case 'changemotd':
                        case 'motd':
                        case 'setmotd':
                            this.server._server.motdMsg = msg.argcat;
                            sendChat('Changed MOTD to ' + msg.argcat)
                            break;
                    }
                });
            })
        });
    }
}

module.exports = {
    Server
}
