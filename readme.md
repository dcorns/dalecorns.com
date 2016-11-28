#dalecorns.com
###An interesting web site
####openshift deployment:
 standard: `rhc app create 'dalecorns' nodejs-0.10 --from-code=https://github.com/dcorns/dalecorns.com.git`

use latest node version and mongodb: https://github.com/icflorescu/openshift-cartridge-nodejs/

`rhc app create 'dalecorns' https://raw.githubusercontent.com/icflorescu/openshift-cartridge-nodejs/master/metadata/manifest.yml --from-code=https://github.com/dcorns/dalecorns.com.git https://raw.githubusercontent.com/icflorescu/openshift-cartridge-mongodb/master/metadata/manifest.yml`

####openshift update
`git remote add openshift ssh://`openshift-git-url<br/>
Get the git url: `rhc show-app` ' APP_NAME<br/>
Add the marker file `hot_deploy` to skip server restart on deployment: `touch .openshift/markers/hot_deploy`<br/>
Now you can update using `git push openshift master`
####Connect to openshift mongo database from shell
`rhc port-forward` APP_NAME
####Connect to openshift using shell
`rhc ssh -a` APP_NAME
####Retrieve mongo database
Forward the mongo database connection from openshift as specified above</br>
Use a local terminal to change to the directory to which the data will be copied</br>
Run `mongodump`<br/>
This will create a dump directory and store the data inside it.</br>
Next replace the local database collections that exist in the database retrieved from the remote by starting mongod locally, and then changing to the parent of the dump directory created by mongodump. Then run `mongorestore --drop`</br>
###Alternate Firebase Setup
Create a firebase account and application<br/>
Go to application settings, permissions, service account<br/>
Create Service Account Using the following settings:<br/>
Furnish new key, Key type JSON<br/>
Give the account a name and leave everything else at defaults, then click **CREATE**<br/>
A json file with credentials will be downloaded to the local machine
####Setup access to firebase in node
Edit ~/.bash_profile:<br/>
export FIREBASE='*contents of json file*'<br/>
export FIREBASE_DB='*appName*.firebaseio.com'<br/>
Make available in app:
`var firebaseCredentials = JSON.parse(process.env.FIREBASE);`
<br/>
`require('firebase')`<br/>
see server.ts for remaining details
#####Add evs to openshift
Because the custom environment variables on openshift are limited to 512 characters a method for breaking the firebase secret up into multiple variables must be employed. Using  the usefulFunctions.breakUpString function, break the firebase private key into strings of 500 characters or less. Then create environment variables for each one in openshift.
rhc env set FIREBASE_KEY1='*partOfKey*' -a *openshiftAppName* (etc.)<br/>
In the same manner provide variables for email, project Id and database(see server.ts)<br/>
rhc env set FIREBASE_DB='*appName*.firebaseio.com' -a *openshiftAppName*<br/>
Verify variables: rhc env list -a *openshiftAppName*
####Testing Firebase Data access
set fire base rules wide open
```
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```
####Development Flow
For development gulp and grunt is used. Gulp is used to call grunt indirectly.
#####Gulp Tasks
######watcher
Running `gulp watcher` will insure that all the css is converted from 4 to 3 and combined into one file, insure that the all the Java Script is converted from ES6 to 5 and combined into one file, insures that all the html views are converted to JavaScript, and keeps Development/index.html in up to date with app/index.html.
####Deployment
`gulp ship` transfers the contents of Development to public for git deployment to openshift `git push openshift master`
#####Useful OpenShift commands
`rhc tail -a dalecorns` Output logs to terminal in real time. `ctl_app status` Run in ssh session to show status of gears more accurately than the OpenShift console. `ctl_all start` Start application and dependencies.
###AWS Setup
######Create new VPC for a separate public ip
######Launch a new instance of Amazon Linux AMI on new VPC
######Add security rules for HTTP, HTTPS, and SSH traffic
######Create or choose SSH key
######Connect to new instance via SSH or the AWS CLI
Get the instance ID from the EC2 console or with describe-instances using the CLI<br/>
Get the public DNS from the EC2 console or using describe-instances using the CLI<br/>
Locate the the pem file that was downloaded when the SSH key was created or chosen<br/>
AWS instructs us to connect like this:
`ssh -i /path/my-key-pair.pem ec2-user@ec2-198-51-100-1.compute-1.amazonaws.com`<br/>
It does not work.<br/>
Do this instead:<br/>
Connecting to EC2 instance:
Connect using Putty, or PuTTY. It is an SSH and telnet client that can be used to connect to your remote Linux instances. Make sure you have the tool called PuttyGen to create your private key (*.ppk).<br/>
Run this command: `puttygen <theAWS.pemFile> -o <nameForPuttyKey>.ppk`<br/>
Open putty and put the ec2 domain name or ip address provided on the instance dashboard into the appropriate field.<br/>
Navigate to connection>SSH>Auth in the category tree and and highlight it.<br/>
Browse for the key created above and verify it is trusted when the prompted.<br/>
Go back to the session part of the tree, give the session a name and save it for future use.<br/>
Click open. Login as ec2-user.<br/>
Click the x to close.<br/>
######Install supporting software
`sudo yum install git`
Install node with 'n' version control: This command will set both PREFIX and N_PREFIX to $HOME/n, installs n to $HOME/n/bin, modifies the initialization files of supported shells to export N_PREFIX and add $HOME/n/bin to the PATH, and installs the latest stable node version. `curl -L http://git.io/n-install | bash`</br>
Both n itself and all node versions it manages are hosted inside a single, optionally configurable directory, which can later be removed with the included n-uninstall script.<br/>
n-update updates n itself to the latest version. See the n-install repo for more details.<br/>
Update npm to latest version `npm install -g npm`<br/>
Install mongodb community edition:<br/>
```curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.2.11.tgz
tar -zxvf mongodb-linux-x86_64-amazon-3.2.11.tgz
mkdir mongodb
mv mongodb-linux-x86_64-amazon-3.2.11/* mongodb
echo export PATH=/home/ec2-user/mongodb/bin:$PATH >> /home/ec2-user/.bashrc
```
Create a /data/db folder<br/>
Change permissions on the /data/db folder `chmod 0755 /data/db`<br/>
Change ownership of the /data/db folder `sudo chown -R ec2-user:ec2-user /data/db`<br/>
Test mongodb and mongo client:
```
   mongod &
   mongo //exit using CTRL-D
   mongod --shutdown
   ```
######Setup port forwarding:
Forward port 80 to 3000: `sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`</br>
Forward port 443 to 3000: `sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000`<br/>
Save settings: `sudo service iptables save`<br/>
######Important
No amount of iptables configuring or EC2 security group configuring can fix a node application that is configured to listen on 127.0.0.1. Often this is the port used in tutorials, but it is a loop back only connection for localhost. Therefore node will never listen/open a port externally this way. MAKE SURE YOU MODIFY YOUR APPLICATION TO LISTEN ON HOST 0.0.0.0 IF IT IS CURRENTLY SET TO 127.0.0.1<br/>
######Transfering files via scp
The following will transfer the specified file into the ec2-user home directory</br>
scp -i <path to pem file> <path to file> ec2-user@<public domain name>:~</br>
######Persist the application beyond ssh session
A quick and dirty way to do this:</br>
Run the screen command before starting the application. When you exit the ssh, the node process will keep running. To access it with a new ssh, after logging on run `screen -r`. This will put you right back where you left off.<br/>
A better way:</br>
Install nodemon `npm install -g nodemon`. By using nodemon to start the application, the application will restart automatically if it crashes and if any of the files change. Screen will still be used for persistence, but we also give the screen a unique name by which to refer to it. Sometimes nodemon will have issues as with this site. If that is the case, simply use node in all the places where nodemon is referenced below.
```
screen -S myapp
nodemon appname
```
Now when we ssh back in we use the command `screen -r myapp` to bring the session back up. Note that if myapp is the only screen running, then you will still need to recall it without the name ie `screen -r`<br/>
Now let's make the all of this run when the instance is started.<br/>
First we make an executable shell script containing the commands:<br/>
```
touch ~/startApp.sh
chmod u+x ~/startApp.sh
```
Add the following commands to the file (you can do this using the vi command to load vim):
```
#!/bin/bash
cd /home/ec2-user/<application directory>
nodemon <application name>
```
Now that we have a script to load the application, we will call it using screen when the instance starts or is restarted. Add the following line to /etc/rc.local. If the file does not exist create in and give it 755 permissions.<br/>
`su - ec2-user -c 'screen -d -m -S <chosen name for screen> /home/ec2-user/startApp.sh`<br/>
Remember that in order to shutdown the application you will need to use `screen -r` or `screen -r <chosen name for screen>` in order to access the screen that the application is running under.
#####Development Flow
minimize bundle.js
Copy host and server js files and public directory to AWS (replace existing files) Copy api/*.*/*.js to AWS Copy dbRunner.js to AWS Copy production package.json