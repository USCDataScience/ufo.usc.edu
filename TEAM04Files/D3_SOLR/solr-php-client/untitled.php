<?php
              $tomap = substr($doc->id,51,70);
              ?>
              <a href="<?php if ($doc->og_url != ' ') {
               
                ini_set('auto_detect_line_endings',TRUE);
                $handle = fopen("UrlToHtml_NBCNews.csv", "r");
                while ( ($data = fgetcsv($handle) ) !== FALSE ) {
                  $num = count($data);
                  for ($c=0; $c < $num; $c++) {
                  if($data[$c][0]==$tomap)
                    $url = $data[$c][1];
                  }
                }

                ini_set('auto_detect_line_endings',FALSE);
                echo htmlspecialchars($url, ENT_NOQUOTES, 'utf-8'); ?>"<?php echo htmlspecialchars($url, ENT_NOQUOTES, 'utf-8');
              }?> 