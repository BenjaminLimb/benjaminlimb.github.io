//https://www.w3schools.com/howto/howto_js_autocomplete.asp

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var countries = [
    {
        'id':1,
        'text':'Afghanistan',
        'category':'North'
    },
    {
        'id':2,
        'text':'Albania',
        'category':'North'
    },
    {
        'id':3,
        'text':'Algeria',
        'category':'North'
    },
    {
        'id':4,
        'text':'Andorra',
        'category':'South'
    },
]
var AutoComplete = (new function()
{
    var exports = {}

    /* the autocomplete function takes two arguments,  the text field element and an array of possible autocompleted values:*/
    function autocomplete(container,inp, arr, keyField, labelField) {
          var currentFocus;
          var open = false;

          function showList(el)
          {
            open = true;
            var val = el.value;

              /*close any already open lists of autocompleted values*/

              closeAllLists();
              //if (!val) { return false;} // Close if nothing typed
              currentFocus = -1;
              /*create a DIV element that will contain the items (values):*/
              var  itemsDiv = document.createElement("DIV");
              itemsDiv.setAttribute("id", el.id + "autocomplete-list");
              itemsDiv.setAttribute("class", "autocomplete-items");
              /*append the DIV element as a child of the autocomplete container:*/
              el.parentNode.appendChild(itemsDiv);

    //          var  drowdownArrow = document.createElement("SPAN");
    //          drowdownArrow.innerHTML = " ^ "
    //          el.parentNode.appendChild(drowdownArrow);


              /*for each item in the array...*/
              for (var i = 0; i < arr.length; i++) {

                var optionValue = arr[i][labelField];
                var optionLabel = arr[i][labelField];

                /*check if the item contains with the same letters as the text field value:*/
                var matchIndex =  optionLabel.toUpperCase().indexOf(val.toUpperCase()) ;

                if (matchIndex != -1){

                  /*create a DIV element for each matching element:*/
                  var optionDiv = document.createElement("DIV");
                  /*make the matching letters bold:*/
                  optionDiv.innerHTML = optionLabel.substr(0,matchIndex)+"<strong>" + optionLabel.substr(matchIndex, val.length) + "</strong>";
                  optionDiv.innerHTML += optionLabel.substr(val.length + matchIndex, optionLabel.length);

                  /*insert a input field that will hold the current array item's value:*/
                  optionDiv.innerHTML += "<input type='hidden' class='text' value='" + optionLabel + "'>";

                  itemsDiv.appendChild(optionDiv);

                  /*execute a function when someone clicks on the item value (DIV element):*/
                  optionDiv.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = e.target.querySelector(".text").value;
                        closeAllLists();
                    });

                }
              }
          }
        //container

        inp.addEventListener("click",function(e){
            open = true;
                e.stopPropagation();
        });


          inp.addEventListener("blur",function(e){
            if(!open)
            {
             closeAllLists();
             open = false;
            }

          });


          inp.addEventListener("input", function(e) {
            el = this;
            showList(el);

          });

          inp.addEventListener("click", function(e) {
            el = this;
            showList(el);
          });
          inp.addEventListener("focus", function(e) {
              el = this;
              showList(el);
            });



          /*execute a function presses a key on the keyboard:*/
          inp.addEventListener("keydown", function(e) {

              var x = document.getElementById(this.id + "autocomplete-list");
              if (x) x = x.getElementsByTagName("div");
              if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
              } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
              } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                  /*and simulate a click on the "active" item:*/
                  if (x) x[currentFocus].click();
                }
              }
          });

          function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
          }

           /*a function to remove the "active" class from all autocomplete items:*/
          function removeActive(x) {

            for (var i = 0; i < x.length; i++) {
              x[i].classList.remove("autocomplete-active");
            }
          }
    }

        /*close all autocomplete lists in the document,        except the one passed as an argument:*/
          function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
              x[i].parentNode.removeChild(x[i]);
//              if (elmnt != x[i] && elmnt != inp) {
//                x[i].parentNode.removeChild(x[i]);
//                }
          }
        }


    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        console.log("document click detected;");
        console.log(e.target);
        closeAllLists(e.target);
    });


    var tpl = `
    <style>
    * { box-sizing: border-box; }
    body {
      //font: 16px Arial;
    }
    .autocomplete {
      /*the container must be positioned relative:*/
      position: relative;
      display: inline-block;
    }
    .autocomplete input {
      border: 1px solid transparent;
      background-color: #f1f1f1;
      padding: 10px;
      font-size: 16px;
    }
    .autocomplete input[type=text] {
      background-color: #f1f1f1;
      width: 100%;
    }
    .autocomplete input[type=submit] {
      background-color: DodgerBlue;
      color: #fff;
    }
    .autocomplete-items {
      position: absolute;
      border: 1px solid #d4d4d4;
      border-bottom: none;
      border-top: none;
      z-index: 99;
      /*position the autocomplete items to be the same width as the container:*/
      top: 100%;
      left: 0;
      right: 0;
    }
    .autocomplete-items div {
      padding: 10px;
      cursor: pointer;
      background-color: #fff;
      border-bottom: 1px solid #d4d4d4;
    }
    .autocomplete-items div:hover {
      /*when hovering an item:*/
      background-color: #e9e9e9;
    }
    .autocomplete-active {
      /*when navigating through the items using the arrow keys:*/
      background-color: DodgerBlue !important;
      color: #ffffff;
    }

    </style>

    `;

    //<div class="autocomplete" style="width:300px;">
    //    <input id="myInput" type="text" name="myCountry" placeholder="Country">
    //  </div>

    exports.getHtml = function()
    {
        return tpl;
    }

    exports.render = function(parentNode,name,placeholder,fillData,key,display)
    {
        fillData = fillData || countries;
        parentNode = parentNode || document.querySelector("body");

        var container = document.createElement("DIV");

        container.classList.add("autocomplete");
        container.id = uuidv4();
        //container.style="width:300px;";

        container.innerHTML = tpl;

        var inputElement = document.createElement("INPUT");
        inputElement.id = uuidv4();
        inputElement.type = "text";
        inputElement.name = name;
        inputElement.placeholder = placeholder;

        container.appendChild(inputElement);


        var parent = document.querySelector("body");

        parentNode.appendChild(container);

        //parent.appendChild(container);

        autocomplete(container,inputElement, fillData, key, display);

    }

    return exports;

}());
