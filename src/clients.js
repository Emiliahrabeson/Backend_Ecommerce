import db from "./connect.js";

// export function all_clients() {
//   const result = db.query("SELECT * FROM users LIMIT 100");
//   return result;
// }

export async function all_clients(search = "", limit = 50, page = 1) {
  const offset = limit * (page - 1) ?? 0;
  console.log("offset : ", offset);
  const [results] = await db.query(
    "SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?;",
    [`%${search}%`, limit, offset]
  );
  const [count] = await db.query(
    "SELECT COUNT(*) as count FROM users WHERE name LIKE ?;",
    [`%${search}%`]
  );
  const totalItems = count[0].count;
  const totalPages = Math.ceil(totalItems / 50);
  return { results, pagination: { totalItems, totalPages, limit } };
}

export function search_client(search, offset, limit) {
  const result = db.query(
    "SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?",
    [search, limit, offset]
  );
  return result;
}

export function top_client() {
  const result = db.query(
    "SELECT u.user_id,u.name,u.email,u.city,COUNT(o.order_id) AS nb_commandes,COALESCE(SUM(o.total_amount), 0) AS montant_total FROM users u INNER JOIN orders o ON u.user_id = o.user_id WHERE o.order_status = 'Completed' GROUP BY u.user_id, u.name, u.email, u.city ORDER BY nb_commandes DESC, montant_total DESC LIMIT 10"
  );

  return result;
}

export async function popular_city(offset) {
  const [result] = await db.query(
    "SELECT city,COUNT(city) AS c FROM users GROUP BY users.city ORDER BY c DESC LIMIT 6;"
  );
  return result;
}
