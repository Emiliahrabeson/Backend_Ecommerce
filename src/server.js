import cors from "cors";
import { configDotenv } from "dotenv";
import express, { json } from "express";
import { all_products, product_info, search_product } from "./Products.js";
import { all_clients } from "./clients.js";

configDotenv();
const server = express();

server.use(json());
// server.use(cors());
server.use(
  cors({
    origin: "http://localhost:5173",
     credentials: true
  })
);
const PORT = process.env.PORT ?? 3000;

server.get("/api/allProducts", async (req, res) => {
  const { offset, limit } = req.query;

  const data = await all_products( parseInt(limit || 100),parseInt(offset || 0));
  console.log(data);
  return res.json(data);
  // return res.send();
});

server.get("/api/allClients", async (req, res) => {
  const { offset, limit } = req.query;

  const data = await all_clients(parseInt(offset), parseInt(limit));
  console.log(data);
  return res.json(data);
});

server.get("/api/searchProduct", async (req, res) => {
  const { search, limit, offset } = req.query;

  const data = await search_product(
    search,
    parseInt(limit || 10),
    parseInt(offset || 0)
  );

  return res.json(data);
});


server.get("/api/topProducts", async (req, res) => {
  const { offset, limit } = req.query;
  const data = await top_products(parseInt(offset), parseInt(limit));
  console.log(data);
  return res.json(data);
});

server.get("/api/productInfo", async (req, res) => {
  const { search } = req.query;

  const data = await product_info(search);
  console.log(data);

  return res.json(data);
});

server.get("/api/popularCategory", async (req, res) => {
  const { limit, offset } = req.query;
  const data = await popular_category(parseInt(limit, parseInt(offset)));
  console.log(data);

  return res.json(data);
});

server.listen(PORT, () => console.log("server is running..."));
