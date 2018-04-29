
dict = {}
count = 1

# Generating TSV to TSV with Within 25 miles as Positive Value and Outside 25 miles as a negative value
with open("Within_25Miles_Otherwise_year_count.tsv","r", encoding = "ISO-8859-1") as f:
    for line in f:
       if count == 1:
           count = count + 1
           continue

       sp=line.split("\t")

       if len(sp) < 3:
           continue
       # print(len(sp))
       if(sp[2].strip() == '0'):
           dict[sp[0].strip()] = [sp[1].strip(), sp[2].strip()]
       else:
           dict[sp[0].strip()] = [sp[1].strip(), "-"+sp[2].strip()]


ftsv = open("data.tsv", "w")
ftsv.write("name\tvalue\n")
for key in dict.keys():
    ftsv.write(key.strip() + "\t" + dict[key][0].strip() + "\n")
    ftsv.write(key.strip() + "\t" + dict[key][1].strip() + "\n")

ftsv.close()