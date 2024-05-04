DROP DATABASE IF EXISTS business;
CREATE DATABASE business;

\c business;

CREATE TABLE department (
id SERIAL PRIMARY KEY,
name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
id SERIAL PRIMARY KEY,
title VARCHAR(30) UNIQUE NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL,
FOREIGN KEY (department_id) 
REFERENCES department(id)
ON DELETE CASCADE --bc if the 'DEPT' disappears the the 'role' does not exist
);

CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER,
FOREIGN KEY (role_id)
REFERENCES role(id)
ON DELETE SET NULL, --bc if 'role' disappears, the 'employee' can possible change to a diff role based on their experience?
FOREIGN KEY (manager_id)
REFERENCES employee(id)
ON DELETE SET NULL --bc if 'manager' disappers, the 'employee' that was once a manager can take on  a diff role in the company?
);
