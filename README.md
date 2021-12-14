# local-cloud

This project is still under development (**Not** in early stages anymore), It has several features already implemented :bangbang:

This program can turn your desktop into a local cloud server. This is a website which will run locally over your wifi(without port forwarding) and will be accessible to all your devices.

You can now access and transfer files from your different devices with ease.
The new version (version 2) has been implemented using vuejs.
Version 1 was a pilot project and is not recommended for use(it is not supported by me any longer).

## Version 2.4 is Here !!

### What's new

- Log the contents on the server console (The logging is colour coded)

  - Red = Error/Delete
  - Green = Upload/Create new folder
  - Blue = Download

- Fixed bug - earlier if you uploaded a file that exists in root, into some subfolder, the root file would get deleted.
- Several minor bugs fixed.
- File Upload size increased to 60,000 MB from 256MB
- Executables have been made available (since version 2.3)

## Version 2.3 is Here !!

### What's new

- Delete Files
- Download from releases, the app is finally PACKAGED as an executable!! You don't need to download nodejs or anything else anymore
- delete folder (in context menu- right click)
- download entire folder (in context menu- right click)
- Upload folder has shifted to home directory
  - For windows => Users > username > HomeCloud
- You don't need to look for your ipv4 address anymore, it displays it for you
  <br />

## Table Of Contents

- [Images](#images):file_folder:
- [Setup Requirements](#setup) :rocket:
- [Access the Website](#access):key:
- [Docker Setup](#docker):whale:
- [Libraries Used](#dependencies):computer:
- [Future Plans](#plans):bulb:

<br />
<a name="images"></a>

## Images:file_folder:

These images might be from older versions of the same app and might appear different from the one you setup. Please open an issue for requesting icons or suggesting any colour improvements.
![image](https://user-images.githubusercontent.com/64310471/118494261-996fdd80-b73f-11eb-8013-80794fad875d.png)

![image](https://user-images.githubusercontent.com/64310471/120432554-b7704b80-c397-11eb-9f53-7ca4c9a59f23.png)

<br />
<a name="setup"></a>

## Setup Requirements :rocket:

- A computer :smiley:
- <a href="https://nodejs.org/en/"> node.js </a>
- Yarn (please use yarn), it can be downloaded via npm

  ```bash
  npm install -g yarn
  ```

<a name="access"></a>

## How to access the website/Setup Procedure :key:

<b>Version 2(vuejs implementation)</b>
<br />
If your wish to set it up for development follow these steps, else check the releases for
a better bundled package

1. There are 2 main folders server and client, the vuejs code is inside client and the express backend code is inside server

2. open up 2 terminals/cmd in the root folder.

   ```bash
   TERMINAL 1
   yarn install
   yarn start

   TERMINAL 2
   cd client
   yarn install
   yarn serve
   ```

3. The website can be found on ipv4:8080, ~~check version 1 procedure to see how you can find your ipv4 address~~.
   From version 2.4 onwards the ip address is displayed for you, visit that on any device on the same network.

<b>For version 1</b>
<br />

1. Open your desired terminal/command prompt - cmd, terminal, git bash on the computer you plan to use as your cloud server

2. Type `ipconfig` and find the IPv4 address

   ![image](https://user-images.githubusercontent.com/64310471/117740661-8a100200-b21e-11eb-803a-07423054fac3.png)

3. The website will be available on IPv4 Address:5000
   For example: 192.168.1.7:5000

4. To start the server run the following 2 commands

   ```bash
   yarn install
   yarn start
   ```

5. You can access the website on any device at that address

<br />

<a name="docker"></a>

## Running inside of Docker :whale:

To run local-cloud inside of Docker, run the following command in the root directory

```bash
docker build -t local-cloud .
docker run -d -p 5000:5000 -v "uploads:/usr/src/app/uploads" local-cloud
```

### Docker Compose

If you want to use Docker Compose, run the following command

```bash
docker-compose up -d
```

<br />

<a name="dependencies"></a>

## Libraries used - Links to some main ones npm/official website :computer:

- <a href = "https://www.npmjs.com/package/express">expressjs</a> with axios, cors, multer, fs
- <a href="https://www.npmjs.com/package/dropzone">dropzone.js</a>
- <a href="https://vuejs.org/">vuejs</a>
- <a href="https://www.npmjs.com/package/vue-sidebar-menu">vue-sidebar-menu</a>
- <a href="https://www.npmjs.com/package/vue-js-modal">vue-js-modal</a>
- <a href="https://github.com/Mostafa-Samir/zip-local">zip-local</a>
- <a href="https://www.npmjs.com/package/local-ipv4-address">local-ipv4-address</a>

<a name="plans"></a>

## Future Plans and Timeline :bulb:

- [x] Pilot project with vanilla html-css and js
- [x] Implement with vuejs
- [x] Fix some UI issues - aligning etc
- [x] Create Folders
- [x] Download Files
- [x] Upload Files
- [x] Delete files
- [x] View File size
- [x] Delete Folders
- [x] Download entire folder(as a zip)
- [x] Coloured logging of events (for server console)
- [x] Implement some security features - Restricted access to other files on the system by blocking requests outside the home directory - This has been done for navigation(getting directory content), for downloading files and folders and for deleting files or folders

<br />

## Some useful new features

- Check file size
- ctrl + click on file to download directly
- Right click folder for context menu

## Icon Credits

- <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## Favicon

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
