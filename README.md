# HR Management System (HRMS)

## Project Overview
The **HR Management System (HRMS)** is a web-based application designed to automate and streamline human resource processes. It allows organizations to manage employee records, payroll, attendance, leave requests, recruitment, training, and performance evaluation efficiently.

This project uses **React + Vite + Bootstrap** for the frontend, **Spring Boot (Java)** for the backend, and **MySQL** for the database. Role-based access control (RBAC) is implemented to ensure secure access for Admin, HR, Finance, and Employees.

---

## Features

### Backend (Spring Boot)
- **Authentication**: Register, Login, JWT token, /auth/me endpoint
- **User Management**: Add, edit, and delete employee records
- **Leave Management**: Apply, approve, reject leaves, track leave balances
- **Payroll Management**: Generate payroll, view payslips
- **Profile Management**: Fetch and update user profile
- **Security**: JWT authentication, role-based access control


### Frontend (React + Vite + Bootstrap)
- Authentication pages (Login/Register) with JWT token handling
- Dynamic Navbar based on user role
- Dashboard skeletons: Admin, HR, Finance, Employee
- Global UserContext for logged-in user data
- Axios API integration with token interceptor


## Tech Stack

| Layer         | Technology                  |
|---------------|----------------------------|
| Frontend      | React, Vite, Bootstrap     |
| Backend       | Spring Boot, Java          |
| Database      | MySQL                      |
| Authentication| JWT, Role-Based Access     |
| Version Ctrl  | Git, GitHub                |

---

## Installation

### Backend
1. Clone the repository:  
   ```bash
   git clone https://github.com/saihemanth517/HRMS_PROJECT.git
Navigate to backend directory:

bash
Copy code
cd HRMS_PROJECT/backend
Configure application.properties with your MySQL database credentials.

Build and run Spring Boot application:

bash
Copy code
mvn clean install
mvn spring-boot:run
Frontend
Navigate to frontend directory:

bash
Copy code
cd HRMS_PROJECT/frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open the browser at http://localhost:5173 (Vite default port)

Usage
Register a new user (Admin/HR/Employee)

Login using credentials

Navigate to dashboards based on user role

Perform operations:

Employees: View profile, leave, payslip

HR/Admin: Manage employees, approve leaves, view payroll

Finance: Generate payroll

Future Enhancements
Implement two-factor authentication (2FA)

Full recruitment & onboarding workflow

Performance review module with 360-degree feedback

Reports & analytics with charts, PDF/Excel export

Mobile-friendly interface

Contributors
Sai Hemanth Choppadhandi – Backend (Authentication, Employee Management, Payroll)

Hrushikeshava Aligiri – Frontend (React + Vite + Bootstrap Dashboards)

Sandeep Kumar Maram – Database design & API integrations

Nattuva Bhargavi – Mobile application features & testing

License
This project is licensed under the MIT License.
