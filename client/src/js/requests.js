import axios from "axios";
import * as path from "path"

axios.defaults.baseURL = 'http://localhost:5000';

export default class Request {
    static async FilesAndFolders(forPath) {
        try {
            return await axios.get("gets/files-and-folders", {
                params: {
                    relPath: forPath
                },
                body: {
                    relPath: forPath
                }
            });
        } catch (err) {
            console.log(err)
        }
    }

    static async downloadFile(forPath, fileName) {
        console.log(forPath, fileName)
        try {
            const res = await axios.get("gets/download-file", {
                responseType: "arraybuffer",
                params: {
                    relPath: path.join(forPath, fileName)
                },
            })
            const blob = new Blob([res.data]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        } catch (err) {
            console.log(err)
        }
    }
}