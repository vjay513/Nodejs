function dataHandler(data){ 
    const inputStr= data.toString();
    const splitStr = inputStr.split('');
    const reverseStr = splitStr.reverse().join('');
    writeFunc(reverseStr);
}

writeFunc(str){
    process.stdout.write('Output' + str + '\n\n');
}
process.openStdin().addListener('data', dataHandler);