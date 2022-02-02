var fs = require("fs");
var xml2js = require("xml2js");

var parser = new xml2js.Parser();

datascelta = "2022-01-25";
nomefile = ""; //Senza Aggiungere .xml

//Carico il file
fs.readFile(__dirname + "/update.xml", function (err, data) {
  parser.parseString(data, function (err, result) {
    jso = result; //jso rappresenta i dati json

    //Effettuo una modifica

    for (paziente of jso["covid-19"].pazienti[0].paziente) {
      if (ventunogiorni(paziente.dataDiagnosi[0], datascelta) === true) {
        paziente.statiClinici[0].statoClinico.push({
          tipoStatoClinico: ["2"],
          dataStatoClinico: ["2022-01-03"],
          terapiaInCorso: ["0"],
          terapiaDescrizione: [""],
          intubato: [""],
        });
      }
    }

    //Risalvo il contenuto in xml sul file prova.xml
    saveIt();

    function saveIt() {
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(jso);
      fs.writeFileSync(nomefile + ".xml", xml);
    }

    function ventunogiorni(data1, data2) {
      const date1 = new Date(data1);
      const date2 = new Date(data2);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= 21) {
        return true;
      } else {
        return false;
      }
    }

    console.log("Fine");
  });
});
