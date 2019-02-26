var d = new Date();
var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
var apiUrl = "";
function fill()
{
  document.forms.entry.date.value = today;
  document.forms.entry.vendor.value = "Costco";
  document.forms.entry.account[0].value = "Personal Checking";
  document.forms.entry.amount[0].value = "-100";
  document.forms.entry.account[1].value = "Food";
  document.forms.entry.amount[1].value = "100";
}

function setOptions()
{
  jsonp(url, receive, null);
}

var googleAppUrl = "";

function receive(data) {
  console.log(data);
  var accounts = [];

  for (let acct of data.accounts.data)
  {
    if (acct.active)
    {
      accounts.push({
        value: acct['full account name'],
        label: acct['full account name'] + ":" + acct['account type']
      });
    }
  }
  accounts.sort();

  $(function () {
    $(".account").autocomplete({source: accounts});
  }
  );

  $(".amount").change(calculateBalance);

}

function jsonp(url, callback, data)
{
  var s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}
var url = "https://script.google.com/macros/s/AKfycbzERAwgCdcpq9rDCw1aKFe44YWgiKBzGq4Bbk59DA/exec?command=GetData&options={\"accounts\":1}&jsonp=receive"

function calculateBalance()
{
  var sum = 0;
  var i = 0;
  for (i = 0; i < document.forms.entry.amount.length; i++)
  {
    var acct = document.forms.entry.account[i];
    var a = document.forms.entry.amount[i];
    if (acct.value && acct.value !== "" &&
            a.value && a.value !== "" && a.value !== NaN)
    {
      sum += parseFloat(a.value);
    } else
    {
      break;
    }
  }
  if (sum !== 0)
  {
    document.forms.entry.amount[i].value = -sum;
  }

//      for (a of document.forms.entry.amount)
//      {        
//        if(a.value && a.value !== "")
//          {
//            sum += parseFloat(a.value);
//          }
//          else
//          {
//            break;
//          }
//      }
  document.forms.entry.balance.value = sum;
}

document.onkeydown = checkKey;

function getIndex(el)
{
  var name = el.name;
  for (var i = 0; i < document.forms.entry.elements[name].length; i++)
  {
    //console.log(document.forms.entry.elements[name][i]);
    if (el == document.forms.entry.elements[name][i])
    {
      return i;
    }
  }
}
function move(rD, cD)
{
  var r = parseInt(document.activeElement.dataset.row);
  var c = parseInt(document.activeElement.dataset.column);
  r += rD;
  c += cD;
  document.querySelector("[data-row='" + r + "'][data-column='" + c + "']").focus();
}

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == '38') {
    // up arrow
    move(-1, 0);
  } else if (e.keyCode == '40') {
    // down arrow
    move(1, 0);
    //      
    //      var r = parseInt(document.activeElement.dataset.row);
    //      var c = parseInt(document.activeElement.dataset.column);
    //      
    //      //getIndex(document.activeElement)
    //      console.log("R:" + r + " C:" + c);
    //      r+=1;
    //      console.log("R:" + r + " C:" + c);
    //      var selector = "[data-row='"+r+"'][data-column='"+c+"']"
    //      console.log("Selector:" + selector);
    //      document.querySelector("[data-row='"+r+"'][data-column='"+c+"']").focus();
    //        

  } else if (e.keyCode == '37') {
    // left arrow
    move(0, -1);
  } else if (e.keyCode == '39') {
    // right arrow
    move(0, 1);
  }

}
function init()
{

  apiUrl = localStorage.getItem("apiUrl");
  document.getElementById("apiUrl").value = apiUrl;

  // Retrieve

//jsonp(googleAppUrl+"?jsonp=callback")  
      jsonp(url, receive, null);
  
}

function saveApiUrl()
{
  
  apiUrl = document.getElementById("apiUrl").value;
  localStorage.setItem("apiUrl", apiUrl);
}
