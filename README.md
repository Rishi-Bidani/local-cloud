# local-cloud

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

## Images:file_folder:

![image](https://user-images.githubusercontent.com/64310471/117706042-6fbc3100-b1ea-11eb-8edd-54222ff5e244.png)

![image](https://user-images.githubusercontent.com/64310471/117706211-a3975680-b1ea-11eb-9b04-513ff068f3f6.png)

<br />
<a name="setup"></a>

## Setup Requirements :rocket:

- A computer :smiley:
- <a href="https://nodejs.org/en/"> node.js </a>

<a name="access"></a>

## How to access the website :key:

1. Open your desired terminal/command prompt - cmd, terminal, git bash on the computer you plan to use as your cloud server

2. Type `ipconfig` and find the IPv4 address

![image](https://user-images.githubusercontent.com/64310471/117740661-8a100200-b21e-11eb-803a-07423054fac3.png)

3. The website will be available on IPv4 Address:5000
   For example: 192.168.1.7:5000

4. YOu can access the website on any device at that address

<a name="dependencies"></a>

## Libraries used - Links to npm :computer:

- <a href = "https://www.npmjs.com/package/express">expressjs</a>
- <a href="https://www.npmjs.com/package/dropzone">dropzone.js</a>

<a name="plans"></a>

## Future Plans :bulb:

- Better UI
- Use vue.js
- implement some security features
