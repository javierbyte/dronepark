cd ~/keystone/dronepark
git fetch --all
git reset --hard origin/master
pm2 restart dronepark
