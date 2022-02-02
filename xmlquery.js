var fs = require("fs");
var xml2js = require("xml2js");

var parser = new xml2js.Parser();

//Carico il file
fs.readFile(__dirname + "/update.xml", function (err, data) {
  parser.parseString(data, function (err, result) {
    jso = result; //jso rappresenta i dati json

    //Effettuo una modifica
    jso["covid-19"].pazienti[0].paziente[0].nome[0] = "michele")

    //Risalvo il contenuto in xml sul file prova.xml
    saveIt();

    function saveIt() {
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(jso);
      fs.writeFileSync("prova.xml", xml);
    }

    console.log("Fine");
  });
});
