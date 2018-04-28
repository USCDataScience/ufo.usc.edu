import datetime

# cut -f2 10_v2_with_ocr.tsv > reported_dates.txt - This command was used to generate the reported_dates.txt file

with open("reported_dates.txt","r") as fp:
    lines = fp.readlines()

word_count = {line.strip('\n'): lines.count(line) for line in lines}
#print(word_count)

for date in lines:
    with open("formatted_reported_dates.tsv","a+") as f:
        f.write(datetime.datetime.strptime(date.strip('\n'), '%Y%m%d').strftime('%d-%b-%y'))
        f.write('\t')
        f.write(str(word_count[date.strip('\n')]))
        f.write('\n')