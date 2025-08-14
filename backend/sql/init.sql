-- Create database manually if needed: CREATE DATABASE ems;
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  designation VARCHAR(100) NOT NULL,
  salary NUMERIC(12,2) NOT NULL CHECK (salary >= 0),
  date_joined DATE NOT NULL
);

-- Optional demo rows
INSERT INTO employees (name, email, designation, salary, date_joined)
VALUES
  ('Asha Patil', 'asha.patil@example.com', 'Software Engineer', 650000, '2023-02-10'),
  ('Ravi Nair', 'ravi.nair@example.com', 'QA Analyst', 520000, '2022-11-05')
ON CONFLICT DO NOTHING;
