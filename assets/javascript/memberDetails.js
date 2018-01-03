 // pull info from firebase
 var config = {
     apiKey: "AIzaSyARMPdpDN2epPHbAZonLwKWrG3wwy2aDlA",
     authDomain: "myfamilytree-6d9aa.firebaseapp.com",
     databaseURL: "https://myfamilytree-6d9aa.firebaseio.com",
     projectId: "myfamilytree-6d9aa",
     storageBucket: "",
     messagingSenderId: "517616803052"
 };
//we're starting up firebase (turning it on, basically). this needs to be done, otherwise line 12 will fail
firebase.initializeApp(config);
//create variable called database to avoid calling out firebase.database every time
var database = firebase.database();
//create on click of any image to pull the family member's info from firebase
$("img").on("click",function() {
  console.log("Image was clicked");
//clear all fields from previous family member
$("#age").val("");
$("#birthPlace").val("");
$("#hobbies").val("");
$("#occupation").val("");
$("#favoriteSong").val("");
$("#favoriteMovie").val("");
}); 
//pull data from firebases
database.ref().on('child_added', function(child) {

     var familyGroupOf = child.val().familyGroupOf;
     var relationship = child.val().relationship;
     var firstName = child.val().firstName;
     var lastName = child.val().lastName;
     var birthDate = child.val().birthDate;
     var birthPlace = child.val().birthPlace;
     var hobbies = child.val().hobbies;
     var occupation = child.val().occupation;
     var profilePic = child.val().profilePic;
     var favMovie = child.val().favMovie;
     var favQuote = child.val().favQuote;
     var favSong = child.val().favSong;
console.log(firstName + " " + lastName);
console.log(birthDate);
if(firstName===getParameterByName('firstName')){
$("#fullName").append(firstName + " " + lastName);
$("#age").append("Birth Date: " + birthDate);
$("#birthPlace").append("Place of Birth: " + birthPlace);
$("#hobbies").append("Hobbies: " + hobbies);
$("#occupation").append("Occupation: " + occupation)
$("#favoriteSong").append("Favorite Song: " + favSong);
$("#favoriteMovie").append("Favorite Movie: " + favMovie);
$("#faveQuote").append(favQuote);
//append occupation title and hobby to images pulled from flickr
$("#job").append(occupation);
$("#family_member").attr({"src":"assets/images/"+firstName+".png","width":"50","height":"50"});
getfavesong(favSong);
getfavemovie(favMovie);
getImgs(occupation);
getImgs(hobbies);
//Moment.js to convert DOB to just the year to use for wiki API
var yearofBirth = moment(birthDate, "MM/DD/YYYY").format("YYYY");
console.log(yearofBirth);
//run wikiAPI function
getnews(yearofBirth);

}

    });

// Youtube API
function getfavesong(favSong){
var youtubeURL;
    $.ajax({
    	//replace avemaria with favorite song submission from form
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+favSong+"&key=AIzaSyDykB9j6toAsoXNLuQcM8lJw_Wck_jynPE",
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json"}).done(function(data){
	console.log(data);
	console.log("youTube video ID: " + data.items[0].id.videoId);
	youtubeURL = "https://www.youtube.com/embed/"+data.items[0].id.videoId;
  
	console.log("youTube complete URL: " + youtubeURL);
	//$("#faveVideo").attr("src",youtubeURL);
    }).done(function(){
    console.log("youTube complete URL: " + youtubeURL);
    $("#faveVideo").attr("src", youtubeURL);
  })
}
////////////////////////////////////////////////////////////////////////////
// IMDB API
//movieName needs to have a + between each word
function getfavemovie(favMovie){
    //var movieName = favmovie;
    var queryURL = "https://www.omdbapi.com/?t=" + favMovie + "&y=&plot=short&apikey=trilogy";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    console.log(response);
      // Chaining several jQuery methods to achieve the following:
      var firstRowTds = $("table") // Get a reference to the table as a jQuery object
        .children() // Get all of table's immediate children as an array
        .eq(1) // Get element at the first index of this returned array (the <tbody>)
        .children("tr") // Get an array of all <tr> children inside the returned <tbody>
        .eq(0) // Get the 0th child of this returned array (the first <tr>)
        .children("td"); // Get an array of all <td> children inside the returned <tr>

      // Setting the inner text of each <td> in the firstRowTds array
      firstRowTds.eq(0).text(response.Title);
      firstRowTds.eq(1).text(response.Year);
      firstRowTds.eq(2).text(response.Actors);
      firstRowTds.eq(3).text(response.Ratings[1].Value);
      firstRowTds.eq(4).text(response.BoxOffice);
      //gets poster
      var posterURL = response.Poster;
	console.log(posterURL);
	$("#moviePoster").attr("src",posterURL);
    })
}

 //wiki API
function getnews(yearofBirth){
$(function() {

// click ajax call
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ yearofBirth + "&format=json&callback=?"; 
		$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: false,
        	dataType: "json",
          // plop data
        	success: function(data, status, jqXHR) {
        		//console.log(data);
        		$("#output").html();
        		for(var i=0;i<data[1].length;i++){
        			$("#output").prepend("<div><div class='well'><a href="+data[3][i]+"><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
        		}

        	}
		})
		.done(function() {
			console.log("WikiAPI success");
		})
		.fail(function() {
			console.log("WikiAPI error");
		})
		.always(function() {
			console.log("WikiAPI complete");
    })
		});
	};

//wikipedia gives 10 results by default
////////////////////////////////////////////////////////////////////////////
//TO DO: Get images Flikr API for occupation 

function getImgs(occupation) {
  var URL = "https://api.flickr.com/services/rest/" +  // Wake up the Flickr API gods.
    "?method=flickr.photos.search" +  // Get photo from a search term. http://www.flickr.com/services/api/flickr.photosets.getPhotos.htm
    "&api_key=b3b0381319f596ff9613a686bab28c46" +  // API key
    "&text=" + occupation +  // The search term.
    "&privacy_filter=1" +  // 1 signifies all public photos.
    "&per_page=1" + // Set # of photos wanted, selected 2
    "&format=json&nojsoncallback=1";  

  // See the API in action here: http://www.flickr.com/services/api/explore/flickr.photosets.getPhotos
  $.getJSON(URL, function(data){
    console.log(data);
    $.each(data.photos.photo, function(i, item){
            console.log("flickr photo title: " + data.photos.photo[0].title);
      // Creating the image URL. Info: http://www.flickr.com/services/api/misc.urls.html
      var img_src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
      var img_thumb = $("<img/>").attr("src", img_src).css("margin", "8px").css("margin-bottom", "70px").css("width", "350px");
       $(img_thumb).appendTo("#occupation");
       $("#occupation_title").text(occupation).css("margin-left", "500px");
       console.log("occupation: " + occupation);
      console.log(img_src);
      //$("#occupation").attr("src",img_src);
  
    });
  });
}
//TO DO: Get images Flikr API for hobby 
function getImgs(hobbies) {
  var URL = "https://api.flickr.com/services/rest/" +  // Wake up the Flickr API gods.
    "?method=flickr.photos.search" +  // Get photo from a search term. http://www.flickr.com/services/api/flickr.photosets.getPhotos.htm
    "&api_key=b3b0381319f596ff9613a686bab28c46" +  // API key
    "&text=" + hobbies +  // The search term.
    "&privacy_filter=1" +  // 1 signifies all public photos.
    "&per_page=2" + // Set # of photos wanted, selected 2
    "&format=json&nojsoncallback=1";  

  // See the API in action here: http://www.flickr.com/services/api/explore/flickr.photosets.getPhotos
  $.getJSON(URL, function(data){
    console.log(data);
    $.each(data.photos.photo, function(i, item){
            console.log("flickr photo title: " + data.photos.photo[0].title);
      // Creating the image URL. Info: http://www.flickr.com/services/api/misc.urls.html
      var img_src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
      var img_thumb = $("<img/>").attr("src", img_src).css("margin", "auto").css("margin-bottom", "70px").css("width", "350px").css("display", "grid");
       $(img_thumb).appendTo("#hobby");
       $("#hobbies_title").text(hobbies).css("margin-left", "500px");
       console.log("hobbies: " + hobbies);
    });
  });
}
//for main html linking to memberDetails.html
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}