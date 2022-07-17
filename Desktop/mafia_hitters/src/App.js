import './App.css';

function App() {
  return (
    <div className="App">
  <div className='container'>
<div className='row'>
  <form className='gradient col-lg-5 mt-5' style={{borderRadius:"25px", boxShadow:"1px 1px 4px #000000"}}>
    <button className='connect_button' style={{marginBottom:'5px',color:'#000000'}}><h2>Connect Wallet</h2></button>
    <br/>
    <div className="card" id='wallet-address' style={{marginTop:'3px',boxShadow:'1px 1px 4px #000000'}}>
      <input type="number" name="amount" defaultValue='1' min="1" max='2'/>
      <label style={{color:'#000000'}}><h4>Please select the amount of NFTs to mint</h4></label>
      <button className='mint_button'><h3>Mint</h3></button>
    </div>
  </form>
</div>
  </div>
    </div>
  );
}

export default App;





















