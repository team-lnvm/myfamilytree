var config = {
    apiKey: "AIzaSyARMPdpDN2epPHbAZonLwKWrG3wwy2aDlA",
    authDomain: "myfamilytree-6d9aa.firebaseapp.com",
    databaseURL: "https://myfamilytree-6d9aa.firebaseio.com",
    projectId: "myfamilytree-6d9aa",
    storageBucket: "",
    messagingSenderId: "517616803052"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

var db = firebase.database();
var familyGroupOf = "";
// var myFamilyInfo;

// myFamilyInfo = [
//     { 'link': '1a', 'firstname': 'fn_grandfather', 'lastname': 'ln_grandfather', 'dob': '1/1/1950', 'birthplace': '', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' },
//     { 'link': '1b', 'firstname': 'fn_grandmother', 'lastname': 'ln_grandmother', 'dob': '1/1/1955', 'birthplace': '', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' },
//     { 'link': '2a', 'firstname': 'fn_father', 'lastname': 'ln_father', 'dob': '', 'birthplace': '1/1/1960', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' },
//     { 'link': '2b', 'firstname': 'fn_mother', 'lastname': 'ln_mother', 'dob': '', 'birthplace': '1/1/1965', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' },
//     { 'link': '3a', 'firstname': 'fn_self', 'lastname': 'ln_self', 'dob': '', 'birthplace': '1/1/1980', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' },
//     { 'link': '3b', 'firstname': 'fn_spouse', 'lastname': 'ln_spouse', 'dob': '1/1/1985', 'birthplace': '', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' },
//     { 'link': '4a', 'firstname': 'fn_kid1', 'lastname': 'ln_kid1', 'dob': '1/1/2010', 'birthplace': '', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' },
//     { 'link': '4b', 'firstname': 'fn_kid2', 'lastname': 'ln_kid2', 'dob': '1/1/2015', 'birthplace': '', 'hobbies': '', 'occupation': '', 'profilepic': '', 'favmovie': '', 'favquote': '', 'favsong': '' }
// ]
var familyTreeArr = ['grandFather', 'grandMother', 'father', 'mother', 'self', 'spouse', 'child1', 'child2', 'child3', 'child4'];
$('#displayTree').hide();
$('#addFamilyMember').hide();
$('#hideAddFamily').hide();
$("#errorTextid").hide();


$('#showAddFamily').on('click', function () {
    $('#addFamilyMember').show();
    $('#showAddFamily').hide();
    $('#hideAddFamily').show();
})

$('#hideAddFamily').on('click', function () {
    $('#addFamilyMember').hide();
    $('#showAddFamily').show();
    $('#hideAddFamily').hide();

})

$('.form-control').on('click', function () {
    if (familyGroupOf == "") {
        // alert('Please select - Family Member for ... ');
        $("#errorTextid").show();
    } else {
        $("#errorTextid").hide();
    }
})

$('#submit').on('click', function () {
    event.preventDefault();

    var firstName, lastName, birthDate, birthPlace, hobbies, occupation, profilePic, favMovie, favQuote, favSong, relationship;

    firstName = $('#firstNameInput').val().trim();
    lastName = $('#lastNameInput').val().trim();
    birthDate = $('#dobInput').val().trim();
    birthPlace = $('#birthPlaceInput').val().trim();
    hobbies = $('#hobbiesInput').val().trim();
    occupation = $('#occupationInput').val().trim();
    profilePic = '';
    favMovie = $('#favoriteMovieInput').val().trim();
    favQuote = $('#favoriteQuoteInput').val().trim();
    favSong = $('#favoriteSongInput').val().trim();
    relationship = $('#relationWithMain').val();
    relationshipId = $('#relationWithMain').children(":selected").attr("id");


    console.log(firstName, lastName, birthDate, birthPlace, hobbies);

    db.ref().push({
        familyGroupOf: familyGroupOf,
        relationship: relationship,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        birthPlace: birthPlace,
        hobbies: hobbies,
        occupation: occupation,
        profilePic: profilePic,
        favMovie: favMovie,
        favQuote: favQuote,
        favSong: favSong,
        relationshipId: relationshipId
    });
});

$('.familyGroup').on('click', function () {
    console.log(this.name);
    familyGroupOf = this.name;
    $('.familyGroup').css({
        'background': 'lightgrey'
    });
    $(this).css({
        'background': 'lightblue'
    });
})

$('.viewFamilyGroup').on('click', function () {
    console.log(this.name);
    $('.viewFamilyGroup').css({
        'background': 'lightgrey'
    });
    $(this).css({
        'background': 'lightblue'
    });

    getDetailsOfSelectedUserFromDB(this.name);

    $('#displayTree').show();
})

$('.familyGroup').css({
    'background': 'lightgrey'
});

db.ref().on('child_added', function (child) {
    familyGroupOf = child.val().familyGroupOf
})

// db.ref().on('child_added', function(child) {

// var familyGroupOf = child.val().familyGroupOf;
// var relationship = child.val().relationship;
// var firstName = child.val().firstName;
// var lastName = child.val().lastName;
// var birthDate = child.val().birthDate;
// var birthPlace = child.val().birthPlace;
// var hobbies = child.val().hobbies;
// var occupation = child.val().occupation;
// var profilePic = child.val().profilePic;
// var favMovie = child.val().favMovie;
// var favQuote = child.val().favQuote;
// var favSong = child.val().favSong;

// if (firstName !== undefined) {
//     var markup =
//         "<tr>\
//      <td>" + familyGroupOf + "</td>\
//      <td>" + relationship + "</td>\
//      <td>" + firstName + "</td>\
//      <td>" + lastName + "</td>\
//      <td>" + birthDate + "</td>\
//      <td>" + birthPlace + "</td>\
//      <td>" + hobbies + "</td>\
//      <td>" + occupation + "</td>\
//      <td>" + profilePic + "</td>\
//      <td>" + favMovie + "</td>\
//      <td>" + favQuote + "</td>\
//      <td>" + favSong + "</td>\
//      </tr>";
//     $("table tbody").append(markup);
// }
// })

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function getDetailsOfSelectedUserFromDB(selectedUser) {
    familyTreeArr1 = familyTreeArr;
    db.ref().on('child_added', function (child) {

        familyGroupOf = child.val().familyGroupOf;

        if (familyGroupOf === selectedUser) {
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
            var relationshipId = child.val().relationshipId;

            $('#' + relationshipId).text(firstName);
            $('#' + relationshipId).attr("href", "memberDetails.html?firstName=" + firstName);
            var userImg = $('<img>').attr({
                "src": "assets/images/" + firstName + ".png",
                "width": "100",
                "height": "90"
            });
            $('#' + relationshipId).append(userImg);
            // familyTreeArr1.remove(relationshipId);

        }
    })

    familyTreeArr1.forEach(function (member) {
        console.log(member);
        if ($('#' + member).text() === "") {
            $('#' + member).hide();
        } else {
            $('#' + member).show();
        }
    });
}