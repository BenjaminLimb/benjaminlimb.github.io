
function removeEntryLine(id)
{
 
  document.getElementById(id).remove();
}
  
function toggleSign(id)
{
  document.getElementById(id).querySelector(".amount").value *= -1;
  applySignColor(document.getElementById(id).querySelector(".amount"));
}

function removeEntryLine()
{

    if(document.getElementById('entriesTable').children.length > 2)
    {
    document.getElementById('entriesTable').lastChild.remove();
    }

}


var entryRows = 0;
function addEntryLine(count)
{
  
   // var entries = document.getElementsByName("amount");    
    //var lastID =  entries[entries.length -1].id;
   // console.log(lastID);
    
    
  for(var i = 0; i < count; i++)
  {
    var row = document.createElement("div");
    row.id = uuidv4();
      
    //row.setAttribute("data-entry-line",index);
    var html = '';      
    
    html+='<input class="line-id" name="lineId" type="hidden">';
    html+='<input class="account" name="account" placeholder="Account" autocomplete="off" >';
    

    html+='<input class="amount" type="text" placeholder="$ 0.00" name="amount" placeholder="Amount" autocomplete="off" onkeyup="centEntry(this)">';
    html+='<div class="button small-btn" onclick="toggleSign(\''+row.id+'\')">+/-</div>';
    html+='<input class="description" type="text" name="description" placeholder="Description" autocomplete="off">';
//    html+=' <input type="button" value="-" onclick="removeEntryLine(\''+row.id+'\')">';
    html+="<br><br>"
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
  <label for="date">Amount: </label><br>
  <input class="amount" type="text" placeholder="$ 0.00" name="amount" placeholder="Amount" autocomplete="off" onkeyup="centEntry(this)">
  
  <br><br>From / To
        <div border ="1" id='entriesTable'>  
</div>
  <input type="button" value="Add +" onclick="addEntryLine(1)">
  <input type="button" value="Remove -" onclick="removeEntryLine()">
<br><br>
        <input type = 'button' value="Save" onclick="onSave()"/>

    </form>
`;
  
  return innerHTML;
}