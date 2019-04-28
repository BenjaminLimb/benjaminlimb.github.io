function move(rD, cD)
{
  var r = parseInt(document.activeElement.dataset.row);
  var c = parseInt(document.activeElement.dataset.column);
  r += rD;
  c += cD;
  document.querySelector("[data-row='" + r + "'][data-column='" + c + "']").focus();
}



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