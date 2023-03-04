// Wallet Code for Stellar Blockchain
/* Testnet Data
GAVDK46AISZUVA2IMV7TQT6K6OGYROSGS4U7NSNYD57A5S47EK7A3SCP
!- SC6SZV4COR22WTWNBS24KHMWEV4RTS53QQRZUPLFEAFMXLNV2XIDV4PV
Acc0
GCW7BE4UCPSFBIQ7V6AKGTJ3VV5AQX5MGBGVVPZRK3UPFFSMTDDC7J6T
!- SA5YOAZFHA4KV5CJ7IUX7BPO7YDZTJAOUCSXMYWBGQDEHXFOZLLW3NEM
*/
// Constant
const bUrl = 'https://horizon-testnet.stellar.org/'
const sAc0 = 'accounts/'
const sTx0 = '/transactions?limit=20&order=desc'
const sPy0 = '/payments?limit=20&order=desc'
const pURL = 'https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd'


// 
async function getAcc(sStr){
  fRs = await fetch(bUrl+sAc0+sStr);
  fDt = await fRs.json();
  console.log(fDt);
  prcAcc(fDt);
};

async function prcAcc(data){
  for (let i = 0; i < data.balances.length; i++) {
    if(data.balances[i].asset_type === "native"){
      console.log(data.balances[i].balance);
      document.getElementById("tBalance").innerHTML= (+data.balances[i].balance).toFixed(2);
      getVal(+data.balances[i].balance);
    }
  }
}

async function getVal(data){
  fRs = await fetch(pURL);
  fDt = await fRs.json();
  console.log(fDt.stellar.usd);
  document.getElementById("tValue").innerHTML= '$'+(data*fDt.stellar.usd).toFixed(2)
}

async function getPy0(sStr){
  fRs = await fetch(bUrl+sAc0+sStr+sPy0);
  fDt = await fRs.json();
  prcPay(fDt._embedded.records);
}

async function prcPay(data){
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if(data[i].type==='payment'){
    let pTx = data[i]._links.transaction.href;
    let pMmo = await getMmo(pTx);
    console.log(await pMmo)
    let pId = data[i].id;
    let pFr = data[i].from;
    let pTo = data[i].to;
    let pAm = (+data[i].amount).toFixed(2);
    let pTm = (data[i].created_at).slice(0,10);
    if(pFr === pubKey){
      pTp = "-";
      pAc = pTo.slice(0,4)+'..'+pTo.slice(-4)
      pIc = 'https://id.lobstr.co/'+pTo+'.png';
    } else {
      pTp = "+";
      pAc = pFr.slice(0,4)+'..'+pFr.slice(-4)
      pIc = 'https://id.lobstr.co/'+pFr+'.png';
    }
    nDiv = document.createElement('div');
    nDiv.setAttribute("id",pId);
    nDiv.setAttribute("class","box");
    document.getElementById('payHistory').appendChild(nDiv);
    document.getElementById(pId).innerHTML =
    '<div class="boxi"><img src='+pIc+' width="100%"></div>'+
    '<div><span class="boxt">'+pAc+'</span><span class="boxs">'+pMmo+'</span></div>'+
    '<div class="boxr"><span class="boxt">'+pTp+pAm+'</span><span class="boxs">'+pTm+'</span></div>'
  }
  }
  document.getElementById('shortinfo').style.display="block";
}

async function getMmo(txLink){
  fRs = await fetch(txLink);
  fDt = await fRs.json();
  if (fDt.memo_type==='text'){
    let memo = fDt.memo;
    return memo;
  } else {
    let memo = 'no memo';
    return memo;
  }
}