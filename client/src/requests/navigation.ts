// const BASE_URL = "http://localhost:5000"; // added proxy in vite server

export default class Navigate {
    static async toPath(path: string): Promise<{ data: any; error: string | null }> {
        // remove double slashes
        path = path.replace(/\/{2,}/g, "/");
        // remove trailing and leading slash
        path = path.replace(/^\/|\/$/g, "");
        const token = localStorage.getItem("token") ?? null;
        let response;
        if (token == null) {
            response = await fetch(`/navigate/${path}`);
        } else {
            response = await fetch(`/navigate/${path}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        try {
            const data = await response.json();
            return { data: data, error: null };
        } catch (error) {
            if (response.status == 401 || response.status == 403) {
                return { data: null, error: "Unauthorized Navigation" };
            }
            return { data: null, error: "An error occured" };
        }
    }
}
