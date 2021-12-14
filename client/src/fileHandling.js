// Copyright 2020-2021 Rishi Bidani
import axios from "axios";
const path = require("path");
const url = "posts"; // earlier => posts/

class FileHandling {
  // Get Directories
  static getDirectories(forPath) {
    return new Promise((resolve, reject) => {
      try {
        const fileAndFolders = axios
          .post(`${url}/dir`, {
            dir: forPath,
          })
          .then((response) => {
            return response;
          });
        return resolve(fileAndFolders);
      } catch (error) {
        reject(error);
      }
    });
  }
  // Make Folder
  static newFolder(folderName, folderPath) {
    console.log(folderName);
    return axios.post(`${url}/newFolder`, {
      path: folderPath,
      folderName: folderName,
    });
  }
  // Requesting download of file
  static SendForDownload(filePath, fileName) {
    axios
      .get(`${url}/downloadFile/${filePath}/${fileName}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        var blob = new Blob([response.data]);
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static SendForUpload() {
    return `${url}/upload`;
  }
  // Deleting File
  static SendForDelete(filePath, fileName) {
    const fullPath = path.join(filePath, fileName);
    axios.post(`${url}/deleteFile/`, { fullPath }).catch((err) => console.log(err));
  }
  // Delete Folder
  static SendFolderForDelete(folderPath, folderName) {
    const fullPath = path.join(folderPath, folderName);
    axios.post(`${url}/deleteFolder/`, { fullPath }).catch((err) => console.log(err));
  }
  // Requesting Download Folder
  static SendFolderForDownload(folderPath, folderName) {
    const fullPath = path.join(folderPath, folderName);
    axios
      .post(
        `${url}/downloadFolder/`,
        { fullPath, folderName },
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        var blob = new Blob([response.data], { type: "application/zip" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = folderName;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default FileHandling;
