var topics = ["babies driving", "babies crying", "babies dancing", "babies eating", "babies sleeping", "babies laughing"];

console.log("hello!");

    // Function for showing creating giphy buttons
      function renderButtons() {

        $("#tags").empty();

        for (var i = 0; i < topics.length; i++) {
          $("#tags").append('<button class="tag-buttons btn btn-primary">' + topics[i] + '</button>');
        }      

      } 

    // Function to add new button and search tag

    $(document).on('click', '#addTag', function(event) {

      event.preventDefault();

      var newTag = $("#category").val().trim();

      topics.push(newTag);

      $("#tags").append('<button class="tag-buttons btn btn-primary">' + 'babies '+newTag + '</button>');

    });

    // Button click function

    $(document).on('click', '.tag-buttons', function(event) {

      // Keeps page from reloading
      event.preventDefault();

      var type = this.innerText;
      console.log(this.innerText);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + window.encodeURI(type) + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

         // After the data comes back from the API store results in a variable
         var results = response.data;

          for (var i = 0; i < response.data.length; i++) {

          // Only taking action if the giphy has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

          $("#giphy").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
          $("#giphy").append(p);

            }
          }
    });

      $("#giphy").empty();

    });
    renderButtons();


    // Function to start and stop animation
    
    $('body').on('click', '.gif', function() {
      var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });