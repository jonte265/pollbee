# 🎉 PollBee

Create your own polls, share them with others, and collect votes in real-time—all in one simple app!

---

## 🌐 Live Demo

https://pollbee.vercel.app/

## 🚀 Technologies

- **Node.js** – Backend runtime environment
- **Express.js** – Web framework for building RESTful APIs
- **Supabase** – PostgreSQL database and storage
- **bcryptjs** – Password hashing for secure user authentication
- **jsonwebtoken (JWT)** – Custom JWT-based user session management
- **Next.js** – React framework for frontend and server-side rendering
- **Tailwind CSS** – Utility-first CSS for styling
- **nanoid** – Unique ID generation for shareable poll links

---

## 📌 Features

- 🔐 **User Authentication** – Register, login with JWT-secured sessions
- 🗳️ **Create Polls** – Custom titles, multiple options, activate/deactivate polls
- 🔗 **Shareable Poll Links** – Generate unique URLs for easy voting
- 📊 **Real-time Voting** – Increment vote counts on user submissions
- ✏️ **Edit Polls** – Update titles, options, and poll status
- 🗑️ **Delete Polls** – Remove polls securely
- 👤 **User Profiles** – View all polls created by the logged-in user

---

## 📦 Installation

1. Clone this repo:

2. Install dependencies (backend and frontend folder):

   npm install

3. Set up environment variables in backend folder (.env):

   JWT_SECRET=your_jwt_secret
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   FRONTEND_URL=http://localhost:3000

4. Run the development server (backend and frontend folder):

   npm run dev

---

## 🔥 API Endpoints

### Authentication

- `POST /auth/register`
  Register new user
  **Body:** `{ username, password }`

- `POST /auth/login`
  Login user
  **Body:** `{ username, password }`
  **Response:** `{ token }`

---

### Polls

- `POST /polls`
  Create a new poll
  **Headers:** `Authorization: Bearer <token>`
  **Body:** `{ polltitle, active, options }`
  **Response:** Poll data + `share_url`

- `PUT /polls`
  Edit existing poll
  **Headers:** `Authorization: Bearer <token>`
  **Body:** `{ pollid, polltitle?, active?, options?, optionsid? }`

- `GET /polls/:shareId`
  Get poll data by shareable link

- `POST /polls/vote`
  Vote on a poll option
  **Body:** `{ voteoption }`

- `DELETE /polls`
  Delete a poll
  **Headers:** `Authorization: Bearer <token>`
  **Body:** `{ pollid }`

---

### Profile

- `GET /profile`
  Get polls created by the logged-in user
  **Headers:** `Authorization: Bearer <token>`

---

## 📚 How It Works

- Users create accounts with unique lowercase usernames and secure passwords
- Authenticated users create polls with titles and multiple options
- Each poll gets a unique short link for sharing
- Anyone with the link can vote on poll options without logging in
- Users can manage (edit/delete) their own polls
- Poll results are viewable in real-time
