import http from 'http-proxy-middleware';

export const registerUser = http.createProxyMiddleware({target: process.env.AUTH_API + "/api/auth/signin", changeOrigin: true})
export const loginUser = http.createProxyMiddleware({target: process.env.AUTH_API + "/api/auth/login", changeOrigin: true})
export const logoutUser = http.createProxyMiddleware({target: process.env.AUTH_API + "/api/auth/logout", changeOrigin: true})
export const getUser = http.createProxyMiddleware({target: process.env.AUTH_API + "/api/auth/getUser", changeOrigin: true})
export const modifyPassword = http.createProxyMiddleware({target: process.env.AUTH_API + "/api/auth/mod/password", changeOrigin: true})
export const isLoggedIn = http.createProxyMiddleware({target: process.env.AUTH_API + "/api/auth/loggedIn", changeOrigin: true})
export const isAdminLoggedIn = http.createProxyMiddleware({target: process.env.AUTH_API + "/api/auth/adminLoggedIn", changeOrigin: true})