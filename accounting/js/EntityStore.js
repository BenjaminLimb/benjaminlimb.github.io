var entityStore = {};
entityStore["Transactions"] = [];
entityStore.getIndexWhere = function(type,field,matches)
{
  var entities = entityStore[type];  
  
  if (entities) for(var i = 0; i < entities.length; i++)
  {
    var cur = entities[i];
    if(cur[field] === matches)
    {
      return i;
    }  
  }
  return null;
}
entityStore.getEntityByIndex = function(type,index)
{
  var entities = entityStore[type]; 
  return entities[index];
}
entityStore.deleteEntityByIndex = function(type,index)
{
  var entities = entityStore[type]; 
  entities.splice(index,1);
}
entityStore.replace = function(type,index,entity)
{
  var entities = entityStore[type]; 
  entities.splice(index,1,entity);  
}
entityStore.getWhere = function(type,field,matches)
{
  var entities = entityStore[type];  
  for(var i = 0; i < entities.length; i++)
  {
    var cur = entities[i];
    if(cur[field] === matches)
    {
      return cur;
    }  
  }
  return null;
}
//entityStore.getAccountByName = function (name)
//{
//  var entities = entityStore["Accounts"];  
//  for(var i = 0; i < entities.length; i++)
//  {
//    var cur = entities[i];
//    if(cur["Account Name"] === name)
//    {
//      return cur;
//    }  
//  }
//  return null;
//  
//}


entityStore.saveTransaction = function (transaction)
{
  //console.log(transaction);
  var lines = [];
  for(var i = 0; i < transaction.lines.length; i++)
  {
    var line = transaction.lines[i];
    
    //var acct = entityStore.getAccountByName(line.account);
    
    var acct = entityStore.getWhere("Accounts","Account Name",line.account);
    var entity = entityStore.getWhere("Entities","Entity Name",transaction.entity);
        
    var line = {
      'Account Name':acct['Account Name'],
      'Account ID':acct['Account ID'],
      'Amount':line.amount,
      'Cleared Date':transaction.transactionDate,
      'Date Added':new Date().toString(),
      'Date Modified':new Date().toString(),
      'Description':line.description,
      'Entity Name':entity['Entity Name'],
      'Entity ID':entity['Entity ID'],
      'Line ID':line.id,      
      'Transaction Date':transaction.transactionDate, 
      'Transaction ID':transaction.id      
      
    }
    lines.push(line);
        
  }
    console.log(lines);
    
    var existingIndex = entityStore.getIndexWhere("Transactions","id",transaction.id);
    if(existingIndex === null)
    {
      entityStore["Transactions"].push(transaction);
      putAllToGoogle(lines);
    }
    else
    {
      
    }
    
  //debugger;
}

function retrieveEntityStore(data) {
  var results = data.results;    
  for (var i = 0; i < results.length; i++)
  {
    var result = results[i]; 
    var data = result.data;
    
    for(var prop in data)
    {      
      entityStore[prop] = data[prop];
    }
    saveEntityStore();
    //entityStore[]        
  } 
}

function initializeEntityStore()
{    
  if(!entityStore)
  {
    entityStore = {}
  }
  
   var saved = JSON.parse(localStorage.getItem('entityStore'));
   for(var prop in saved)
   {
     entityStore[prop] = saved[prop];
   }  
   
   console.log(entityStore);
}

function saveEntityStore()
{
  localStorage.setItem('entityStore', JSON.stringify(entityStore));
}