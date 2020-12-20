const BlockChain = require('./blockchain');

const blockChain = new BlockChain();
blockChain.addBlock({
    from: 'Nakamoto',
    amount: 100,
    to: 'Hieu'
})

console.log(blockChain.toString())