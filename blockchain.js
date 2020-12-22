const Block = require('./block')
const MIN_DIFFICULTY = 2
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block({
            from: '',
            amount: 10e9,
            to: 'Nakamoto'
        }, 'genesis-hash', MIN_DIFFICULTY, 'genesis-time')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(data) {
        const block = new Block(data, this.getLatestBlock().hash, this.getLatestBlock().difficulty, Date.now())
        block.mine(this.getLatestBlock().difficulty, this.getLatestBlock().timestamp)
        this.chain.push(block);
    }

    toString() {
        return `Blockchain \r\n${this.chain.map(t => t.toString()).join('\r\n')}`
    }

    isValid(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(this.createGenesisBlock())) {
            return false
        }
        for (let index = 1; index < chain.length; index++) {
            const block = chain[index];
            const lastBlock = chain[index - 1]
            if (block.previousHash !== lastBlock.hash) {
                return false
            }
        }
        return true;
    }

    replace(newChain) {
        if (newChain.length <= this.chain.length) {
            console.log('New chain must be longer thanh current chain')
            return
        }
        if (!this.isValid(newChain)) {
            console.log('New chain is invalid')
            return
        }
        console.log('replace with new chain')
        this.chain = newChain
    }
}

module.exports = BlockChain;