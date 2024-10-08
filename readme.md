
## Setup Instructions

To run this app locally you must have node.js , mongodb installed on your pc.

You must use chrome browser and create an account on metamask , **sepolia testnet** - https://metamask.io/download/ (installation link)

If you do not want to use mongodb locally , you can also use MongoDB atlas to run the project on cloud.

If not then you can also use Docker to run this project , but for that you must have Docker Desktop installed on your pc.

In addition to this if you want to test the webhooks , install ngrok to test locally , or deploy it to render.

Also to setup the app locally - use command **git clone url** locally and setup the .env file by taking reference of .env.example (dummy env) file in codebase.

You can find the links to do the following process below-
1. https://dashboard.ngrok.com/get-started/setup/windows - **NGROK**
2. https://nodejs.org/en/download/prebuilt-installer/current- **Node.js**
3. https://www.mongodb.com/docs/manual/installation/- **MongoDB**
4. https://www.mongodb.com/docs/atlas/getting-started/- **Atlas setup**
5. https://docs.docker.com/desktop/install/windows-install/ -**docker desktop setup**
6. https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/ - **reder deployment**

## Alchemy Setup
1. create a new project on alchemy and generate api keys - https://docs.alchemy.com/docs/alchemy-quickstart-guide 
2. webhook setup on alchemy -https://docs.alchemy.com/docs/how-to-get-started-with-custom-webhooks-in-3-minutes
**While creating webhooks , make sure to use sepolia testnet and create it using address activity tab**

## Telegram bot setup
1. To setup the telegram bot , you can use the following links-https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token
2. Get the chat id - https://www.alphr.com/find-chat-id-telegram/

## Run the app using docker
use the following commands in your terminal and run docker desktop simultaneously

1. docker build -t your_dockerhub_username/nodejs-image-demo .
2. docker images
3. docker run --name nodejs-image-demo -p 4000:4000 -d your_dockerhub_username/nodejs-image-demo
4. docker ps
5. docker logs container id

## Run the app without using docker 
1. cd into the directory
2. open terminal
3. npm install
4. node server.js

## Setting up grafana and prometheus
https://gist.github.com/piyushgarg-dev/7c4016b12301552b628bbac21a11e6ab (follow this link)

## Telegram real time notifications screenshot

![Screenshot 2024-09-10 210556](https://github.com/user-attachments/assets/99e1cef1-fa93-409f-a7b1-841400624c0e)

## Web Hooks Screenshot

![Screenshot 2024-09-10 205204](https://github.com/user-attachments/assets/27397960-136f-4b16-8690-0a5d9ccda601)

## MongoDB Atlas DB Screenshot

![Screenshot 2024-09-10 211418](https://github.com/user-attachments/assets/61c47b2e-f786-4cb5-98c3-0c340ba494ae)
