# local-cloud

This project is still under development:bangbang:

This program can turn your desktop into a local cloud server. This is a website which will run locally over your wifi(without port forwarding) and will be accessible to all your devices.

You can now access and transfer files from your different devices with ease.

## Table Of Contents

- [Images](#images):file_folder:
- [Setup Requirements](#setup) :rocket:
- [Access the Website](#access):key:
- [Libraries Used](#dependencies):computer:
- [Future Plans](#plans):bulb:

<br />
<a name="images"></a>

## Images- Sneak Peaks:file_folder:

Please note, the colours are not confirmed and are likely to change. The new design is currently in a very early development stage.
![image](https://user-images.githubusercontent.com/64310471/118494261-996fdd80-b73f-11eb-8013-80794fad875d.png)

![image](https://user-images.githubusercontent.com/64310471/118494035-57469c00-b73f-11eb-9265-5118659f7495.png)

<br />
<a name="setup"></a>

## Setup Requirements :rocket:

- A computer :smiley:
- <a href="https://nodejs.org/en/"> node.js </a>
- Yarn (please use yarn), it can be downloaded via npm

  ```
  npm install -g yarn
  ```

<a name="access"></a>

## How to access the website :key:

1. Open your desired terminal/command prompt - cmd, terminal, git bash on the computer you plan to use as your cloud server

2. Type `ipconfig` and find the IPv4 address

   ![image](https://user-images.githubusercontent.com/64310471/117740661-8a100200-b21e-11eb-803a-07423054fac3.png)

3. The website will be available on IPv4 Address:5000
   For example: 192.168.1.7:5000

4. To start the server run the following 2 commands

   ```
   yarn install
   yarn start
   ```

5. You can access the website on any device at that address

<a name="dependencies"></a>

## Libraries used - Links to npm :computer:

- <a href = "https://www.npmjs.com/package/express">expressjs</a>
- <a href="https://www.npmjs.com/package/dropzone">dropzone.js</a>

<a name="plans"></a>

## Future Plans :bulb:

- Better UI
- Use vue.js
- implement some security features

<br />

## Icon Credits

- http://icons8.com

  - https://iconarchive.com/show/ios7-icons-by-icons8/Network-Cloud-Storage-icon.html

- <div>Icons made by <a href="https://www.flaticon.com/authors/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

- <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
