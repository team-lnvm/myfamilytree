// Youtube API
    $.ajax({
    	//replace avemaria with favorite song submission from form
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=avemaria&key=AIzaSyDykB9j6toAsoXNLuQcM8lJw_Wck_jynPE",
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json"}).done(function(data){
	console.log(data);
	console.log(data.items[0].id.videoId);
	var youtubeURL = "https://www.youtube.com/embed/"+data.items[0].id.videoId;
	console.log(youtubeURL);
	$("#faveVideo").attr("src",youtubeURL);
     })

// IMDB API

    var movieName = "the+notebook";
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

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
    });


 //wiki API

$(function() {
  // where searchTerm will be the Birth Year
    $("#searchTerm").keypress(function(e){
    	if(e.keyCode===13){
    		var searchTerm = $("#searchTerm").val();
		    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "%20world%20news" + "&format=json&callback=?"; 
            console.log(url);
		    $.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: false,
        	dataType: "json",
        	success: function(data, status, jqXHR) {
        		//console.log(data);
        		$("#output").html();
        		for(var i=0;i<data[1].length;i++){
        			$("#output").prepend("<div><div class='well'><a href="+data[3][i]+"><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
        		}

        	}
		})
    	}
    });
// click ajax call
    $("#search").on("click", function() {
    	var searchTerm = $("#searchTerm").val();
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?"; 
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
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
});
//wikipedia gives 10 results by default