# actions-metrics-viewer
Single Web Page Viewer for CSV Data

To run use a local web server

Windows
```
docker run --rm --name nginx -p 8888:80 -v %CD%:/usr/share/nginx/html:ro -d docker.io/nginx
start http://localhost:8888
```

macOS 
```
docker run --rm --name nginx -p 8888:80 -v $(pwd):/usr/share/nginx/html:ro -d docker.io/nginx
open http://localhost:8888
```

To stop the local server use `docker stop nginx`

Experimental. Click on the header to switch between two chart packages. Stil undecided which one is nicer. 


