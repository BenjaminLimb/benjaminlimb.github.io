//
//function receive(data) {
//  
//  if (data.accounts)
//  {
//    accounts = [];
//  }
//  
//  for (let acct of data.accounts.data)
//  {
//    if (acct.active)
//    {
//      accounts.push({
//        value: acct['full account name'],
//        label: acct['full account name'],
//        type: acct['display type']
//      });
//    }
//  }
//  accounts.sort();
//  populateAccountDropdowns();
//  
//  //$(".amount").change(calculateBalance);
//   
//}

function checkDate(ob)
{
    if(ob.value.length > 0)
    {        
        var dt = chrono.parseDate(ob.value);
        var dateString = dt.getUTCFullYear() +"-"+ (dt.getUTCMonth()+1) +"-"+ dt.getUTCDate();
        ob.value = dateString;        
        console.log(dt);
        
        var diff = datediff(dt,new Date())
        if (diff > 120 && diff <= 365)
        {
          ob.style['background-color'] = "yellow";          
        }
        else if(diff > 365)
        {
          ob.style['background-color'] = "red";
          
        }
        else if(diff < 0 )
        {
          ob.style['background-color'] = "red";
        }
        else
        {
         ob.style['background-color'] = ""; 
        }
    } 
    else
    {
         ob.style['background-color'] = ""; 
    }
}

function ckAmt(el)
{
  
  var val = NaN;
  try
  {
   val = Math.round(eval(el.value) * 100) / 100;
  }
  catch(e)
  {
    val = "";
  }
  
  if(val !== NaN)
  {
    el.value = val;
  }
}

function populateAccountDropdowns()
{  
  let accounts = App.getAccounts();
  $(function () {
    $(".account").autocomplete({source: accounts}).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<span class='type'>" + item.type + "</span><span>" + item.label + "</span>" )
        .appendTo( ul );
    };
    
  }
  );
}

function populateEntityDropdowns()
{    
  let entities = App.getEntities();
  $(function () {
    $(".entity").autocomplete({source: entities}).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<span>" + item.label + "</span>" )
        .appendTo( ul );
    };
    
  }
  );
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

function calculateBalance()
{
  var sum = 0;
  var i = 0;
  for (i = 0; i < document.forms.entry.amount.length; i++)
  {
    var acct = document.forms.entry.account[i];
    var a = document.forms.entry.amount[i];
    if (acct.value && acct.value !== "" && a.value && a.value !== "" && a.value !== NaN)
    {
      sum += parseFloat(a.value);
    } else
    {
      break;
    }
  }
  
  if (sum !== 0 )
  {
    document.forms.entry.amount[i].value = roundToNearestCent(-sum);
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
  //document.forms.entry.balance.value = sum;
}



function checkLines()
{    
  if(document.forms.entry.account[entryRows].value != "")
  {
    addEntryLine(1);
  } 
}

document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  checkLines();
  calculateBalance();
return;
  if (e.keyCode == '38') {
    // up arrow
    move(-1, 0);
  } else if (e.keyCode == '40') {
    // down arrow
    move(1, 0);   

  } else if (e.keyCode == '37') {
    // left arrow
    move(0, -1);
  } else if (e.keyCode == '39') {
    // right arrow
    move(0, 1);
  }

}



function putAllToGoogle(lines)
{
  var request = {"data":{
    "commands":[
      {
        operation:"putAll",
        data:{
          "entityType":"Lines",
          "entities":lines
        }  
      },
          
    ]
  }};
  
  jsonpData(App.getGoogleApiUrl(),commandSuccessHandler,"BLAH",request) // TODO: Why GETDATA?
}

function commandSuccessHandler(response)
{
  document.getElementById('status').innerHTML="Added Entry Successfullly."
  document.forms.entry.reset();
 
}

function receiveResponse(response)
{
  console.log(response)
  document.getElementById('status').innerHTML=response.Message;
}

function onSubmitForm()
{  
  try
  {
    var transaction = readTransaction();    
    entityStore.saveTransaction(transaction);
    App.hideEntry();
    //var data = {"transaction":transaction};
    // console.log(data);
  //jsonpData(url,receiveResponse,"SaveTransaction",data)
  //document.forms.entry.reset();
  
  document.getElementById('status').innerHTML="Processing...";
  }
  catch(err)
  {
    console.log(err);
  }
 
  return false;
}

function readTransaction()
{
  var transactionDate = document.forms.entry.transactionDate.value;
  var transactionDate = document.forms.entry.clearedDate.value;
  var entity = document.forms.entry.entity.value;
  
  var transactionId = document.forms.entry.transactionId.value || uuidv4();
  
  var lines = []
  for(var i = 0; i < document.forms.entry.account.length; i++)
  {    
    if(document.forms.entry.account[i].value !== "")
    {
      var lineId = document.forms.entry.lineId[i].value || uuidv4();
      
      lines.push({
        "account":document.forms.entry.account[i].value,
        "entity":entity,
        "amount":document.forms.entry.amount[i].value,
        "description":document.forms.entry.description[i].value,  
//        "useTaxRequired":document.forms.entry.useTax[i].checked ,
        "id":lineId
      })
    }
  }
  
  return {
     "id":transactionId,       
     "transactionDate":transactionDate,
     "clearedDate":clearedDate,
     "entity":entity,
     "lines":lines
  }
}

var entryRows = 0;
function addEntryLine(count)
{
  for(var i = 0; i < count; i++)
  {
    var row = document.createElement("tr");
    var html = '<tr>';          
    html+='<input class="line-id" name="lineId" type="hidden">';

    //    html+='<td class="line-id"><input class="line-id" name="lineId" placeholder="Line ID" autocomplete="off" data-row="'+entryRows+'" data-column="0"></td>';
    html+='<td><input class="account" name="account" placeholder="Account" autocomplete="off" data-row="'+entryRows+'" data-column="0"></td>';
    html+='<td><input class="amount" type="text" name="amount" placeholder="Amount" autocomplete="off" data-row="'+entryRows+'" data-column="1" onchange="ckAmt(this)"></td>';
    html+='<td><input class="description" type="text" name="description" placeholder="Description" autocomplete="off" data-row="'+entryRows+'" data-column="2"></td>';
    //html+='<td><input class="useTax" type="hidden" name="useTax" data-row="'+entryRows+'" data-column="3"></td>';
    html+='</tr>';                
    row.innerHTML=html;
      
  document.getElementById('entriesTable').appendChild(row);
  }
   entryRows++;
   populateAccountDropdowns();
   
}


function getFormHtml()
{
  let innerHTML = `
<!--    <input type = "text" id = "apiUrl"><br>-->
    <input type = "button" value = "Costco" onclick="fill()">
<!--    <input type = "button" value = "Options" onclick="setOptions()">-->
  
    <form id="entry" 
          name ="entry" 
          onsubmit="onSubmitForm();return false;">
      <input type="hidden" name= "command" value = "PostTransaction">      
      <input type="hidden" id="transactionId" name="transactionId"  readonly>
  
  
        <table border ="1" class="table">
          <tr>
            <tr>
              <!-- <td><label for="transactionId">T ID: </label></td> -->
              <!-- <td><input type="hidden" id="transactionId" name="transactionId"  readonly></td> -->
            </tr>            
            <tr>
              <td width="50px"><label for="transactionDate">Date: </label></td>
              <td><input id="transactionDate" name="transactionDate" placeholder="Transaction Date" autocomplete="off" onchange="checkDate(this)"></td>
              <td><input id="clearedDate" name="clearedDate" placeholder="Cleared Date" autocomplete="off" onchange="checkDate(this)"></td>
          </tr>
          <tr>
            <td><label for="date">Entity: </label></td>
            <td><input id="entity" class="entity" autocomplete="off" name="entity" placeholder="Entity"></td>
          </tr>               
        </table>
        <table border ="1" class="table" id='entriesTable'>
          <tr>
            <!-- <td class = 'line-id'>Line ID</td> -->
            <td>Account</td>
            <td>Amount</td>
            <!-- <td>Debit</td> -->
            <!-- <td>Credit</td> -->
            <td>Description</td>
            <!-- <td>Use Tax Req</td></tr>  -->
        </table>

        <input type = 'submit'>

    </form>
`;
  
  return innerHTML;
}