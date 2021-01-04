# Node JS with Express (for Linux [debian])

- Install NodeJs :

        sudo apt install nodejs

  **Note :** In some case you have to install **npm** (node package manager) manually.

  - npm installation :

        sudo apt install npm

- Check version :

        node --version

- Update npm globally :

        sudo npm install -g npm

#### Create a Node Server :

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  console.log(res);

  // process.exit();
});

server.listen(3000);
```

- Generate `package.json` for application :

        npm init

  **Note :** We can edit `package.json` file and in **script** write own command to run node server.

  ##### Example :

        "scripts": {
            "start": "node app.js",
            "start-server":"node app.js"
        }

  In this case `npm start` will start the server app.js

  Note : **start** is a special node command . But if we want our own command such as **start-server** , we have to use `npm run start-server`

#### Installing packages :

We can install node packages globally(can be used from any project) or just for the project.
In a project we can have 2 types of dependencies like for production and for development only.

- **ExpressJs** : is a backend web application framework for Node.

        npm install --save express

  We installed express for production as we will need this package after hosting our application.

- **nodemon** : is a development tool that will automatically restart our npm start whenever we edit our code !

        npm install --save-dev nodemon

  As we have installed nodemon for develoment , it will install as **devDependencies**

        "devDependencies": {
                "nodemon": "^2.0.2"
            }

  After installing nodemon successfully , the package.json file will be like this for the script :

        "scripts": {
            "start": "nodemon app.js",
        },

- BodyParser : is used for parsing data.

        npm install --save bodyParser

  After installation :

        "dependencies": {
            "body-parser": "^1.19.0",
            "express": "^4.17.1"
        }

### Debugger Setting in VS Code for NodeJs

<ol>
    <li>Go to debuger</li>
    <li>Add configuration</li>
    <li>Select node.js</li>
    <li>Edit launch.json file</li>

>

    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/app.js",
            "restart": true,
            "runtimeExecutable": "nodemon"
        }
    ]

<li>save</li>

</ol>

> Note : in the json file we just chnage the default **runtimeExecutable** value **node** to our third party package **nodemon**

### Model View Controller (MVC)

The Model-View-Controller (MVC) is an architectural pattern that separates an application into three main logical components: the **model**, **the view**, and **the controller**.Each of these components are built to handle specific development aspects of an application.MVC is one of the most frequently used industry-standard web development framework to create scalable and extensible projects.

![](https://media.geeksforgeeks.org/wp-content/uploads/mvc-block-diagram.png)
