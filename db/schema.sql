DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

use employee_trackerDB;

CREATE TABLE department (

id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
);

CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT
);

CREATE TABLE employee(
id INT AUTO_INCREMENT PRIMARY KEY, 
first_name VARCHAR(30) NOT NULL, 
last_name VARCHAR(30) NOT NULL, 
role_id INT,
manager_id INT
);

