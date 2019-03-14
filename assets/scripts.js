$(document).ready(function() {

var keyword = prompt("What to pull back from eBay?")
var queryURL = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=SamReima-Birthday-PRD-f55b8f5d2-3082faa4&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords="+keyword+"&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0"
$.ajax({
      url: queryURL,
      dataType: "script"
      });

function _cb_findItemsByKeywords(root) {
  if (keyword == "" || keyword == null){
      alert("Nothing was entered so nothing will be returned!")
  }
  else{
var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
alert("pulling 10 results of  " + keyword + " back from eBay. ")

for (var i = 0; i < items.length; ++i)   {
  var item     = items[i];
  console.log(item)
  var title    = item.title;
  var pic      = item.galleryURL;
  var imgDiv = $("<img>")
  imgDiv.attr("src", pic);
  imgDiv.attr("height", "250px");
  imgDiv.attr("width", "250px");
  var newDiv = $("<div>")
  var p = $("<p>")
  p.text(title)
  newDiv.append(p)
  newDiv.append(imgDiv)
  $("#pics-appear-here").append(newDiv)
  var viewitem = item.viewItemURL;
}
}
}
});
