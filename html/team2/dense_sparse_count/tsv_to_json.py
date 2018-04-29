import json

dense={}
sparse={}
data = {}
count = 1

# Read Population_dense_sparse_count.tsv, and create two jsons Dense and Sparse
with open("Population_dense_sparse_year_count.tsv","r", encoding = "ISO-8859-1") as f:
    for line in f:
       if count == 1:
           count = count + 1
           continue
       sp=line.split("\t")

       if len(sp) < 3:
           continue
       # print(len(sp))
       dense.setdefault("Dense", []).append({"Year": sp[0], "Dense": int(sp[1].strip())})
       sparse.setdefault("Sparse", []).append({"Year": sp[0], "Sparse": int(sp[2].strip())})

data.setdefault("Data", []).append(dense)
data.setdefault("Data", []).append(sparse)

print(data)


with open('population.json', 'w') as outfile:
    json.dump(data, outfile)
