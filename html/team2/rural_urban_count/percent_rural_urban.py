import json

data = {}
count = 1

#Create JSON from TSV with calculated percentage of Urban population over Rural population corresponding to each year
with open("rural_vs_urban_year_count.tsv","r", encoding = "ISO-8859-1") as f:
    for line in f:
       if count == 1:
           count = count + 1
           continue
       sp=line.split("\t")

       if len(sp) < 3:
           continue
       # print(len(sp))
       percent = (float(sp[2].strip())*100)/(int(sp[1].strip())+int(sp[2].strip()))
       data.setdefault("Data", []).append({"Year": sp[0], "Percent": percent})


#print(data)
#print("\n")
#print(142/(926+142))


with open('data.json', 'w') as outfile:
    json.dump(data, outfile)