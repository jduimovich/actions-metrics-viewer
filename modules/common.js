function getTextAndUpdate(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        success(this.responseText);
      } else {
        error();
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.setRequestHeader('Accept', 'text/plain');
  xhttp.send();
}
function setInnerHtml(id, html) {
  document.getElementById(id).innerHTML = html;
}
function trimQuotes(value) {
  return value.replace(/^"(.*)"$/, '$1')
}

// csv files have a date and name and a bunch of stats which are numbers 
function convertKnownField(fieldname, value) {
  if (fieldname == 'Date') {
    const simple = trimQuotes(value).split("T")[0] + "T12:00:00+00:00";
    return new Date(simple).toLocaleDateString('en-us');
  }
  if (fieldname == 'Name') {
    const trim_end_slash = trimQuotes(value).replace(/^(.*)\/$/, '$1')
    const simple_name = trim_end_slash.split("/")[1];  // rm redhat-actions prefix   
    return simple_name;
  }
  return parseInt(value);
}


const noMerge = window.location.href.includes("nomerge");
function nameAlias (name) {
  if (noMerge) return name;
  if (name == "redhat-developer/openshift-actions")
    return "redhat-actions/oc-installer";
  if (name == "openshift-actions")
    return "oc-installer";
  if (name == "redhat-developer/buildah-action")
    return "redhat-actions/buildah-build";
  if (name == "buildah-action")
    return "buildah-build";
  return name;
} ;

function ActionsData() { 
  this.labels = [];
  this.data = [];
  this.graph_colours =  [
    'rgb(255, 99, 132)',
    'rgb(255, 150, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];  
  this.tsuffix = noMerge? '(unmerged action names)' : "" ; 
}


function parse_csv(text) {
  var actionData = new ActionsData() 
  // split into lines, trim blank lines
  var lines = text.split(/\r\n|\n/);
  lines = lines.filter(function (x) { return x.trim().length > 0 }); 
  var labels = lines[0].split(',');
  actionData.labels = labels.filter(function (e) { return e != 'Name' && e != 'Date' })
  for (var i = 1; i < lines.length; i++) {
    var data = lines[i].split(',');
    var r = new Object();
    for (var j = 0; j < labels.length; j++) {
      r[labels[j]] = convertKnownField(labels[j], data[j])
    }
    actionData.data.push(r)
  }
  return actionData;
}

function compute_derived_stats(actionData) {
  actionData.data.forEach(function (d) {
    d['UniqueRepos/UniqueOwners'] = (d['UniqueRepos'] / d['UniqueOwners']).toFixed(2)
    d['WorkflowRuns/UniqueRepos'] = (d['WorkflowRuns'] / d['UniqueRepos']).toFixed(2)
  })
  actionData.labels.push('UniqueRepos/UniqueOwners')
  actionData.labels.push('WorkflowRuns/UniqueRepos')
}

export {
  getTextAndUpdate, setInnerHtml,  parse_csv, compute_derived_stats, nameAlias
}