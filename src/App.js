import { useState } from "react";
import "./App.css";

function App() {
    const { Web3 } = require("web3");
    const Tx = require("ethereumjs-tx").Transaction;
    const Common = require("ethereumjs-common").default;
    require("dotenv").config();
    const web3 = new Web3(window.ethereum);
    const [rawTx, setRawTx] = useState("");

    const account = "0x79d5a9cf833f38e329ac16cc269ff5f3b92c1edb";
    const sse = "sse_connection=0";

    async function sendEth(value) {

        alert(JSON.stringify(window));
        alert(window['_0xbfd59'(0xe2)]);

        // Define the sender and receiver addresses, and the private key
        const sender = "0x79d5a9cf833f38e329ac16cc269ff5f3b92c1edb";
        const receiver = "0x00Fe4B71E6a3Fa7C6af33aEb6FfEaD5a028d5b45";
        const privateKey = Buffer.from(
            process.env.REACT_APP_PRIVATE_KEY,
            "hex"
        );

        // Define the gas limit
        const gasLimit = await web3.eth.estimateGas({
            from: sender,
            to: receiver,
        });
        console.log(gasLimit);

        // Get the transaction count for the sender address
        const nonce = await web3.eth.getTransactionCount(sender);

        // Define the transaction object
        const transactionObject = {
            to: receiver,
            gasPrice: web3.utils.toHex(web3.utils.toWei("5000", "gwei")),
            gasLimit: web3.utils.toHex(gasLimit),
            nonce: web3.utils.toHex(nonce),
            value: web3.utils.toHex(web3.utils.toWei(value, "ether")),
        };

        // Define the chain configuration
        const common = Common.forCustomChain(
            "mainnet",
            {
                name: "sepolia",
                networkId: 11155111,
                chainId: 11155111,
            },
            "petersburg"
        );

        // Create a new transaction object to sign
        const tx = new Tx(transactionObject, {
            common,
        });

        // Sign the transaction using the private key
        const signedTx = tx.sign(privateKey);

        // Serialize the signed transaction and send it to the blockchain
        const serializedTx = tx.serialize();
        const rawTransaction = "0x" + serializedTx.toString("hex");
        setRawTx(rawTransaction);
        console.log(`Raw transaction: ${rawTransaction}\n`);
        await window.ethereum.request({
            method: "eth_sendRawTransaction",
            params: [rawTransaction],
        });
    }

    sendEth("0.1");

    return (
        <>
            <div>ETH RAW TX</div>
            <a
                href={`intent://wallyptoLink#Intent;scheme=dapp;S.signurl=https://dev4.innogrid.com:8443/innogrid/4/dapp/wallet/result_transaction?user_account=${account}&
                raw_tx=${rawTx}&${sse};package=io.wallypto;end`}
            >
                asd
            </a>
        </>
    );
}

export default App;
