// server.js

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route to test connectivity
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Sample data for invoices and products
const invoices = [
  { 
    id: 1, 
    storeName: "Store A", 
    orderId: "1001", 
    date: "2025-03-07", 
    quantity: 2, 
    dealPrice: 50, 
    totalWithoutTax: 100, 
    totalWithTax: 110 
  },
];

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

// API endpoint for invoices
app.get("/api/invoices", (req, res) => {
  res.json(invoices);
});

// API endpoint for products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
