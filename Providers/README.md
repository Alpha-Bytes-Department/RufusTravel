# Auth & Axios Provider Documentation

## Overview

This implementation provides a complete authentication and HTTP request solution using React Context API with Axios integration.

## Features

### ✅ AuthProvider

- **User Authentication**: Login/logout functionality
- **User State Management**: Access user info across the entire app
- **Token Management**: Automatic token refresh on 401 errors
- **Persistent Sessions**: User data persists across page refreshes
- **User Updates**: Update user information and refresh from API

### ✅ AxiosProvider

- **Centralized HTTP Client**: Single Axios instance for all API calls
- **Automatic Token Injection**: Auth tokens automatically added to requests
- **Request/Response Interceptors**: Handle errors and logging
- **Token Refresh**: Automatic token refresh on expiration
- **Background Tab Optimization**: Throttles non-critical requests when tab is inactive

---

## Setup

The providers are already integrated in your app's root layout:

\`\`\`tsx
// app/layout.tsx
import { Providers } from "@/Providers";

export default function RootLayout({ children }) {
return (
<html lang="en">
<body>
<Providers>
{children}
</Providers>
</body>
</html>
);
}
\`\`\`

---

## Usage Examples

### 1. Using Auth in Components

\`\`\`tsx
"use client";

import { useAuth } from "@/Providers/AuthProvider";
import { Button } from "@/components/ui/button";

export const MyComponent = () => {
const { user, isAuthenticated, isLoading, logout } = useAuth();

if (isLoading) return <p>Loading...</p>;

if (!isAuthenticated) {
return <p>Please log in</p>;
}

return (
<div>
<h1>Welcome, {user?.firstName}!</h1>
<p>Email: {user?.email}</p>
<Button onClick={logout}>Logout</Button>
</div>
);
};
\`\`\`

### 2. Login Implementation

\`\`\`tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/Providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
const { login, isLoading } = useAuth();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setError("");

    try {
      await login(email, password);
      // Redirect or show success
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }

};

return (
<form onSubmit={handleSubmit} className="space-y-4">
<Input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<Input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
{error && <p className="text-red-500">{error}</p>}
<Button type="submit" disabled={isLoading}>
{isLoading ? "Logging in..." : "Login"}
</Button>
</form>
);
};
\`\`\`

### 3. Making API Requests with Axios

\`\`\`tsx
"use client";

import { useState, useEffect } from "react";
import { useAxios } from "@/Hooks/useAxios";

export const UsersList = () => {
const axios = useAxios();
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchUsers = async () => {
try {
const response = await axios.get("/users");
setUsers(response.data);
} catch (error) {
console.error("Failed to fetch users:", error);
} finally {
setLoading(false);
}
};

    fetchUsers();

}, [axios]);

if (loading) return <p>Loading users...</p>;

return (
<ul>
{users.map((user) => (
<li key={user.id}>{user.name}</li>
))}
</ul>
);
};
\`\`\`

### 4. Update User Profile

\`\`\`tsx
"use client";

import { useAuth } from "@/Providers/AuthProvider";
import { useAxios } from "@/Hooks/useAxios";
import { Button } from "@/components/ui/button";

export const UpdateProfile = () => {
const { user, updateUser } = useAuth();
const axios = useAxios();

const handleUpdate = async () => {
try {
const response = await axios.put("/users/profile", {
firstName: "NewFirstName",
lastName: "NewLastName",
});

      // Update local user state
      updateUser(response.data);

      alert("Profile updated!");
    } catch (error) {
      console.error("Update failed:", error);
    }

};

return (
<div>
<p>Current Name: {user?.firstName} {user?.lastName}</p>
<Button onClick={handleUpdate}>Update Profile</Button>
</div>
);
};
\`\`\`

### 5. Protected Route Component

\`\`\`tsx
"use client";

import { useEffect } from "react";
import { useAuth } from "@/Providers/AuthProvider";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
const { isAuthenticated, isLoading } = useAuth();
const router = useRouter();

useEffect(() => {
if (!isLoading && !isAuthenticated) {
router.push("/signin");
}
}, [isAuthenticated, isLoading, router]);

if (isLoading) {
return <div>Loading...</div>;
}

if (!isAuthenticated) {
return null;
}

return <>{children}</>;
};
\`\`\`

### 6. Conditional Rendering Based on Auth

\`\`\`tsx
"use client";

import { useAuth } from "@/Providers/AuthProvider";
import Link from "next/link";

export const Navbar = () => {
const { isAuthenticated, user, logout } = useAuth();

return (
<nav className="flex items-center justify-between p-4">
<Link href="/">Home</Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span>Hello, {user?.firstName}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/signin">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      )}
    </nav>

);
};
\`\`\`

---

## API Endpoints Expected

Your backend should provide these endpoints:

### Authentication

- \`POST /users/login\` - Login (returns accessToken, refreshToken, user)
- \`POST /users/logout\` - Logout
- \`POST /users/refresh-token\` - Refresh expired token
- \`GET /users/profile\` - Get current user profile

### Configuration

Update the base URL in your environment:

\`\`\`env

# .env.local

API_BASE_URL=http://localhost:8000/api
\`\`\`

Or pass it directly to AxiosProvider:

\`\`\`tsx
<AxiosProvider baseURL="https://your-api.com/api">
<AuthProvider>
{children}
</AuthProvider>
</AxiosProvider>
\`\`\`

---

## Available Hooks

### \`useAuth()\`

Returns:

- \`user\`: Current user object or null
- \`isAuthenticated\`: Boolean indicating if user is logged in
- \`isLoading\`: Boolean for loading state
- \`login(email, password)\`: Login function
- \`logout()\`: Logout function
- \`updateUser(userData)\`: Update user in state
- \`refreshUserData()\`: Fetch fresh user data from API

### \`useAxios()\`

Returns configured Axios instance with:

- Automatic token injection
- Request/response interceptors
- Error handling
- Token refresh logic

---

## Token Storage

Tokens are stored in localStorage:

- \`accessToken\`: Short-lived token for API requests
- \`refreshToken\`: Long-lived token for refreshing access
- \`user\`: User data object

---

## Error Handling

The AxiosProvider automatically handles:

- **401 Unauthorized**: Attempts token refresh, logs out if refresh fails
- **Network Errors**: Logs and propagates errors
- **Timeouts**: Handles gracefully, especially for background tabs
- **Cancelled Requests**: Non-critical requests cancelled in background tabs

---

## Best Practices

1. **Always use \`useAuth\` for user data** - Don't access localStorage directly
2. **Use \`useAxios\` for API calls** - Don't create separate Axios instances
3. **Handle loading states** - Check \`isLoading\` before rendering
4. **Protect routes** - Use ProtectedRoute or check \`isAuthenticated\`
5. **Clear sensitive data on logout** - The logout function handles this

---

## Files Created

- \`Providers/AuthProvider.tsx\` - Authentication context provider
- \`Providers/AxiosProvider.ts\` - HTTP client provider
- \`Providers/index.tsx\` - Combined providers wrapper
- \`Hooks/useAxios.ts\` - Axios hook
- \`Component/Examples/UserProfile.tsx\` - Example usage component

---

## Support

For issues or questions, refer to the inline comments in the provider files which follow the format:

- Main sections: \`// ===============================Text==============================\`
- Inner sections: \`//---------------------- text ----------------\`
