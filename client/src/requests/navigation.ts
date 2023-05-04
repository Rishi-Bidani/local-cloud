// const BASE_URL = "http://localhost:5000"; // added proxy in vite server

export default class Navigate {
    static async toPath(
        path: string
    ): Promise<{ data: any; error: string | null; status: number | null }> {
        // remove double slashes
        path = path.replace(/\/{2,}/g, "/");
        // remove trailing and leading slash
        path = path.replace(/^\/|\/$/g, "");
        const token = localStorage.getItem("token") ?? null;
        let response;
        let options;

        if (token != null) {
            options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        try {
            response = await fetch(`/navigate/${path}`, options);
            const data = await response.json();
            return { data: data, error: null, status: response?.status ?? 200 };
        } catch (error) {
            let status;
            if (response) status = response?.status ?? null;
            return {
                data: null,
                error: "An error occured",
                status: status ?? null,
            };
        }

        // if (token == null) {
        //     response = await fetch(`/navigate/${path}`);
        // } else {
        //     try {
        //         response = await fetch(`/navigate/${path}`, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         });
        //     } catch (error) {
        //         return { data: null, error: "An error occured" };
        //     }
        // }
        // try {
        //     const data = await response.json();
        //     return { data: data, error: null };
        // } catch (error) {
        //     if (response.status == 401 || response.status == 403) {
        //         return { data: null, error: "Unauthorized Navigation" };
        //     }
        //     return { data: null, error: "An error occured" };
        // }
    }
}
