require('./script');
var fs = require('fs');

for(let i = 109370442; i <= 900000000; i++) {
    const result = findThePalindromes(i.toString());
    fs.appendFileSync('result.txt', `${i} \t ${result.typeUsed} \t ${result.algToUse} \t ${result.ajustmentUsed} \n`, () => {});
}