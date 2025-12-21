import cors from "cors";
import { configDotenv } from "dotenv";
import express, { json } from "express";
import {
  all_products,
  product_info,
  top_products,
  popular_category,
} from "./Products.js";
import { all_clients, popular_city } from "./clients.js";
import { stats } from "./Products.js";

configDotenv();
const server = express();

server.use(json());
// server.use(cors());
server.use(cors({ origin: "*" }));
const PORT = process.env.PORT ?? 3000;

server.get("/api/stats", async (req, res) => {
  const data_stat = await stats();
  // console.log(data_stat);
  return res.json(data_stat);
});

server.get("/api/allProducts", async (req, res) => {
  const { search, page, limit } = req.query;

  const data = await all_products(
    search?.trim(),
    parseInt(limit ?? 50),
    parseInt(page ?? 1)
  );
  // console.log(data);
  return res.json(data);
  // return res.send();
});

server.get("/api/allClients", async (req, res) => {
  const { search, page, limit } = req.query;

  const data = await all_clients(
    search?.trim(),
    parseInt(limit ?? 50),
    parseInt(page ?? 1)
  );
  // console.log(data);
  return res.json(data);
});

server.get("/api/topProducts", async (req, res) => {
  const { limit, offset } = req.query;
  const data = await top_products(parseInt(limit), parseInt(offset));
  // console.log(data);
  return res.json(data);
});

server.get("/api/productInfo/:id", async (req, res) => {
  const { id } = req.params;
  const data = await product_info(id);
  console.log(data);

  return res.json(data);
});

server.get("/api/popularCategory", async (req, res) => {
  const data = await popular_category();
  console.log(data);

  return res.json(data);
});

server.get("/api/popularCity", async (req, res) => {
  const { offset } = req.query;
  const data = await popular_city(parseInt(offset || 0));
  console.log(data);
  return res.json(data);
});

server.listen(PORT, () => console.log("server is running..."));
