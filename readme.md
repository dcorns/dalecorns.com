#dalecorns.com
###An interesting web site
####openshift deployment:
 standard: rhc app create 'dalecorns' nodejs-0.10 --from-code=https://github.com/dcorns/dalecorns.com.git

use latest node version and mongodb: https://github.com/icflorescu/openshift-cartridge-nodejs/

rhc app create 'dalecorns' https://raw.githubusercontent.com/icflorescu/openshift-cartridge-nodejs/master/metadata/manifest.yml --from-code=https://github.com/dcorns/dalecorns.com.git https://raw.githubusercontent.com/icflorescu/openshift-cartridge-mongodb/master/metadata/manifest.yml