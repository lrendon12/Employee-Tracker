var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Shrek12!",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      message: "what action would  you like to take?",
      choices: [
        "add department",
        "add role",
        "add employee",
        "view department",
        "view role",
        "view employees",
        "update employee roles",
      ],
      name: "option",
    })
    .then((answer) => {
      if (answer.option === "add department") {
        addDepartment();
      } else if (answer.option === "add role") {
        addRole();
      } else if (answer.option === "add employee") {
        addEmployee();
      } else if (answer.option === "view department") {
        viewDepartment();
      } else if (answer.option === "view role") {
        viewRole();
      } else if (answer.option === "view employee") {
        viewEmployee();
      } else if (answer.option === "update employee roles") {
        updateEmployee();
      }
    });
}
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "what department do you want to add?",
      name: "department",
    })
    .then((answer) => {
      console.log("Adding a department...\n");
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department inserted!\n");
          mainMenu();
        }
      );
    });
}

function viewDepartment() {
  console.log("viewing departments...\n");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    console.table(res);
    mainMenu();
  });
}
function updateEmployee() {
    inquirer.prompt([
        {
            type: "input", 
            message: "Which employee do you want to update?",
            name: "employee_id"
        },
        {
            type: "input",
            message: "What is the employees new role id?",
            name: "role_id"
        },
    ]).then((answer) => {
    

    console.log("Updating employees...\n");
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id: answer.role_id
        },
        {
          id: answer.employee_id
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employees updated!\n");
        mainMenu();
      }
    )
    })
}
    function addRole() {
      inquirer.prompt([{
            name: "title",
        type: "input",
        message: "What title would you like to add?"
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary for this title?",
      },
      {
        name: "department_id",
        type: "number",
        message: "What's the department ID?",
      },
    ])
          .then((answer) => {
            console.log("Adding a role...\n");
            connection.query(
              "INSERT INTO role SET ?",
              {
                name: answer.role,
                salary: answer.salary,
                departmentID: answer.department_id
              },
              function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role inserted!\n");
                mainMenu();
              }
            )
          })
        }

          function addEmployee() {
            inquirer.prompt([{
                  name: "first_name",
              type: "input",
              message: "What is the employees first name?"
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employees last name?",
            },
            {
              name: "role_id",
              type: "number",
              message: "What's the department ID?",
            },
          ])
                .then((answer) => {
                  console.log("Adding an employee...\n");
                  connection.query(
                    "INSERT INTO employee SET ?",
                    {
                      name: answer.first_name,
                      salary: answer.last_name,
                      department_id: answer.role_id
                    },
                    function (err, res) {
                      if (err) throw err;
                      console.log(res.affectedRows + " employee inserted!\n");
                      mainMenu();
                    }
                  );
                });
              }
                function viewEmployee() {
                  console.log("viewing employee...\n");
                  connection.query("SELECT * FROM employee", function (err, res) {
                    if (err) throw err;
                
                    console.table(res);
                    mainMenu();
                  });
                }
              
                function viewRole() {
                  console.log("viewing role...\n");
                  connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                
                    console.table(res);
                    mainMenu();
                  });
                }

    