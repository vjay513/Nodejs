
const csv = require('csvtojson');
const fs = require('fs');
const es = require('event-stream');

const writeText = fs.createWriteStream('node_mentoring_t1_2_input_example.txt');
const results = [];

var s = fs.createReadStream('node_mentoring_t1_2_input_example.csv')
        .pipe(csv())
        .on('data', (data) => results.push(JSON.parse(data.toString())))
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('After File Content Checked.');
            writeText.write(JSON.stringify(results, null, 2));
        });









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
