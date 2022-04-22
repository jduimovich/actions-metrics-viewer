# actions-metrics-viewer
Single Web Page Viewer for CSV Data

To run using a local web server

## Windows
```
docker run --rm --name nginx -p 8888:80 -v %CD%:/usr/share/nginx/html:ro -d docker.io/nginx 
```

macOS 
```
docker run --rm --name nginx -p 8888:80 -v $(pwd):/usr/share/nginx/html:ro -d docker.io/nginx 
```

The metrics page will be found at  [http://localhost:8888](http://localhost:8888) 

To stop the local server use `docker stop nginx`

There are utilities in `hack/run{sh/cmd}` `hack/stop{sh/cmd}` for Windows and Linux which also open the browser window on `http://localhost:8888`

## Saved Queries

The metrics viewer will create a query URL as the page is configured. You can save this URL to return to the exact same query in future without manually reconfiguring the page every visit.

For example, this link will show the top 6 actions for the past 4 months [ http://localhost:8888/index.html?months=4&top=6](http://localhost:8888/index.html?months=4&top=6) 
 
