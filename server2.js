const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const SECRET = "secretkey";


let users = [{ email: "admin@gmail.com", password: "1234", role: "admin" }];
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 }
];
let cart = [];


app.post("/login", (req, res) => {
  const user = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );
  if (!user) return res.send("Invalid Login");

  const token = jwt.sign(user, SECRET);
  res.json({ token });
});


function auth(req, res, next) {
  try {
    jwt.verify(req.headers.authorization, SECRET);
    next();
  } catch {
    res.send("Unauthorized");
  }
}


app.get("/products", (req, res) => {
  res.json(products);
});


app.post("/add-product", auth, (req, res) => {
  products.push(req.body);
  res.send("Product Added");
});


app.post("/cart", (req, res) => {
  cart.push(req.body);
  res.send("Added to cart");
});


app.get("/checkout", (req, res) => {
  cart = [];
  res.send("Checkout Successful");
});

app.listen(3000, () =>
  console.log("Server running 👉 http://localhost:3000")
);