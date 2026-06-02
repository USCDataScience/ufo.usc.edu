<?php
ini_set('memory_limit','4084M');
ini_set('max_execution_time', 300);
include 'SpellCorrector.php';
include('simple_html_dom.php');
header('Content-Type: text/html; charset=utf-8');
$limit = 10;

$query = isset($_REQUEST['q']) ? $_REQUEST['q'] : false; 
$results = false;

$file = fopen('/home/priyansha/Downloads/WP/WP Map.csv', 'r');
$urlFromMap = array();
while (($row = fgetcsv($file, 2000, ",")) !== FALSE) {
  $urlFromMap[$line[0]] = $row[1];  
}
fclose($file);

if($query){

$default = array("q.op"=>"AND");
$additionalParameters = array('sort' => 'pageRankFile desc',"q.op"=>"AND");

require_once('solr-php-client/Apache/Solr/Service.php');

$solr = new Apache_Solr_Service('localhost', 8983, '/solr/myCore/');
 if( ! $solr->ping()) { 
            echo 'Solr service is not available'; 
        } 
     else{
     
     }

try{
$terms = explode(" ",$query);
$original = $query;
$query = "";
$flag = 0;
$right =isset($_REQUEST['f']) ? true : false;

if($right == false){
foreach($terms as $term){
    $t = SpellCorrector::correct($term);

    if(trim(strtolower($t)) != trim(strtolower($term))){
        $flag = 1;
    }
    $query = $query." ".$t;
}

$query = trim($query);
}

else{
$query = $original;
}

if (isset($_GET["sort"]) && $_GET["sort"]=="rank"){
$results = $solr->search($query, 0, $limit, $additionalParameters);
}
else{
$results = $solr->search($query, 0, $limit, $default);
}


}
catch (Exception $e)
{
die("<html><head><title>SEARCH EXCEPTION</title><body><pre>{$e->__toString()}</pre></body></html>");
} 
}


?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
  <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<script>
    $(function() {
        $("#q").autocomplete({
        source : function(request,response) {
        var userInput=$("#q").val().toLowerCase().split(" ").pop(-1);
        var customURL = "http://localhost:8983/solr/myCore/suggest?q=" + userInput + "&wt=json";
        $.ajax({
          url : customURL,
          success : function(data) {
            var input=$("#q").val().toLowerCase().split(" ").pop(-1);
            var suggestions=data.suggest.suggest[input].suggestions;
            suggestions=$.map(suggestions,function(value,index){
              var prefix="";
              var query=$("#q").val();
              var queries=query.split(" ");
              if(queries.length>1) {
                var lastIndex=query.lastIndexOf(" ");
                prefix=query.substring(0,lastIndex+1).toLowerCase();
              }
              if (prefix == "" && is_stop_word(value.term)) {
                return null;
              }
               if(!/^[0-9a-zA-Z]+$/.test(value.term)) {
                return null;
              }
              return prefix+value.term;
            });
            response(suggestions.slice(0,5));
          },
          dataType: 'jsonp',
          jsonp: 'json.wrf'
        });  
      },
      minLength: 1 
    });
    });

function is_stop_word(stopword) {
  var regex=new RegExp("\\b"+stopword+"\\b","i");
  return stopWords.search(regex) < 0 ? false : true;
 }

</script>
</head>

<body style="text-align:center">
<div id = "search" top = "50px" left = "50px">
<form accept-charset="utf-8" method="get" >
<input id="q" name="q" type="text" value="<?php echo htmlspecialchars($original, ENT_QUOTES, 'utf-8'); ?>"/>
</br>
</br>
<input type="radio" name="sort" checked <?php if (isset($_GET["sort"]) && $_GET["sort"]=="default") echo "checked"?> value ="default"> Solr Lucene
 <input type="radio" name="sort" <?php if (isset($_GET["sort"]) && $_GET["sort"]=="rank") echo "checked" ?> value="rank"> Page Rank 
</br>
</br>
<input type="submit"/> 
</br>
</br>

</form>

</div>

<div style="text-align:left">
<?php
if ($results) {

if($flag == 1){ ?>
<p>Did you mean: <a href="http://localhost/index.php?rank=<?php echo $_REQUEST['sort']; ?>&f=true&q=<?php echo $query; ?>"><?php echo $query;?></a> </p>
<p>Search instead: <a href="http://localhost/index.php?rank=<?php echo $_REQUEST['sort']; ?>&f=true&q=<?php echo $original; ?>"><?php echo $original;?></a> </p>
<?php }

$total = (int) $results->response->numFound; 
$start = min(1, $total);
$end = min($limit, $total);
}
?>
<?php

if ($results) {
 echo "<div>Results {$start} - {$end} of {$total}:</div>";

?>

<ol> 
<?php
foreach ($results->response->docs as $doc)
{ 
echo "<li>";
$title = "";
$id = "";
$descp = "";

$sp = explode("/",$id);
$new_id = end($sp);
$url = $urlFromMap[$new_id];

foreach ($doc as $field => $value)
{ 

  if($field == "id"){
  $file_data = $value;
  $id = htmlspecialchars($value, ENT_NOQUOTES, 'utf-8');
  }

  if($field == "title")
        {
  $title = htmlspecialchars($value, ENT_NOQUOTES, 'utf-8');
  }

  if($field == "description")
        {
  $descp = htmlspecialchars($value, ENT_NOQUOTES, 'utf-8');
  }
}

if($descp == ""){
$descp = "NA";
}

echo "<a  target= '_blank'  href='{$url}'><b>".$title."</b></a></br>";
echo "<a  target= '_blank' href='{$url}'>".$url."</a></br>";
echo $id."</br>";
echo $descp."</br>";

$html = $descp.".".file_get_contents($file_data).".".$title;
$sentences = explode(".",$html);
$words = explode(" ", $query);
$snippet="";
$begin="/";
$start_delimiter="(?=.*?\b";
$end_delimiter="\b)";

foreach($words as $word){
    $begin=$begin.$start_delimiter.$word.$end_delimiter;
}

$begin=$begin."^.*$/i";

foreach($sentences as $sentence){
    $sentence=strip_tags($sentence);
    if (preg_match($begin, $sentence)>0){
        if (preg_match("(&gt|&lt|\/|{|}|[|]|\|\%|>|<|:)",$sentence)>0){
            continue;
        }

        else{
            $snippet = $snippet.$sentence;
            if(strlen($snippet)>156) break;
        }
    }
}

if(strlen($snippet)<5){
    foreach($sentences as $sentence){
        $sentence=strip_tags($sentence);
        foreach($words as $word){
            if (preg_match($word, $sentence)>0){
                if (preg_match("(&gt|&lt|\/|{|}|[|]|\|\%|>|<|:)",$sentence)>0){
                    continue;
                }
                else{
                    $snippet = $snippet.$sentence;
                    if(strlen($snippet)>156)break;
                }
            }
        }
    }
}

if(strlen($snippet) == 0){
     echo "NA";
}

else{
    echo "...".$snippet."..."; 
}

echo "</li>";

}
}
?>
</ol>
</div>
<script>
var stopWords = "a,able,about,above,across,after,all,almost,also,am,among,can,an,and,any,are,as,at,be,because,been,but,by,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your,not";
</script>
</body> </html>