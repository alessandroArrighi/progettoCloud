import http from 'http-proxy-middleware';

export const ordersFromID = http.createProxyMiddleware({target: process.env.DATA_API + "/api/ordini/idordine", changeOrigin: true})
export const createOrder = http.createProxyMiddleware({target: process.env.DATA_API + "/api/ordini/crea/ordine", changeOrigin: true})
export const ordersFromUser = http.createProxyMiddleware({target: process.env.DATA_API + "/api/ordini/user", changeOrigin: true})
export const getOrder = http.createProxyMiddleware({target: process.env.DATA_API + "/api/ordini/getordine", changeOrigin: true})

export const allFramesGrad = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/vista", changeOrigin: true})
export const allFramesSun = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/sole", changeOrigin: true})
export const allLac = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/lac", changeOrigin: true})
export const getFrameFromID = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/vista/:id", changeOrigin: true})
export const getLacFromID = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/lac/:id", changeOrigin: true})
export const getLensesFromID = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/lenti/:id", changeOrigin: true})
export const addNewFrame = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/aggiungi/montature", changeOrigin: true})
export const addNewLAC = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/aggiungi/lac", changeOrigin: true})
export const modifyFrame = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/modifica/montature", changeOrigin: true})
export const modifyLAC = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/modifica/lac", changeOrigin: true})
export const deleteProduct = http.createProxyMiddleware({target: process.env.DATA_API + "/api/prodotti/elimina", changeOrigin: true})

export const getUsersFromID = http.createProxyMiddleware({target: process.env.DATA_API + "/api/utenze", changeOrigin: true})
export const modifyUser = http.createProxyMiddleware({target: process.env.DATA_API + "/api/utenze/modifica", changeOrigin: true})
