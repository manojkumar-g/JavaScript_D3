var fs = require('fs');
var wstream = fs.createWriteStream('output.json',{flags: 'a'});
var str = "[\n";
wstream.write(str);
var reader = function(fileName,callback) {
  fs.readFile(fileName,function (err,data) {
      if (err) {
        return console.error(err);
      }
      data = data.toString();
      var temp = "";
      var count = true;
      for (var i = 0,l=data.length; i < l; i++) {
        var char = data[i];
        if(char == '\n'){
          if(count){
              var columnNames = temp.split(",");
              count =false;
          }
          else{
              var arr = temp.split(",");
              if(i != l-1){
                wstream.write("{");
                for (var j = 0,len=arr.length; j < len; j++) {
                  if(j!=len-1){
                    wstream.write('"'+columnNames[j]+'":"'+arr[j]+'",');
                  }
                  else{
                    var name = columnNames[j].substr(0,columnNames[j].length-2);
                    var value = parseFloat(arr[j]);
                    wstream.write('"'+name+'"'+':'+'"'+value+'"');
                  }
                }
                wstream.write( "},\n");
              }
              else{
                wstream.write("{");
                for (var j = 0,len=arr.length; j < len; j++) {
                  if(j!=len-1){
                    wstream.write('"'+columnNames[j]+'":"'+arr[j]+'",');
                  }
                  else{
                    var name = columnNames[j].substr(0,columnNames[j].length-2);
                    var value = parseFloat(arr[j]);
                    wstream.write('"'+name+'"'+':'+'"'+value+'"');
                  }
                }
                wstream.write( "}\n");
              }

          }
          temp = "";
        }
        else{
          temp = temp+char;
        }
      }

    callback(str);
  });

};
var readfiles = function () {
  reader("csv/India2011.csv",function(str) {
    wstream.write(',');
    reader("csv/IndiaSC2011.csv",function (str) {
      wstream.write(',');
      reader("csv/IndiaST2011.csv",function (str) {
        wstream.write(']');
        console.log("Successfully created");
      }
      );
    });
  }
  );

}
readfiles();
