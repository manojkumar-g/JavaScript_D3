var fs = require('fs');
fs.readFile('output.json',function (err,data) {
    if (err) {
      return console.error(err);
    }
    data = data.toString();
    var temp = JSON.parse(data);
    var k = {};
    var arr = [];
    var arr2 = [];
    var education ={
      "Educational level - Literate without educational level - Males":0,
      "Educational level - Literate without educational level - Females":0,
      "Educational level - Below Primary - Males":0,
      "Educational level - Below Primary - Females":0,
      "Educational level - Primary - Males":0,
      "Educational level - Primary - Females":0,
      "Educational level - Middle - Males":0,
      "Educational level - Middle - Females":0,
      "Educational level - Matric/Secondary - Males":0,
      "Educational level - Matric/Secondary - Females":0,
      "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Males":0,
      "Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Females":0,
      "Educational level - Non-technical diploma or certificate not equal to degree - Males":0,
      "Educational level - Non-technical diploma or certificate not equal to degree - Females":0,
      "Educational level - Graduate & above - Males":0,
      "Educational level - Graduate & above - Females":0,
      "Educational level - Unclassified - Males":0,
      "Educational level - Unclassified - Females":0
    }
    for (var i = 0,l=temp.length; i < l; i++) {
       var obj = temp[i];
       var age = obj["Age-group"];
       if(age != "All ages"){
         if(k.hasOwnProperty(age)){
           k[age] = parseInt(obj["Literate - Persons"])+parseInt(k[age]);
         }
         else{
           k[age] = obj["Literate - Persons"];
         }
      }
      else{
        for (var column in education) {
          education[column] = parseInt(obj[column])+parseInt(education[column]);
        }
      }

    }
    for (var l in k) {
      if (k.hasOwnProperty(l)) {
        arr.push({"x":l,"y":k[l]});
      }
    }
    for (var value in education) {
      if (education.hasOwnProperty(value)) {
        arr2.push({"x":value,"y":education[value]});
      }
    }

    var wstream = fs.createWriteStream('graph.json');
    wstream.write(JSON.stringify(arr));
    var wstream = fs.createWriteStream('eduGraph.json');
    wstream.write(JSON.stringify(arr2));
    console.log("Successfully created!");
});
