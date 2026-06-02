from os import listdir

with open("optionsList.html","w") as outF:
	fileList = [f for f in listdir("linkfiles")]
	for file in fileList:
		filename = file[:-4]
		outF.write("<option value=\""+filename+"\">Year: "+filename[0:4]+", Month: "+filename[4:]+"</option>\n")
