import axios from "axios";
const url = "http://localhost:5000/posts/";

class FileHandling {
  // Get Directories
  static getDirectories(forPath) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/${forPath}`);
        const fileAndFolders = res.data;
        resolve(console.log(fileAndFolders));
      } catch (error) {
        reject(error);
      }
    });
  }
  // Make Folder
  static newFolder(forPath) {
    return axios.post(`${url}/${forPath}`);
  }
}

export default FileHandling;
