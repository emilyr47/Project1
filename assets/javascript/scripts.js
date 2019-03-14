$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDh7NXLBoNf5wwQL-v5iL2qEHNVSunsAeo",
    authDomain: "birthday-tracker-d5e91.firebaseapp.com",
    databaseURL: "https://birthday-tracker-d5e91.firebaseio.com",
    projectId: "birthday-tracker-d5e91",
    storageBucket: "birthday-tracker-d5e91.appspot.com",
    messagingSenderId: "520051977263"
  };
  firebase.initializeApp(config);

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
    var item = items[i];
    console.log(item)
    var title = item.title;
    var price = item.sellingStatus[0].currentPrice[0].__value__
    var ebayDate = item.listingInfo[0].endTime
    var pic = item.galleryURL;

    if (pic != "http://thumbs1.ebaystatic.com/pict/04040_0.jpg"){
    var imgDiv = $("<img>")
    imgDiv.attr("src", pic);
    imgDiv.attr("height", "250px");
    imgDiv.attr("width", "250px");
    var format = "YYYY/MM/DD";
    var convertedDate = moment(ebayDate, format);
    var daysLeft = Math.abs(moment(convertedDate).diff(moment(), "days"));
    var newDiv = $("<div>")
    var titleP = $("<p>")
    var priceP = $("<p>")
    var daysP = $("<p>")
    var br = $("<br>")
    titleP.text(title)
    priceP.text("$ " + price)
    daysP.text(daysLeft + " days left")
   newDiv.append(titleP)
   newDiv.append(imgDiv)
   newDiv.append(priceP)
   newDiv.append(daysP)
   newDiv.append(br)
   $("#pics-appear-here").append(newDiv)
   var viewitem = item.viewItemURL;
    }
  }
}
}
});
