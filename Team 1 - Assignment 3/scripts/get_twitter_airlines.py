import os
import csv
import json
import codecs
from geopy.distance import great_circle
import operator


twitter_features_list = []

# with open('twitter-sentiment.csv', 'r') as csvfile:  # this will close the file automatically.
with codecs.open('twitter-sentiment.csv', "r", encoding='utf-8', errors='ignore') as csvfile:
    for i in range(0, 1):
        next(csvfile)

    file_reader = csv.reader(csvfile)

    # western[0], mountain[1], central[2], eastern[3], discard other
    western_twitter_info = []
    mountain_twitter_info = []
    central_twitter_info = []
    eastern_twitter_info = []

    western_total_airline_sentiment = 0;
    western_total_airline_sentiment_confidence = 0;
    western_total_num_entries = 0;
    western_airline_counter = {}

    mountain_total_airline_sentiment = 0;
    mountain_total_airline_sentiment_confidence = 0;
    mountain_total_num_entries = 0;
    mountain_airline_counter = {}

    central_total_airline_sentiment = 0;
    central_total_airline_sentiment_confidence = 0;
    central_total_num_entries = 0;
    central_airline_counter = {}

    eastern_total_airline_sentiment = 0;
    eastern_total_airline_sentiment_confidence = 0;
    eastern_total_num_entries = 0;
    eastern_airline_counter = {}

    #
    western_airline_counter["region"] = "Western"
    eastern_airline_counter["region"] = "Eastern"
    mountain_airline_counter["region"] = "Mountain"
    central_airline_counter["region"] = "Central"
    #

    for row in file_reader:

        try:
            timezone_of_tweet = row[14]
            airline_sentiment = row[1]
            airline_sentiment_confidence = float(row[2])
            airline_surveyed = row[5]
            airline_sentiment_score = 0

            if airline_sentiment == "positive":
                airline_sentiment_score = airline_sentiment_score + 1
            elif airline_sentiment == "negative":
                airline_sentiment_score = airline_sentiment_score - 1

            if timezone_of_tweet.startswith('Pacific'):
                western_total_airline_sentiment = western_total_airline_sentiment + airline_sentiment_score
                western_total_airline_sentiment_confidence = western_total_airline_sentiment_confidence + airline_sentiment_confidence
                western_total_num_entries = western_total_num_entries + 1

                if airline_surveyed in western_airline_counter:
                    western_airline_counter[airline_surveyed] = western_airline_counter[airline_surveyed] + 1
                else:
                    western_airline_counter[airline_surveyed] = 1
            elif timezone_of_tweet.startswith("Mountain"):
                mountain_total_airline_sentiment = mountain_total_airline_sentiment + airline_sentiment_score
                mountain_total_airline_sentiment_confidence = mountain_total_airline_sentiment_confidence + airline_sentiment_confidence
                mountain_total_num_entries = mountain_total_num_entries + 1

                if airline_surveyed in mountain_airline_counter:
                    mountain_airline_counter[airline_surveyed] = mountain_airline_counter[airline_surveyed] + 1
                else:
                    mountain_airline_counter[airline_surveyed] = 1
            elif timezone_of_tweet.startswith("Central"):
                central_total_airline_sentiment = central_total_airline_sentiment + airline_sentiment_score
                central_total_airline_sentiment_confidence = central_total_airline_sentiment_confidence + airline_sentiment_confidence
                central_total_num_entries = central_total_num_entries + 1

                if airline_surveyed in central_airline_counter:
                    central_airline_counter[airline_surveyed] = central_airline_counter[airline_surveyed] + 1
                else:
                    central_airline_counter[airline_surveyed] = 1
            elif timezone_of_tweet.startswith("Eastern"):
                eastern_total_airline_sentiment = eastern_total_airline_sentiment + airline_sentiment_score
                eastern_total_airline_sentiment_confidence = eastern_total_airline_sentiment_confidence + airline_sentiment_confidence
                eastern_total_num_entries = eastern_total_num_entries + 1

                if airline_surveyed in eastern_airline_counter:
                    eastern_airline_counter[airline_surveyed] = eastern_airline_counter[airline_surveyed] + 1
                else:
                    eastern_airline_counter[airline_surveyed] = 1
            else:
                continue

        except:
            pass



#    western_avg_airline_sentiment = western_total_airline_sentiment / western_total_num_entries
#    western_avg_airline_sentiment_confidence = western_total_airline_sentiment_confidence / western_total_num_entries
#    western_most_populous_airline = max(western_airline_counter.items(), key=operator.itemgetter(1))[0]
#
#    mountain_avg_airline_sentiment = mountain_total_airline_sentiment / mountain_total_num_entries
#    mountain_avg_airline_sentiment_confidence = mountain_total_airline_sentiment_confidence / mountain_total_num_entries
#    mountain_most_populous_airline = max(mountain_airline_counter.items(), key=operator.itemgetter(1))[0]
#
#    central_avg_airline_sentiment = central_total_airline_sentiment / central_total_num_entries
#    central_avg_airline_sentiment_confidence = central_total_airline_sentiment_confidence / central_total_num_entries
#    central_most_populous_airline = max(central_airline_counter.items(), key=operator.itemgetter(1))[0]
#
#    eastern_avg_airline_sentiment = eastern_total_airline_sentiment / eastern_total_num_entries
#    eastern_avg_airline_sentiment_confidence = eastern_total_airline_sentiment_confidence / eastern_total_num_entries
#    eastern_most_populous_airline = max(eastern_airline_counter.items(), key=operator.itemgetter(1))[0]
#
#    western_twitter_info.append(western_avg_airline_sentiment)
#    western_twitter_info.append(western_avg_airline_sentiment_confidence)
#    western_twitter_info.append(western_most_populous_airline)
#
#    mountain_twitter_info.append(mountain_avg_airline_sentiment)
#    mountain_twitter_info.append(mountain_avg_airline_sentiment_confidence)
#    mountain_twitter_info.append(mountain_most_populous_airline)
#
#    central_twitter_info.append(central_avg_airline_sentiment)
#    central_twitter_info.append(central_avg_airline_sentiment_confidence)
#    central_twitter_info.append(central_most_populous_airline)
#
#    eastern_twitter_info.append(eastern_avg_airline_sentiment)
#    eastern_twitter_info.append(eastern_avg_airline_sentiment_confidence)
#    eastern_twitter_info.append(eastern_most_populous_airline)
#
#    twitter_features_list.append(western_twitter_info)
#    twitter_features_list.append(mountain_twitter_info)
#    twitter_features_list.append(central_twitter_info)
#    twitter_features_list.append(eastern_twitter_info)


    twitter_features_list.append(western_airline_counter)
    twitter_features_list.append(mountain_airline_counter)
    twitter_features_list.append(central_airline_counter)
    twitter_features_list.append(eastern_airline_counter)


    #remove the file and rewrite it
    if os.path.exists('visualization_5.json'):
        os.remove('visualization_5.json')



    with open('visualization_5.json', 'w') as outfile:
        json.dump(twitter_features_list, outfile)