(() => {
    process.openStdin().addListener('data', data => { 
        process.stdout.write('Output' + data.toString().split('').reverse().join('')+ '\n\n');
    });
})();