import csv
from time import sleep
from collections import defaultdict
from geopy.distance import vincenty
import pickle

from pymongo import MongoClient


#store the lat and long coordinates of all the 60k+ locations in a tsv to index into ES
tsv_file_input = open("ufo_awesome_FINAL_OUTPUT_v2.tsv",'r')
reader = csv.reader(tsv_file_input, delimiter = '\t')
tsv_file_output = open("location_with_coordinates.tsv",'w')

# this DB contains all the unique location strings and the corresponding longitude and latitudes which was saved during assignment 1
db = MongoClient().ufo.cities
tsv_file_output.write("location\tlongitude\tlatitude\n")
count=0
for row in reader:
    count=count+1
    if count==1:
        continue
    try:
        location = row[2]
        longitude = db.find_one({"location":location})["longitude"]
        latitude = db.find_one({"location":location})["latitude"]
        tsv_file_output.write(location+"\t"+str(longitude)+"\t"+str(latitude)+"\n")
    except:
        tsv_file_output.write("\n")