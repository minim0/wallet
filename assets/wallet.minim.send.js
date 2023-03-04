const bUrl = 'https://horizon-testnet.stellar.org/'
const sAc0 = 'accounts/'


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