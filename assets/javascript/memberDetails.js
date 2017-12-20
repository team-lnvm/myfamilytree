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
if(firstName==="Leon"){
$("#fullName").append(firstName + " " + lastName);
$("#age").append("Age: " + birthDate);
$("#birthPlace").append("Place of Birth: " + birthPlace);
$("#hobbies").append("Hobbies: " + hobbies);
$("#occupation").append("Occupation: " + occupation)
$("#favoriteSong").append("Favorite Song: " + favSong);
$("#favoriteMovie").append("Favorite Movie: " + favMovie);
$("#faveQuote").append(favQuote);
$("#job").append(occupation);
$("#jobtoo").append(occupation);
getfavesong(favSong);
getfavemovie(favMovie);
//Moment.js to convert DOB to just the year to use for wiki API
var yearofBirth = moment(birthDate, "MM/DD/YYYY").format("YYYY");
console.log(yearofBirth);
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
//TO DO: Get giphys for hobbies/ occupation GIPHY API
var APIKey = "dc6zaTOxFJmzC";
    $("#search").on("click", function() {
      //this will empty all the previously loaded gifs, so that we only see the ones for the currently clicked band
      $("#occupation-1").empty();
      // In this case, the "this" keyword refers to the occupation?
      var famInfo = "seamstress";

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        famInfo + "&api_key=dc6zaTOxFJmzC&limit=1";
        console.log(queryURL);

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          console.log(response);
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

              // Creating an image tag with class item
              var famImage = $("<img class='item'>");

              // Giving the image tag an src attribute of a proprty pulled off the giphy website: https://developers.giphy.com/docs/
              // result item. setting the source = to results[i].images.original.url. 
              //the source is the master, it's what displays when the page is loaded
              //we want it to be still to start, and animate when clicked
              famImage.attr("src", results[i].images.original_still.url);
              //set data-animate = to source
              famImage.attr("data-animate", results[i].images.original.url);
              //from giphy developer doucmentation, we can use the console window or the website for this 
              famImage.attr("data-still", results[i].images.original_still.url);
              famImage.attr("data-state", "still");

              console.log(results[i].images.original.url);
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(fanImage);

              // Prepending the gifDiv to the "#occupation-1" div in the HTML
              $("#occupation-1").prepend(gifDiv);
            
          }
        });
    });
//TO DO: when still gif is clicked, gif with class = "item" should toggle between a still to animate
//can't use .on click for dynamically added objects (ie. the gifs came )
    //$(".item").on("click", function() {

      $('body').on('click', '.item', function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
