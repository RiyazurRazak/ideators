const dev = process.env.NODE_ENV !== "production"

export const base = dev ? "http://localhost:3000" : "https://ideators.vercel.app"