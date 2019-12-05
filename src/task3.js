import csv from "csvtojson";
import fs from "fs";
import paths from "./constants";

const writeText = fs.createWriteStream(paths.BASE_CSV_TEXT2);
const stream = fs.createReadStream(paths.BASE_CSV_PATH)
        .pipe(csv())
        .on('data', (data) =>  writeText.write(data))
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })

