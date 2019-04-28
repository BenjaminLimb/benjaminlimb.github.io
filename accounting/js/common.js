function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}


function roundToNearestCent(number)
{
  return Math.round(number * 100) / 100;
}



//https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/



// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}


// https://jqueryui.com/autocomplete/#custom-data
