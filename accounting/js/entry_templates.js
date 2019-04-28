
function fill()
{
  var d = new Date();
  var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  document.forms.entry.transactionDate.value = today;
  document.forms.entry.clearedDate.value = today;
  document.forms.entry.entity.value = "Costco";
  document.forms.entry.account[0].value = "USAA:Personal Checking #3824 #0333";
  document.forms.entry.amount[0].value = "-100";
  document.forms.entry.description[0].value = "Description #1";
  document.forms.entry.account[1].value = "V:Food";
  document.forms.entry.amount[1].value = "100";
  document.forms.entry.description[1].value = "Description #2";
}
