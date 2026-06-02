<?php
ini_set('memory_limit','4084M');
ini_set('max_execution_time', 300);
include 'SpellCorrector.php';
include('simple_html_dom.php');
// make sure browsers see this page as utf-8 encoded HTML
header('Content-Type: text/html; charset=utf-8');

$limit = 10;
$query = isset($_REQUEST['q']) ? $_REQUEST['q'] : false;
$results = false;

if ($query)
{
  // The Apache Solr Client library should be on the include path
  // which is usually most easily accomplished by placing in the
  // same directory as this script ( . or current directory is a default
  // php include path entry in the php.ini)
  require_once('Apache/Solr/Service.php');

  // create a new solr service instance - host, port, and webapp
  // path (all defaults in this example)
  $solr = new Apache_Solr_Service('localhost', 8983, '/solr/myexample/');

  // if magic quotes is enabled then stripslashes will be needed
  if (get_magic_quotes_gpc() == 1)
  {
    $query = stripslashes($query);
  }

  // in production code you'll always want to use a try /catch for any
  // possible exceptions emitted  by searching (i.e. connection
  // problems or a query parsing error)
  try
  {

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


      if($_GET['pageRankType'] == "pageRankAlgo")
      {
          $additionalParameters = array('q.op'=>'AND','fq'=>'og_url:[* TO *]','sort'=>'pageRankFile desc');

          $results = $solr->search($query, 0, $limit,$additionalParameters);

      }
      else
      {
          $additionalParameters =  array('q.op'=>'AND','fq' =>'og_url:[* TO *]');
          $results = $solr->search($query, 0, $limit,$additionalParameters);

      }
      // else
      // {
      //   $additionalParameters = array('fq'=>'og_url:[* TO *]','sort'=>'pageRankFile desc');
      //   $results = $solr->search($query, 0, $limit,$additionalParameters);
      // }
    
      $csv = file('UrlToHtml_NBCNews.csv');
      foreach ($csv as $line) {
        $line = str_getcsv($line);
        $Map[$line[0]] = trim($line[1]);
      }

  }
  catch (Exception $e)
  {
    // in production you'd probably log or email this error to an admin
    // and then show a special message to the user but for this example
    // we're going to show the full exception
    die("<html><head><title>SEARCH EXCEPTION</title><body><pre>{$e->__toString()}</pre></body></html>");
  }
}

?>
<html>
  <head>
    <title>PHP Solr Client Example</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css" integrity="sha384-AysaV+vQoT3kOAXZkl02PThvDr8HYKPZhNT5h/CXfBThSRXQ6jW5DO2ekP5ViFdi" crossorigin="anonymous">
     <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
      <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

  </head>
  <style>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
      border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even){background-color: #f2f2f2}

    th {
        background-color: #4CAF50;
        color: white;
    }
    .button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 10px;
  box-shadow: 0 6px #999;
}
.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.form-rounded {
border-radius: 1rem;
width: 40%;
}
  </style>
  <body><center>
    <form  accept-charset="utf-8" method="get" class = "form-group">
      <br>
      <label for="q">Search:</label>
      <input id="q" class="form-control form-rounded" name="q" type="text" value="<?php echo isset($_GET['q']) ? $_GET['q'] : '' ?>"/>
      <br>
      <label class="form-check-label">
      <input type = "radio" class= "form-check-input" name = "pageRankType" id ="optionsRadio1" value = "lucene" <?php echo isset($_GET['pageRankType']) && $_GET['pageRankType'] == "pageRankAlgo" ? "" : "checked"; ?> >Lucene 
   </label>

    <label class="form-check-label">

    <input type = "radio" class= "form-check-input" name = "pageRankType" id ="optionsRadio2" value = "pageRankAlgo" <?php echo isset($_GET['pageRankType']) && $_GET['pageRankType'] == "pageRankAlgo" ? "" : "unchecked"; ?> >PageRank
  </label>

      <!-- <input type= "radio" name ="lucene" value = "lucene"> Lucene-solr
      <input type="radio" name="pagerank" value = "pagerank"> PageRank
       -->
       <br><input type="submit" class="button"/>
     </form></center>
    </form>
<script>
$(function() {
     var URL_PREFIX = "http://localhost:8983/solr/myexample/suggest?q=";
     var URL_SUFFIX = "&wt=json&indent=true";
     var count=0;
     var tags = [];
     $("#q").autocomplete({
       source : function(request, response) {
         var correct="",before="";
         var query = $("#q").val().toLowerCase();
         var character_count = query.length - (query.match(/ /g) || []).length;
         var space =  query.lastIndexOf(' ');
         if(query.length-1>space && space!=-1){
          correct=query.substr(space+1);
          before = query.substr(0,space);
        }
        else{
          correct=query.substr(0); 
        }
        var URL = URL_PREFIX + correct+ URL_SUFFIX;
        $.ajax({
         url : URL,
         success : function(data) {
          var js =data.suggest.suggest;
          var docs = JSON.stringify(js);
          var jsonData = JSON.parse(docs);
          var result =jsonData[correct].suggestions;
          var j=0;
          var stem =[];
          for(var i=0;i<5 && j<result.length;i++,j++){
            if(result[j].term==correct)
            {
              i--;
              continue;
            }
            for(var k=0;k<i && i>0;k++){
              if(tags[k].indexOf(result[j].term) >=0){
                i--;
                continue;
              }
            }
            if(result[j].term.indexOf('.')>=0 || result[j].term.indexOf('_')>=0)
            {
              i--;
              continue;
            }
            var s =(result[j].term);
            if(stem.length == 5)
              break;
            if(stem.indexOf(s) == -1)
            {
              stem.push(s);
              if(before==""){
                tags[i]=s;
              }
              else
              {
                tags[i] = before+" ";
                tags[i]+=s;
              }
            }
          }
          // console.log(tags);
          response(tags);
        },
        dataType : 'jsonp',
        jsonp : 'json.wrf'
      });
      },
      minLength : 1
    })
   });
 </script>    

<?php

// display results
if ($results)
{
  if($flag == 1){?>
  <p><i><font color = red>Did you mean:</i></font> <a href="http://localhost:8080/index.php?pageRankAlgo=<?php echo $_REQUEST['pageRankType']; ?>&f=true&q=<?php echo $query; ?>"><?php echo $query;?></a> </p>
  <p><i><b>Search instead:</i> </b><a href="http://localhost:8080/index.php?pageRankAlgo=<?php echo $_REQUEST['pageRankType']; ?>&f=true&q=<?php echo $original; ?>"><?php echo $original;?></a> </p>
  <?php }

  $total = (int) $results->response->numFound;
  $start = min(1, $total);
  $end = min($limit, $total);
?>
<div>Results <?php echo $start; ?> - <?php echo $end;?> of <?php echo $total; ?>:</div>

<ol>
<?php
  // iterate result documents
  foreach ($results->response->docs as $doc)
  {
    foreach ($doc as $field => $value)
    {
      if($field == "id"){
        $file_data = $value;
      }
      if($field == "og_description")
        $descp = htmlspecialchars($value,ENT_NOQUOTES,'utf-8');
      // if($field == "title")
      //   $title = htmlspecialchars($value,ENT_NOQUOTES,'utf-8');
    }
  
    if($descp == "")
      $descp = "N/A";

    $html = $descp.".".file_get_contents($file_data).".".$title;
    $sentences = explode(".", $html);
    $words = explode(" ", $query);
    $snippet = "";
    $begin="/";
    $start_delimiter="(?=.*?\b";
    $end_delimiter="\b)";

    foreach($words as $word){
        $begin=$begin.$start_delimiter.$word.$end_delimiter;
    }

    $begin=$begin."^.*$/i";

    foreach($sentences as $sentence)
    {
        $sentence=strip_tags($sentence);
        if (preg_match($begin, $sentence)>0){
            if (preg_match("(&gt|&lt|\/|{|}|[|]|\|\%|>|<|:)",$sentence)>0){
                continue;
            }

            else{
                $snippet = $snippet.$sentence;
                $snippet = mb_convert_case($snippet, MB_CASE_LOWER, "UTF-8");
                      $query = mb_convert_case($query, MB_CASE_LOWER, "UTF-8");
                      $pieces = explode(" ", $query);
                      
                      foreach($pieces as $colors)
                      {
                        $snippet = preg_replace(" ?".preg_quote($colors)." ?", "<b>$0</b>", $snippet);
                      }
                if(strlen($snippet)>156) break;
            }
        }
    }

    if(strlen($snippet)<5)
    {
      foreach($sentences as $sentence)
      {
          $sentence=strip_tags($sentence);
          foreach($words as $word){
              if (preg_match('/' . $word .'/i', $sentence)>0){
                  if (preg_match("(&gt|&lt|\/|{|}|[|]|\|\%|>|<|:)",$sentence)>0){
                      continue;
                  }
                  else{
                      if(strlen($snippet)>156)break;

                      $snippet = $snippet.$sentence;
                      $snippet = mb_convert_case($snippet, MB_CASE_LOWER, "UTF-8");
                      $query = mb_convert_case($query, MB_CASE_LOWER, "UTF-8");
                      $pieces = explode(" ", $query);
                     
                      foreach($pieces as $colors)
                      {
                        $snippet = preg_replace(" ?".preg_quote($colors)." ?", "<b>$0</b>", $snippet);
                      }
                  }
              }
          }
      }
}
    if(strlen($snippet)==0)
    {
      $snippet = $doc->og_description;
    }

?>
      <li>
        <table style="border: 2px solid black; text-align: left" class="table table-hover">
           <?php
              $tomap = end(explode('/', $doc->id));
              $url = $Map[$tomap];           
          ?>

          <tr>
            <th><?php echo htmlspecialchars('id', ENT_NOQUOTES, 'utf-8'); ?></th>
            <td>
              <?php echo htmlspecialchars($doc->id, ENT_NOQUOTES, 'utf-8'); ?>
            </td>
          </tr>
          

          


          <tr>
            <th><?php echo htmlspecialchars('og_url', ENT_NOQUOTES, 'utf-8'); ?></th>
            <td>
              
              
              
               <a href ="<?php echo htmlspecialchars($url, ENT_NOQUOTES, 'utf-8'); ?>" > <?php echo htmlspecialchars($url, ENT_NOQUOTES, 'utf-8');?></a> 

    
            </td>
          </tr>


          <tr>
            <th><?php echo htmlspecialchars('title', ENT_NOQUOTES, 'utf-8'); ?></th>
            <td>
              <?php if($doc->og_url == '')
                {
                ?>
                  <a href ="<?php echo htmlspecialchars($url, ENT_NOQUOTES, 'utf-8'); ?>" ><?php  if(is_array($doc->title)) echo $doc->title[1];
                    else
                      echo htmlspecialchars($doc->title, ENT_NOQUOTES, 'utf-8'); ?> </a>
              <?php
              }
              else ?><?php { ?>
               <a href="<?php echo htmlspecialchars($doc->og_url, ENT_NOQUOTES, 'utf-8'); ?>" > <?php  if(is_array($doc->title)) echo $doc->title[1];
                    else
                      echo htmlspecialchars($doc->title, ENT_NOQUOTES, 'utf-8'); ?> </a>
              <?php }?>
            
            </td>
          </tr>  


          <tr>
            <th>
              <?php echo htmlspecialchars('og_description', ENT_NOQUOTES, 'utf-8'); ?>    
            </th>
            <td>
            <?php 
            if($doc->og_description =='') echo htmlspecialchars('N/A', ENT_NOQUOTES, 'utf-8');
            else
              echo htmlspecialchars($doc->og_description, ENT_NOQUOTES, 'utf-8'); ?>
            </td>
          </tr>

          <tr>
            <th>
              <?php echo htmlspecialchars('Snippet', ENT_NOQUOTES, 'utf-8'); ?>    
            </th>
            <td>
            <?php 
            if(strlen($snippet) == 0)
              echo "N/A";

            else
             // echo htmlspecialchars($doc->og_description, ENT_NOQUOTES, 'utf-8'); 
               echo "..." .$snippet."..."; 
              ?>
             </td>
          </tr>

        </table>
      </li>
<?php
  }
?>
</ol>
<?php
}
?>
<script>
var stopWords = "a,able,about,above,across,after,all,almost,also,am,among,can,an,and,any,are,as,at,be,because,been,but,by,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your,not";
</script>
  </body>
</html>