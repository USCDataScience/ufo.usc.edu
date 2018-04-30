#!/usr/bin/python

from tika import parser
import json

# cut -f3 10_v2_with_ocr.tsv | cut -d ',' -f2 > states.txt - This command was used to generate the states.txt file

f = open("states.txt", "r+")
content = f.readlines()
f.close()

word_count = {line.strip('\n'): content.count(line) for line in content}

with open('state_data.json', 'w') as fp:
    json.dump(word_count, fp, sort_keys=True, indent=2)

#print(word_count)
# words = {word: content.count(word) for word in content}
# print(words)