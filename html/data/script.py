import csv
from collections import defaultdict
import operator
import math
from math import floor
x=defaultdict(dict)
tempscale={'2005':0,'2006':1,'2007':2,'2008':3,'2009':4,'2010':5}
f1=open('output_data.csv','w')
f1.write('release,year,position,title,artist\n')
with open('input_data.csv','r') as f:
	reader=csv.DictReader(f)
	for i in reader:
		N1 = floor(275 * int(i['release'][4:6]) / 9)
		N2 = floor((int(i['release'][4:6]) + 9) / 12)
		N3 = (1 + floor((int(i['release'][0:4]) - 4 * floor(int(i['release'][0:4]) / 4) + 2) / 3))
		keyforRelease=365*(tempscale[str(int(i['release'])/10000)])+N1-(N2*N3) + int(i['release'][6:8]) -30
		#keyforRelease=int(i['release'])/10000
		#keyforRelease=int(str(int(i['release'])/10000)+"%03d"%(int(N1-(N2*N3) + int(i['release'][6:8]) -30)))
		#keyforRelease=int(i['release'])
		keyforRelease=(math.ceil(keyforRelease/15))

		if keyforRelease in x.keys() and keyforRelease in x[keyforRelease].keys():
			x[keyforRelease][keyforRelease].append([float(i['title']),i['position'],i['artist']])
		else:
			x[keyforRelease][keyforRelease]=[]
			x[keyforRelease][keyforRelease].append([float(i['title']),i['position'],i['artist']])
for i in x.keys():
	for j in x[i].keys():
		x[i][j].sort()
		for m in range(len(x[i][j])):
			x[i][j][m][1]=m		
		x[i][j].sort(key=operator.itemgetter(1), reverse=True)
		for m in range(len(x[i][j])):	
			f1.write(str(j)+','+str(i)+','+str(x[i][j][m][1])+','+str(x[i][j][m][0])+','+str(x[i][j][m][2])+'\n')
f1.close()
f.close()
