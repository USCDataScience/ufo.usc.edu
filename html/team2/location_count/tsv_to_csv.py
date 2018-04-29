import json
import csv


# tsv to json
data={}
count = 1
with open("location_aggregation_cloud.tsv","r", encoding = "ISO-8859-1") as f:
    for line in f:
       if count == 1:
           count = count + 1
           continue
       sp=line.split("\t")

       if len(sp) < 3:
           continue
       # print(len(sp))
       if not sp[1]:
           continue
       else:
           data.setdefault("data", []).append({"state": sp[1], "sightings": int(sp[2].strip())})


# extract only state and sightings from the JSON and convert it to csv
f = csv.writer(open("location_aggregation_cloud.csv", "w"))

f.writerow(["id", "value"])
for x in range(0,len(data["data"])):
    print(data["data"][x])
    f.writerow([data["data"][x]["state"],
                data["data"][x]["sightings"]])

