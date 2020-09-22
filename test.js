require('./script');
var fs = require('fs');

for(let i = 1000000; i <= 10000000; i++) {
    const result = findThePalindromes(i.toString());
    fs.appendFileSync('result.txt', `${i} \t ${result.typeUsed} \t ${result.algToUse} \t ${result.ajustmentUsed} \n`, () => {});
}