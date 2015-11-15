cd ~/keystone/dronepark
git fetch --all
git reset --hard origin/master
npm install
pm2 restart dronepark
