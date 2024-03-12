# Simpson Quote Generator
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=whitelabelColor=000000)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma%20ORM-2D3748?logo=prisma&logoColor=whitelabelColor=2D3748)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?logo=next.js&logoColor=whitelabelColor=000000)
![SWR](https://img.shields.io/badge/SWR-FF6347?logo=vercel&logoColor=whitelabelColor=FF6347)



## App Url (Vercel):
[https://test-simpson.vercel.app/](https://test-simpson.vercel.app/)



## Technologies Used

- **Frontend Framework**: Next.js - server actions
- **Styling**: Tailwind CSS
- **ORM**: Prisma ORM
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Data Fetching and Query**: SWR
- **State Management**: Zustand
- **UI Components**: Shadcn



## Environment Variables 

```
NODE_ENV="development"
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>/<database>"
AUTH_SECRET=<your_auth_secret_key>

# Auth Local Providers
GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

```

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/simpson-quote-generator.git
    ```

2. **Install dependencies:**

    ```bash
    cd simpson-quote-generator
    npm install
    ```

3. **Set up the environment variables:**

    Create a `.env` file based on the provided template and set up the required environment variables.

4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. **Open the Application:**

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Folder Structure 
```
- src
  - actions: Contains server actions.
  - app: Main routes of the application.
    - auth: Authentication-related routes.
    - main: Main routes of the application.
  - api/auth/[...nextauth]: NextAuth.js authentication endpoint.
- components: Reusable UI components.
- const: Constants and configurations.
- hooks: Custom React hooks.
- lib: Utility functions and libraries.
- schemas: Prisma ORM schemas.
```





