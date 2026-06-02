from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

wordnet_lemmatizer = WordNetLemmatizer()

all_stopwords = set(stopwords.words("english"))
word_frequency = {}

captions_list = open("captions.txt", "r").read().split("\n")

for sentence in captions_list:
    word_list = sentence.split(" ")
    for word in word_list:
        lemma = wordnet_lemmatizer.lemmatize(word)
        if lemma not in all_stopwords and word != "":
            if lemma in word_frequency:
                word_frequency[lemma] += 1
            else:
                word_frequency[lemma] = 1

list_of_dicts = []

for key in word_frequency.keys():
    if word_frequency[key] > 5:
        temp_dict = {}
        temp_dict["text"] = key.encode("utf-8")
        temp_dict["size"] = word_frequency[key]
        list_of_dicts.append(temp_dict)

print list_of_dicts
print len(list_of_dicts)