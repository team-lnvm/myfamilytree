 var config = {
     apiKey: "AIzaSyBEQpTYMbAxRNS_OL0het35jEJoQJ6lgHs",
     authDomain: "myfamilytree-99ac7.firebaseapp.com",
     databaseURL: "https://myfamilytree-99ac7.firebaseio.com",
     projectId: "myfamilytree-99ac7",
     storageBucket: "",
     messagingSenderId: "366510537615"
 };
 firebase.initializeApp(config);

 var db = firebase.database();
 
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

 myFamilyInfo.forEach(function(person) {
     console.log(person.link, person.firstname);
     
       
     db.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
 })