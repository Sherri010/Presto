<?php

$name =$_POST['id'];
$med = $_POST['med'];

$input_path = "in/in_".$name.".txt";
$status_path="status/status_".$name.".txt";
//remove old input files
if(file_exists($input_path) )
{if (!unlink($input_path))
  {
      echo "something went wrong!";
  }
else
  {

  }
}
//remove old status files
if(file_exists($status_path) )
{if (!unlink($status_path))
  {
      echo "something went wrong!";
  }
else
  {

  }
}

$out = fopen($input_path, "w");
$queue = fopen("queue.txt", "a");
if ($med == 'air')
{
$med='a';
$ep =  $_POST['ep'];
$hd   =  $_POST['hd'];
$temp =  $_POST['tempair'];
$elev =  $_POST['elevair'];
$atm  =  $_POST['pressure'];
$hum  =  $_POST['relhum'];
$dew  =  $_POST['dewpo'];


if ( $ep == 'e')
{
   if ($hd =='h')
     { fwrite($out,$med.','.$temp."\r\n". $ep.','.$elev."\r\n".$hd.','.$hum);  }
  if ($hd=='d')
     { fwrite($out,$med.','.$temp."\r\n". $ep.','.$elev."\r\n".$hd.','.$dew);  }

}


if ($ep == 'p')
{
   if ($hd =='h')
    { fwrite($out,$med.','.$temp."\r\n". $ep.','.$atm."\r\n".$hd.','.$hum);  }
    if ($hd=='d')
    { fwrite($out,$med.','.$temp."\r\n". $ep.','.$atm."\r\n".$hd.','.$dew);  }
}





}   ///finished air





if ($med == 'sea')
{ $med='s';
  $temp=$_POST["stemp"];
  fwrite($out,$med.','.$temp);
  fwrite($out,"\r\n");

} //finished sea





if ($med == 'fresh')
{ $med = 'f';
  $temp=$_POST["ftemp"];
  fwrite($out,$med.','.$temp);
  fwrite($out,"\r\n");
}
fclose($out);


//add to the queue
  fwrite($queue,$name);
  fwrite($queue,"\r\n");
fclose($queue);




//************************ listen for status file ****************//

while(!file_exists($status_path))
{
   //waiting for status file to be generated
   //best to have a time here
}

$readstat= fopen($status_path, "r");
$stat =  fgets($readstat);
if($stat == "success")
{

//****************Starting to read the resutls ------------------//


//read in the table
$response="";
$p1="out/out_";
$p2=".csv";

//$csvFile=$p1.$name.$p2;
$csvFile='output.txt';
$href="C://wamp/www/air4/results/properties/out".$csvFile;

$response ='<a   class="dloption"  href="'.$href.'"  target="_blank" download="PropertiesInfo.csv">Download This Table </a>';
$response .="<h3  class='resutltable'>Properties </h3>
           <table class='table table-hover' id='restab' >
           <tr>
           <td class='active'> Properties </td>
           <td class='active'> Value </td>
           </tr>
          ";

$temp="";
$readin= fopen("out/output.txt", "r");
while(!feof($readin)) {
$response .='<tr><td>';
$temp =  fgets($readin);
$response .=$temp .'</td><td>';
$temp= fgets($readin);
 $response .=$temp."</td></tr>";
}


$response .="</table>";
fclose($readin);
echo $response;
}
if($stat != "success")
{$stat =  fgets($readstat);

}

?>
