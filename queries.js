// queries.js
// MongoDB queries for Week 1 assignment
require('dotenv').config();

const { MongoClient } = require('mongodb');


const uri = process.env.uri;
async function run() {
      const client = new MongoClient(uri);
    
  try {
    await client.connect();
    const db = client.db("plp_bookstore"); 
    const books = db.collection("books");

    // 1. Find all books
    const allBooks = await books.find().toArray();
    console.log('\n All Books:', allBooks);

    // 2. Find books by George Orwell
    const orwellBooks = await books.find({ author: 'George Orwell' }).toArray();
    console.log('\n George Orwell Books:', orwellBooks);

    // 3. Find books published after 1950
    const modernBooks = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log('\n Books After 1950:', modernBooks);

    // 4. Find books in Fiction genre
    const fictionBooks = await books.find({ genre: 'Fiction' }).toArray();
    console.log('\n Fiction Books:', fictionBooks);

    // 5. Find in-stock books
    const inStockBooks = await books.find({ in_stock: true }).toArray();
    console.log('\n In-Stock Books:', inStockBooks);

  

  } finally {
    await client.close();
  }
}

run().catch(console.error);