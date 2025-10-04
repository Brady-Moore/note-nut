# <img src="./public/logo.png" alt="NoteNut Logo" width="150" />

NoteNut is a secure, minimalist note-taking app built with **Nuxt 3**, **Prisma**, and **MySQL**.  
Each user has their own private notes — organized by **Today**, **Yesterday**, and **Past** — all stored safely in a relational database.

Authentication is handled via **JWT cookies**, and passwords are hashed with **bcrypt** for maximum security.



---

## ✨ Features

- 🔐 **User Authentication**

  - Register and log in with email and password.
  - Secure password hashing (bcrypt) and JWT cookie-based auth.
  - 🔒 Authentication Flow

    - User registers or logs in → server validates credentials.

    - A signed JWT is created and stored in the browser as a cookie.

    - Protected routes (like /) use auth.js middleware to verify JWT before rendering.

    - On logout, the cookie is cleared and user is redirected to /login.

- 📝 **Personal Notes**

  - Create, edit, and delete notes in real time.
  - Auto-saving using a debounced update system (saves 1 s after typing stops).

- 🗓️ **Smart Organization**

  - Notes are grouped automatically by:
    - **Today**
    - **Yesterday**
    - **Past**

- 🎨 **Modern UI**

  - Built with **Tailwind CSS** and custom Playfair/Inter typography.
  - Smooth UX with **SweetAlert2** for modals and confirmations.

- 🧠 **Prisma ORM**
  - Full relational schema for `User` and `Note` models.
  - MySQL 8 running in **Docker** for easy local development.

---

## 🧰 Tech Stack

| Layer                    | Technology                                                                                                    |
| :----------------------- | :------------------------------------------------------------------------------------------------------------ |
| **Frontend / Framework** | [Nuxt 3](https://nuxt.com/)                                                                                   |
| **ORM / Database**       | [Prisma](https://www.prisma.io/) + MySQL8                                                                     |
| **Auth**                 | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Styling**              | [Tailwind CSS](https://tailwindcss.com/)                                                                      |
| **Alerts**               | [SweetAlert2](https://sweetalert2.github.io/)                                                                 |
| **Runtime**              | Node.js 20 + Nitro server                                                                                     |
| **Container**            | Docker for MySQL                                                                                              |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/note-nut.git
cd note-nut
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up your environment variables

Create a .env file at the root of your project:

```env
DATABASE_URL="mysql://root:root@localhost:3306/notenut"
SHADOW_DATABASE_URL="mysql://root:root@localhost:3306/notenut_shadow"
JWT_SECRET="your-secret-key"
```

### 4️⃣ Start your MySQL container

```bash
docker run --name mysql8 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=notenut \
  -p 3306:3306 \
  -d mysql:8
```

### 5️⃣ Initialize the database

```bash
npx prisma migrate dev
```

Then open Prisma Studio to inspect your data:

```bash
npx prisma studio
```

### 6️⃣ Run the app

```bash
npm run dev
```

Navigate to:
👉 http://localhost:3000

You’ll see the login page — register a new account and start writing notes!

### 🧑‍💻 Author

Brady Moore
Frontend / Fullstack Developer
🇯🇵 Tokyo, Japan
