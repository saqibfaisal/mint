import './App.css';
import mintExampleAbi from "./mintExampleAbi.json";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from 'react';
const mintExampleAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const { ethereum } = window
function App() {
  // CONNECTING
  const [accounts, setAccounts] = useState([]);
  const [mintAmount, setMintAcount] = useState(1)
  async function ConnectAccount() {
    if (window.ethereum) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts)
    }
    else {
      alert("metamask not install")
    }
  }
  useEffect(() => {
    ConnectAccount()
  }, [])
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintExampleAbi.abi,
        signer
      )
      try {
        const response = await contract.mint(BigNumber.from(mintAmount))
        console.log("response:", response);
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="App">
      this is how you crae5te a mint button
      {
        accounts.length && (
          <div>
            <button onClick={() => setMintAcount(mintAmount - 1)}>-</button>
            {mintAmount}
            <button onClick={() => setMintAcount(mintAmount + 1)}>+</button>
            <button onClick={() => handleMint()}>Mint</button>
          </div>
        )
      }
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
