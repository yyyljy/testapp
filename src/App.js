import "./App.css";

function App() {
    const { Web3 } = require("web3");
    const Tx = require("ethereumjs-tx").Transaction;
    const Common = require("ethereumjs-common").default;
    require("dotenv").config();
    const NODE_URL = "CHAINSTACK_NODE_URL";
    const web3 = new Web3(window.ethereum);

    async function sendEth(value) {
        // Define the sender and receiver addresses, and the private key
        const sender = "0x60A476a6E826Dfbb77dE901651de17c3377FEf95";
        const receiver = "0x682126619D759312Aa0EF779cB7F5175eb5a86bC";
        const privateKey = Buffer.from(
            process.env.REACT_APP_PRIVATE_KEY,
            "hex"
        );

        // Define the gas limit
        const gasLimit = await web3.eth.estimateGas({
            from: sender,
            to: receiver,
        });

        // Get the transaction count for the sender address
        const nonce = await web3.eth.getTransactionCount(sender);

        // Define the transaction object
        const transactionObject = {
            to: receiver,
            gasPrice: web3.utils.toHex(web3.utils.toWei("50", "gwei")),
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
        console.log(`Raw transaction: ${rawTransaction}\n`);
    }

    sendEth("0.1");
    const account = "user_account=0x60A476a6E826Dfbb77dE901651de17c3377FEf95&";
    const rawTx =
        "raw_tx=" +
        "0xf881128b353030303030303030303082520894682126619d759312aa0ef779cb7f5175eb5a86bc9332303030303030303030303030303030303030808401546d71a039eeb912038bba9f181d0e79c47543818b68e3c641ccddf8c1219e7349fd0868a04921b5c6f3e0aad400b058e19db118088dad9dfb668160a70e974b96687ca322" +
        "&";
    return (
        <>
            <div>ETH RAW TX</div>
            <a
                href={`intent://wallyptoLink#Intent;scheme=dapp;S.signurl=https://dev4.innogrid.com:8443/innogrid/4/dapp/wallet/result_transaction?${account}${rawTx};package=xyz.wallypto;end`}
            >
                asd
            </a>
        </>
    );
}

export default App;
