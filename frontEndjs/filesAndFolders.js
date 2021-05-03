export class sepFilesAndFolders {
  constructor(data) {
    this.data = data.split(",");
    this.files = [];
    this.folders = [];
    this.validExtensions = [
        "pdf", 
        "xlsx", "docx","pptx", "txt", 
        "jpeg",  "jpg", "png",
        "py", "js", "html", "json", "css", "gitignore", 
    ]; //prettier-ignore
  }
  getFiles() {
    this.data.forEach((elem, index) => {
      if (this.validExtensions.includes(elem.split(".")[-1])) {
        this.files.push(elem);
      } else {
      }
    });
    return this.files;
  }
}
