import csv

headers = []
countList = []
count = 1

#Create total count for all 4 types : Man, Female, Adult, Kid
with open("ReportedBy_Male_Female_Adult_kid_year_count.tsv","r", encoding = "ISO-8859-1") as f:
    for line in f:
       if count == 1:
           sp = line.split("\t")
           for i in range(1,len(sp)):
               headers.append(sp[i].strip())
           count = count + 1
           continue

       sp=line.split("\t")

       if len(sp) < 3:
           continue
       # print(len(sp))
       if not countList:
           for i in range(1, len(sp)):
               countList.append(int(sp[i].strip()))
       else:
           for i in range(1, len(sp)):
               countList[i] = countList[i] + int(sp[i].strip())


fcsv = csv.writer(open("ReportedBy_Male_Female_Adult_kid_year_count_total.csv", "w"))
fcsv.writerow(["Type", "Count"])
for i in range(len(headers)):
    fcsv.writerow([headers[i], countList[i]])