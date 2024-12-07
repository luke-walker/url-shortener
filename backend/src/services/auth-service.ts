interface UserInfo {
    token: string,
    username: string,
    lastIp: string
};

export async function getUserInfo(accessToken: string): Promise<UserInfo | null> {
    const res = await fetch(`${process.env.AUTH_URL}/user`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return await res.json();
}

export async function authorizeUser(accessToken: string, admin=false): Promise<boolean> {
    const res = await fetch(`${process.env.AUTH_URL}/auth${admin ? "/admin" : ""}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return res.ok;
}
