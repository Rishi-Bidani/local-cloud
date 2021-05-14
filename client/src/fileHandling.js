import axios from "axios";
const url = "http://localhost:5000/posts/";

class FileHandling {
  // Get Directories
  static getDirectories(forPath) {
    return new Promise((resolve, reject) => {
      try {
        console.log(forPath);
        const fileAndFolders = axios
          .post(`${url}/dir`, {
            dir: forPath,
          })
          .then((response) => {
            return response;
          });
        console.log(resolve(fileAndFolders));
        return resolve(fileAndFolders);
      } catch (error) {
        reject(error);
      }
    });
  }
  // Make Folder
  static newFolder(forPath) {
    return axios.post(`${url}/newFolder/${forPath}`);
  }
}

export default FileHandling;
