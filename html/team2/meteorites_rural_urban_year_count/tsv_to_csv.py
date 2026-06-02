
import json
import csv

data={}
count = 1

# tsv to csv
fcsv = csv.writer(open("test.csv", "w"))
fcsv.writerow(["Year", "NoOfSightingsIn_Rural", "NoOfSightingsIn_Urban"])
with open("meteors_rural_vs_urban_year_count.tsv","r", encoding = "ISO-8859-1") as f:
    for line in f:
       if count == 1:
           count = count + 1
           continue
       sp=line.split("\t")

       if len(sp) < 3:
           continue
       # print(len(sp))
       csvList = []
       for i in range(0,len(sp)):
           csvList.append(sp[i].strip())
       fcsv.writerow(csvList)


