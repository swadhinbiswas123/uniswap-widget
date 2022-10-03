import { useState } from 'react';
import { defaultTheme, SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import Web3 from 'web3';
import "./App.css"

const theme = {
  ...defaultTheme,
  primary: "#000000",
  secondary: '#000000',
  interactive: '#C8CBD0',
  container: '#FFFFFF',
  module: '#FFFFFF',
  accent: '#2081E2',
  outline: '#CADDC2',
  dialog: '#FFFFFF',
  fontFamily: 'Verdana',
  borderRadius: 0.5,
};


const infuraId = "16e51344381c4262ad96b8bb526e64d2";
const JsonRpcEndpoint = `https://mainnet.infura.io/v3/${infuraId}`;


function App() {
const[isWalletConnected, setIsWalletConnected] = useState(false);
const [account, setAccount] = useState({
  address:"",
  provider: null
})


// //In here you need add you web3 connection code
const connect = async()=>{

  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.web3 = new Web3(window.ethereum);

  // after connecting wallet use this code to get current provider
    const provider = window.web3.currentProvider;

    setAccount({
      address:provider.selectedAddress,
      provider: provider
    })

    if(provider.selectedAddress){
      setIsWalletConnected(true);
    }

   } else {
    alert("Please install metamask")
   }
}

  return (
    <>
  <div className='main'>
  <div className='container'>
    <div className='btn'><button onClick={connect}>{isWalletConnected ?"Wallet Connected" : "Connect Wallet"}</button></div>
    <div className="Uniswap">
      <SwapWidget
      theme={theme}
      defaultOutputTokenAddress={"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"}
      provider={account.provider} 
      JsonRpcProvider={JsonRpcEndpoint}
      hideConnectionUI={true}
      width="100%"
      />
    </div>
  </div>
  </div>
  </>
  );
}

export default App;
