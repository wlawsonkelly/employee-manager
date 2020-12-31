INSERT INTO roles (id, title, salray, department_id) VALUES (1, "Sales Lead", 100.00, 1);
INSERT INTO roles (id, title, salray, department_id) VALUES (2, "Sales Person", 50.00, 1);
INSERT INTO roles (id, title, salray, department_id) VALUES (3, "Legal Head", 100.00, 2);
INSERT INTO roles (id, title, salray, department_id) VALUES (4, "Lawyer", 50.00, 2);
INSERT INTO roles (id, title, salray, department_id) VALUES (5, "CFO", 100.00, 3);
INSERT INTO roles (id, title, salray, department_id) VALUES (6, "Accountant", 50.00, 3);
INSERT INTO roles (id, title, salray, department_id) VALUES (7, "Lead Dev", 100.00, 4);
INSERT INTO roles (id, title, salray, department_id) VALUES (8, "Dev", 50.00, 4);

INSERT INTO departments (id, name) VALUES (1, "Sales");
INSERT INTO departments (id, name) VALUES (2, "Legal");
INSERT INTO departments (id, name) VALUES (3, "Finance");
INSERT INTO departments (id, name) VALUES (4, "Engineering");


INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Kim", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Steve", "Bannon", 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("James", "Smith", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Rick", "Bard", 4, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Bob", 5, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Will", "Read", 6, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Wilson", 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jen", "Carter", 8, 7);