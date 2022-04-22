# actions-metrics-viewer
Single Web Page Viewer for CSV Data

To run using a local web server

Windows
```
docker run --rm --name nginx -p 8888:80 -v %CD%:/usr/share/nginx/html:ro -d docker.io/nginx 
```

macOS 
```
docker run --rm --name nginx -p 8888:80 -v $(pwd):/usr/share/nginx/html:ro -d docker.io/nginx 
```

The metrics page will be found at  [http://localhost:8888](http://localhost:8888) 

To stop the local server use `docker stop nginx`



