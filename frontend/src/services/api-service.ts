const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getLinks() {
    const res = await fetch(`${BACKEND_URL}/link`, {
        credentials: "include"
    });
    return await res.json();
}

export async function createLink(name: string, redirect: string, minutes: number) {
    const res = await fetch(`${BACKEND_URL}/link`, {
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

export async function deleteLink(name: string) {
    const res = await fetch(`${BACKEND_URL}/link/${name}`, {
        method: "DELETE",
        credentials: "include"
    });
    return res.ok;
}

export async function trustLink(name: string) {
    const res = await fetch(`${BACKEND_URL}/link/trust/${name}`, {
        method: "POST",
        credentials: "include"
    });
    return res.ok;
}
