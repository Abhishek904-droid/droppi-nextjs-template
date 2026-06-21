# DROPPI Installation Guide

## Requirements

* Node.js 18+
* Firebase Account
* Git
* VS Code

## Installation

### 1. Extract Project

Extract the ZIP file.

### 2. Open Project

Open the project folder in VS Code.

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a Firebase project.

Enable:

* Authentication
* Firestore Database

Replace Firebase configuration inside:

```text
lib/firebase.js
```

### 5. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Admin Setup

Create a Firestore collection:

```text
admins
```

Add document:

```json
{
  "email": "your-admin-email@gmail.com"
}
```

## Deployment

### Vercel

1. Push project to GitHub
2. Import repository into Vercel
3. Add Firebase environment variables
4. Deploy

## Support

For customization and support, contact the template author.
