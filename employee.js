const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

let managerArray = [{
  name: "",
  id: 0
}];

let employeeArray = [{
  name: "",
  id: 0
}]

const newEmployee = {
  id: 0,
  firstNmae: "",
  lastName: "",
  roleID: 0,
  managerID: 0
}

let roleID = 0;

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
  connection.query("SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments as c on roles.department_id = c.id", function(err, res) {
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
    let departmentNumber = 0;
    console.log(response.department)
    switch (response.department) {
      case "Sales":
        departmentNumber = 1
        break
      case "Legal":
        departmentNumber = 2
        break
      case "Finance":
        departmentNumber = 3
        break
      case "Engineering":
        departmentNumber = 4
        break
    }
    console.log(departmentNumber)
    queryDepartment(departmentNumber);
  });
}

let queryNumber1 = 0;
let queryNumber2 = 0;

function queryDepartment(departmentNumber) {
  console.log(departmentNumber)
  switch (departmentNumber) {
    case 1:
      queryNumber1 = 1
      queryNumber2 = 2
      break
    case 2:
    queryNumber1 = 3
    queryNumber2 = 4
      break
    case 3:
    queryNumber1 = 5
    queryNumber2 = 6
      break
    case 4:
    queryNumber1 = 7
    queryNumber2 = 8
      break
  }

  connection.query("SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments as c ON roles.department_id = c.id WHERE role_id = ? OR role_id = ? ", [queryNumber1, queryNumber2], function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewEmplpyeesByManager() {
  connection.query("SELECT * FROM employees WHERE manager_id IS NULL ORDER BY id ASC", function(err, res) {
    let nameArray = []
    if (err) throw err; 
    for (var i = 0; i < res.length; i++) {
      nameArray.push(res[i].first_name + " " + res[i].last_name)
      managerArray.push({name: res[i].first_name + " " + res[i].last_name, id: res[i].id})
    }

  inquirer
  .prompt({
    name: "manager",
    type: "list",
    message: "Which Manager?",
    choices:  nameArray
  }).then(function(response){
    queryManager(response.manager);
  });
});
function queryManager(manager) {
  console.log(managerArray);
  console.log(manager);
  let filteredManager =  managerArray.filter(function(man) {
    return man.name === manager
  });
  console.log(filteredManager);
  connection.query("SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments as c ON roles.department_id = c.id WHERE manager_id = ?", [filteredManager[0].id], function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
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
      "Sales Person",
      "Lawyer",
      "Accountant",
      "Dev"
    ]
  }
]).then(function(response){
  newEmployee.firstNmae = response.firstName;
  newEmployee.lastName = response.lastName;
  switch (response.role) {
    case "Sales Person":
      newEmployee.roleID = 2
      break
    case "Lawyer":
      newEmployee.roleID = 4
      break
    case "Accountant":
      newEmployee.roleID = 6
      break
    case "Dev":
      newEmployee.roleID = 8
      break
  }
  connection.query("SELECT * FROM employees ORDER BY id ASC", function(err, res) {
    if (err) throw err; 
    newEmployee.id = res.length + 1
  });
  connection.query("SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments as c ON roles.department_id = c.id WHERE manager_id IS NULL AND role_id = ?",[newEmployee.roleID - 1], function(err, res) {
    if (err) throw err; 
    for (var i = 0; i < res.length; i++) {
      managerArray.push({name: res[i].first_name + " " + res[i].last_name, id: res[i].id})
    }
    newEmployee.managerID = managerArray[0].id
    addEmployeeToDB();
  });
});
}

function addEmployeeToDB() {
  console.log(newEmployee);
  connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", 
  [ newEmployee.firstNmae,
    newEmployee.lastName,
    newEmployee.roleID,
    newEmployee.managerID
  ], function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function removeEmployee() {
  connection.query("SELECT * FROM employees ORDER BY id ASC", function(err, res) {
    if (err) throw err;
    console.table(res);
    for (var i = 0; i < res.length; i++) {
      employeeArray.push({name: res[i].first_name + " " + res[i].last_name, id: res[i].id})
    }
    console.log(employeeArray);
    inquirer
    .prompt({
      name: "pickedEmployee",
      type: "list",
      message: "Which Employee?",
      choices: employeeArray.map(function(obj){
        return obj.name + " " + "id:" + " " + obj.id
      })
    }).then(function(response){
      let employee = response.pickedEmployee
      employee = employee.replace(/\s/g, "");
      console.log(employee);
      employeeID = employee.split(":")[1];
      console.log(employeeID);
      connection.query("DELETE FROM employees WHERE id = ?", [employeeID],function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
  });
}
function updateEmployeeRole() {
connection.query("SELECT * FROM employees ORDER BY id ASC", function(err, res) {
    if (err) throw err;
    console.table(res);
    for (var i = 0; i < res.length; i++) {
      employeeArray.push({name: res[i].first_name + " " + res[i].last_name, id: res[i].id})
    }
    console.log(employeeArray);
    inquirer
    .prompt([
      {
        name: "pickedEmployee",
        type: "list",
        message: "Which employee?",
        choices: employeeArray.map(function(obj){
          return obj.name + " " + "id:" + " " + obj.id
        })
      },
    {
      name: "role",
      type: "list",
      message: "What is the employees new role?",
      choices: [
        "Sales Lead",
        "Sales Person",
        "Legal Head",
        "Lawyer",
        "CFO",
        "Accountant",
        "Lead Dev",
        "Dev"
      ]
    }
  ]).then(function(response){
      let employee = response.pickedEmployee
      
      switch (response.role) {
        case "Sales Lead":
        roleID = 1
        break
        case "Sales Person":
        roleID = 2
        break
        case "Legal Head":
        roleID = 3
        break
        case "Lawyer":
        roleID = 4
        break
        case "CFO":
        roleID = 5
        break
        case "Accountant":
        roleID = 6
        break
        case "Lead Dev":
        roleID = 7
        break
        case "Dev":
        roleID = 8
        break
      }
      employee = employee.replace(/\s/g, "");
      console.log(employee);
      employeeID = employee.split(":")[1];
      console.log(employeeID);
      connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [roleID, employeeID],function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
  });
}
function updateEmployeeManager() {
  connection.query("SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments as c ON roles.department_id = c.id WHERE manager_id IS NOT NULL", function(err, res) {
    if (err) throw err;
    console.table(res);
    for (var i = 0; i < res.length; i++) {
      employeeArray.push({name: res[i].first_name + " " + res[i].last_name, id: res[i].id})
    }
    console.log(employeeArray);
    inquirer
    .prompt(
      {
        name: "pickedEmployee",
        type: "list",
        message: "Which employee?",
        choices: employeeArray.map(function(obj){
          return obj.name + " " + "id:" + " " + obj.id
        })
      }
  ).then(function(response){
      let employee = response.pickedEmployee  
      employee = employee.replace(/\s/g, "");
      console.log(employee);
      employeeID = employee.split(":")[1];
      console.log(employeeID);
      connection.query("SELECT * FROM employees WHERE id = ?", [employeeID],function(err, res) {
        if (err) throw err;
        console.table(res[0].role);
        handleManagerUpdate(res[0].role_id, employeeID)
      });
    });
  });
}



function handleManagerUpdate(roleID, employeeID) {
  connection.query("SELECT * FROM employees WHERE manager_id IS NULL AND role_id = ? ORDER BY id ASC", [roleID - 1], function(err, res) {
    if (err) throw err;
    console.table(res);
    for (var i = 0; i < res.length; i++) {
      managerArray.push({name: res[i].first_name + " " + res[i].last_name, id: res[i].id})
    }
    inquirer
    .prompt({
      name: "pickedManager",
      type: "list",
      message: "Which Manager?",
      choices: managerArray.map(function(obj){
        return obj.name + " " + "id:" + " " + obj.id
      })
    }).then(function(response){
      let manager = response.pickedManager  
      let managerNoSpace = manager.replace(/\s/g, "");
      console.log(managerNoSpace);
      let managerID = managerNoSpace.split(":")[1];
      console.log(managerID);

      //name property

      connection.query("UPDATE employees SET manager_id = ? WHERE id = ?", [managerID, employeeID],function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
    
  });
}