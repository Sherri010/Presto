$( document ).ready(function() {
  //prevent submitting by hitting enter
  $(window).keydown(function(event){
   if(event.keyCode == 13) {
     event.preventDefault();
     return false;
   }
 });
  //clicking on lets start
  $('#name_ckeck').click(function(){
          Cookies.remove('name_presto_nm');
          //checking for cookies
          var checking_name = Cookies.get('name_presto_nm');
          //cookie doesnt exists
          if( checking_name == null )
              {  $('#nameModal').modal();  }
          //cookie exist
          if(checking_name != null)
              {  window.location.href="presto.html";}

  });
  //getting a name for creating cookie
  $('.submit_name').click(function(){
           var modalName = $('#name_presto').val();
           if ((modalName == null) || (modalName == ""))
              {$('#name_error').html("No name entered.");}
           if (modalName)
              { //generate a random number to add to the name to create a unique id
                var name_cooked = modalName.concat(Math.floor((Math.random() * 100) + 1));
                Cookies.set('name_presto_nm', name_cooked);
                window.location.href="presto.html";
              }

  });


});
