require('./script');
var fs = require('fs');

// for(let i = 200000; i <= 1000000; i++) {
//     const result = findThePalindromes(i.toString());
//     fs.appendFileSync('result2.txt', `${i} \t ${result.typeUsed} \t ${result.algToUse} \t ${result.ajustmentUsed} \n`, () => {});
// }

findThePalindromes('19079');

let errors = [];
for(let i = 100000; i < 200000; i++) {
    if(!findThePalindromes(i.toString(), true, true, true)) {
        errors.push(i)
    }
    // if(findThePalindromes(i.toString(), true, false) == 'asd') {
    //     console.log(i);
    //     break;
    // }
}
console.log(errors);
