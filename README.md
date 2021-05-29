# local-cloud

This project is still under development:bangbang:

This program can turn your desktop into a local cloud server. This is a website which will run locally over your wifi(without port forwarding) and will be accessible to all your devices.

You can now access and transfer files from your different devices with ease.
The new version (version 2) has been implemented using vuejs.

## Table Of Contents

- [Images](#images):file_folder:
- [Setup Requirements](#setup) :rocket:
- [Access the Website](#access):key:
- [Libraries Used](#dependencies):computer:
- [Future Plans](#plans):bulb:

<br />
<a name="images"></a>

## Images:file_folder:

These images might be from older versions of the same app and might appear different from the one you setup. Please open an issue for requesting icons or suggesting any colour improvements.
![image](https://user-images.githubusercontent.com/64310471/118494261-996fdd80-b73f-11eb-8013-80794fad875d.png)

![image](https://user-images.githubusercontent.com/64310471/118494035-57469c00-b73f-11eb-9265-5118659f7495.png)

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
   yarn start

   TERMINAL 2
   cd client
   yarn serve
   ```

3. THe website can be found on ipv4:8080, check version 1 procedure to see how you can find your ipv4 address.

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

<a name="dependencies"></a>

## Libraries used - Links to npm/official website :computer:

- <a href = "https://www.npmjs.com/package/express">expressjs</a>
- <a href="https://www.npmjs.com/package/dropzone">dropzone.js</a>
- <a href="https://vuejs.org/">vuejs</a>

<a name="plans"></a>

## Future Plans :bulb:

- implement some security features
- delete files

<br />

## Some useful new features

- Check file size
- ctrl + click on file to download directly

## Icon Credits

- <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## Favicon

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
