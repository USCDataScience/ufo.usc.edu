cut -f2 10_v2_with_ocr.tsv > reported_dates.txt
cut -f3 10_v2_with_ocr.tsv | cut -d ',' -f2 > states.txt
cut -f1 -f2 10_v2_with_ocr.tsv > reported_sighted_date.txt