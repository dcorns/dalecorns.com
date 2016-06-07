#dalecorns.com
###An interesting web site
openshift deployment: rhc app create 'dalecorns' nodejs-0.10 --from-code=https://github.com/dcorns/dalecorns.com.git

rhc app create 'dalecorns' https://raw.githubusercontent.com/icflorescu/openshift-cartridge-nodejs/master/metadata/manifest.yml --from-code=https://github.com/dcorns/dalecorns.com.git https://raw.githubusercontent.com/icflorescu/openshift-cartridge-mongodb/master/metadata/manifest.yml