const fs = require('fs');
const csvFilePath='node_mentoring_t1_2_input_example.csv';
const csv = require('csvtojson');

 csv().fromFile(csvFilePath)
      .then((jsonObj)=>{
        fs.writeFile('./task2.txt', JSON.stringify(jsonObj), () => {});
      });
