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

  var database = firebase.database();

  $(document).ready(function() {

  database.ref().on("child_added", function(childSnapshot) {
    function populateBirthdays(){
        var row = $("<tr>")
        row.attr("style", "text-align: center;")
       var giftsTd = $("<td>")
       var giftsButton = $("<button>")
       giftsButton.attr("class", "btn btn-primary")
       giftsButton.attr("class", "gifts")
       giftsButton.attr("data-state", childSnapshot.val().likes)
       giftsButton.text("View Gifts")
       giftsTd.append(giftsButton)
       var nameTd = $("<td>")
       var bdayTd = $("<td>")
      var likesTd = $("<td>")
      var dislikesTd = $("<td>")
      var daysTd = $("<td>")

        nameTd.text(childSnapshot.val().recipientName)
        bdayTd.text(childSnapshot.val().bday)
        likesTd.text(childSnapshot.val().likes)
        dislikesTd.text(childSnapshot.val().dislikes)
        daysTd.text(childSnapshot.val().daysTillBday)
     
        row.append(giftsTd)
        row.append(nameTd)
        row.append(bdayTd)
        row.append(likesTd)
        row.append(dislikesTd)
        row.append(daysTd)
        
        $("#tbody").append(row)
     }

    populateBirthdays();

 });

function loadGifts(){
  var queryURL = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=SamReima-Birthday-PRD-f55b8f5d2-3082faa4&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords="+keyword+"&paginationInput.entriesPerPage=10&GLOBAL-ID=EBAY-US&siteid=0"
  $.ajax({
        url: queryURL,
        dataType: "script"
        })
 console.log("document loaded")
}

 $(document).on("click", ".gifts", function(){
  location.href = "gifts.html#load-gifts"
  console.log("Test")
  var keyword = $(this).attr("data-state")
  console.log(keyword)

});
});
    

 
   



 $("#submit").on("click", function(){
  event.preventDefault();
  name = $("#nameInput").val().trim();
  email = $("#emailInput").val().trim();
  recipientName = $("#recipientName").val().trim();
 bday = $("#birthDate").val().trim();
 likes = $( "#likes option:selected" ).text();
 dislikes = $( "#dislikes option:selected" ).text();

 var format = "YYYY/MM/DD";
 var convertedDate = moment(bday, format);
 var daysTillBday = Math.abs(moment(convertedDate).diff(moment(), "days"));
  

  database.ref().push({
      name: name,
      email: email,
      bday: bday,
      likes: likes,
      dislikes: dislikes,
      recipientName: recipientName,
     daysTillBday: daysTillBday
 });
 location.href = "results.html";
 });

  //(function(){ //Here is the email js function. It stores the API key on the server side and calls with its own function browser side.
    //emailjs.init("user_5PhSrglHUc15780D2cekk");
 //})();
 //var email = "ENTER EMAIL ADDRESS HERE"
 //var template_params = {
 //"user_email": email
//}

//var service_id = "default_service"; //email JS wants to know what service to email from. By default I have the Birthdaytracker365 one.
//var template_id = "bday"; //A custom template I set up in emailjs.
//emailjs.send(service_id, template_id, template_params)
  //.then(function(response) {
    // console.log('SUCCESS!', response.status, response.text);
  //}, function(error) {
    // console.log('FAILED...', error);
  //});

  function _cb_findItemsByKeywords(root) { //This function is needed to define the _cb_findItemsByKeywords function referenced in the JSON (this is specific to eBay's API)
  
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];

  
 
    
    for (var i = 0; i < items.length; ++i)   {
    var item = items[i];
    console.log(item)
    var title = item.title;
    var price = item.sellingStatus[0].currentPrice[0].__value__
    var ebayDate = item.listingInfo[0].endTime
    var pic = item.galleryURL;

    var format = "YYYY/MM/DD"; //using moment JS to convert the weird date given from eBay to a more understandable one.
    var convertedDate = moment(ebayDate, format);
    var daysLeft = Math.abs(moment(convertedDate).diff(moment(), "days"));

    if (pic != "http://thumbs1.ebaystatic.com/pict/04040_0.jpg"){ //This is needed so that we don't get blank images, or the placeholder image that eBay uses.
   
    if ($("#gift1Image").attr('src') == "") { //Checking through each card to see if there is an image there, and if not, it will fill the card with an image pulled from eBay
    $("#gift1Image").attr("src", pic);
    $("#gift1Image").attr("height", "250px")
    $("#gift1Image").attr("height", "250px")
    $("#gift1Image").attr("href", item.viewItemURL)
    $("#giftTitle1").text(title)
    $("#giftPrice1").text("$ " + price)
    $("#giftDays1").text(daysLeft + " days left")
    }

    else if ($("#gift2Image").attr('src')== "") {
    $("#gift2Image").attr("src", pic);
    $("#gift2Image").attr("height", "250px")
   $("#gift2Image").attr("height", "250px")
    $("#gift2Image").attr("href", item.viewItemURL)
    $("#giftTitle2").text(title)
    $("#giftPrice2").text("$ " + price)
    $("#giftDays2").text(daysLeft + " days left")
    }

    else if ($("#gift3Image").attr('src') == "") {
    $("#gift3Image").attr("src", pic);
    $("#gift3Image").attr("height", "250px")
    $("#gift3Image").attr("height", "250px")
    $("#gift3Image").attr("href", item.viewItemURL)
    $("#giftTitle3").text(title)
    $("#giftPrice3").text("$ " + price)
    $("#giftDays3").text(daysLeft + " days left")
    }

 }
}
};

  

