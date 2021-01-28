docker run --rm --name nginx -p 8888:80 -v %CD%:/usr/share/nginx/html:ro -d docker.io/nginx
start http://localhost:8888