USE employee_trackerDB;
SELECT e.id, e.first_name,e.last_name,role.title AS Jobtitle, role.salary, department.name AS Department,m.first_name AS ManagersFirstName,m.last_name AS ManagersLastName
FROM employees AS e
JOIN role ON e.role_id=role.id
JOIN department ON role.department_id=department.id
LEFT JOIN employees AS m
ON m.id = e.manager_id
