# local-cloud

This program can turn your desktop into a local cloud server. This is a website which will run locally over your wifi(
without port forwarding) and will be accessible to all your devices.

You can now access and transfer files from your different devices with ease. The new version (version 2) has been
implemented using vuejs. Version 1 was a pilot project and is not recommended for use(it is not supported by me any
longer).

## Version 3

Currently the server is written in typescript which will work well for development environments with a bit of setup, however I have made the decision to migrate the server to Go to make setup easier and the package more easily distributable.
Please check the other development branches for updates.

- Converted to typescript
- New fresh UI, see images below
- Configuration file for authentication - don't expose all your files to everyone

## Donation

Support me to keep making this project better :heart:

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/rishibidani?country.x=AU&locale.x=en_AU)

## Table Of Contents

- [Images](#images):file_folder:
- [Setup Requirements](#setup) :rocket:
- [Access the Website](#access):key:
- [Libraries Used](#dependencies):computer:
- [Future Plans](#plans):bulb:

<br />
<a name="images"></a>

## Images :file_folder:

These images might be from older versions of the same app and might appear different from the one you setup. Please open
an issue for requesting icons or suggesting any colour improvements.
### Version 3
![image](https://user-images.githubusercontent.com/64310471/235914376-f4aacb69-5589-494a-92df-e93e7c0affc1.png)

![image](https://user-images.githubusercontent.com/64310471/235914944-1fedb49f-1bde-423d-88cd-4af7873e74b5.png)

![image](https://user-images.githubusercontent.com/64310471/235915232-ebe37f29-31df-44ed-bc95-aa41a7f40626.png)


<br />
<a id="setup"></a>

## Setup Requirements :rocket:

- A computer :smiley:
- <a href="https://nodejs.org/en/"> node.js </a>
- Yarn (please use yarn), it can be downloaded via npm

    ```bash
    npm install -g yarn
    ```

<a id="access"></a>

## How to access the website/Setup Procedure :key:

<b>Version 2(vuejs implementation)</b>
<br />
If your wish to set it up for development follow these steps, else check the releases for a better bundled package

1. There are 2 main folders server and client, the vuejs code is inside client and the express backend code is inside
   server

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

3. The website can be found on ipv4:8080, ~~check version 1 procedure to see how you can find your ipv4 address~~. From
   version 2.4 onwards the ip address is displayed for you, visit that on any device on the same network.

<b>For version 1</b>
<br />

1. Open your desired terminal/command prompt - cmd, terminal, git bash on the computer you plan to use as your cloud
   server

2. Type `ipconfig` and find the IPv4 address

   ![image](https://user-images.githubusercontent.com/64310471/117740661-8a100200-b21e-11eb-803a-07423054fac3.png)

3. The website will be available on IPv4 Address:5000 For example: 192.168.1.7:5000

4. To start the server run the following 2 commands

    ```bash
    yarn install
    yarn start
    ```

5. You can access the website on any device at that address

<br />

<a id="dependencies"></a>

## Libraries used - Links to some main ones npm/official website :computer:

- <a href = "https://www.npmjs.com/package/express">expressjs</a> with axios, cors, multer, fs
- <a href="https://www.npmjs.com/package/dropzone">dropzone.js</a>
- <a href="https://vuejs.org/">vuejs</a>
- <a href="https://www.npmjs.com/package/vue-sidebar-menu">vue-sidebar-menu</a>
- <a href="https://www.npmjs.com/package/zip-a-folder">zip-a-folder</a>
- <a href="https://www.npmjs.com/package/local-ipv4-address">local-ipv4-address</a>



<a id="plans"></a>

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
- [x] Implement some security features - Restricted access to other files on the system by blocking requests outside the
  home directory - This has been done for navigation(getting directory content), for downloading files and folders and
  for deleting files or folders
- [x] Password protect files (for downloading on other devices)
- [ ] Non downloadable files
- [ ] Move files into different directories
- [ ] Updated docker support -> *not working on this, and not in the forseeable roadmap*

## Development oriented plans :bulb:

- Clean unnecessary code
- Make API RESTFUL
- make various synchronous processes asynchronous
- Reduce dependencies

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
