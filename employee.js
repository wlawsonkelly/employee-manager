const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

let managerArray = [{
  name: "",
  id: 0
}];

const newEmployee = {
  id: 0,
  firstNmae: "",
  lastName: "",
  role: "",
  roleID: 0,
  managerName: "",
  managerID: 0
}

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager"
      ]
    })
    .then(function(response) {
      switch (response.start) {
        case "View all employees":
          return viewEmplpyees();
        case "View all employees by department":
          return viewEmplpyeesByDepartment();
        case "View all employees by manager":
          return viewEmplpyeesByManager();
        case "Add employee":
          return addEmployee();
        case "Remove employee":
          return removeEmployee();
        case "Update employee role":
          return updateEmployeeRole();
        case "Update employee manager":
          return updateEmployeeManager();
      }
    });
}

function viewEmplpyees() {
  connection.query("SELECT * FROM employees ORDER BY id ASC", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function viewEmplpyeesByDepartment() {
  inquirer
  .prompt({
    name: "department",
    type: "list",
    message: "Which Department?",
    choices: [
      "Sales",
      "Legal",
      "Finance",
      "Engineering"
    ]
  }).then(function(response){
    queryRole(response.department);
  });
}
function viewEmplpyeesByManager() {
  connection.query("SELECT * FROM employees WHERE manager_id IS NOT NULL ORDER BY id ASC", function(err, res) {
    if (err) throw err; 
    for (var i = 0; i < res.length; i++) {
      managerArray.push({name: res[i].manager_name, id: res[i].manager_id})
    }
  inquirer
  .prompt({
    name: "manager",
    type: "list",
    message: "Which Manager?",
    choices:  managerArray.map(function(obj){
      return obj.name
    })
  }).then(function(response){
    queryManager(response.manager);
  });
});

}
function addEmployee() {
  managerArray = [];
  inquirer
  .prompt([
  {
    name: "firstName",
    type: "input",
    message: "What is the employees first name?",
  },
  {
    name: "lastName",
    type: "input",
    message: "What is the employees last name?",
  },
  {
    name: "role",
    type: "list",
    message: "What is the employees role?",
    choices: [
      "Sales",
      "Legal",
      "Finance",
      "Engineering"
    ]
  }
]).then(function(response){
  newEmployee.firstNmae = response.firstName;
  newEmployee.lastName = response.lastName;
  newEmployee.role = response.role;
  switch (response.role) {
    case "Sales":
      newEmployee.roleID = 1
    case "Legal":
      newEmployee.roleID = 2
    case "Finance":
      newEmployee.roleID = 3
    case "Engineering":
      newEmployee.roleID = 4
  }
  connection.query("SELECT * FROM employees ORDER BY id ASC", function(err, res) {
    if (err) throw err; 
    newEmployee.id = res.length + 1
  });
  connection.query("SELECT * FROM employees WHERE manager_id IS NOT NULL AND role = ? ORDER BY id ASC",[response.role], function(err, res) {
    if (err) throw err; 
    for (var i = 0; i < res.length; i++) {
      managerArray.push({name: res[i].manager_name, id: res[i].manager_id})
    }
    console.log(managerArray.map(function(obj){
      return obj.name
    }));
    inquirer
    .prompt({
      name: "pickedManager",
      type: "list",
      message: "Which Manager?",
      choices: managerArray.map(function(obj){
        return obj.name
      })
    }).then(function(response){
      newEmployee.managerName = response.pickedManager
      let manager = managerArray.filter(function(id) {
        return id.name = response.pickedManager
      });
      console.log(manager);
      newEmployee.managerID = manager[0].id
      console.log(newEmployee);
      addEmployeeToDB();
    });
    
  });


});
}

function removeEmployee() {

}
function updateEmployeeRole() {

}
function updateEmployeeManager() {
    
}

//queries

function queryRole(role) {
  connection.query("SELECT * FROM employees WHERE role = ? ORDER BY id ASC", [role], function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function queryManager(manager) {
  connection.query("SELECT * FROM employees WHERE manager_name = ? ORDER BY id ASC", [manager], function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function addEmployeeToDB() {
  connection.query("INSERT INTO employees (first_name, last_name, role, role_id, manager_name, manager_id) VALUES (?,?,?,?,?,?)", 
  [
    newEmployee.firstName,
    newEmployee.lastName,
    newEmployee.role,
    newEmployee.roleID,
    newEmployee.managerName,
    newEmployee.managerID
  ], function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}