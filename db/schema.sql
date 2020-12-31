CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
	id INTEGER,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
	id INTEGER,
    title VARCHAR(30),
    salray DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
	id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
);
