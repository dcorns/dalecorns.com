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