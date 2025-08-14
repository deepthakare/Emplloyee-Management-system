import { query } from '../db.js';

export async function getAllEmployees() {
  const { rows } = await query('SELECT * FROM employees ORDER BY id ASC');
  return rows;
}

export async function getEmployeeById(id) {
  const { rows } = await query('SELECT * FROM employees WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function createEmployee({ name, email, designation, salary, date_joined }) {
  const { rows } = await query(
    `INSERT INTO employees (name, email, designation, salary, date_joined)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, designation, salary, date_joined]
  );
  return rows[0];
}

export async function updateEmployee(id, { name, email, designation, salary, date_joined }) {
  const { rows } = await query(
    `UPDATE employees
     SET name = $1,
         email = $2,
         designation = $3,
         salary = $4,
         date_joined = $5
     WHERE id = $6
     RETURNING *`,
    [name, email, designation, salary, date_joined, id]
  );
  return rows[0] || null;
}

export async function deleteEmployee(id) {
  const { rowCount } = await query('DELETE FROM employees WHERE id = $1', [id]);
  return rowCount > 0;
}
