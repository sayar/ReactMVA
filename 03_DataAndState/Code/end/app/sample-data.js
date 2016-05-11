module.exports = {
  "stores": {
    "Joe's Pizza on Bloor Ave": {
      "orders": [
        {
          "human": "Rami Sayar",
          "time": new Date(2016, 4, 5, 15, 11, 45, 0),
          "pizzas": [{
            "toppings": "Meat-Lovers",
            "size": "S"
          }],
          "price": 15,
          "address": "321 Sesame Street, Montreal, Canada",
          "status": "In The Oven" // status := Open -> Confirmed -> In The Oven -> Delivered
        },
        {
          "human": "Jeremy Foster",
          "time": new Date(2016, 4, 4, 20, 31, 0, 0),
          "pizzas": [{
            "toppings": ["cheese"],
            "size": "XL"
          }],
          "price": 15,
          "address": "123 Sesame Street, Montreal, Canada",
          "status": "Delivered" // status := Open -> Confirmed -> In The Oven -> Delivered
        }
      ]
    },
    "Joe's Pizza on University Ave": {
      "orders": []
    }
  },
  "humans": {
    "Rami Sayar" : {
      "conversations": [
        {
          "who": "bot",
          "text": "Hello, can I take your order?",
          "time": new Date(2016, 4, 5, 15, 10, 0, 0)
        },
        {
          "who": "human",
          "text": "Can I have a small meat-lovers pizza?",
          "time": new Date(2016, 4, 5, 15, 10, 30, 0)
        }, 
        {
          "who": "bot",
          "text": "Where would you like it delivered?",
          "time": new Date(2016, 4, 5, 15, 11, 0, 0)
        },
        {
          "who": "human",
          "text": "123 Sesame Street, Montreal, Canada",
          "time": new Date(2016, 4, 5, 15, 11, 30, 0)
        },
      ],
      "orders": [
        {
          "time": new Date(2016, 4, 5, 15, 11, 45, 0),
          "pizzas": [{
            "toppings": ["Meat-Lovers"],
            "size": "S"
          }],
          "price": 15,
          "address": "321 Sesame Street, Montreal, Canada",
          "status": "Confirmed" // status := Open -> Confirmed -> In The Oven -> Delivered
        }
      ]
    },
    "Jeremy Foster" : {
      "conversations": [
        {
          "who": "bot",
          "text": "Hello, can I take your order?",
          "time": new Date(2016, 4, 4, 20, 30, 0, 0)
        },
        {
          "who": "human",
          "text": "I would like to order an extra-large cheese pizza",
          "time": new Date(2016, 4, 4, 20, 30, 15, 0)
        }, 
        {
          "who": "bot",
          "text": "Where would you like it delivered?",
          "time": new Date(2016, 4, 4, 20, 30, 30, 0)
        },
        {
          "who": "human",
          "text": "123 Sesame Street, Montreal, Canada",
          "time": new Date(2016, 4, 4, 20, 30, 45, 0)
        },
      ],
      "orders": [
        {
          "time": new Date(2016, 4, 4, 20, 31, 0, 0),
          "pizzas": [{
            "toppings": ["cheese"],
            "size": "XL"
          }],
          "price": 15,
          "address": "123 Sesame Street, Montreal, Canada",
          "status": "Delivered" // status := Open -> Confirmed -> In The Oven -> Delivered
        }
      ]
    }
  }
};
