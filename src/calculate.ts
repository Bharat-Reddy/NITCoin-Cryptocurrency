import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';
import {broadcastLatest, broadCastTransactionPool} from './p2p';
import {
    getCoinbaseTransaction, isValidAddress, processTransactions, Transaction, UnspentTxOut, TxOut
} from './transaction';
import {addToTransactionPool, getTransactionPool, updateTransactionPool} from './transactionPool';
import {hexToBinary} from './util';
import {createTransaction, findUnspentTxOuts, getBalance, getPrivateFromWallet, getPublicFromWallet} from './wallet';
import {Block} from './blockchain'

class TxIn {
    public txOutId: string;
    public txOutIndex: number;
    public signature: string;
}



const firstTransaction = {
    'txIns': [{'signature': '', 'txOutId': '', 'txOutIndex': 0}],
    'txOuts': [{
        'address': '0489be3da4ada8e07f7b7244ff5fbf9e33c984a6ce97b976358855805073ea2dd1717caa93792abea9a845a11d6a3b7331147cca7a580d6b6fa0ddba4a29fd4987',
        'amount': 50
    }],
    'id': 'cbbcffaa869f660434c68f0a45d5bcf598699fde7933cb3fffded21b1d9c9591'
};

const genesisBlock: Block = new Block(
    0, '880cd9043b8b61b333bb164d707f0de2c17802d7bf58714f1f48a492b7a919d5', '', 1465154705, [firstTransaction], 0, 0
);

const calculateHash = (index: number, previousHash: string, timestamp: number, data: Transaction[],
    difficulty: number, nonce: number): string =>
CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();

const getTransactionId = (transaction: Transaction): string => {
    const txInContent: string = transaction.txIns
        .map((txIn: TxIn) => txIn.txOutId + txIn.txOutIndex)
        .reduce((a, b) => a + b, '');

    const txOutContent: string = transaction.txOuts
        .map((txOut: TxOut) => txOut.address + txOut.amount)
        .reduce((a, b) => a + b, '');

    return CryptoJS.SHA256(txInContent + txOutContent).toString();
};

const hash: string = calculateHash(0, '', 1465154705, [firstTransaction], 0, 0);

console.log("Transaction ID = "+getTransactionId(firstTransaction));
console.log("Hash of block = "+hash);