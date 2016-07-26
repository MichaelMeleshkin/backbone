## Backbone application. Todo list
#### How to run

1. Clone the application on your PC and go to the app directory
2. NodeJS, NPM and MongoDB must be installed on the PC.
3. Run MongoDB: "sudo systemctl start mongodb"
4. Install all dependencies: "npm install"
5. For PHPStorm you should go to the "Run/Debug Configuration" and create new Node.js configuration:
- Node interpreter: path to nodejs folder (in my case: "/usr/bin/node")
- Working directory: path to backbone application
- JavaScript file: server/app.js
6. Launch the server which you have just created

<!--Install mongodb and run "sudo systemctl start mongodb"-->
<!--https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04-->