INSERT INTO departments (id, name) VALUES (1, "Sales");
INSERT INTO departments (id, name) VALUES (2, "Legal");
INSERT INTO departments (id, name) VALUES (3, "Finance");
INSERT INTO departments (id, name) VALUES (4, "Engineering");

INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("Kevin", "Kim", "Legal", 2, null, null);
INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("Mike", "Read", "Legal", 2, "Kevin Kim",1);
INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("John", "Doe", "Sales", 1, null, null);
INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("Sarah", "Washington", "Sales", 1, "John Doe", 3);
INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("Jessica", "Doe", "Finance", 3, null, null);
INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("Tim", "Kim", "Finance", 3, "Jessica Doe", 5);
INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("Lauren", "James", "Engineering", 4, null, null);
INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES ("Walter", "White", "Engineering", 4, "Lauren James", 7);