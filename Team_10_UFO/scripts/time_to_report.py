import datetime

# cut -f1 -f2 10_v2_with_ocr.tsv > reported_sighted_date.txt - This command was used to generate the reported_sighted_date.txt

day_count = {}

def add_to_dict(key):
    if key in day_count:
        day_count[key] += 1
    else:
        day_count[key] = 1

with open("reported_sighted_date.txt","r") as fp:
    lines = fp.readlines()

for dates in lines:
    dates = dates.strip('\n')
    with open("days_taken_to_report.txt","a+") as f:
        try:
            reported_date = datetime.datetime.strptime(dates.split('\t')[0], '%Y%m%d')
            sighted_date = datetime.datetime.strptime(dates.split('\t')[1], '%Y%m%d')
            diff = sighted_date - reported_date
            if diff.days >= 1 or diff.days < 0 :
                f.write(str(diff.days) + '\n')
            else:
                f.write (str(0) + '\n')
        except ValueError:
            f.write(str(-1) + '\n')

with open("days_taken_to_report.txt","r") as f1:
    lines = f1.readlines()

#day_count = {}
for line in lines:
    line = int(line.strip('\n'))
    if line == 0:
        add_to_dict("< 1 day")
    elif line == 1:
        add_to_dict("1 day")
    elif line < 0:
        add_to_dict("inconsistent")
    elif line > 1 and line < 5:
        add_to_dict("< 5 days")
    elif line >= 5 and line < 10:
        add_to_dict("10 days")
    elif line >= 10 and line < 15:
        add_to_dict("in 2 weeks")
    elif line >= 15 and line < 30:
        add_to_dict("< 1 month")
    elif line >= 30 and line < 60:
        add_to_dict("< 2 months")
    elif line >= 60 and line < 90:
        add_to_dict("< 3 months")
    elif line >= 90 and line < 180:
        add_to_dict("< 6 months")
    elif line >= 180 and line < 366:
        add_to_dict("< 1 year")
    elif line >= 366 and line < 732:
        add_to_dict("< 2 years")
    elif line >= 732 and line < 1827:
        add_to_dict("< 5 years")
    elif line >= 1827 and line < 3652:
        add_to_dict("< 10 years")
    else:
        add_to_dict("> 10 years")
print (day_count)


