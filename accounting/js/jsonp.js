function jsonpData(url, callback,command, data)
{
  var s = document.createElement("script");
  var payload =  encodeURIComponent(JSON.stringify(data));
  s.src = (url + "?jsonp=" + callback.name + "&command="+command+"&data="+payload);
  document.body.appendChild(s);
}

function jsonp(url, callback, querystring)
{
  var s = document.createElement("script");
  s.src = (url + "?jsonp=" + callback.name + (querystring ? ("&"+querystring) : ""));
  document.body.appendChild(s);
}
