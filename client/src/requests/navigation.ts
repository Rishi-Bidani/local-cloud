const BASE_URL = "http://localhost:5000";

export default class Navigate {
    static async toPath(path: string) {
        const response = await fetch(`${BASE_URL}/navigate/${path}`);
        const data = await response.json();
        return data;
    }
}
