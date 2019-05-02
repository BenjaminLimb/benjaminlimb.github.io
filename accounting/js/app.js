var App = (function(){
  var exports = {}
  
  var url = "https://script.google.com/macros/s/AKfycbxfyMe5-5hhpE8MDP6JXXRQJV4nZM-4LwA_XUyse9GD/dev";

  var apiUrl = "";
  var accounts = [];
  var entities = [];
  var transactions = [];
  var googleAppUrl = "";
  
  exports.getGoogleApiUrl = function()
  {
    return url;
  }
  
  exports.getEntities = function()
  {
    return entities;
  }
  exports.getAccounts = function()
  {
    return accounts;
  }
  
  function initializeAccounts()
  {

    for (let acct of entityStore['Accounts'])
    {
      if (acct['Active'])
      {
        accounts.push({
          value: acct['Account Name'],
          label: acct['Short Account Name'],
          type: acct['Display Type']
        });
      }
    }
    accounts.sort();
  }
  
  function initializeEntities()
  {     

    for (let entity of entityStore['Entities'])
    {
      if (entity['Active'])
      {
        entities.push({
          value: entity['Entity Name'],
          label: entity['Entity Name'],
          type: entity['Display Type']
        });
      }
    }
    entities.sort();
  }

  exports.init = function()
  {          
      initializeEntityStore();
      populateEntityStore();
      
      initializeAccounts();
      initializeEntities();
    
    apiUrl = localStorage.getItem("apiUrl");
  //document.getElementById("apiUrl").value = apiUrl;
  
  }
  
  exports.hideEntry = function()
  {
    var entryDiv = document.getElementById("entry");
    entryDiv.style.display = "none";
  }
  
  exports.showEntry = function()
  {
    var entryDiv = document.getElementById("entry");
    entryDiv.style.display = "block";
    var html = getFormHtml();
    entryDiv.innerHTML = html;
      addEntryLine(2);
    populateAccountDropdowns();
    populateEntityDropdowns();     
    
  }


function populateEntityStore()
{
  var request = {"data":{
    "commands":[
      {
        operation:"getAll",
        data:{
          "entityType":"Accounts"
        }  
      },
      {
        operation:"getAll",
        data:{
          "entityType":"Entities"
        }  
      },
//      {
//        operation:"getAll",
//        data:{
//          "entityType":"Lines"
//        }  
//      },
//      {
//        operation:"getAll",
//        data:{
//          "entityType":"Tiller"
//        }  
//      },     
    ]
  }};
  
  
  jsonpData(url,retrieveEntityStore,"GetData",request)
}



function saveApiUrl()
{  
  apiUrl = document.getElementById("apiUrl").value;
  localStorage.setItem("apiUrl", apiUrl);
}



  return exports;
}());


