# NodeJS_MVC_with_Doc
**learning**

# Node JS (for Linux [debian])
* Install NodeJs : `$ sudo apt install nodejs` <br>

* check version : `$ node --version`

[in some case you have to install **npm** (node package manager) manually]()<br>

* npm installation : `$ sudo apt install npm`  <br>

* make a json file : `npm init` edit .json file and in **script** write your own command to run node server . 
<br> 

 #### Example :
 
>   

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node app.js",
        "start-server":"node app.js"
    }

in this case `npm start` will start the server app.js 
> Note : **start** is a special node command . But if we want our own command such as **start-server** , we have to use ```npm run start-server```

<br>

* update npm globally :`sudo npm install -g npm` <br>

#### Installing 3rd party packages :
* install nodemon : `npm install nodemon --save-dev`
as  we have installed nodemon for develoment , it will install as **devDependencies**

>
       "devDependencies": {
             "nodemon": "^2.0.2"
         }
            
  nodemon is a development tool that will automatically  restart our npm start whenever we edit our code !


#### Debugger setting in vs code for NodeJs

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
