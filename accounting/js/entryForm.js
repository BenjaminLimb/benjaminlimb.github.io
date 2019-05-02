


var entryRows = 0;
function addEntryLine(count)
{
  for(var i = 0; i < count; i++)
  {
    var row = document.createElement("div");
    var html = '';          
    html+='<input class="line-id" name="lineId" type="hidden">';
    html+='<input class="account" name="account" placeholder="Account" autocomplete="off" >';
    html+='<input class="amount" type="text" name="amount" placeholder="Amount" autocomplete="off" onkeyup="centEntry(this)">';
    html+='<input class="description" type="text" name="description" placeholder="Description" autocomplete="off">';    
    html+='';                
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
  Quick Links:
    <input type = "button" value = "Costco" onclick="fill()">
  <br>
  <br>
<!--    <input type = "button" value = "Options" onclick="setOptions()">-->
  <input type="radio" id="purchase" name="type" value="purchase"  checked>  <label for="purchase">Purchase</label>
  <input type="radio" id="return" name="type" value="return"  >  <label for="return">Return</label>
  <input type="radio" id="transfer" name="type" value="transfer"  >  <label for="transfer">Transfer</label>
  <br><br>
  
  
  <form id="entry" name ="entry" onsubmit="return false;">
  <input type="hidden" name= "command" value = "PostTransaction">      
  <input type="hidden" id="transactionId" name="transactionId"  readonly>
  Purchase / Deposit Date:<br>
  <input id="transactionDate" name="transactionDate" placeholder="Transaction Date" autocomplete="off" onchange="checkDate(this)">
  <br><br>
  Bank Cleared Date:<br>
  <input id="clearedDate" name="clearedDate" placeholder="Cleared Date" autocomplete="off" onchange="checkDate(this)">
  <br><br>
  <label for="date">Vendor / Person: </label><br>
  <input id="entity" class="entity" autocomplete="off" name="entity" placeholder="Entity">
  <br><br>
        <div border ="1" id='entriesTable'></div>
          
<br>
        <input type = 'button' value="Save" onclick="onSave()"/>

    </form>
`;
  
  return innerHTML;
}