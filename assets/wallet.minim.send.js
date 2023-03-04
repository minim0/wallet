const bUrl = 'https://horizon-testnet.stellar.org/'
const sAc0 = 'accounts/'
document.getElementById('destInp').value='GAVDK46AISZUVA2IMV7TQT6K6OGYROSGS4U7NSNYD57A5S47EK7A3SCP'

async function chkAdd(){
  let sStr = document.getElementById('destInp').value;
  fRs = await fetch(bUrl+sAc0+sStr);
  fDt = await fRs.json();
  console.log(fDt);
  document.getElementById('chkDes').innerHTML = 'Destination is Valid.';
  document.getElementById("addCon").style.display = "block";
};

function nextStep(prev0,next0){
  document.getElementById(prev0).style.display = "none";
  document.getElementById(next0).style.display = "block";
}


async function doSend(){
  let sDes = document.getElementById('destInp').value;
  let sAmt = document.getElementById('sendAmount').value;
  let sMmo = document.getElementById('sendMemo').value;
  const account = await server.loadAccount(pubKey);
	const transaction = new StellarSdk.TransactionBuilder(account, {
		fee: '100000', networkPassphrase: StellarSdk.Networks.TESTNET
	})
  .addOperation(StellarSdk.Operation.payment({
    destination: sDes,
    asset: new StellarSdk.Asset.native(),
    amount: sAmt.toString()
}))
  .addMemo(StellarSdk.Memo.text(sMmo))
  .setTimeout(600)
  .build();
  transaction.sign(keyPair);
  try {
		let transactionResult = await server.submitTransaction(transaction);
		var txFee = (transactionResult.fee_charged) / 10000000;
    console.log(txFee)
		console.log(transactionResult);
	} catch (e) {
    console.log('error')
	}




}