d = [0 for x in range(12)]
with open('small_movie.csv') as f:
	for line in f:
		rate = float(line.rstrip())
		print(rate)
		if rate == 0:
			d[0]+=1
		elif rate < 6:
			d[1]+=1
		elif rate < 7:
			d[2]+=1
		elif rate >=7:
			d[3]+=1
f2 = open('movie_count.csv','w+')
f2.write('id,rate\n')
for i in range(4):
	if i==0:
		f2.write('no movie,'+str(d[i])+'\n')
	elif i==1:
		f2.write('average rated,'+str(d[i])+'\n')
	elif i==2:
		f2.write('above average rated,'+str(d[i])+'\n')
	elif i==3:
		f2.write('high rated,'+str(d[i]))
f2.close()
	