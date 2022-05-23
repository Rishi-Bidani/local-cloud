import axios from "axios";
import * as path from "path"
import streamSaver from 'streamsaver'


// Remove for production ------------------------------
axios.defaults.baseURL = 'http://localhost:5000';

export default class Request {
    static async FilesAndFolders(forPath) {
        try {
            return await axios.get("gets/files-and-folders", {
                params: {
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
            // const res = axios.get("gets/download-file", {
            //     responseType: "arraybuffer",
            //     params: {
            //         relPath: path.join(forPath, fileName)
            //     },
            // })
            // console.log(res);
            // console.time("download");
            // const blob = new Blob([await res.data]);
            // console.timeLog("download")
            // const link = document.createElement("a");
            // link.href = window.URL.createObjectURL(blob);
            // link.download = fileName;
            // link.click();
            // console.timeEnd("download");
            const fileStream = streamSaver.createWriteStream(fileName);
            const res = await fetch("gets/download-file?" + new URLSearchParams({
                relPath: path.join(forPath, fileName)
            }))
            const readableStream = res.body
            if (window.WritableStream && readableStream.pipeTo) {
                return readableStream.pipeTo(fileStream)
                    .then(() => console.log('done writing'))
            }
            window.writer = fileStream.getWriter()

            const reader = res.body.getReader()
            const pump = () => reader.read()
                .then(res => res.done
                    ? window.writer.close()
                    : window.writer.write(res.value).then(pump))

            pump()


        } catch (err) {
            console.log(err)
        }
    }

    static async downloadFolder(forPath, folderName) {
        try {
            const res = await axios.get("gets/download-folder", {
                responseType: "arraybuffer",
                params: {
                    relPath: forPath,
                    folderName
                }
            })
            const blob = new Blob([res.data]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = folderName + ".zip";
            link.click();
        } catch (err) {
            console.log(err)
        }
    }

    static async createFolder(forPath, folderName) {
        try {
            return await axios.post("posts/create/folder", {
                relPath: forPath,
                folderName
            })
        } catch (err) {
            console.log(err)
        }
    }

    static uploadURL() {
        return "posts/upload"
    }

    static async deleteFolder(forPath, folderName) {
        console.log(forPath, folderName)
        try {
            return await axios.delete("deletes/folder", {
                params: {
                    relPath: forPath,
                    folderName
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteFile(forPath, fileName) {
        console.log(forPath, fileName);
        try {
            return await axios.delete("deletes/file", {
                params: {
                    relPath: forPath,
                    fileName
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}