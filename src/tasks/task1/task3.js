import csv from "csvtojson";
import fs from "fs";
import paths from "./constants";
import utils from '../utils/errors'
const writeText = fs.createWriteStream(paths.BASE_CSV_TEXT2);
fs.createReadStream(paths.BASE_CSV_PATH)
        .pipe(csv())
        .on('data', (data) =>  writeText.write(data))
        .on('error', utils);

