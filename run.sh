docker run --rm --name nginx -p 8888:80 -v $(pwd):/usr/share/nginx/html:ro -d docker.io/nginx
open http://localhost:8888