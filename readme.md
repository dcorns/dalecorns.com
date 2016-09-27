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
`rhc port-forward -a` APP_NAME
####Connect to openshift using shell
`rhc ssh -a` APP_NAME
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
####Useful OpenShift commands
`rhc tail -a dalecorns` Output logs to terminal in real time. `ctl_app status` Run in ssh session to show status of gears more accurately than the OpenShift console. `ctl_all start` Start application and dependencies.