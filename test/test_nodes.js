var json_to_c = require( '../app.js' ).json_to_c;
var Promise = require('promise');
var p = require('lodash.partial');
var writeFile = Promise.denodeify(require('fs').writeFile)
var readFile = Promise.denodeify(require('fs').readFile)
var exec = Promise.denodeify(require('child_process').exec, function(err, stdout, stderr){
  return [err,stdout]
})

readFile('nodes.json')
.then( JSON.parse )
.then( p(json_to_c, 'nodes','Node') )
.then( p(writeFile,'nodes.c') )
.then( p(writeFile,'app.c', [
    '#include <stdio.h>',
    '#include "nodes.c"',
    '',
    'int main(){',
    '  printf("Node 0 name: %c", nodes[0].name );',
    '  return 0;',
    '}'
  ].join('\n')
))
.then( p(exec, 'gcc app.c && a') )
.then( function( output ){
  if( output == 'Node 0 name: A' ){
    console.log('PASS');
  } else {
    console.log('FAIL')
  }
})
