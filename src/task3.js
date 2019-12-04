import * as csv from "csvtojson";
import * as fs from "fs";

const writeText = fs.createWriteStream('node_mentoring_t1_2_input_example1.txt');

var s = fs.createReadStream('node_mentoring_t1_2_input_example.csv')
        .pipe(csv.csv())
        .on('data', (data) =>  writeText.write(data))
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('After File Content Checked.');
        });

