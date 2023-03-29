class Authorisation {
    static async login(username: string, password: string) {
        const response = await fetch(`/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        return response;
    }
    static async logout() {
        // TODO: implement logout
    }

    static async store(token: string) {
        localStorage.setItem("token", token);
    }

    static async get() {
        return localStorage.getItem("token");
    }
}

export default Authorisation;
