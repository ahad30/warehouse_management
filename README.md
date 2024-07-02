### Warehouse Management System - Project Setup Guide

**Live Link:** [Warehouse Management System](https://warehouse.z8tech.one/login)

---

### 🛠️ Technologies

- **Frontend:** React.js, Redux,Tailwind CSS, Material Tailwind
- **Backend:** Php, Laravel
- **Database:** MySQL
- **Email:** SMTP
- **APIs:** REST API

---

### 📋 Features

- **Authentication System:** Secure login and registration.
- **Invoice Generation:** Create and manage invoices.
- **CSV and PDF Export:** Export data in CSV and PDF formats.
- **Email Notifications:** Automated email alerts and notifications.
- **Revenue Analytics:** Comprehensive revenue tracking and analytics.
- **Reporting:** Detailed reporting features.

---

### 🚀 Project Setup Instructions

Follow these steps to set up the project locally:

#### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Composer**: [Download Composer](https://getcomposer.org/)
- **PHP**: [Download PHP](https://www.php.net/downloads)
- **MySQL**: [Download MySQL](https://www.mysql.com/downloads/)

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/warehouse-management-system.git
cd warehouse-management-system
```

#### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables for both frontend and backend:

```env
# Backend (Laravel)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=noreply@warehouse.z8tech.one
MAIL_FROM_NAME="${APP_NAME}"

JWT_SECRET=your_jwt_secret
```

#### 3. Set Up the Backend

Navigate to the `backend` directory and install the necessary dependencies:

```bash
cd backend
composer install
```

Run the following commands to set up the database:

```bash
php artisan migrate
php artisan db:seed
```

Start the Laravel development server:

```bash
php artisan serve
```

#### 4. Set Up the Frontend

Navigate to the `frontend` directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

#### 5. Access the Application

Open your browser and go to `http://localhost:3000` to access the application.

#### 6. Admin Access

Use the following credentials to log in to the admin panel:

- **Email:** admin@mail.com
- **Password:** password


