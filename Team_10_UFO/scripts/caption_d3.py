#!/usr/bin/python

from tika import parser
import nltk
from nltk import word_tokenize

f = open("desc_object.txt", "r+")
content = f.readlines()
# lis = word_tokenize(content)
f.close()

word_count = {line: content.count(line) for line in content}

with open("desc_object_op.txt","w+") as f:
    f.write(str(word_count))
# print(word_count)
# print(json.dump(word_count))
# words = {word: content.count(word) for word in content}
# print(words)
