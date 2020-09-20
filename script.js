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

    // const number = "12266420096203532444"; //IV.1
    const number = "127285155221444"; //IV.2.i

    // const number = "120205690315959428539";

    // const number = "12267420096203532444"; important to test

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
    // findThePalindromes(number);
    // findAllTypeOfNumbers();
}

// findAllTypeOfNumbers = () => {
//     let allNumbers = {
//     }

//     let finder = "";
//     let i = 200000000;
//     while (finder != "IV.2.i") {
//         console.log(i);
//         let a = findThePalindromes(i.toString(10));
//         finder = a.ajustmentUsed;
//         i++;
//     }
// }

findThePalindromes = (number) => {

    const l = number.length;
    const g = 10;
    const m = Math.floor(l / 2);
    const p = {
        1: [],
        2: [],
        3: []
    };

    const getDigit = (index) => {
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

    const defineX = (index, x) => {
        if (!pxStartWithOne) {
            definePDigit(1, index, x);
        } else {
            definePDigit(1, index + 1, x);
        }
    }
    const defineY = (index, y) => {
        definePDigit(2, index, y);
    }
    const defineZ = (index, z) => {
        definePDigit(3, index, z);
    }

    let pxStartWithOne = false;
    const defineFirstPDigits = (x1, y1, z1) => {
        if (pxStartWithOne) {
            p[1][0] = 1;
            p[1][p[1].length - 1] = 1;
        }
        defineX(1, x1);
        defineY(1, y1);
        defineZ(1, z1);
    }

    const defineXYZ = (index, x, y, z) => {
        defineX(index, x);
        defineY(index, y);
        defineZ(index, z);
    }

    const getX = (index) => {
        if (!pxStartWithOne) {
            return p[1][index - 1];
        }
        return p[1][index];
    }
    const getY = (index) => {
        return p[2][index - 1];
    }
    const getZ = (index) => {
        return p[3][index - 1];
    }
    const getXYZ = (index) => {
        return { x: getX(index), y: getY(index), z: getZ(index) }
    }

    const types = {
        A: {
            1: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const Z1 = D(D0 - DLm1 - DLm2 + 1);
                if (DLm2 > 2 && Z1) {
                    startPs();
                    defineFirstPDigits(DLm1, DLm2 - 1, Z1);
                    return true;
                }
                return false;
            },
            2: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                if (DLm2 > 2 && !D(D0 - DLm1 - DLm2 + 1)) {
                    startPs();
                    defineFirstPDigits(DLm1, DLm2 - 2, 1);
                    return true;
                }
                return false;
            },
            3: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const Z1 = D(D0 - DLm1 + 2);
                if (DLm2 <= 2 && DLm1 != 1 && Z1) {
                    startPs();
                    defineFirstPDigits(DLm1 - 1, g - 1, Z1);
                    return true;
                }
                return false;
            },
            4: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                if (DLm2 <= 2 && DLm1 != 1 && !D(D0 - DLm1 + 2)) {
                    startPs();
                    defineFirstPDigits(DLm1 - 1, g - 2, 1);
                    return true;
                }
                return false;
            },
            5: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
                const Z1 = D(D0 - DLm3);
                if (DLm1 == 1 && !DLm2 && DLm3 <= 3 && Z1) {
                    startPs('A');
                    defineFirstPDigits(g - 1, DLm3 + 1, Z1);
                    return true;
                }
                return false;
            },
            6: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
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
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
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
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
                if (DLm1 == 1 && DLm2 <= 2 && DLm3 >= 3 && !D(D0 - DLm3)) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2, DLm3 - 2, 1);
                    return true;
                }
                return false;
            },
            3: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 < 2 && !D0) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2 - 1, g - 2, 1);
                    return true;
                }
                return false;
            },
            4: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 > 1 && DLm3 <= 3 && !D0) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2, 1, g - 2);
                    return true;
                }
                return false;
            },
            5: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
                if (DLm1 == 1 && DLm2 > 0 && DLm2 <= 2 && DLm3 <= 2 && D0) {
                    startPs('B');
                    pxStartWithOne = true;
                    defineFirstPDigits(DLm2 - 1, g - 1, D0);
                    return true;
                }
                return false;
            },
            6: () => {
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
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
                const D0 = getDigit(0);
                const DLm1 = getDigit(l - 1);
                const DLm2 = getDigit(l - 2);
                const DLm3 = getDigit(l - 3);
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
            for (let i = 1; i <= Object.keys(types[letter]).length; i++) {
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

        const special = l == 2 * m && (!getDigit(m - 1) || !getDigit(m));

        if (!special) {
            //Alg I and II use A sooo
            if (letter == 'A') {
                //use alg I when
                if ((type <= 4 && l == 2 * m + 1) || (type > 4 && type <= 6 && l == 2 * m + 2)) {
                    algToUse = 1;
                    return;
                }

                //use alg II when
                if (((type <= 4 && l == 2 * m) || l == 2 * m + 1) && getDigit(m - 1) && getDigit(m)) {
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
                if (l == 2 * m && getDigit(m - 1) && getDigit(m)) {
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
            const { x: x1, y: y1, z: z1 } = getXYZ(1);

            c[1] = Math.floor((x1 + y1 + z1) / g);

            let x2;
            if (z1 <= getDigit(2 * m - 2) - 1) {
                x2 = D(getDigit(2 * m - 1) - y1);
            }
            if (z1 >= getDigit(2 * m - 2)) {
                x2 = D(getDigit(2 * m - 1) - y1 - 1);
            }
            const y2 = D(getDigit(2 * m - 2) - z1 - 1);
            const z2 = D(getDigit(1) - x2 - y2 - c[1]);
            c[2] = Math.floor((x2 + y2 + z2 + c[1] - getDigit(1)) / g);

            defineXYZ(2, x2, y2, z2);

            for (let i = 3; i <= m; i++) {

                const zim1 = getZ(i - 1);
                if (zim1 <= getDigit(2 * m - i) - 1) {
                    xi = 1;
                }
                if (zim1 >= getDigit(2 * m - i)) {
                    xi = 0;
                }

                const yi = D(getDigit(2 * m - i) - zim1 - 1);
                const zi = D(getDigit(i - 1) - xi - yi - c[i - 1]);
                c[i] = Math.floor((xi + yi + zi + c[i - 1]) / g);

                defineXYZ(i, xi, yi, zi);
            }

            defineX(m + 1, 0);


            if (c[m] == 1) {
                ajustmentUsed = "I.1";
                return;
            }

            if (!c[m]) {
                ajustmentUsed = "I.2";
                defineX(m + 1, 1);
                return;
            }

            if (c[m] == 2) {
                ajustmentUsed = "I.3";
                defineX(m + 1, 1);
                defineY(m, getY(m) - 1);
                defineZ(m, 0);
            }

        } else if (algToUse == 2) {
            const { x: x1, y: y1, z: z1 } = getXYZ(1);
            c[1] = Math.floor((x1 + y1 + z1) / g);

            let x2;
            if (z1 <= getDigit(2 * m - 3) - 1) {
                x2 = D(getDigit(2 * m - 2) - y1);
            }
            if (z1 >= getDigit(2 * m - 3)) {
                x2 = D(getDigit(2 * m - 2) - y1 - 1);
            }
            const y2 = D(getDigit(2 * m - 3) - z1 - 1);
            const z2 = D(getDigit(1) - x2 - y2 - c[1]);

            c[2] = Math.floor((x2 + y2 + z2 + c[1] - getDigit(1)) / g);

            defineXYZ(2, x2, y2, z2);

            for (let i = 3; i < m; i++) {

                const zim1 = getZ(i - 1);
                if (zim1 <= getDigit(2 * m - i - 1) - 1) {
                    xi = 1;
                }
                if (zim1 >= getDigit(2 * m - i - 1)) {
                    xi = 0;
                }

                const yi = D(getDigit(2 * m - i - 1) - zim1 - 1);
                const zi = D(getDigit(i - 1) - xi - yi - c[i - 1]);
                c[i] = Math.floor((xi + yi + zi + c[i - 1] - getDigit(i - 1)) / g);

                defineXYZ(i, xi, yi, zi);
            }

            defineX(m, 0);
            defineY(m, D(getDigit(m - 1) - getZ(m - 1) - c[m - 1]));

            if (c[m] == 1) {
                ajustmentUsed = "II.1";
            }

            if (!c[m]) {
                if (getY(m)) {
                    ajustmentUsed = "II.2.i";
                    defineX(m, 1);
                    defineY(m, getY(m) - 1);
                } else {
                    if (getY(m - 1)) {
                        ajustmentUsed = "II.2.ii.a";
                        defineX(m, 1);
                        defineY(m, g - 2);
                        defineY(m - 1, getY(m - 1) - 1);
                        defineZ(m, getZ(m - 1) + 1);
                    } else if (!getY(m - 1) && getZ(m - 1)) {
                        ajustmentUsed = "II.2.ii.b";
                        defineY(m, 1);
                        defineY(m - 1, 1);
                        defineZ(m, getZ(m) - 1);
                    } else if (!getY(m - 1) && !getZ(m - 1)) {
                        ajustmentUsed = "II.2.ii.c";
                        defineX(m, 1);
                        defineX(m - 1, getX(m - 1) - 1);
                        defineY(m, g - 4);
                        defineY(m - 1, g - 1);
                        defineZ(m + 2, 0);
                        defineZ(m, 2);
                    }
                }
            }

            //Unnecessary Case ?!
            if (c[m] == 2) {
                ajustmentUsed = "II.3";
                defineX(m, 1);
                defineY(m, g - 2);
                defineY(m - 1, getY(m - 1) - 1);
                defineZ(0);
            }

        } else if (algToUse == 3) {
            const { x: x1, y: y1, z: z1 } = getXYZ(1);
            c[1] = Math.floor((1 + y1 + z1) / g);

            let x2;
            if (z1 <= getDigit(2 * m - 3) - 1) {
                x2 = D(getDigit(2 * m - 2) - y1);
            }
            if (z1 >= getDigit(2 * m - 3)) {
                x2 = D(getDigit(2 * m - 2) - y1 - 1);
            }
            const y2 = D(getDigit(2 * m - 3) - z1 - 1);
            const z2 = D(getDigit(1) - x1 - y2 - c[1]);
            c[2] = Math.floor((x1 + y2 + z2 + c[1] - getDigit(1)) / g);

            defineXYZ(2, x2, y2, z2, true);

            for (let i = 3; i < m; i++) {

                const zim1 = getZ(i - 1);

                let xi;
                if (zim1 <= getDigit(2 * m - i - 1) - 1) {
                    xi = 1;
                }
                if (zim1 >= getDigit(2 * m - i - 1)) {
                    xi = 0;
                }
                const yi = D(getDigit(2 * m - i - 1) - zim1 - 1);
                const zi = D(getDigit(i - 1) - getX(i - 1) - yi - c[i - 1]);
                c[i] = Math.floor((getX(i - 1) + yi + zi + c[i - 1] - getDigit(i - 1)) / g);

                defineXYZ(i, xi, yi, zi);
            }

            defineX(m, 0, true);
            defineY(m, D(getDigit(m - 1) - getZ(m - 1) - getX(m - 1) - c[m - 1]));

            if (c[m] == 1) {
                ajustmentUsed = "III.1";
            }

            if (!c[m]) {
                ajustmentUsed = "III.2";
                defineX(m + 1, 1)
            }

            if (c[m] == 2) {
                if (getY(m - 1) && getZ(m - 1) != g - 1) {
                    ajustmentUsed = "III.3.i";
                    defineY(m, getY(m) - 1);
                    defineY(m - 1, getY(m - 1) - 1);
                    defineZ(m, getZ(m) + 1);
                } else if (getY(m - 1) && getZ(m - 1) == g - 1) {
                    ajustmentUsed = "III.3.ii";
                    defineX(m + 1, 1);
                    defineY(m - 1, getY(m - 1) - 1);
                    defineZ(m, 0);
                } else if (!getY(m - 1) && getZ(m - 1) != g - 1) {
                    ajustmentUsed = "III.3.iii";
                    defineX(m, getX(m) - 1);
                    defineY(m, getY(m) - 1);
                    defineY(m - 1, g - 1);
                    defineZ(m, getZ(m) + 1);
                } else if (!getY(m - 1) && getZ(m - 1) == g - 1) {
                    ajustmentUsed = "III.3.iv";
                    defineX(m + 1, 1);
                    defineX(m, getX(m) - 1);
                    defineY(m - 1, g - 1);
                    defineZ(m, 0);
                }
            }
        } else if (algToUse == 4) {
            const { x: x1, y: y1, z: z1 } = getXYZ(1);

            c[1] = Math.floor((1 + y1 + z1) / g);
            let x2;
            if (z1 <= getDigit(2 * m - 4) - 1) {
                x2 = D(getDigit(2 * m - 3) - y1);
            }
            if (z1 >= getDigit(2 * m - 4)) {
                x2 = D(getDigit(2 * m - 3) - y1 - 1);
            }
            const y2 = D(getDigit(2 * m - 4) - z1 - 1);
            const z2 = D(getDigit(1) - x1 - y2 - c[1]);
            c[2] = Math.floor((x1 + y2 + z2 + c[1] - getDigit(1)) / g);

            defineXYZ(2, x2, y2, z2);

            for (let i = 3; i <= m - 2; i++) {
                const zim1 = getZ(i - 1);
                let xi;
                if (zim1 <= getDigit(2 * m - i - 2) - 1) {
                    xi = 1;
                }
                if (zim1 >= getDigit(2 * m - i - 2)) {
                    xi = 0;
                }
                const yi = D(getDigit(2 * m - i - 2) - zim1 - 1);
                const zi = D(getDigit(i - 1) - getX(i - 1) - yi - c[i - 1]);
                c[i] = Math.floor((getX(i - 1) + yi + zi + c[i - 1] - getDigit(i - 1)) / g);

                defineXYZ(i, xi, yi, zi);
            }

            if (getZ(m - 2) <= getDigit(m - 1) - 1) {
                defineX(m - 1, 1);
            }

            if (getZ(m - 2) >= getDigit(m - 1)) {
                defineX(m - 1, 0);
            }

            defineY(m - 1, D(getDigit(m - 1) - getZ(m - 2) - 1));
            defineZ(m - 1, D(getDigit(m - 2) - getX(m - 2) - getY(m - 1) - c[m - 2]));

            c[m - 1] = Math.floor((getX(m - 2) + getY(m - 1) + getZ(m - 1) + c[m - 2] - getDigit(m - 2)) / g);

            if ((getX(m - 1) + c[m - 1]) == 1) {
                ajustmentUsed = "IV.1";
            } else if (!(getX(m - 1) + c[m - 1]) && getY(m - 1) != g - 1) {
                if (getZ(m - 1)) {
                    ajustmentUsed = "IV.2.i";
                    defineY(m - 1, getY(m - 1) + 1);
                    defineZ(m - 1, getY(m - 1) - 1);
                } else if (!getZ(m - 1) && getY(m - 2)) {
                    if (getY(m - 1) != 1 && getZ(m - 2) != g - 1) {
                        ajustmentUsed = "IV.2.ii.a";
                        defineX(m, 1);
                        defineY(m - 1, getY(m - 1) - 1);
                        defineY(m - 2, getY(m - 2) - 1);
                        defineZ(m, getZ(m) + 1);
                        defineZ(m - 1, 1);
                    } else if (getY(m - 1) != 1 && getZ(m - 2) == g - 1) {
                        ajustmentUsed = "IV.2.ii.b";
                        defineX(m, 2);
                        defineY(m - 1, getY(m - 1) - 2);
                        defineY(m - 2, getY(m - 2) - 1);
                        defineZ(m, 0);
                        defineZ(m - 1, 3);
                    } else if (getY(m - 1) == 1) {
                        ajustmentUsed = "IV.2.ii.c";
                        defineX(m, 1);
                        defineY(m - 1, g - 1);
                        defineY(m - 2, getY(m - 2) - 1);
                        defineZ(m, 0);
                        defineZ(m - 1, 3);
                    }
                } else if (!getZ(m - 1) && !getY(m - 2)) {
                    if (getZ(m - 2) != g - 1) {
                        ajustmentUsed = "IV.2.iii.a";
                        defineX(m, 1);
                        defineX(m + 1, getX(m + 1) - 1);
                        defineY(m, getY(m) - 1);
                        defineY(m + 1, getY(m + 1), g - 1);
                        defineZ(m - 1, 1);
                        defineZ(m, getZ(m - 2) + 1);
                    } else if (getZ(m - 2) = g - 1 && getY(m - 1) != 1) {
                        ajustmentUsed = "IV.2.iii.b";
                    } else if (getZ(m - 2) = g - 1 && getY(m - 1) == 1) {
                        ajustmentUsed = "IV.2.iii.c";
                    }
                }
            } else if (!(getX(m - 1) + c[m - 1]) && getY(m - 1) == g - 1) {
                ajustmentUsed = "IV.3";
            } else if (getX(m - 1) + c[m - 1] == 2 && !getX(m - 1) && c[m - 1] == 2) {
                if (getZ(m - 1) != g - 1) {
                    ajustmentUsed = "IV.4.i";
                } else if (getZ(m - 1) == g - 1 && getZ(m - 2) != g - 1) {
                    if (getY(m - 2)) {
                        ajustmentUsed = "IV.4.ii.a";
                    } else if (!getY(m - 2)) {
                        ajustmentUsed = "IV.4.ii.b";
                    }
                } else if (getZ(m - 1) == g - 1 && getZ(m - 2) == g - 1) {
                    if (getY(m - 1) != g - 1 && getY(m - 1) != g - 2) {
                        ajustmentUsed = "IV.4.iii.a";
                    } else if (getY(m - 1) == g - 1 || getY(m - 1) && g - 2) {
                        ajustmentUsed = "IV.4.iii.b";
                    }
                }
            } else if (getX(m - 1) + c[m - 1] == 2 && getX(m - 1) == 1 && c[m - 1] == 1) {
                if (getZ(m - 1) != g - 1 && getY(m - 1)) {
                    ajustmentUsed = "IV.5.i";
                } else if (getZ(m - 1) != g - 1 && !getY(m - 1)) {
                    ajustmentUsed = "IV.5.ii";
                } else if (getZ(m - 1) == g - 1 && getZ(m - 2)) {
                    if (getY(m - 2) != g - 1) {
                        ajustmentUsed = "IV.5.iii.a";
                    } else if (getY(m - 2) == g - 1 && getY(m - 1) > 1) {
                        ajustmentUsed = "IV.5.iii.b";
                    } else if (getY(m - 2) == g - 1 && !getY(m - 1)) {
                        ajustmentUsed = "IV.5.iii.c";
                    } else if (getY(m - 2) == g - 1 && getY(m - 1) == 1) {
                        ajustmentUsed = "IV.5.iii.d";
                    }
                } else if (getZ(m - 1) == g - 1 && !getZ(m - 2) && getY(m - 2)) {
                    if (getY(m - 1) > 1) {
                        ajustmentUsed = "IV.5.iv.a";
                    } else if (!getY(m - 1)) {
                        ajustmentUsed = "IV.5.iv.b";
                    } else if (getY(m - 1) == 1) {
                        ajustmentUsed = "IV.5.iv.c";
                    }
                } else if (getZ(m - 1) == g - 1 && !getZ(m - 2) && !getY(m - 2)) {
                    if (getY(m - 1) > 1) {
                        ajustmentUsed = "IV.5.v.a";
                    } else if (!getY(m - 1)) {
                        ajustmentUsed = "IV.5.v.b";
                    } else if (getY(m - 1) == 1) {
                        ajustmentUsed = "IV.5.v.c";
                    }
                }
            } else if (getX(m - 1) + c[m - 1] == 3) {
                ajustmentUsed = "IV.6";
            }
        } else if (algToUse == 5) {
            ajustmentUsed = "-";
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

        const render = (arr) => {
            let print = '%c';
            for (let i = 0; i < arr.length; i++) {
                let pc = "";
                let y = algToUse == 4 ? m + 1 : m;
                if ((i == y && !(l / 2 % 2)) || (i == y + 1 && l / 2 % 2)) {
                    pc = '%c';
                }

                print += `${pc} ${arr[i]} `;
            }
            return print + '\n';
        }

        let print = "";

        print += render(number.split(''));
        print += render(p[1]);
        print += render(p[2]);
        print += render(p[3]);


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

    // debug();

    return {
        typeUsed,
        algToUse,
        ajustmentUsed
    }

}