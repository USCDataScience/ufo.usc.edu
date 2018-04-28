import random

def random_sampler(filename1, filename2, k):
	#sam = []
	wf = open(filename2,'w+')
	with open(filename1, 'rb') as f:
		f.seek(0, 2)
		filesize = f.tell()

		random_set = sorted(random.sample(range(filesize), k))

		for i in range(k):
			f.seek(random_set[i])
			# Skip current line (because we might be in the middle of a line) 
			f.readline()
			# Append the next line to the sample set
			l = (f.readline().rstrip()).decode("utf-8").split('\t')
			if l[0]=='nan' or (l[0].isdigit() and int(l[0])==0):
				print('write')
				wf.write(str(0)+'\n')
			elif l[0].isdigit() and int(l[0])<5:				
				wf.write(l[1]+'\n')
	
random_sampler('movie.txt','small_movie1.csv',1650)	