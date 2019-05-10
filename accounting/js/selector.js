

var DropdownSelector = (new function()
{
var exports = {}

  function comboInit(thelist)
    {
      theinput = document.getElementById(theinput);
      var idx = thelist.selectedIndex;
      var content = thelist.options[idx].innerHTML;
      if(theinput.value == "")
        theinput.value = content;
    }

    function combo(thelist, theinput)
    {
      theinput = document.getElementById(theinput);
      var idx = thelist.selectedIndex;
      var content = thelist.options[idx].innerHTML;
      theinput.value = content;
    }


var tpl = `
<input type="text" id="theinput" name="theinput" />
<select name="thelist" >
  <option>one</option>
  <option>two</option>
  <option>three</option>
</select>

`;

exports.getHtml = function()
{
    return tpl;
}

exports.render = function()
{

    var node = document.createElement("div");
    node.innerHTML = tpl;
    el = node.querySelector("select");
    el.addEventListener('change',function(){combo(el,'theinput')});
    el.addEventListener('mouseOut',function(){comboInit(this,'theinput')});



    var parent = document.querySelector("body");
    parent.appendChild(node);


}

return exports;

}());
