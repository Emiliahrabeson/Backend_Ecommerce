import db from "./connect.js";

export function all_products(limit, offset) {
  const result = db.query("SELECT * FROM products LIMIT ? OFFSET ?;", [
    limit || 10,
    offset || 0,
  ]);
  return result;
}

export function search_product(search, limit, offset) {
  const result = db.query(
    "SELECT * FROM products WHERE product_name LIKE ? LIMIT ? OFFSET ?;",
    [`%${search}%`, limit, offset]
  );
  return result;
}

export function top_products(limit, offset) {
  const result = db.query(
    "SELECT * FROM products WHERE rating >= 4.5 ORDER BY rating DESC LIMIT ? OFFSET ?;",
    [limit, offset]
  );
  return result;
}

export function product_info(search) {
  const result = db.query(
    "SELECT p.product_id,p.product_name,p.category,p.brand,p.price,p.rating FROM products p WHERE p.product_name LIKE ? LIMIT 50;",
    [`%${search}%`]
  );
  return result;
}

export function popular_category(offset, limit) {
  const result = db.query(
    "SELECT category,SUM(o.quantity) as q FROM products p JOIN order_items o ON p.product_id=o.product_id GROUP BY p.category ORDER BY q DESC LIMIT ? OFFSET ?;",
    [limit, offset]
  );
  //category / quantity
  return result;
}

export function search_for_category(search) {
  const result = db.query("SELECT * FROM products WHERE category LIKE ?", [
    search,
  ]);
  return result;
}
