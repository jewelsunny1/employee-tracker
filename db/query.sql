--SELECT statements belong here--

--for view all departments
SELECT id AS department_id, name AS department_name FROM department;

--for view all roles
SELECT title AS job_title, role_id, department_id, salary
FROM role
JOIN employee ON emplyee.role_id= role.id
JOIN department
ON role.department_id = department.id;
--for view all employees
SELECT first_name, last_name, title AS job_title, name AS department_name, salary, manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;

--for add department
--for add role
--for add employee
--for update employee role