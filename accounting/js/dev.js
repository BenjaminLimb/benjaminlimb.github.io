 function(){   
 var transaction = {      
      "date":"2019-04-11",
      "vendor":"WalMart",
      "splits":[
        {
          "acct":"Personal Checking",
          "amt":-34.23,
          "desc":"This is my description"               
      },{
         "acct":"Food",
          "amt":34.23,
          "desc":"AB & Cheese" 
      }]
    }        
    var data = {"transaction":transaction};
            
     // jsonpData(url,receiveResponse,"SaveTransaction",data)
 }
 
 
 
 
// 
//  var returnObject = {    }
// 
//  var output = JSON.stringify({
//    status: 'success',
////    //tiller:getSheetData('Tiller Transactions'),
//    transactions:getSheetData('Transactions'),
////
//  },null,2);
// 
// var jsonp = e.parameter.jsonp;
//  
// if(jsonp)
// {
//   return ContentService.createTextOutput(jsonp+'('+ JSON.stringify(output)+')').setMimeType(ContentService.MimeType.JAVASCRIPT);
// }
//  
//  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);