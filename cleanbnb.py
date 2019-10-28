import pandas as pd

bnbs = pd.read_csv('listings.csv')

print(bnbs.columns)

bnbs = bnbs.drop([
	'host_id','host_name','neighbourhood','neighbourhood_group',
	'calculated_host_listings_count','number_of_reviews','last_review',
	'reviews_per_month','reviews_per_month'
], axis=1)

print(bnbs.head(10))

print(bnbs.max())
print(bnbs.min())

# bnbs.to_json('ls.json', orient='records')

