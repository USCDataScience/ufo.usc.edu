import json
import os

region_list = []

with open('VAFacilityLocation.json') as f:
    data = json.load(f)
    region_dict = {}

    for entry in data["VAFacilityData"]:
        try:

            region = entry['region']

            # put ufo_year into map
            if region in region_dict:
                region_dict[region] = region_dict[region] + 1
            else:
                region_dict[region] = 1


        except Exception as e:
            err = str(e)
            print(err)
            pass


    for key in region_dict:

        new_dict = {}
        new_dict["region"] = key
        new_dict["amount"] = region_dict[key]
        print(new_dict)
        region_list.append(new_dict)

print(region_list)

# remove the file and rewrite it
if os.path.exists('visualization_3.json'):
    os.remove('visualization_3.json')

with open('visualization_3.json', 'w') as outfile:
    json.dump(region_list, outfile)



