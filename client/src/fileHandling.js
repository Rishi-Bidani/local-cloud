import axios from "axios";
const url = "posts/";

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
  // Requesting for download
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
    // console.log(files);
    // axios
    //   .post(`${url}/upload`, files, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     return res;
    //   });
    return `${url}/upload`;
  }
}

export default FileHandling;
