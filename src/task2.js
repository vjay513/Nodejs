const csv = require('csvtojson');
const fs = require('fs');
const paths = require('./constants'); 
const util = require('./utils/errors');

const writeText = fs.createWriteStream(paths.BASE_CSV_TEXT1);
fs.createReadStream(paths.BASE_CSV_PATH)
        .pipe(csv())
        .on('data', (data) =>  writeText.write(data))
        .on('error', util);









    /*
====================================================== Practice ======================================    
    const fs = require('fs');
const es = require('event-stream');
const csvFilePath='node_mentoring_t1_2_input_example.csv';
const readCSv = fs.createReadStream(csvFilePath);
const writeText = fs.createWriteStream('node_mentoring_t1_2_input_example.txt');


 const csv = require('csvtojson')
 csv().fromFile(csvFilePath).then((jsonObj) => {
    writeText.write(JSON.stringify(jsonObj, null, 2));
}); */

/* const csv = require('csv-parser');
const results = [];
fs.createReadStream(csvFilePath).pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    writeText.write(JSON.stringify(results, null, 2));
}); */  
