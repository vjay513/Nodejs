
(() => {
const csvFilePath='node_mentoring_t1_2_input_example.csv'
const csv = require('csvtojson')
 csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
	console.log(jsonObj);
})

const jsonArray=  csv().fromFile(csvFilePath);
})();