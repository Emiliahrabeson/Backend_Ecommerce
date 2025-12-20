## We can use this database for:
- Machine Learning & Deep Learning
- Recommender Systems
- Customer Segmentation
- Sales Forecasting
- A/B Testing
- E-commerce Behaviour Analysis
- Data Cleaning / Feature Engineering Practice
- SQL practice


# Dataset Contents
countains 6 csv files
```
File    Rows    Description
users.csv    ~10,000 User profiles, demographics & signup info
products.csv    ~2,000  Product catalog with rating and pricing
orders.csv    ~20,000 Order-level transactions
order_items.csv    ~60,000 Items purchased per order
reviews.csv    ~15,000 Customer-written product reviews
events.csv    ~80,000 User event logs: view, cart, wishlist, purchase

```

# Data Dictionary
```
1. Users (users.csv)
Column    Description
user_id    Unique user identifier
name    Full customer name
email    Email (synthetic, no real emails)
gender    Male / Female / Other
city    City of residence
signup_date    Account creation date
```
 
```
2. Products (products.csv)
Column    Description
product_id    Unique product identifier
product_name    Product title
category    Electronics, Clothing, Beauty, Home, Sports, etc.
price    Actual selling price
rating    Average product rating

```

```
3. Orders (orders.csv)
Column    Description
order_id    Unique order identifier
user_id    User who placed the order
order_date    Timestamp of the order
order_status    Completed / Cancelled / Returned
total_amount    Total order value

```

```
4. Order Items (order_items.csv)
Column    Description
order_item_id    Unique identifier
order_id    Associated order
product_id    Purchased product
quantity    Quantity purchased
item_price    Price per unit

```


```
5. Reviews (reviews.csv)
Column    Description
review_id    Unique review identifier
user_id    User who submitted review
product_id    Reviewed product
rating    1–5 star rating
review_text    Short synthetic review
review_date    Submission date

```


```
6. Events (events.csv)
Column    Description
event_id    Unique event identifier
user_id    User performing event
product_id    Viewed/added/purchased product
event_type    view/cart/wishlist/purchase
event_timestamp    Timestamp of event

```

## users:
Contains synthetic customer profiles, demographics, and signup data.

## products
Includes product catalog details such as categories, prices, and ratings.

## orders:
Holds order-level transaction records, including dates, status, and total value.
Tous les articles de commandes avec le prix total

## order_item:
Stores line-item details for each order (product, quantity, price).
details de chaque articles de commande

## review:
Contains customer-generated product reviews with ratings and timestamps.

## events:
Enregistre les interactions détaillées des utilisateurs, telles que les consultations de produits, les ajouts au panier, les événements de la liste de souhaits et les achats.


consultent des produits (events)
ajoutent au panier (events)
passent des commandes (orders)
achètent des produits (order_items)
laissent des avis (reviews)

https://www.kaggle.com/datasets/abhayayare/e-commerce-dataset
