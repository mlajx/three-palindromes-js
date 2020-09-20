require('./script');
var fs = require('fs');
for(let i = 10000000; i <= 999999999; i++) {
    const result = findThePalindromes(i.toString());
    fs.appendFileSync('result.txt', `${i} \t ${result.typeUsed} \t ${result.algToUse} \t ${result.ajustmentUsed} \n`, () => {});
}

// console.log(findThePalindromes("1000010"));