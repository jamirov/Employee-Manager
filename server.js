const mysql = require('mysql');
const inquirer = require('inquirer');
const msg = require('./consoletext.js');
const Employee = require("./EmployeeClass");

console.log(msg);

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Walpa123',
    database: 'employee_trackerDB',
  });

function mainPromts () {
   return inquirer.prompt([
        {
    type: "list",
    name: "todolist",
    message: "What would you like to do?",
    choices: ["View All Employees","View All Employees By Department","View All Employees By Manager","Add Employee","Remove Employee","Upate Employee Role","Update Employee Manager","Done Exit"],

        }
    ])
}

function addEmployeePrompts(){
    return inquirer.prompt([
        {
        type: 'input',
        name: 'eeFirstName',
        message: 'What is your Employees first name?',
        },
        {
        type: 'input',
        name: 'eeLastName',
        message: 'What is your Employees last name?',
        },
        {
        type: "list",
        name: "role",
        message: "Who do you want add to your team?",
        choices: ["Salesperson","Sales Lead","Lead Engineer","Software Engineer","Accountant","Legal Team Lead","lawer"],    
        }

    ])
}


function viewAllEmployees(){
    console.log("VIEWING ALL EMPLOYEES");
    connection.query(
    `SELECT e.id, e.first_name,e.last_name,role.title AS Jobtitle, role.salary, department.name AS Department,m.first_name AS ManagersFirstName,m.last_name AS ManagersLastName
    FROM employees AS e
    JOIN role ON e.role_id=role.id
    JOIN department ON role.department_id=department.id
    LEFT JOIN employees AS m
    ON m.id = e.manager_id`, 
    (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
      
};

function viewAllEmployeesByDepartment(){
    console.log("Viewing All Employees By Department");
    connection.query(
        `SELECT d.name AS Department, role.title, role.salary, e.first_name, e.last_name, m.first_name AS ManagerFirstName, m.last_name As ManagerLastName
        FROM department AS d
        LEFT JOIN role ON d.id=role.department_id
        JOIN employees AS e ON e.role_id=role.id
        LEFT JOIN employees AS m
        ON m.id = e.manager_id
        ORDER BY Department`, 
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });

};

function viewAllEmployeesByManager(){
    console.log("View ALL Employees By Manager");
    connection.query(
       `SELECT e.id, e.first_name AS ManagerFirstName, e.last_name AS ManagerLastName, m.first_name AS FirstName, m.last_name AS LastName, role.title AS JobTitle, role.salary, department.name AS Department
       FROM employees e
       RIGHT JOIN employees m
       ON e.id = m.manager_id
       LEFT JOIN role
       ON m.role_id=role.id
       LEFT JOIN department
       ON role.department_id=department.id`, 
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        });
    
    
};

function addEmployee(){
    console.log(" Adding a new employee");
    addEmployeePrompts().then(function(response){
        if (response.role === "Salesperson"){
            const roleid = 2;
            const managerId = 1;
            const employee = new Employee (response.eeFirstName, response.eeLastName, roleid, managerId)
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${employee.fname}","${employee.lname}", ${roleid}, ${managerId});
                `, 
                 (err, res) => {
                     if (err) throw err;
                     start();
                 });

        } else if (response.role === "Sales Lead"){

            const roleid = 1;
            const managerId = 3;
            const employee = new Employee (response.eeFirstName, response.eeLastName, roleid, managerId)
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${employee.fname}","${employee.lname}", ${roleid}, ${managerId});
                `, 
                 (err, res) => {
                     if (err) throw err;
                     start();
                 });


        } else if (response.role === "Lead Engineer"){

            const roleid = 3;
            const managerId = "null";
            const employee = new Employee (response.eeFirstName, response.eeLastName, roleid, managerId)
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${employee.fname}","${employee.lname}", ${roleid}, ${managerId});
                `, 
                 (err, res) => {
                     if (err) throw err;
                     start();
                 });

        } else if (response.role === "Software Engineer"){

            const roleid = 4;
            const managerId = 3;
            const employee = new Employee (response.eeFirstName, response.eeLastName, roleid, managerId)
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${employee.fname}","${employee.lname}", ${roleid}, ${managerId});
                `, 
                 (err, res) => {
                     if (err) throw err;
                     start();
                 });

        } else if (response.role === "Accountant"){

            const roleid = 5;
            const managerId = "null";
            const employee = new Employee (response.eeFirstName, response.eeLastName, roleid, managerId)
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${employee.fname}","${employee.lname}", ${roleid}, ${managerId});
                `, 
                 (err, res) => {
                     if (err) throw err;
                     start();
                 });

        } else if (response.role === "Legal Team Lead"){

            const roleid = 6;
            const managerId = "null";
            const employee = new Employee (response.eeFirstName, response.eeLastName, roleid, managerId)
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${employee.fname}","${employee.lname}", ${roleid}, ${managerId});
                `, 
                 (err, res) => {
                     if (err) throw err;
                     start();
                 });
        }else if (response.role === "lawer"){
            const roleid = 7;
            const managerId = 6;
            const employee = new Employee (response.eeFirstName, response.eeLastName, roleid, managerId)
            connection.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${employee.fname}","${employee.lname}", ${roleid}, ${managerId});
                `, 
                 (err, res) => {
                     if (err) throw err;
                     start();
                 });
        }
    })


};

function removeEmployee(){
    console.log(" Removing the Employee");
    connection.query('SELECT * FROM employees',(err, res)=>{
        if(err) throw err;
        inquirer
        .prompt(
            {
            name: 'removeEE',
            message: 'Please choose Employee whom you want to remove?',
            type: "list",
            choices(){
                const choices = [];
                res.forEach(({first_name, last_name})=>{
                    choices.push(`${first_name} ${last_name}`)
                });
                return choices;
                
            }

            }
        )
        .then((answer) => {
            const str = answer.removeEE;
            const fname = str.split(' ')[0];
            const lname = str.split(' ')[1];
            connection.query(
                `DELETE FROM employees 
                WHERE first_name = '${fname}' AND last_name = '${lname}';`, 
                (err, res) => {
                    if (err) throw err;
                });
            console.log(`Removed employee:${answer.removeEE}`);
            start();


        });
    })




    // start();
};

function updateEmployeeRole(){
    console.log("Updating Employee Role");
    start();
};


function start(){
    mainPromts().then(function(response){
    if (response.todolist === 'View All Employees'){
        viewAllEmployees();
    } else if (response.todolist === 'View All Employees By Department') {
        viewAllEmployeesByDepartment();
    } else if ( response.todolist === 'View All Employees By Manager'){
        viewAllEmployeesByManager();
    } else if (response.todolist === 'Add Employee'){
        addEmployee();
    } else if (response.todolist === 'Remove Employee'){
        removeEmployee();
    } else if ( response.todolist ==='Upate Employee Role'){
        updateEmployeeRole();
    } else {console.log("Thank you for using Employee Managment System!")
    connection.end()
    }
    })
};
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });