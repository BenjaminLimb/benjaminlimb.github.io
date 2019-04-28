var d = new Date();
var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
var url = "https://script.google.com/macros/s/AKfycbxfyMe5-5hhpE8MDP6JXXRQJV4nZM-4LwA_XUyse9GD/dev";

var apiUrl = "";
var accounts = [];
var transactions = [];

function receive(data) {
  console.log(data);
  
  if(data.accounts)
  {
    accounts = [];
  }
  
  for (let acct of data.accounts.data)
  {
    if (acct.active)
    {
      accounts.push({
        value: acct['full account name'],
        label: acct['full account name'],
        type: acct['display type']
      });
    }
  }
  accounts.sort();  
    
  if(data.transactions)
  {
    transaction = [];
    console.log(data.transactions);
    
    
    
  }
    
  if(data.tiller)
  {
    tiller = [];
    console.log(data.tiller);
  }
  
    
  if(data.entities)
  {
    entities = [];
    console.log(data.entities);
  }
  
}

function matchAccount(ob,matchString)
{
  var firstMatch = null;
  for (let acct of accounts)
  {
    if(acct.value === matchString)
    {
      return; //Already set to a valid entry
    }
    if(acct.value.toString().indexOf(matchString) !== -1 && firstMatch == null)
    {
        firstMatch = acct.value;
    }
  }
  if(firstMatch!=null)
  {
    ob.value = firstMatch
  }
  
}
//
//function init()
//{
//  apiUrl = localStorage.getItem("apiUrl");
//  //document.getElementById("apiUrl").value = apiUrl;
//
//  // Retrieve
////?command=GetData&options={\"accounts\":1}&jsonp=receive"
//      var options = {
//        accounts:1,
//        transactions:1,
//        entities:1,
//        tiller:1,
//        
//      }
//      var data = {'options':options};
//      jsonpData(url,receive,"GetData",data)
//      //jsonp(url, receive, "command=GetData&options={\"accounts\":1}");
//               
//}
function receiveResponse(response)
{
  console.log(response)
  document.getElementById('status').innerHTML=response.Message;
}

function saveApiUrl()
{  
  apiUrl = document.getElementById("apiUrl").value;
  localStorage.setItem("apiUrl", apiUrl);
}

function readTransaction()
{
  var date = document.forms.entry.date.value
  var vendor = document.forms.entry.vendor.value
  
  var splits = []
  for(var i = 0; i < document.forms.entry.account.length; i++)
  {    
    if(document.forms.entry.account[i].value !== "")
    {
      splits.push({
        "acct":document.forms.entry.account[i].value,
          "amt":document.forms.entry.amount[i].value,
          "desc":document.forms.entry.description[i].value        
      })
    }
  }
  
  return {
     "date":date,
      "vendor":vendor,
      "splits":splits
  }
}


function listTransactions()
{
  var el = document.getElementById('transactionsDisplay')
  
}