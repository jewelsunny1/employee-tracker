const inquirer= require('inquirer');
const{Client}= require('pg'); //node postgres; Client is the name of 
// the property in the exported object// so Client holds all the 
//properties and methods of 'pg' module

const client= new Client({
user: 'postgres',
host: '127.0.0.1', //IP adress it could be either 'localhost' or '127.0.0.1'..its both the same
database: 'business',
password: 'Dksunshine123$',
port: 5432, //Default for PostgresSQL port
});

async function prompts(){
    try{//code that may throw erros
        await client.connect();//client: the PostgresSQL obj we created earlier, connect():method of pgSQL
        //await:pause exec of code till promise returnedby client.connect() resolves or rejects.
        const questions=[
            {
                type:'list',
                name: 'action',
                message:'What would you like to do?',
                choices: ['View All Departments', 'View All Roles','View All Employees', 'Add Department', 'Add Role', 'Add Employee','Update Employee Role'],
                
            },
        ];

        const {action} = await inquirer.prompt(questions); //action is property of th eobj returned by 'inquirer.prompt(questions)'
        
        if (action==='View All Departments'){
            const {rows}= await client.query('SELECT id AS department_id, name AS department_name FROM department');
            console.table (rows);

        }   else if (action==='View All Employees'){
            const {rows}= await client.query('SELECT first_name, last_name, title, name AS department_name, salary, manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id');
            console.table (rows);

        }   else if (action==='View All Roles'){
            const {rows}= await client.query('SELECT title AS job_title, role_id, department_id, salary FROM role JOIN employee ON employee.role_id= role.id JOIN department ON role.department_id = department.id');
            console.table (rows);

        }   else if (action==='Add Department'){
            const departmentInfo= await inquirer.prompt([
                {
                    type:'input',
                    name: 'name',
                    message: 'Enter the name of the department:',
                },
            ]);
            await client.query('INSERT INTO department (name) VALUES ($1)', [departmentInfo.name]);
            const{rows} = await client.query('SELECT * FROM department');
            console.table(rows);

        } else if (action==='Add Role'){
            const roleInfo= await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the role:',
                },
                {
                    type:'number',
                    name:'salary',
                    message: 'Enter the salary for this role:',
                },
                {
                    type:'number',
                    name:'department_id',
                    message: 'Enter the department ID for the role:',
                },
            ]);
            await client.query('INSERT INTO ROLE (title, salary, department_id) VALUES ($1,$2,$3)', [roleInfo.title, roleInfo.salary,roleInfo.department_id]);
            const {rows}=await client.query('SELECT * FROM role');
            console.table(rows);

        } else if (action==='Add Employee'){
            const employeeInfo= await inquirer.prompt([
                {
                    type:'input',
                    name:'first_name',
                    message:'Enter the first name of the employee:',
                },
                {
                    type:'input',
                    name:'last_name',
                    message:'Enter the last name of the employee:',
                },
                {
                    type:'number',
                    name:'role_id',
                    message:'Enter the role ID for the employee',
                },
                {
                    type:'number',
                    name:'manager_id',
                    message:'Enter the manger ID for the employee',
                },
            ]);
            await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)', [employeeInfo.first_name, employeeInfo.last_name, employeeInfo.role_id, employeeInfo.manager_id]);
            const {rows} = await client.query ('SELECT * FROM employee');
            console.table(rows);
        }

    } catch(error){ //try catch block //handles erros
        console.error('Error occured',error);
    }finally{ //indicates that code inside 'finally' block executes only after the 'try' block is completes
        await client.end();//.end() is a method of pgSQL whose prop/meth are help in 'client' object earlier on in the code
    }
}
 prompts();


