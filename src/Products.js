import db from "./connect.js";
export async function all_products(search = "", limit = 50, page = 1) {
  const offset = limit * (page - 1) ?? 0;
  const [results] = await db.query(
    "SELECT * FROM products WHERE product_name LIKE ? OR category LIKE ? LIMIT ? OFFSET ?;",
    [`%${search}%`, `%${search}%`, limit, offset]
  );
  const [count] = await db.query(
    "SELECT COUNT(*) as count FROM products WHERE product_name LIKE ? OR category LIKE ?;",
    [`%${search}%`, `%${search}%`]
  );
  const totalItems = count[0].count;
  const totalPages = Math.ceil(totalItems / 50);
  return { results, pagination: { totalItems, totalPages, limit } };
}

export async function stats() {
  const [totalProductsResult] = await db.query(
    "SELECT COUNT(*) as tp FROM products"
  );
  const [totalClientsResult] = await db.query(
    "SELECT COUNT(*) as tc FROM users"
  );
  const [totalCategoriesResult] = await db.query(
    "SELECT COUNT(DISTINCT category) as cat FROM products;"
  );
  const [totalSalesResult] = await db.query(
    "SELECT COUNT(order_id) as sl FROM orders WHERE order_status='completed';"
  );
  return {
    totalProducts: totalProductsResult[0].tp,
    totalClients: totalClientsResult[0].tc,
    totalCategories: totalCategoriesResult[0].cat,
    totalSales: totalSalesResult[0].sl,
  };
}

export async function top_products(limit, offset) {
  const [result] = await db.query(
    "SELECT * FROM products WHERE rating >= 4.5 ORDER BY rating DESC LIMIT ? OFFSET ?;",
    [limit, offset]
  );
  return result;
}

export async function product_info(id) {
  const [productResult] = await db.query(
    `SELECT 
      p.product_id,
      p.product_name,
      p.category,
      p.brand,
      p.price,
      p.rating
    FROM products p
    WHERE p.product_id = ?`,
    [id]
  );
  if (productResult.length === 0) {
    return [];
  }
  const product = productResult[0];

  const [ventesResult] = await db.query(
    `SELECT SUM(quantity) as nb_ventes
     FROM order_items
     WHERE product_id = ?`,
    [id]
  );
  product.nb_ventes = ventesResult[0].nb_ventes;

  const [consultationsResult] = await db.query(
    `SELECT COUNT(*) as nb_consultations
     FROM events
     WHERE product_id = ? AND event_type = 'view'`,
    [id]
  );
  product.nb_consultations = consultationsResult[0].nb_consultations;

  const [avisResult] = await db.query(
    `SELECT review_text, rating, review_date
     FROM reviews
     WHERE product_id = ?
     ORDER BY review_date DESC
     LIMIT 3`,
    [id]
  );
  product.derniers_avis = avisResult;

  return [product];
}

export async function popular_category() {
  const [result] = await db.query(
    "SELECT category,SUM(o.quantity) as q FROM products p JOIN order_items o ON p.product_id=o.product_id GROUP BY p.category ORDER BY q DESC;"
  );
  //category / quantity
  return result;
}
