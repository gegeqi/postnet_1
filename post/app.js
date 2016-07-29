/**
 * Created by dujinqiao on 16-7-28.
 */

'use strict';

const repl = require('repl');
const method = require('./app_main');

function switchRouter(context, done) {
    let router = actions.find(item => item.name === currentAction);
    let result = router.doAction(context.cmd);
    let newRouter = actions.find(item => item.name === result);

    currentAction = newRouter.name;
    console.log(newRouter.help);
    done(null);
}

function handleCmd(cmd, context, filename, done) {
    switchRouter({
        cmd: cmd.trim()
    }, done);
    done(null);
}

var replServer = repl.start({prompt: "> ", eval: handleCmd});

const actions = [{
        name: 'init',
        help: "初始化界面:1-number,2-code,q-退出",
        doAction: function (cmd) {
            switch (cmd) {
                case '1':
                    return 'number';
                case '2':
                    return 'code';
                case 'q':
                    replServer.close();
                    process.exit(0);
                    return;

                default:
                    console.log("无效的输入");
                    return 'init'
            }
        }
    }, {
        name: 'code',
        help: 'code的状态  \nplease input barcodes eg:| |::|: ||::: |:::| :::|| :||:: |\n' +
        '1-init,2-number,q-quit',
        doAction: function (cmd) {
            switch (cmd) {
                case '1':
                    return 'init'
                case 'q':
                    replServer.close();
                    process.exit(0);
                    return;
                case '2':
                    return 'number';
            /*    case cmd:
                    console.log(method.codeTurnNum(cmd));

                    return 'code'*/
                default:
                    if (method.codeTurnNum(cmd) !== undefined) {
                        console.log(method.codeTurnNum(cmd));
                    }
                    else {
                        console.log("无效的输入");
                    }
                    return 'code'
            }
        }
    }, {
        name: 'number',
        help: "number的状态\n请输入一个数：5位、9位或带‘-’的10位数\n" +
        "1-init,2-code,q-quit",
        doAction: function (cmd) {

            switch (cmd) {
                case '1':
                    return 'init'
                case 'q':
                    replServer.close();
                    process.exit(0);
                    return;
                case '2':
                    return 'code';
                default:
                    if (method.num2code(cmd) !== undefined) {
                        console.log(method.num2code(cmd));
                    } else {
                        console.log("无效的输入");
                    }
                    return 'number'
            }
        }
    }
    ]
    ;

let currentAction = 'init';
console.log(actions.find(item => item.name === currentAction).help);
