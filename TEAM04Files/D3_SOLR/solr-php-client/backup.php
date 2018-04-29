<?php

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
      if($_GET['pageRankType'] == "pageRankAlgo")
      {
          $additionalParameters = array('fq'=>'og_url:[* TO *]','sort'=>'pageRankFile desc');

          $results = $solr->search($query, 0, $limit,$additionalParameters);

      }
      else
      {
          $additionalParameters =  array('fq' =>'og_url:[* TO *]');
          $results = $solr->search($query, 0, $limit,$additionalParameters);

      }
      // else
      // {
      //   $additionalParameters = array('fq'=>'og_url:[* TO *]','sort'=>'pageRankFile desc');
      //   $results = $solr->search($query, 0, $limit,$additionalParameters);
      // }
    

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
  </style>
  <body><center>
    <form  accept-charset="utf-8" method="get" class = "form-group">
      <br>
      <label for="q">Search:</label>
      <input id="q" name="q" type="text" value="<?php echo isset($_GET['q']) ? $_GET['q'] : '' ?>"/>
      <br>
      <label class="form-check-label">
      <input type = "radio" class= "form-check-input" name = "pageRankType" id ="optionsRadio1" value = "lucene" <?php echo isset($_GET['pageRankType']) && $_GET['pageRankType'] == "pageRankAlgo" ? "" : "checked"; ?> >Lucene 
   </label>

    <label class="form-check-label">

    <input type = "radio" class= "form-check-input" name = "pageRankType" id ="optionsRadio2" value = "pageRankAlgo" <?php echo isset($_GET['pageRankType']) && $_GET['pageRankType'] == "pageRankAlgo" ? "" : "checked"; ?> >PageRank
  </label>

      <!-- <input type= "radio" name ="lucene" value = "lucene"> Lucene-solr
      <input type="radio" name="pagerank" value = "pagerank"> PageRank
       -->
       <br><input type="submit"/>
     </form></center>
    </form>

<?php

// display results
if ($results)
{
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
?>
      <li>
        <table style="border: 2px solid black; text-align: left" class="table table-hover">

          <tr>
            <th><?php echo htmlspecialchars('id', ENT_NOQUOTES, 'utf-8'); ?></th>
            <td>
              <?php echo htmlspecialchars($doc->id, ENT_NOQUOTES, 'utf-8'); ?>
            </td>
          </tr>
          

          


          <tr>
            <th><?php echo htmlspecialchars('og_url', ENT_NOQUOTES, 'utf-8'); ?></th>
            <td>
              <?php
              $tomap = substr($doc->id,51,70);                 
              ?>
              <?php if ($doc->og_url == '')                                 //finding the missing URL from the mapping csv file given by using the id of page
              {
               
                ini_set('auto_detect_line_endings',TRUE);
                $handle = fopen("UrlToHtml_NBCNews.csv", "r");

                while ( ($data = fgetcsv($handle,15727,",") ) !== FALSE ) 
                {
                  if($data[0]==$tomap){
                    $url = $data[1];
                    break;
                  }
                  
                }

                ini_set('auto_detect_line_endings',FALSE);
              ?>
               <a href ="<?php echo htmlspecialchars($url, ENT_NOQUOTES, 'utf-8'); ?>" > <?php echo htmlspecialchars($url, ENT_NOQUOTES, 'utf-8');?></a> 

              <?php
              } 

              else?>
                <a href="<?php echo htmlspecialchars($doc->og_url, ENT_NOQUOTES, 'utf-8'); ?>" > <?php echo htmlspecialchars($doc->og_url, ENT_NOQUOTES, 'utf-8'); ?></a>  
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

        </table>
      </li>
<?php
  }
?>
</ol>
<?php
}
?>
  </body>
</html>