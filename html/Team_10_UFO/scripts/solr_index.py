#! /usr/bin/python

import json
import pysolr


def add_to_solr():
    solr = pysolr.Solr("http://localhost:8983/solr/bigdata1/", timeout=30)
    solr.delete(q='*:*')
    ufo = json.load(open("10_v2_sampled.json"))
    solr.add(ufo['ufo'])
    # print(ufo['ufo'])

add_to_solr()
