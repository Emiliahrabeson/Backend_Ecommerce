import db from "./connect.js";

export function all_clients(offset, limit) {
  const result = db.query("SELECT * FROM users LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);
  return result;
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
  /*
<tr>
    <th class='rank'>Rang</th>
    <th>Nom</th>
    <th>Email</th>
    <th>Ville</th>
    <th>Nb de Commandes</th>
    <th>Montant Total (€)</th>
</tr>"
*/
  return result;
}

export function popular_city() {
  const result = db.query(
    "SELECT city,COUNT(city) AS c FROM users GROUP BY users.city ORDER BY c DESC LIMIT 6"
  );
  return result;
}
