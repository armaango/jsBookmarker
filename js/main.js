//create a listened for submit button

document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
      return false;
    }

    var bookmark = {
      name:siteName,
      url:siteUrl
    };


    //localStorage.setItem('')

    //check if bookmarks is null
    if(localStorage.getItem('bookmarks')===null){
      //Initialise array
      var bookmarks=[];
      //adding to array
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    else {
      //fetch from local storage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      //Add bookmark to array
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    document.getElementById('myForm').reset();

    fetchBookmarks();

  //Prevent form from submitting
  e.preventDefault();
}
//Delete bookmarks
function deleteBookmark(url) {
  //Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks
  for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].url== url) {
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  //refetch bookmarks
  fetchBookmarks();
}

//Fetch bookmarks

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get output id

  var bookmarksResults = document.getElementById('bookmarksResults');

  //Build output
  bookmarksResults.innerHTML = '';
  for(var i=0;i<bookmarks.length;i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    console.log(name,url);

    bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    '  <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                    '  <a class="btn btn-danger" onClick="deleteBookmark(\''+url+'\')"  href="#">Delete</a>'+
                                    '</h3>'+
                                    '</div>';
  }
}
function validateForm(siteName,siteUrl) {
  if(!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid Url');
    return false;
  }
  return true;
}
