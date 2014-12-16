type = function(val){
  return Object.prototype.toString.call(val).slice(8,-1);
}

struct_record_definition = function(val,key,_type){
  return _type == "Number" ? "float "+key+";" :
  _type == "String" ? (
    val.length > 1 ? "char *"+key+";" : "char "+key+";"
  ) :
  _type == "Boolean" ? "int "+key+";" :
  _type == "Array" ? (
    type(val[0]) == "Number"  ? "float " + key  +"[];" :
    type(val[0]) == "String"  ? "char *"+key+";" :
    type(val[0]) == "Boolean" ? "int "+key  +";" :
    "void * "+key+";"
  ) :
  "void "+key+";"
}

struct_definition = function( structName,object ){
  var body = "";

  for(var key in object){
    var val = object[key];
    var t = type(val);
    body += "\n\t"+struct_record_definition (val,key,t)
  }
  return [
  "struct ",structName," {",
  body,
  "\n};"
  ].join("")
}

struct_declaration = function(list){
  var body = "";
  for(var i = 0; i < list.length; i++){

    var record = list[i];
    var record_body = [];
    for(var key in record) {
      var val = record[key];
      record_body.push(struct_property_declaration(val));
    }
    body += "\n\t{" + record_body.join() + "},";
  }
  return body;
}

struct_property_declaration = function(value){
  var _type = type(value);
  return _type == "Number"  ? value :
  _type == "String"  ? (
    value.length > 1 ? '"'+value+'"' : "'"+value+"'"
  ) :
  _type == "Boolean" ? ( value && 1 || 0 ) :
  _type == "Array"   ? (
    type(value[0]) == "String" &&  '"'+value.join('",\"')+'"'
  ) : value+""
}

function json_to_c(var_name, type_name, json_list){
  var definition = struct_definition( type_name, json_list[0] );

  var body = "";



  var declaration = [
    "struct ",type_name," ",var_name,"[] = {",
    struct_declaration(json_list),
    "\n};"
  ].join("")


  return {
      then: function(callback){
        return callback(definition + "\n" + declaration);
      }
  }
}

module.exports = {
  json_to_c: json_to_c
}
