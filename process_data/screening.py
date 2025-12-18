import csv
import os
import pandas as pd
import json

data_name = [
    "data/higashi.csv",
    "data/nishi.csv",
    "data/kosen.csv"
]

output_file = "data/schools2.json"
schools = {"D1(高校)": {}, "D2(中等)": {}, "G1(高専)": {}}

# if os.path.exists(output_file):
#     # Load existing JSON file
#     with open(output_file, "r", encoding="utf-8") as f:
#         schools = json.load(f)
# else:
#     # Create a new JSON file
#     schools = {"high": {}, "technical": {}}

for file_index, input_file in enumerate(data_name):
    # Check if the file exists
    if not os.path.exists(input_file):
        print(f"File {input_file} does not exist.")
        continue

    # Read the CSV file
    df = pd.read_csv(input_file, encoding='utf-8', header=None)

    for index, row in df.iterrows():
        if index == 0:
            continue
        else:
            # 北海道、東京都、京都府、大阪府
            # 01(北海道)
            ken_mei = row[2].split('(')[1].replace(')', '')
            if ken_mei == "東京":
                ken_mei = ken_mei + "都"
            elif ken_mei == "京都" and ken_mei == "大阪":
                ken_mei = ken_mei + "府"
            elif ken_mei != "北海道":
                ken_mei = ken_mei + "県"

            # G1(高専), D1(高校), D2(中等)
            target = row[1]
            if target != "G1(高専)" and target != "D1(高校)" and target != "D2(中等)":
                continue

        if index % 250 == 0:
            print(f"Processing row {index} in {input_file}")

        if ken_mei not in schools[target]:
            schools[target][ken_mei] = []

        if row[1] == target:
            line_data = {
                "name": row[5],
                "code": row[0]
            }
            schools[target][ken_mei].append(line_data)

    # Save the updated data to the JSON file
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(schools, f, ensure_ascii=False, indent=4)

