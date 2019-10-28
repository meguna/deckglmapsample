import pandas as pd

trees = pd.read_csv('Trees.csv')

trees.to_json('temp.json', orient='records')

