 var config = {
     apiKey: "AIzaSyBEQpTYMbAxRNS_OL0het35jEJoQJ6lgHs",
     authDomain: "myfamilytree-99ac7.firebaseapp.com",
     databaseURL: "https://myfamilytree-99ac7.firebaseio.com",
     projectId: "myfamilytree-99ac7",
     storageBucket: "",
     messagingSenderId: "366510537615"
 };
 if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
//  firebase.initializeApp(config);

 var db = firebase.database();
 var familyGroupOf = "";
 var myFamilyInfo;

 myFamilyInfo = [
     { 'link': '1a', 'firstname': 'fn_grandfather', 'lastname': 'ln_grandfather', 'dob': '1/1/1950', 'birthplace': '', 'hobbies': '',  'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':'' },
     { 'link': '1b', 'firstname': 'fn_grandmother', 'lastname': 'ln_grandmother', 'dob': '1/1/1955', 'birthplace': '', 'hobbies': '', 'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':''  },
     { 'link': '2a', 'firstname': 'fn_father', 'lastname': 'ln_father', 'dob': '', 'birthplace': '1/1/1960', 'hobbies': '', 'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':''  },
     { 'link': '2b', 'firstname': 'fn_mother', 'lastname': 'ln_mother', 'dob': '', 'birthplace': '1/1/1965', 'hobbies': '', 'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':''  },
     { 'link': '3a', 'firstname': 'fn_self', 'lastname': 'ln_self', 'dob': '', 'birthplace': '1/1/1980', 'hobbies': '', 'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':''  },
     { 'link': '3b', 'firstname': 'fn_spouse', 'lastname': 'ln_spouse', 'dob': '1/1/1985', 'birthplace': '', 'hobbies': '', 'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':''  },
     { 'link': '4a', 'firstname': 'fn_kid1', 'lastname': 'ln_kid1', 'dob': '1/1/2010', 'birthplace': '', 'hobbies': '', 'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':''  },
     { 'link': '4b', 'firstname': 'fn_kid2', 'lastname': 'ln_kid2', 'dob': '1/1/2015', 'birthplace': '', 'hobbies': '', 'occupation':'', 'profilepic': '', 'favmovie':'', 'favquote':'', 'favsong':''  }
 ]

//  myFamilyInfo.forEach(function(person) {
//      console.log(person.link, person.firstname);
//     })
       
$('.form-control').on('click', function() {
    if (familyGroupOf == "") {
        alert('Please select - Family Member for ... ');
    }
})

    $('#submit').on('click', function() {
        event.preventDefault();
        
        var firstName, lastName, birthDate, birthPlace, hobbies, occupation, profilePic, favMovie, favQuote, favSong;

        firstName = $('#firstNameInput').val().trim();
        lastName = $('#lastNameInput').val().trim();
        birthDate = $('#dobInput').val().trim();
        birthPlace = $('#birthPlaceInput').val().trim();
        hobbies = $('#hobbiesInput').val().trim();
        
        // to be updated with the actual one.
        occupation = 'occupation';
        profilePic = '';
        favMovie = 'My Fav Movie';
        favQuote = 'My fav Quote';
        favSong = 'My fav Song';


        console.log(firstName, lastName, birthDate, birthPlace, hobbies);

        db.ref().push({
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            birthPlace: birthPlace,
            hobbies: hobbies,
            occupation: occupation,
            profilePic: profilePic,
            favMovie:favMovie,
            favQuote:favQuote,
            favSong: favSong
       });
   

});

$('.familyGroup').on('click', function() {
    console.log(this.name);
    familyGroupOf = this.name;
    $('.familyGroup').css({'background':'lightgrey'});
    $(this).css({'background':'lightblue'});
})

$('.familyGroup').css({'background':'lightgrey'});