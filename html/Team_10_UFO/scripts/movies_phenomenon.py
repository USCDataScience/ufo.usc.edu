#!/usr/bin/python

f = open("MA.txt", "r+")
content = f.readlines()
f.close()

mpdict = {}

for line in content:
    line = line.strip("\n")
    lst = line.split(", ")
    # print(lst)

    # count of movies
    movie_count = lst[0]
    if movie_count in mpdict:
        phen_dict = mpdict[movie_count]
        # phen here is a dictonary
        if phen_dict and lst[1] in phen_dict:
            phen_dict[lst[1]] += 1
        else:
            if lst[1] not in phen_dict:
                phen_dict[lst[1]] = 1

            if not phen_dict:
                phen_dict = {'cigar': 1, 'triangle': 1, 'light':1, 'diamond': 1, 'disk': 1, 'circle': 1, 'oval': 1, 'flash': 1, 'sphere': 1}

    else:
        # phen_dict = {'flying_saucers': 1, 'alien_abduction': 1, 'extraterrestrials':1}
        phen_dict = {'cigar': 1, 'triangle': 1, 'light': 1, 'diamond': 1, 'disk': 1, 'circle': 1, 'oval': 1, 'flash': 1,
                     'sphere': 1}
        mpdict[movie_count] = phen_dict

print(mpdict)