export async function createLink(name: string, redirect: string, minutes: number) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            redirect,
            minutes
        })
    });
    return res.ok;
}

export async function trustLink(name: string) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link/trust/${name}`, {
        method: "POST",
        credentials: "include"
    });
    return res.ok;
}
