
$( document ).ready(function() {
    $( "#block2" ).animate({ width: "30%" }, 1000 );
    var user_id = Cookies.get('name_presto_nm');
    var medium;
    var elev_press;
    var hum_dew;

 //select the medium
  $("#radiolist input[name='radioair']").click(function(){

	$('.appforms').show();
  	$('#submit').show();
    if($(this).val() == "air"){
        	medium='air';
        	$('#airform').show();
        	$('#freshform').hide();
        	$('#seaform').hide();
    }

	if($(this).val()=="fresh"){
        	medium='fresh';
        	$('#freshform').show();
        	$('#airform').hide();
        	$('#seaform').hide();
	}

	if($(this).val()=="sea"){
        	medium='sea';
        	$('#seaform').show();
        	$('#airform').hide();
        	$('#freshform').hide();
	}

	});



// choosing elevation or pressure in air form
$("#elevation").click(function(){
	  $('.elevair').removeAttr('disabled');
	  $('.atmos').attr('disabled', 'disabled');
    $('.atmos').val('');
	  $('span.error-keyup-1').hide();

});
$("#pressure").click(function(){
	  $('.atmos').removeAttr('disabled');
	  $('.elevair').attr('disabled', 'disabled');
    $('.elevair').val('');
	  $('span.error-keyup-1').hide();

});



 // choosing humidity or dew point in air form
$("#relative").click(function(){
	  $('.relhum').removeAttr('disabled');
	  $('.dewpo').attr('disabled', 'disabled');
    $('.dewpo').val('');
	  $('span.error-keyup-1').hide();

});
$("#dew").click(function(){
	  $('.dewpo').removeAttr('disabled');
	  $('.relhum').attr('disabled', 'disabled');
    $('.relhum').val('');
	  $('span.error-keyup-1').hide();

});

 //elev or pressure

 $("#elevlist input[name='airfm']").click(function(){

    if($(this).val() == "elevation"){ elev_press='e';}
	else {elev_press='p';}

});


 //humidity or dew point
  $("#humidlist input[name='reldew']").click(function(){

    if($(this).val() == "relative"){ hum_dew='h';} //r
	else 	{hum_dew='d';}
  });



//error checking
 var medium = '';
 var floatRegex = /^[-+]?[0-9]\d*(\.\d+)?$/;
 var numericReg = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;


//air form - temp
	$('.tempair').blur(function() {
	$('span.error-keyup-1').remove();
    var inputVal = $(this).val();
    if((!numericReg.test(inputVal)) || (inputVal > 100) || ( inputVal < 0)) {
    Erflag=1;
       $(this).after('<span class=" fa fa-times error error-keyup-1"> Please enter a value between 0 to 100.</span>');}
});
//air form - elevation
	$('.elevair').blur(function() {
	  $('span.error-keyup-1').remove();
      var inputVal = $(this).val();
      if((!floatRegex.test(inputVal)) || (inputVal < -425) || (inputVal > 20000)) {
        $(this).after('<span class="fa fa-times error error-keyup-1"> Please enter a value between -425 to 20,000 meters.</span>');}
});

//air form - atmosphere
$('.atmos').blur(function() {
	$('span.error-keyup-1').remove();
    var inputVal = $(this).val();
    if((!numericReg.test(inputVal)) || (inputVal < 20000) || (inputVal > 106500)) {
       $(this).after('<span class=" fa fa-times error error-keyup-1"> Please enter a value between 20,000 to 106,500 Pa.</span>');  }
});

//air form - humid
$('.relhum').blur(function() {
	$('span.error-keyup-1').remove();
    var inputVal = $(this).val();
    if((!numericReg.test(inputVal)) || (inputVal < 0) || (inputVal > 100)) {
       $(this).after('<span class=" fa fa-times error error-keyup-1"> Please enter a value between 0 to 100.</span>');
    }
});
//air form - dew point
$('.dewpo').blur(function() {
	$('span.error-keyup-1').remove();
    var inputVal = $(this).val();
    if((!numericReg.test(inputVal)) || (inputVal < 0) || (inputVal > 100)) {
       $(this).after('<span class=" fa fa-times error error-keyup-1"> Please enter a value between 0 to 100.</span>');
    }
});



$('.ftemp').blur(function() {
  //  $('span.error-keyup-1').hide();
	$('span.error-keyup-1').remove();
    var inputVal = $(this).val();
    if((!numericReg.test(inputVal)) || (inputVal > 100) || ( inputVal < 0))  {
       $(this).after('<span class=" fa fa-times error error-keyup-1"> Please enter a value between 0 to 100.</span>');
    }
});

$('.stemp').blur(function() {
  //  $('span.error-keyup-1').hide();
	$('span.error-keyup-1').remove();
    var inputVal = $(this).val();
      if((!floatRegex.test(inputVal)) || (inputVal < -2.6) || (inputVal > 100)) {
       $(this).after('<span class=" fa fa-times error error-keyup-1"> Please enter a value between -2.6 to 100.</span>');
    }
});

///submit the forms //

$('.btn-default').click(function() {
  if($('span.error').length > 0){

	if (medium=='air'){$('.flagair').html("<i class='fa fa-exclamation'></i> The entered values are not valid. Please check again.");}
	if (medium=='sea'){$('.flagsea').html("<i class='fa fa-exclamation'></i> The entered values are not valid. Please check again.");}
	if (medium=='fresh'){$('.flagfresh').html("<i class='fa fa-exclamation'></i> The entered values are not valid. Please check again.");}

    return false;
    }
 else
   {  if (medium== 'air' )
	   { var elev;
       var press;
       var humid;
       var dewp;
       var temp = $('.tempair').val();

		if (elev_press == 'e'){elev=$('.elevair').val(); press=""; }
        else {press = $('.pressure').val(); elev="";}

		if (hum_dew == 'h'){humid = $('.relhum').val(); dewp=""; }
        else {dewp = $('.dewpo').val(); humid="";}


        $.ajax({
          type: 'POST',
          url:'../../results/properties/interface.php',
          data: {id:user_id , med:medium, ep: elev_press, hd:hum_dew  , tempair: temp, elevair: elev ,pressure: press , relhum : humid , dewpo:dewp },
          success: function(response) { $('#response').html(response); }
        });

        }
	  if (medium== 'sea' )
	   {
        var temps = $('.stemp').val();

        $.ajax({
          type: 'POST',
          url: '../../results/properties/interface.php',
          data: {id:user_id , med:medium, stemp: temps},
          success: function(response) { $('#response').html(response); }
        });

        }
	  if (medium== 'fresh' )
	   {
        var temp = $('.ftemp').val();
        $.ajax({
          type: 'POST',
          url: '../../results/properties/interface.php',
          data: {id:user_id, med:medium, ftemp: temp},
          success: function(response) { $('#response').html(response); }
        });

        }
   }



});


});
