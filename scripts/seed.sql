-- CATEGORIES
insert into categories (name, merchants) values
  ('Food Delivery', ARRAY['Swiggy', 'Zomato', 'Magicpin']),
  ('Grocery', ARRAY['Blinkit', 'Zepto', 'Swiggy Instamart', 'BigBasket', 'DMart']),
  ('Shopping', ARRAY['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Nykaa', 'Meesho']),
  ('Flights', ARRAY['MakeMyTrip', 'Goibibo', 'EaseMyTrip', 'Cleartrip', 'IRCTC', 'IndiGo', 'Air India']),
  ('Hotels', ARRAY['MakeMyTrip', 'Goibibo', 'OYO', 'Treebo', 'Airbnb']),
  ('Movies', ARRAY['BookMyShow', 'Paytm Movies']),
  ('Utility', ARRAY['Electricity', 'Water', 'Gas', 'Broadband']),
  ('Fuel', ARRAY['HPCL', 'BPCL', 'Indian Oil', 'Shell']),
  ('Recharge', ARRAY['Airtel', 'Jio', 'Vi', 'BSNL']),
  ('Other', ARRAY[]::text[]);

-- CARDS
insert into cards (card_id, bank, name, variant, point_value, annual_fee, benefits, last_verified)
values

-- 1. Amazon Pay ICICI
(
  uuid_generate_v4(),
  'ICICI',
  'Amazon Pay ICICI',
  'cashback',
  null,
  0,
  '{
    "Shopping": [
      {
        "me        "me        "me        "benefit_type":         "me        "me        "me        "be            "me        "me        "me        "benefit_type": : "5% for Amazon Prime members"
      },
      {
        "merchants": [],
        "benefit_type": "cashback",
        "benefit_value": 2,
        "max_cap": null,
                                                                                                     ],
    "Food Delivery": [
      {
        "merchants": ["Swiggy", "Zomato"],
        "benefit_type": "cashback",
        "benefit_value": 2,
        "max_cap": null,
        "min_txn": null,
        "notes": "Amazon Pay partner merchants"
      }
    ],
    "Grocery": [
      {
        "merchants": ["Amazon"],
        "benefit_type": "cashback",
        "benefit_value": 5,
        "max_cap": null,
        "min_txn": null,
        "notes": "5% for Amazon Prime members on Amazon Fresh"
      }
    ],
    "Other": [
      {
        "merchants": [],
        "benefit_typ        "bene",
        "benefit_value": 1,
        "max_cap": null,
        "min_txn": null,
        "notes": "1% on all other spends"
      }
    ]
  }',
  current_date
),

-- 2. HDFC Swiggy Orange
(
  uuid_generate_v4(),
  'HDFC',
  'HDFC Swiggy Orange',
  'cashback',
  null,
  500,
  '{
    "Food Delivery": [
      {
        "merchants": ["Swiggy"],
        "benefit_type": "cashback",
        "benefit_value": 10,
        "max_cap": 1500,
        "min_txn": null,
        "notes"       cashback on Swiggy app — food, Instamart, Dineout"
      }
    ],
    "Grocery": [
      {
        "merchants": ["Swiggy Instamart"],
        "benefit_type": "cashback",
        "benefit_value": 10,
        "max    ": 1500,
        "min_txn": null,
        "notes": "Shared cap of ₹1500/month across all   iggy spends"
      }
                    [
      {      {   merchants": [],      {      {   merchants": [],      {      {   meit_value": 1          "max_cap": null,
        "min_txn": null,
        "notes": "1% on all other spends"
            ]
  }',
  current_date
),

-- 3. Airtel Axis
(
uuid_generate_v4(),
  'Axis',
  'Airtel Axis',
  'cashback',
  null,
  500,
  '{
    "Recharge": [
      {
        "merchants": ["Airtel"],
        "benefit_type": "cashback",
        "benefit_value": 25,
        "max_cap": null,
        "min_txn": null,
        "notes": "25% cashback on Airtel app — recharge, broadband, DTH"
      }
    ],
    "Food Delivery": [
      {
        "merchants": ["Swiggy", "Zomato"],
        "benefit_type": "cashback",
        "benefit_value": 10,
        "max_cap": 500,
        "min_txn": null,
        "notes": "10% cashback on Swiggy and Zomato"
      }
    ],
    "Grocery": [
      {
        "merchants": ["Blinkit", "BigBasket"],
        "benefit_type": "cashback",
        "benefit_value": 10,
        "max_cap": 500,
        "min_txn": null,
        "notes": "10% cashback on Blinkit and BigBasket"
      }
    ],
    "Utility": [
      {
        "merchants": [],
        "benefit_type": "cashback",
        "benefit_value": 10,
        "max_cap": null,
        "min_txn": null,
        "notes": "10% on utility bill payments via Airtel app"
      }
    ],
             [
      {
                      ],
        "benef        "benef        "benef    enef        "benef        "max_ca        "benef    "min_tx        "benef    "notes": "2% on all other spends"
      }
    ]
  }',
  current_date
);
