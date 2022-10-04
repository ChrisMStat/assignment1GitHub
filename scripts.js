/*
Christopher Statton
Used Template posted in Canvas
9/30/22
CS 3203
 */

$(function() {
   //Get Users
   $('#get-button').on('click', function() {
       //TODO: get all users' IDs & display it
       $.ajax({
           url: '/tweetinfo',
           contentType: 'application/json',
           success: function(response)
           {
               $("#namebody").html('');
               response.tweetinfo.forEach(function(tweetinfo)
               {
                   $("#namebody").append('\
                        <tr>\
                            <td class="ID">' + tweetinfo.user.id + '</td>\
                            <td class="Screen Name">' + tweetinfo.user.screen_name + '</td>\
                            <td class="Name"">' + tweetinfo.user.name + '</td>\
                        </tr>');
               });
           }
       });
    });

    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
            url: '/tweetinfo',
            contentType: 'application/json',
            success: function(response)
            {
                $("#tweetbody").html('');
                response.tweetinfo.forEach(function(tweetinfo)
                {
                    $("#tweetbody").append('\
                        <tr>\
                            <td class="ID">' + tweetinfo.id + '</td>\
                            <td class="Text">' + tweetinfo.text + '</td>\
                            <td class="Created At">' + tweetinfo.created_at + '</td>\
                        </tr>');
                });
            }
        });
    });

    //Get searched tweets
    //recently searched button
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
            url: '/searchinfo',
            contentType: 'application/json',
            success: function(response)
            {
                $("#searchbody").html('');
                // if tweet does not exist, inform user
                if (response.searchedTweet === undefined)
                {
                    $("#searchbody").append('...Tweet not found...');
                }

                // otherwise, output tweet to user
                else
                {
                    $("#searchbody").append('\
                        <tr>\
                            <td class="ID">' + response.searchedTweet.id + '</td>\
                            <td class="Text">' + response.searchedTweet.text + '</td>\
                            <td class="Created At">' + response.searchedTweet.created_at + '</td>\
                        </tr>');
                }
            }
        });
    });

  //CREATE
  $('#create-form').on('submit', function(event){
      event.preventDefault();
      var createInput = $('#create-input');

      //TODO: create a tweet
      $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({input: createInput.val()}),
          success: function(response)
          {
              // tweet waas successfully created
              if (response === true)
              {
                  console.log("tweet created");
                  createInput.val('');
                  $('#get-tweets-button').click();
              }

              // otherwise user entered new tweet using incorrect format; inform them of this
              else
              {
                  console.log("tweet not created");
                  alert("To Create a Tweet, Enter \"ID;Text\" In That Exact Format");
                  createInput.val('');
              }
          }
      });
  });

  //Create searched tweets
  $('#search-form').on('submit', function(event){
      event.preventDefault();
      var id = $('#search-input');

      //TODO: search a tweet and display it.
      $.ajax({
          url: '/searchinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({id: id.val()}),
          success: function(response) {
              console.log(response);
              id.val('');
              $('#get-searched-tweets').click();
          }
      });
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
      var updateInput = $('#update-input');
      var inputString = updateInput.val();
      const parsedStrings = inputString.split(';');
      var name = parsedStrings[0];
      var newName = parsedStrings[1];
    
      //TODO: update a tweet
      $.ajax({
          url: '/tweets/' + name,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({newName: newName, name: name}),
          success: function(response) {

              // user name was successfully updated
              if (response === true)
              {
                  console.log('name updated');
                  updateInput.val('');
                  $('#get-button').click();
              }

              // username entered does not exist
              else
              {
                  alert("user: " + name + " does not exist");
                  updateInput.val('');
              }
          }
      });
  });

  //DELETE
  $("#delete-form").on('submit', function() {
      event.preventDefault();
      var id = $('#delete-input').val();

      //TODO: delete a tweet
      $.ajax({
          url: '/tweetinfo/' + id,
          method: 'DELETE',
          contentType: 'application/json',
          success: function(response) {

              // if tweet was successfully deleted
              if (response === true)
              {
                  console.log("tweet deleted");
                  id = $('#delete-input');
                  id.val('');
                  $('#get-tweets-button').click();
              }

              // tweet was not deleted; i.e. tweet does not exist
              else
              {
                  alert("Tweet ID: " + id + " does not exist");
                  id = $('#delete-input');
                  id.val('');
              }
          }
      });
  });
});


                    
   