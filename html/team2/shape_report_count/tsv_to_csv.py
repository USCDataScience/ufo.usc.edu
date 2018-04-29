import csv

data={}
count = 1

# tsv to csv
fcsv = csv.writer(open("ShapeReported_year_count.csv", "w"))
fcsv.writerow(["Year", "1D", "2D", "3D or Object", "Unknown"])
with open("ShapeReported_year_count.tsv","r", encoding = "ISO-8859-1") as f:
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