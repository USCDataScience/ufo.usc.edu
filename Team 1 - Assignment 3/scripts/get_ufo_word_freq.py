import os
import csv
import json
import codecs
import string
from operator import itemgetter


with codecs.open('object-caption-img.csv', "r", encoding='utf-8', errors='ignore') as csvfile:
    for i in range(0, 1):
        next(csvfile)

    file_reader = csv.reader(csvfile)
    table = str.maketrans({key: None for key in string.punctuation})

    temp_dict = {}
    frequency_list = []

    for row in file_reader:
        for item in row:
            try:
                item = item.translate(table)
                for word in item.split():

                    if word in temp_dict:
                        temp_dict[word] = temp_dict[word] + 1
                    else:
                        temp_dict[word] = 1

                    print(word)
            except Exception as e:
                err = str(e)
                print(err)
                pass


    for key in temp_dict:
        new_dict = {}
        new_dict["word"] = key
        new_dict["frequency"] = temp_dict[key]

        if temp_dict[key] > 1000:
            new_dict["category"] = "heavy"
        elif temp_dict[key] > 500:
            new_dict["category"] = "medium"
        else:
            new_dict["category"] = "light"


        frequency_list.append(new_dict)

    print(frequency_list)

    frequency_list = sorted(frequency_list, key=itemgetter("frequency"), reverse=True)

    frequency_list = frequency_list[:50]

    print(frequency_list)


    if os.path.exists('visualization_9.json'):
        os.remove('visualization_9.json')

    with open('visualization_9.json', 'w') as outfile:
        json.dump(frequency_list, outfile)