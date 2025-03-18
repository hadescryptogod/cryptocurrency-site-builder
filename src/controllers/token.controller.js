// import library
const crypto = require("crypto");
const { Web3 } = require("web3");
const token = require("../util/token.js");

// get token data
exports.getTokenData = async (req, res, next) => {
  try {
    // token network
    const tokenNetwork = req.params.tokenNetwork;

    // token contract addres
    const tokenContractAddress = req.params.tokenContractAddress;

    // token rpc endpoint
    const { endpoint } = token.tokenNetworks.filter(
      (network) => network.slug === tokenNetwork
    )[0];

    console.log(endpoint);

    const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
      "0x" + process.env.SIGNER_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);

    // contract
    const contract = new web3.eth.Contract(
      token.erc20TokenABI,
      tokenContractAddress
    );

    // token data
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const totalSupply = await contract.methods.totalSupply().call();

    const tokenData = {
      name,
      symbol,
      totalSupply: Math.floor(web3.utils.fromWei(totalSupply, "ether")),
    };

    console.log(tokenData);

    res.status(200).json({ token: tokenData });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
