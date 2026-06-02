d = [0 for x in range(12)]
with open('small_airport.tsv') as f:
	for line in f:
		dist = float(line.rstrip())
		print(dist)
		if dist < 1:
			d[0]+=1
		elif dist < 2:
			d[1]+=1
		elif dist < 3:
			d[2]+=1
		elif dist < 4:
			d[3]+=1
		elif dist < 5:
			d[4]+=1
		elif dist < 6:
			d[5]+=1
		elif dist < 7:
			d[6]+=1
		elif dist < 8:
			d[7]+=1
		elif dist < 9:
			d[8]+=1
		elif dist < 10:
			d[9]+=1
		elif dist < 100:
			d[10]+=1
		else:
			d[11]+=1
f2 = open('count.csv','w+')
f2.write('id,value\n')
for i in range(12):
	if i<=9:
		f2.write(str(i)+'-'+str(i+1)+' miles,'+str(d[i])+'\n')
	elif i==10:
		f2.write(str(10)+'-'+str(100)+' miles,'+str(d[i])+'\n')
	else:
		f2.write('>'+str(100)+' miles,'+str(d[i]))
f2.close()