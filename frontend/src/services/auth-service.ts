export async function authorizeUser() {
    const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth`, {
        credentials: "include"
    });
    return res.ok;
}

export async function authLogout() {
    const res = await fetch(`${import.meta.env.VITE_AUTH_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    return res.ok;
} 
