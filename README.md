# School announces platform

**Estin connect** is a school announcement app. Students use an Expo mobile app to join rooms and post messages. Staff use a React admin site to approve rooms and manage accounts. Both talk to one Express API backed by MongoDB, with Socket.IO for live chat and room requests.

The mobile app scheme is `estinconnect`. Google login only accepts email addresses that end with `@estin`.

## Pieces

| Folder | What it is |
| --- | --- |
| `client/` | Expo Router app (React Native). Screens live in `client/app/` |
| `admin/` | Create React App dashboard. Proxy is `http://localhost:4000` |
| `server/` | Express API, Mongoose models, Socket.IO. Package name `conduite` |

## Students

Opening the app redirects to login. A successful password login saves the user and the JWT, then loads rooms.

From there a student can:

- Open a room and read its messages (`app/rooms/[slug].js`). The screen joins the Socket.IO room and appends `receiveMessage` events.
- Send a message and, on a thread, send a reply (`ResponseInput`).
- See their rooms (`app/myRooms.js`) and room settings (`app/myRoomsSettings/[slug].js`).
- Request a new room (`app/addRoom.js`). The request stays pending until an admin approves it.
- Open direct messages, notifications, settings, and help (`myDMs`, `notifications`, `settings`, `help`).

Shared UI state (token, sidebar, reply composer) is a Valtio proxy in `client/state/index.js`. Login data is kept with the helpers in `client/asyncStorage/`.

The app calls `http://192.168.1.71:3000` for both HTTP and Socket.IO (`client/socketio.js` and `client/app/login.js`). The API process defaults to port **4000**, so that address has to match wherever the server is actually listening.

## Admins

`admin/src/App.js` shows the login page until `onLogin` marks the session as an admin. After that the sidebar links to:

| Screen | Role |
| --- | --- |
| Rooms | Existing rooms, room detail, and the admin’s own rooms |
| Users | List users and add users |
| Reports | Reports view |
| Assistance | Assistance view |
| Notifications | Opened from the sidebar bell |

Admin login uses `POST /api/user/admin-login`, which rejects any account whose `role` is not `admin`.

## Accounts and rooms

Users are stored in MongoDB. A new user is a `student` unless `role` is set otherwise. Passwords are hashed with bcrypt on save. `isBlocked` defaults to false. A refresh token is stored on the user. Password reset fields exist on the schema (`passwordResetToken`, 30 minutes) via `createPasswordResetToken`.

| User field | Meaning |
| --- | --- |
| `firstname`, `lastname`, `email`, `mobile` | Identity. Email and mobile are unique |
| `password` | Hashed |
| `role` | `student` by default, `admin` for the dashboard |
| `isBlocked` | Set by the block and unblock routes |
| `refreshToken` | Latest refresh token |

A room has a unique `name`, a `roomadmin`, a `students` list, and a `messages` array. `isPending` starts true. `isGeneral` marks a room that every student receives in addition to rooms they belong to.

Each message stores the sender id and name, content, timestamp, a `type`, a `threadId`, and `responses`. Replies are only accepted from the sender of the original message. The handler’s comment refers to that original message as an “objet perdu” post.

## Real time

Socket.IO is attached to the same HTTP server as Express.

| Client event | Server does |
| --- | --- |
| `joinRoom` | Socket joins that room id |
| `newMessage` | Forwards `data.message` to the room as `receiveMessage` |
| `messageResponse` | Forwards `data.response` to `data.senderId` |
| `createRoomRequest` | Emits the same event back to the sender |
| `roomCreationResponse` | Forwards `approve` to `data.userId` |

The HTTP handlers also emit `createRoomRequest` to every connected socket, and `roomCreationResponse` / `messageResponse` to a user id room. `sendMessage` does not emit; the live copy of a chat message is the `newMessage` socket event. The saved copy is the message pushed onto the room document.

## HTTP API

Base URL is the server port (`PORT`, or 4000). Protected routes expect `Authorization: Bearer <token>`. Access tokens last 1 day and refresh tokens last 3 days. Both are signed with `JWT_SECRET`.

### `/api/user`

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/login` | No | Email and password. Returns the user payload and sets the refresh cookie |
| `POST` | `/admin-login` | No | Same, and the account must have `role: "admin"` |
| `GET` | `/refresh` | Cookie | New access token from the refresh cookie |
| `GET` | `/logout` | No | Clears the refresh token |
| `PUT` | `/password` | User | Replace the password |
| `PUT` | `/edit-user` | User | Update the signed-in user |
| `GET` | `/all-users` | No | Every user |
| `GET` | `/:id` | No | One user |
| `POST` | `/add-user` | No | Create a user from the JSON body |
| `POST` | `/add-from-csv` | No | Multipart field `csvFile`. Rows are inserted with `insertMany` |
| `DELETE` | `/:id` | Admin | Delete a user |
| `PUT` | `/block-user/:id` | Admin | Set `isBlocked` |
| `PUT` | `/unblock-user/:id` | Admin | Clear `isBlocked` |
| `POST` | `/create-room-request` | User | Create a room with `isPending: true` and notify sockets |
| `POST` | `/handle-room-request` | Admin | Approve (`isPending: false`) or delete the request |
| `POST` | `/google-login` | No | Start Google OAuth |
| `GET` | `/auth/google/callback` | No | Finish Google OAuth |

Google is configured with Passport in `server/controller/userCtrl.js`. The client id, client secret, and callback (`http://localhost:3000/api/user/auth/google/callback`) are hardcoded there. The callback issues a token only when the email ends with `@estin`.

`isAdmin` is registered before `authMiddleware` on `/handle-room-request`, so that handler reads `req.user` before the token middleware has set it.

### `/api/room`

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/add-default-room` | User | Create a general room (`isGeneral: true`, not pending) |
| `POST` | `/add-room` | User | Create a room and add the caller as its first student. Stays pending |
| `POST` | `/add-students-toRoom` | No | Body `roomId`, `studentIds`. Skips ids already in the room |
| `POST` | `/send-message` | User | Body `roomId`, `message`, `messageType`, `threadId` |
| `POST` | `/handle-response` | User | Append a reply. Only the original sender is allowed |
| `GET` | `/get-all-room` | No | Every room |
| `GET` | `/get-room/:id` | No | One room |
| `DELETE` | `/delete-room/:id` | No | Delete a room |
| `GET` | `/get-user-rooms` | User | Rooms the user is in, plus every general room, each with `lastMessage` |
| `GET` | `/get-room-messages/:id/:index` | User | All messages on the room. `index` is accepted and not used |

## Run

MongoDB must be reachable. In `server/.env`:

```env
PORT=4000
REMOTE_MONGODB_URL=mongodb://localhost:27017/school-announces
JWT_SECRET=change-me
```

```bash
cd school-anounces-platform/server
npm install
npm start
```

`npm start` runs `nodemon index.js`.

Admin dashboard:

```bash
cd school-anounces-platform/admin
npm install
npm start
```

Create React App serves it at `http://localhost:3000` and proxies API calls to port 4000.

Mobile app (Expo dev client):

```bash
cd school-anounces-platform/client
npm install
npm start
```

Point the hardcoded `192.168.1.71:3000` URLs at the machine and port where `server/index.js` is listening before logging in from a device.
