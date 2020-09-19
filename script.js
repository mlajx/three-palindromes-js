testNumber = () => {

    //missing
    //II.2.ii.c

    // const number = "220159005"; //?!
    // const number = "52159035" //?!


    // const number = "4692801" //I.1
    // const number = "4004982" //I.2
    // const number = "399990000"; //I.3


    // const number = "29372542"; //II.2.i
    // const number = "20757504"; //II.2.ii.a
    // const number = "20159005" //II.2.ii.b

    // const number = "120205690315959428539";
    const number = "12267420096203532444";

    // const number = "2718281828459045235360";

    //A1
    // const number = "35484523543247631788132";

    //A2
    // const number = "153159265358979323845";

    //A3
    // const number = "303159265358979323847";
    //A4
    // const number = "303159265358979323841";
    //A5
    // const number = "103159265358979323847";
    //A6
    // const number = "102159265358979323842";

    //B1
    // const number = "104159265358979323842";
    //B2
    // const number = "104159265358979323844";
    //B3
    // const number = "120159265358979323840";
    //B4
    // const number = "112159265358979323840";
    //B5
    // const number = "110159265358979323841";
    //B6
    // const number = "113159265358979323841";
    //B7 (and B2)
    // const number = "113439265358979323843";

    // const number = "123159265358979323843"; //B2 and B7 ??
    // const number = "113159265358979323840"; //B4 and B6 ??

    //special number
    // const number = "14315926520897932384";
    findThePalindromes(number);
    // findAllTypeOfNumbers();
}

findAllTypeOfNumbers = () => {
    let allNumbers = {
    }

    let startN = 19000000;
    let diff = 10000;

    let multiplier = 88;
    let finder = "II.2.ii.c";


    let min = startN + diff * multiplier;
    let max = min + diff;

    console.log(min, max);


    for (let i = min; i < max; i++) {
        console.log("a");
        let a = findThePalindromes(i.toString(10));
        // console.log(a.typeUsed);
        // if (a.algToUse == 1 && a.ajustmentUsed == "I.3") {
        if (a.ajustmentUsed == finder) {
            console.log(i);
        }
    }
}

findThePalindromes = (number) => {

    const l = number.length;
    const g = 10;
    const m = Math.floor(l / 2);
    const p = {
        1: [],
        2: [],
        3: []
    };

    const getNumberDigitByIndex = (index) => {
        const reverseNumber = number.split('').reverse();
        return parseInt(reverseNumber[index]);
    }

    const D = (n) => {
        // correct module
        return ((n % g) + g) % g;
    }

    const startPs = (type = false) => {
        const y = type == 'A' ? l - 1 : l;
        const p2Start = type == 'B' ? 1 : 0;
        const p3Start = p2Start + 1;

        for (let i = 0; i < y; i++) {
            p[1].push('*');
            if (i > p2Start) {
                p[2].push('*');
            }
            if (i > p3Start) {
                p[3].push('*');
            }
        }
    }
    const definePDigit = (pNumber, index, value) => {
        p[pNumber][p[pNumber].length - index] = value;
        p[pNumber][index - 1] = value;
    }

    const definePx = (index, x) => {
        if (!pxStartWithOne) {
            definePDigit(1, index, x);
        } else {
            definePDigit(1, index + 1, x);
        }
    }
    const definePy = (index, y) => {
        definePDigit(2, index, y);
    }
    const definePz = (index, z) => {
        definePDigit(3, index, z);
    }

    let pxStartWithOne = false;
    const defineFirstPDigits = (x1, y1, z1) => {
        if (pxStartWithOne) {
            p[1][0] = 1;
            p[1][p[1].length - 1] = 1;
        }
        definePx(1, x1);
        definePy(1, y1);
        definePz(1, z1);
    }

    const definePxyz = (index, x, y, z) => {
        definePx(index, x);
        definePy(index, y);
        definePz(index, z);
    }

    const getPx = (index) => {
        if (!pxStartWithOne) {
            return p[1][index - 1];
        }
        return p[1][index];
    }
    const getPy = (index) => {
        return p[2][index - 1];
    }
    const getPz = (index) => {
        return p[3][index - 1];
    }
    const getPxyz = (index) => {
        return { x: getPx(index), y: getPy(index), z: getPz(index) }
    }

    const types = {
        A: {
            1: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const Z1 = D(D0 - DLm1 - DLm2 + 1);
                if (DLm2 > 2 && Z1) {
                    startPs();
                    defineFirstPDigits(DLm1, DLm2 - 1, Z1);
                    return true;
                }
                return false;
            },
            2: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                if (DLm2 > 2 && !D(D0 - DLm1 - DLm2 + 1)) {
                    startPs();
                    defineFirstPDigits(DLm1, DLm2 - 2, 1);
                    return true;
                }
                return false;
            },
            3: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const Z1 = D(D0 - DLm1 + 2);
                if (DLm2 < 2 && DLm1 != 1 && Z1) {
                    startPs();
                    defineFirstPDigits(DLm1 - 1, g - 1, Z1);
                    return true;
                }
                return false;
            },
            4: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const Z1 = D(D0 - DLm1 + 2);
                if (DLm2 < 2 && DLm1 != 1 && !Z1) {
                    startPs();
                    defineFirstPDigits(DLm1 - 1, g - 1, Z1);
                    return true;
                }
                return false;
            },
            5: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                const Z1 = D(D0 - DLm3);
                if (DLm1 == 1 && !DLm2 && DLm3 <= 3 && Z1) {
                    startPs('A');
                    defineFirstPDigits(g - 1, DLm3 + 1, Z1);
                    return true;
                }
                return false;
            },
            6: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                if (DLm1 == 1 && !DLm2 && DLm3 <= 2 && !D(D0 - DLm3)) {
                    startPs('A');
                    defineFirstPDigits(g - 1, DLm3 + 2, g - 1);
                    return true;
                }
                return false;
            }
        },
        B: {
            1: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                const Z1 = D(D0 - DLm3);
                if (DLm1 == 1 && DLm2 <= 2 && DLm3 >= 4 && Z1) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2, DLm3 - 1, Z1);
                    return true;
                }
                return false;
            },
            2: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                if (DLm1 == 1 && DLm2 <= 2 && DLm3 >= 3 && !D(D0 - DLm3)) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2, DLm3 - 2, 1);
                    return true;
                }
                return false;
            },
            3: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 < 2 && !D0) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2 - 1, g - 2, 1);
                    return true;
                }
                return false;
            },
            4: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 > 1 && DLm3 <= 3 && !D0) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2, 1, g - 2);
                    return true;
                }
                return false;
            },
            5: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 <= 2 && D0) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2 - 1, g - 1, D0);
                    return true;
                }
                return false;
            },
            6: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                const Z1 = D(D0 - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 == 3 && Z1) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2, 2, Z1);
                    return true;
                }
                return false;
            },
            7: () => {
                const D0 = getNumberDigitByIndex(0);
                const DLm1 = getNumberDigitByIndex(l - 1);
                const DLm2 = getNumberDigitByIndex(l - 2);
                const DLm3 = getNumberDigitByIndex(l - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 == 3 && D0 == 3) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2, 1, 1);
                    return true;
                }
                return false;
            }
        }
    }

    let typeUsed;
    const defineFirstDigits = () => {
        ['A', 'B'].forEach((letter) => {
            for (let i = 1; i < Object.keys(types[letter]).length; i++) {
                if (types[letter][i]()) {
                    typeUsed = `${letter}${i}`;
                    setAlgToUse(letter, i);
                    return;
                }
            }
        });
    }

    let algToUse;
    const setAlgToUse = (letter, type) => {

        const special = l == 2 * m && (!getNumberDigitByIndex(m - 1) || !getNumberDigitByIndex(m));

        if (!special) {
            //Alg I and II use A sooo
            if (letter == 'A') {
                //use alg I when
                if ((type <= 4 && l == 2 * m + 1) || (type > 4 && type <= 6 && l == 2 * m + 2)) {
                    algToUse = 1;
                    return;
                }

                //use alg II when
                if (((type <= 4 && l == 2 * m) || l == 2 * m + 1) && getNumberDigitByIndex(m - 1) && getNumberDigitByIndex(m)) {
                    algToUse = 2;
                    return;
                }
            } else if (letter == 'B') {
                //use alg III when
                if (l == 2 * m + 1) {
                    algToUse = 3;
                    return;
                }

                //use alg IV when
                if (l == 2 * m && getNumberDigitByIndex(m - 1) && getNumberDigitByIndex(m)) {
                    algToUse = 4;
                    return;
                }
            }
        }

        //use alg V when (maybe?)
        algToUse = 5;
        return;
    }

    let c = {};
    let ajustmentUsed;
    const runAlg = () => {
        if (algToUse == 1) {
            const { x: x1, y: y1, z: z1 } = getPxyz(1);

            c[1] = Math.floor((x1 + y1 + z1) / g);

            let x2;
            if (z1 <= getNumberDigitByIndex(2 * m - 2) - 1) {
                x2 = D(getNumberDigitByIndex(2 * m - 1) - y1);
            }
            if (z1 >= getNumberDigitByIndex(2 * m - 2)) {
                x2 = D(getNumberDigitByIndex(2 * m - 1) - y1 - 1);
            }
            const y2 = D(getNumberDigitByIndex(2 * m - 2) - z1 - 1);
            const z2 = D(getNumberDigitByIndex(1) - x2 - y2 - c[1]);
            c[2] = Math.floor((x2 + y2 + z2 + c[1] - getNumberDigitByIndex(1)) / g);

            definePxyz(2, x2, y2, z2);

            for (let i = 3; i <= m; i++) {

                const { z: zim1 } = getPxyz(i - 1);
                if (zim1 <= getNumberDigitByIndex(2 * m - i) - 1) {
                    xi = 1;
                }
                if (zim1 >= getNumberDigitByIndex(2 * m - i)) {
                    xi = 0;
                }

                yi = D(getNumberDigitByIndex(2 * m - i) - zim1 - 1);
                zi = D(getNumberDigitByIndex(i - 1) - xi - yi - c[i - 1]);
                c[i] = Math.floor((xi + yi + zi + c[i - 1]) / g);

                definePxyz(i, xi, yi, zi);
            }

            definePx(m + 1, 0);


            if (c[m] == 1) {
                ajustmentUsed = "I.1";
            }

            if (!c[m]) {
                ajustmentUsed = "I.2";
                definePx(m + 1, 1);
                return;
            }

            if (c[m] == 2) {
                ajustmentUsed = "I.3";
                definePx(m + 1, 1);
                definePy(m, getPy(m) - 1);
                definePz(m, 0);
            }

        } else if (algToUse == 2) {
            const { x: x1, y: y1, z: z1 } = getPxyz(1);
            c[1] = Math.floor((x1 + y1 + z1) / g);

            let x2;
            if (z1 <= getNumberDigitByIndex(2 * m - 3) - 1) {
                x2 = D(getNumberDigitByIndex(2 * m - 2) - y1);
            }
            if (z1 >= getNumberDigitByIndex(2 * m - 3)) {
                x2 = D(getNumberDigitByIndex(2 * m - 2) - y1 - 1);
            }
            const y2 = D(getNumberDigitByIndex(2 * m - 3) - z1 - 1);
            const z2 = D(getNumberDigitByIndex(1) - x2 - y2 - c[1]);

            c[2] = Math.floor((x2 + y2 + z2 + c[1] - getNumberDigitByIndex(1)) / g);

            definePxyz(2, x2, y2, z2);

            for (let i = 3; i < m; i++) {

                const { z: zim1 } = getPxyz(i - 1);
                if (zim1 <= getNumberDigitByIndex(2 * m - i - 1) - 1) {
                    xi = 1;
                }
                if (zim1 >= getNumberDigitByIndex(2 * m - i - 1)) {
                    xi = 0;
                }

                yi = D(getNumberDigitByIndex(2 * m - i - 1) - zim1 - 1);
                zi = D(getNumberDigitByIndex(i - 1) - xi - yi - c[i - 1]);
                c[i] = Math.floor((xi + yi + zi + c[i - 1] - getNumberDigitByIndex(i - 1)) / g);

                definePxyz(i, xi, yi, zi);
            }

            definePx(m, 0);
            definePy(m, D(getNumberDigitByIndex(m - 1) - getPz(m - 1) - c[m - 1]));

            if (c[m] == 1) {
                ajustmentUsed = "II.1";
            }

            if (!c[m]) {
                if (getPy(m)) {
                    ajustmentUsed = "II.2.i";
                    definePx(m, 1);
                    definePy(m, getPy(m) - 1);
                } else {
                    if (getPy(m - 1)) {
                        ajustmentUsed = "II.2.ii.a";
                        definePx(m, 1);
                        definePy(m, g - 2);
                        definePy(m - 1, getPy(m - 1) - 1);
                        definePz(m, getPz(m - 1) + 1);
                    } else if (getPz(m - 1)) {
                        ajustmentUsed = "II.2.ii.b";
                        definePy(m, 1);
                        definePy(m - 1, 1);
                        definePz(m, getPz(m) - 1);
                    } else {
                        ajustmentUsed = "II.2.ii.c";
                        definePx(m, 1);
                        definePx(m - 1, getPx(m - 1) - 1);
                        definePy(m, g - 4);
                        definePy(m - 1, g - 1);
                        definePz(m + 2, 0);
                        definePz(m, 2);
                    }
                }
            }

            //Unnecessary Case ?!
            // if (c[m] == 2) {
            //     ajustmentUsed = "II.3";
            //     definePx(m , 1);
            //     definePy(m, g - 2);
            //     definePy(m - 1, getPy(m - 1) - 1);
            //     definePz(0);
            // }
        } else if (algToUse == 3) {
            const { x: x1, y: y1, z: z1 } = getPxyz(1);
            c[1] = Math.floor((1 + y1 + z1) / g);

            let x2;
            if (z1 <= getNumberDigitByIndex(2 * m - 3) - 1) {
                x2 = D(getNumberDigitByIndex(2 * m - 2) - y1);
            }
            if (z1 >= getNumberDigitByIndex(2 * m - 3)) {
                x2 = D(getNumberDigitByIndex(2 * m - 2) - y1 - 1);
            }
            const y2 = D(getNumberDigitByIndex(2 * m - 3) - z1 - 1);
            const z2 = D(getNumberDigitByIndex(1) - x1 - y2 - c[1]);
            c[2] = Math.floor((x1 + y2 + z2 + c[1] - getNumberDigitByIndex(1)) / g);

            definePxyz(2, x2, y2, z2, true);

            for (let i = 3; i < m; i++) {

                const { z: zim1 } = getPxyz(i - 1);

                let xi;
                if (zim1 <= getNumberDigitByIndex(2 * m - i - 1) - 1) {
                    xi = 1;
                }
                if (zim1 >= getNumberDigitByIndex(2 * m - i - 1)) {
                    xi = 0;
                }
                yi = D(getNumberDigitByIndex(2 * m - i - 1) - zim1 - 1);
                zi = D(getNumberDigitByIndex(i - 1) - getPx(i - 1) - yi - c[i - 1]);
                c[i] = Math.floor((getPx(i - 1) + yi + zi + c[i - 1] - getNumberDigitByIndex(i - 1)) / g);

                definePxyz(i, xi, yi, zi);
            }

            definePx(m, 0, true);
            definePy(m, D(getNumberDigitByIndex(m - 1) - getPz(m - 1) - getPx(m - 1) - c[m - 1]));

            if (c[m] == 1) {
                ajustmentUsed = "III.1";
            }

            if (!c[m]) {
                ajustmentUsed = "III.2";
                definePx(m + 1, 1)
            }

            if (c[m] == 2) {
                if (getPy(m - 1)) {
                    if (getPz(m - 1) != g - 1) {
                        ajustmentUsed = "III.3.i";
                        definePy(m, getPy(m) - 1);
                        definePy(m - 1, getPy(m - 1) - 1);
                        definePz(m, getPz(m) + 1);
                    } else {
                        ajustmentUsed = "III.3.ii";
                        definePx(m + 1, 1);
                        definePy(m - 1, getPy(m - 1) - 1);
                        definePz(m, 0);
                    }
                } else {
                    if (getPz(m - 1) != g - 1) {
                        ajustmentUsed = "III.3.iii";
                        definePx(m, getPx(m) - 1);
                        definePy(m, getPy(m) - 1);
                        definePy(m - 1, g - 1);
                        definePz(m, getPz(m) + 1);
                    } else {
                        ajustmentUsed = "III.3.iv";
                        definePx(m + 1, 1);
                        definePx(m, getPx(m) - 1);
                        definePy(m - 1, g - 1);
                        definePz(m, 0);
                    }
                }
            }
        } else if (algToUse == 4) {
            
        }
    }

    defineFirstDigits();
    runAlg();

    debug = () => {

        const pPreRender = (index) => {
            p[index].reverse();
            for (let i = p[index].length; i < l; i++) {
                p[index].push(' ');
            }
            p[index].reverse();
        }

        pPreRender(1);
        pPreRender(2);
        pPreRender(3);

        let print = "%c";

        for (let i = 0; i < number.split('').length; i++) {
            let pc = "";
            if ((i == m && !(l / 2 % 2)) || (i == m + 1 && l / 2 % 2)) {
                pc = '%c';
            }
            print += `${pc} ${number.split('')[i]} `;
        }

        print += "\n%c"

        for (let i = 0; i < p[1].length; i++) {
            let pc = "";
            if ((i == m && !(l / 2 % 2)) || (i == m + 1 && l / 2 % 2)) {
                pc = '%c';
            }
            print += `${pc} ${p[1][i]} `;
        }
        print += "\n%c"

        for (let i = 0; i < p[2].length; i++) {
            let pc = "";
            if ((i == m && !(l / 2 % 2)) || (i == m + 1 && l / 2 % 2)) {
                pc = '%c';
            }
            print += `${pc} ${p[2][i]} `;
        }
        print += "\n%c"

        for (let i = 0; i < p[3].length; i++) {
            let pc = "";
            if ((i == m && !(l / 2 % 2)) || (i == m + 1 && l / 2 % 2)) {
                pc = '%c';
            }
            print += `${pc} ${p[3][i]} `;
        }

        const style = [
            'background: #000',
            'color: #fff',
            'font-size: 16px',
            'padding: 10px 0',
            'line-height: 35px'
        ].join(';');

        const style2 = [
            'background: #88aacc',
            'color: #fff',
            'font-size: 16px',
            'padding: 10px 0',
            'line-height: 35px'
        ].join(';');


        console.log(typeUsed, algToUse, ajustmentUsed);
        console.log(
            print,
            style,
            style2,
            style,
            style2,
            style,
            style2,
            style,
            style2,
        );
    }

    debug();

    return {
        typeUsed,
        algToUse,
        ajustmentUsed
    }

}