require('./script');
// var fs = require('fs');

// for(let i = 1000000; i <= 10000000; i++) {
//     const result = findThePalindromes(i.toString());
//     fs.appendFileSync('result.txt', `${i} \t ${result.typeUsed} \t ${result.algToUse} \t ${result.ajustmentUsed} \n`, () => {});
// }

findThePalindromes('42002');

let errors = [];
for(let i = 10000; i < 100000; i++) {
    if(!findThePalindromes(i.toString(), true)) {
        errors.push(i)
    }
    // if(findThePalindromes(i.toString(), true, false) == 'asd') {
    //     console.log(i);
    //     break;
    // }
}
console.log(errors);
