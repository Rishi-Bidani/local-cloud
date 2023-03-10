// const BASE_URL = "http://localhost:5000"; // added proxy in vite server

export default class Navigate {
    static async toPath(path: string) {
        // remove double slashes
        path = path.replace(/\/\//g, "/");
        const response = await fetch(`/navigate/${path}`);
        const data = await response.json();
        return data;
    }
}
