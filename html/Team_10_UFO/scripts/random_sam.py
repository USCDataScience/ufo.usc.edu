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
			wf.write((f.readline().rstrip()).decode("utf-8")+'\n')
	
random_sampler('airport.txt','small_airport.csv',220)	