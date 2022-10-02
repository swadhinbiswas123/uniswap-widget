import { useState } from 'react';
import { providers, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { defaultTheme, SwapWidget } from '@uniswap/widgets'

const infuraId = "16e51344381c4262ad96b8bb526e64d2";
const JsonRpcEndpoint = `https://mainnet.infura.io/v3/${infuraId}`;
const JsonRpcProvider = new providers.JsonRpcProvider(JsonRpcEndpoint);
const provider = new ethers.providers.Web3Provider(JsonRpcProvider);

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



function NewApp() {
    const [account, setAccount] = useState({
        address: '',
        provider: provider
      })
    
      async function connectWallet() {
        const ethereumProvider = await detectEthereumProvider();
    
        console.log(ethereumProvider);

        if (ethereumProvider) {
          const address = await window.ethereum.request({
            method: 'eth_requestAccounts'
          })
          setAccount({
            address: address[0],
            provider: ethereumProvider
          })
        }
      }
    
      return (
        <div className="App">
          <div>
            <button onClick={connectWallet}>Connect Wallet</button>
          </div>
          <div className="Uniswap">
            <SwapWidget 
            theme={theme}
            provider={account.provider}
            JsonRpcEndpoint={JsonRpcEndpoint} />
          </div>
        </div>
      );
}

export default NewApp;
