d = {}
l = []
i=0
with open('meteore.txt','r') as f:
	for line in f:
		i+=1
		#extract into list
		l = line.strip().split('\t')
		#extract 1st 4 chars of l[0]->year
		l[0] = l[0][0:4]
		if l[0].isdigit():
			#print(l[0])
			#if year in dict, count++
			if int(l[0]) in d.keys():
				n = int(d[int(l[0])][0])+1
				d[int(l[0])][0] = str(n)
				#print(d)
			#else add count and prob
			else:
				if len(l)==2:
					#print('here',i,l[1])
					if not l[1].replace('.','',1).isdigit():
						l[1]=str(0)
					temp = [str(1),l[1]]
					d[int(l[0])]=temp
#sort dict
key_list = sorted(d)
print(d)
#write to file
f2 = open('meteore_data.tsv','w+')
f2.write('year'+'\t'+'unfo_count'+'\t'+'meteore_probability\n')
for k in key_list:
	f2.write(str(k)+'\t'+d[k][0]+'\t'+d[k][1]+'\n')
f2.close()