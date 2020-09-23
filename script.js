/** Maybe those is unnecessary cases
 *  II.3
 */

/***
 * important commands
 * grep ' ajustmentUsed ' result.txt | tail
 */
findThePalindromes = (n, _debug = false, _debug2 = true, _debug3 = false) => {

    const l = n.length;
    let g = 10;
    const m = Math.floor(l / 2);
    let p = {
        1: [],
        2: [],
        3: []
    };

    const getDigit = (index) => {
        const reverseNumber = n.split('').reverse();
        return parseInt(reverseNumber[index]);
    }

    const D = (n) => {
        // correct module
        return ((n % g) + g) % g;
    }

    const calcStr = {
        pow: (n1, n2) => {
            let n1s = n1.toString();
            let result = n1s;
            for (let i = 1; i < n2; i++) {
                result = calcStr.mult(result, n1s);
            }
            return result;
        },
        mult: (n1, n2) => {
            let result = "0";
            let loop = n2;
            while (loop != '0') {
                loop = calcStr.sub(loop, "1");
                result = calcStr.add(result, n1);
            }
            return result;
        },
        add: (n1, n2) => {

            let carrier = 0;
            let number1 = n1.split('').reverse();
            let number2 = n2.split('').reverse();
            let result = [];

            if (number1.length > number2.length) {
                for (let i = 0; i < n1.length - n2.length; i++) {
                    number2.push('0');
                }
            }

            if (number1.length < number2.length) {
                for (let i = 0; i < n2.length - n1.length; i++) {
                    number1.push('0');
                }
            }

            for (let i = 0; i < number1.length; i++) {
                number1[i] = parseInt(number1[i], g);
                number2[i] = parseInt(number2[i], g);
            }

            for (let i = 0; i < number1.length; i++) {
                let r = number1[i] + number2[i] + carrier;
                if (r >= g) {
                    r -= g
                    carrier = 1;
                } else {
                    carrier = 0;
                }

                result.push(r.toString(g));
            }

            if (carrier) {
                result.push(1);
            }

            return result.reverse().join('');
        },
        sub: (n1, n2) => {
            let carrier = 0;
            let bigN;
            let smallN;
            let result = [];
            let number1 = n1.split('').reverse();
            let number2 = n2.split('').reverse();

            if (number1.length > number2.length) {
                for (let i = 0; i < n1.length - n2.length; i++) {
                    number2.push('0');
                }
            }

            if (number1.length < number2.length) {
                for (let i = 0; i < n2.length - n1.length; i++) {
                    number1.push('0');
                }
            }

            for (let i = 0; i < number1.length; i++) {
                number1[i] = parseInt(number1[i], g);
                number2[i] = parseInt(number2[i], g);
            }

            bigN = number1;
            smallN = number2;

            number1.reverse();
            number2.reverse();

            for (let i = 0; i < number1.length; i++) {
                const n1 = parseInt(number1[i]);
                const n2 = parseInt(number2[i]);
                if (n1 > n2) break;
                if (n1 < n2) {
                    bigN = number2;
                    smallN = number1;
                    break;
                }
            }

            number1.reverse();
            number2.reverse();

            for (let i = 0; i < bigN.length; i++) {
                let r = bigN[i] - smallN[i] - carrier;

                if (r < 0) {
                    r = ((r % g) + g) % g;
                    carrier = 1;
                } else {
                    carrier = 0;
                }

                result.push(r.toString(g));
            }

            result.reverse();
            while (result.length > 1 && result[0] == '0') {
                result.shift();
            }

            return result.join('');

        }
    }

    const startPs = (type = false) => {
        const p1Length = type == 'A' ? l - 1 : l;
        const p2Length = type == 'B' ? p1Length - 2 : p1Length - 1;
        const p3Length = p2Length - 1;

        definePsLength(p1Length, p2Length, p3Length)
    }

    const definePsLength = (xQty, yQty, zQty) => {
        for (let i = 0; i < xQty; i++) {
            p[1].push('*');
        }

        for (let i = 0; i < yQty; i++) {
            p[2].push('*');
        }

        for (let i = 0; i < zQty; i++) {
            p[3].push('*');
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

    let typeUsed = null;
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

    let algToUse = null;
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
    let alg5 = false;
    let ajustmentUsed = null;
    const runAlg = () => {

        const algs = {
            1: () => {
                const { x: x1, y: y1, z: z1 } = getXYZ(1);
                c[1] = Math.floor((x1 + y1 + z1) / g);
                const x2 = z1 <= getDigit(2 * m - 2) - 1 ? D(getDigit(2 * m - 1) - y1) : D(getDigit(2 * m - 1) - y1 - 1);
                const y2 = D(getDigit(2 * m - 2) - z1 - 1);
                const z2 = D(getDigit(1) - x2 - y2 - c[1]);
                c[2] = Math.floor((x2 + y2 + z2 + c[1] - getDigit(1)) / g);

                defineXYZ(2, x2, y2, z2);

                for (let i = 3; i <= m; i++) {
                    const zim1 = getZ(i - 1);
                    const xi = zim1 <= getDigit(2 * m - i) - 1 ? 1 : 0;
                    const yi = D(getDigit(2 * m - i) - zim1 - 1);
                    const zi = D(getDigit(i - 1) - xi - yi - c[i - 1]);
                    c[i] = Math.floor((xi + yi + zi + c[i - 1] - getDigit(i - 1)) / g);
                    defineXYZ(i, xi, yi, zi);
                }

                defineX(m + 1, 0);

                if (c[m] == 1) {
                    ajustmentUsed = "I.1";
                }

                if (!c[m]) {
                    ajustmentUsed = "I.2";
                    defineX(m + 1, 1);
                }

                if (c[m] == 2) {
                    ajustmentUsed = "I.3";
                    if(getZ(m) != g - 1) {
                        defineY(m, getY(m) - 1);
                        defineZ(m, getZ(m) + 1);
                    } else {
                        defineX(m + 1, 1);
                        defineY(m, getY(m) - 1);
                        defineZ(m, 0);
                    }
                }
            },
            2: () => {
                const { x: x1, y: y1, z: z1 } = getXYZ(1);
                c[1] = Math.floor((x1 + y1 + z1) / g);

                const x2 = z1 <= getDigit(2 * m - 3) - 1 ? D(getDigit(2 * m - 2) - y1) : D(getDigit(2 * m - 2) - y1 - 1);
                const y2 = D(getDigit(2 * m - 3) - z1 - 1);
                const z2 = D(getDigit(1) - x2 - y2 - c[1]);

                c[2] = Math.floor((x2 + y2 + z2 + c[1] - getDigit(1)) / g);

                defineXYZ(2, x2, y2, z2);

                for (let i = 3; i < m; i++) {
                    const zim1 = getZ(i - 1);
                    const xi = zim1 <= getDigit(2 * m - i - 1) - 1 ? 1 : 0;
                    const yi = D(getDigit(2 * m - i - 1) - zim1 - 1);
                    const zi = D(getDigit(i - 1) - xi - yi - c[i - 1]);
                    c[i] = Math.floor((xi + yi + zi + c[i - 1] - getDigit(i - 1)) / g);
                    defineXYZ(i, xi, yi, zi);
                }

                defineX(m, 0);
                defineY(m, D(getDigit(m - 1) - getZ(m - 1) - c[m - 1]));

                c[m] = Math.floor((getX(m) + getY(m) + getZ(m) + c[m - 1] - getDigit(m - 1)) / g);

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
                        } else if (getZ(m - 1)) {
                            ajustmentUsed = "II.2.ii.b";
                            defineY(m, 1);
                            defineY(m - 1, 1);
                            defineZ(m, getZ(m) - 1);
                        } else {
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

                // if (c[m] == 2) {
                //     ajustmentUsed = "II.3";
                //     defineX(m, 1);
                //     defineY(m, g - 2);
                //     defineY(m - 1, getY(m - 1) - 1);
                //     defineZ(0);
                // }

            },
            3: () => {
                const { x: x1, y: y1, z: z1 } = getXYZ(1);
                c[1] = Math.floor((1 + y1 + z1) / g);

                const x2 = z1 <= getDigit(2 * m - 3) - 1 ? D(getDigit(2 * m - 2) - y1) : D(getDigit(2 * m - 2) - y1 - 1);
                const y2 = D(getDigit(2 * m - 3) - z1 - 1);
                const z2 = D(getDigit(1) - x1 - y2 - c[1]);

                c[2] = Math.floor((x1 + y2 + z2 + c[1] - getDigit(1)) / g);

                defineXYZ(2, x2, y2, z2);

                for (let i = 3; i < m; i++) {
                    const zim1 = getZ(i - 1);
                    const xi = zim1 <= getDigit(2 * m - i - 1) - 1 ? 1 : 0;
                    const yi = D(getDigit(2 * m - i - 1) - zim1 - 1);
                    const zi = D(getDigit(i - 1) - getX(i - 1) - yi - c[i - 1]);
                    c[i] = Math.floor((getX(i - 1) + yi + zi + c[i - 1] - getDigit(i - 1)) / g);
                    defineXYZ(i, xi, yi, zi);
                }

                defineX(m, 0);
                defineY(m, D(getDigit(m - 1) - getZ(m - 1) - getX(m - 1) - c[m - 1]));

                c[m] = Math.floor((getX(m - 1) + getY(m) + getZ(m) + c[m - 1] - getDigit(m - 1)) / g);

                if (c[m] == 1) {
                    ajustmentUsed = "III.1";
                }

                if (!c[m]) {
                    ajustmentUsed = "III.2";
                }

                if (c[m] == 2) {
                    if (getY(m - 1) && getZ(m - 1) != g - 1) {
                        ajustmentUsed = "III.3.i";
                        defineY(m, getY(m) - 1);
                        defineY(m - 1, getY(m - 1) - 1);
                        defineZ(m, getZ(m) + 1);
                    } else if (getY(m - 1) && getZ(m - 1) == g - 1) {
                        ajustmentUsed = "III.3.ii";
                        defineX(m, 1);
                        defineY(m + 1, getY(m + 1) - 1);
                        defineZ(m, 0);
                    } else if (!getY(m - 1) && getZ(m - 1) != g - 1) {
                        ajustmentUsed = "III.3.iii";
                        defineX(m + 1, getX(m + 1) - 1);
                        defineY(m - 1, g - 1);
                        defineY(m, getY(m) - 1);
                        defineZ(m, getZ(m) + 1);
                    } else if (!getY(m - 1) && getZ(m - 1) == g - 1) {
                        ajustmentUsed = "III.3.iv";
                        defineX(m, 1);
                        defineX(m + 1, getX(m + 1) - 1);
                        defineY(m - 1, g - 1);
                        defineZ(m, 0);
                    }
                }
            },
            4: () => {
                const { x: x1, y: y1, z: z1 } = getXYZ(1);

                c[1] = Math.floor((1 + y1 + z1) / g);

                const x2 = z1 <= getDigit(2 * m - 4) - 1 ? D(getDigit(2 * m - 3) - y1) : D(getDigit(2 * m - 3) - y1 - 1);
                const y2 = D(getDigit(2 * m - 4) - z1 - 1);
                const z2 = D(getDigit(1) - x1 - y2 - c[1]);

                c[2] = Math.floor((x1 + y2 + z2 + c[1] - getDigit(1)) / g);

                defineXYZ(2, x2, y2, z2);

                for (let i = 3; i <= m - 2; i++) {
                    const zim1 = getZ(i - 1);
                    const xi = zim1 <= getDigit(2 * m - i - 2) - 1 ? 1 : 0;
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
                        defineZ(m - 1, getZ(m - 1) - 1);
                    } else if (!getZ(m - 1) && getY(m - 2)) {
                        if (getY(m - 1) != 1) {
                            if (getZ(m - 2) != g - 1) {
                                ajustmentUsed = "IV.2.ii.a";
                                defineX(m, 1);
                                defineY(m - 1, getY(m - 1) - 1);
                                defineY(m - 2, getY(m - 2) - 1);
                                defineZ(m, getZ(m) + 1);
                                defineZ(m - 1, 1);
                            } else {
                                ajustmentUsed = "IV.2.ii.b";
                                defineX(m, 2);
                                defineY(m - 1, getY(m - 1) - 2);
                                defineY(m - 2, getY(m - 2) - 1);
                                defineZ(m, 0);
                                defineZ(m - 1, 3);
                            }
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
                            defineY(m + 1, g - 1);
                            defineZ(m - 1, 1);
                            defineZ(m, getZ(m - 2) + 1);
                        } else if (getZ(m - 2) == g - 1 && getY(m - 1) != 1) {
                            ajustmentUsed = "IV.2.iii.b";
                            defineX(m, 2);
                            defineX(m + 1, getX(m + 1) - 1);
                            defineY(m, getY(m) - 2);
                            defineY(m + 1, g - 1);
                            defineZ(m - 1, 3);
                            defineZ(m, 0);
                        } else if (getZ(m - 2) == g - 1 && getY(m - 1) == 1) {
                            ajustmentUsed = "IV.2.iii.c";
                            defineX(m, 1);
                            defineX(m + 1, getX(m + 1) - 1);
                            defineY(m, g - 1);
                            defineY(m + 1, g - 1);
                            defineZ(m - 1, 3);
                            defineZ(m, 0);
                        }
                    }
                } else if (!(getX(m - 1) + c[m - 1]) && getY(m - 1) == g - 1) {
                    ajustmentUsed = "IV.3";
                    defineX(m, 1);
                    defineY(m, g - 2);
                    defineY(m + 1, getY(m + 1) - 1);
                    defineZ(m - 1, 1);
                    defineZ(m, getZ(m) + 1);
                } else if (getX(m - 1) + c[m - 1] == 2 && !getX(m - 1) && c[m - 1] == 2) {
                    if (getZ(m - 1) != g - 1) {
                        ajustmentUsed = "IV.4.i";
                        defineY(m, getY(m) - 1);
                        defineZ(m - 1, getZ(m - 1) + 1);
                    } else if (getZ(m - 1) == g - 1 && getZ(m - 2) != g - 1) {
                        if (getY(m - 2)) {
                            ajustmentUsed = "IV.4.ii.a";
                            defineX(m, 1);
                            defineY(m + 1, getY(m + 1) - 1);
                            defineY(m, getY(m) - 2);
                            defineZ(m, getZ(m) + 1);
                            defineZ(m - 1, 1);
                        } else if (!getY(m - 2)) {
                            ajustmentUsed = "IV.4.ii.b";
                            defineX(m, 1);
                            defineX(m + 1, getX(m + 1) - 1);
                            defineY(m, getY(m) - 2);
                            defineY(m + 1, g - 1);
                            defineZ(m, getZ(m) + 1);
                            defineZ(m - 1, 1);
                        }
                    } else if (getZ(m - 1) == g - 1 && getZ(m - 2) == g - 1) {
                        if (getY(m - 1) != g - 1 && getY(m - 1) != g - 2) {
                            ajustmentUsed = "IV.4.iii.a";
                            defineX(m, g - 2);
                            defineY(m, getY(m) + 2);
                            defineZ(m, g - 2);
                            defineZ(m - 1, g - 2);
                            if (getY(m - 2) != g - 1) {
                                defineX(m + 1, getX(m + 1) - 1);
                                defineY(m + 1, getY(m + 1) + 1);
                            } else {
                                defineY(m + 1, 0);
                            }
                        } else {
                            ajustmentUsed = "IV.4.iii.b";
                            defineX(m, 2);
                            defineY(m, getY(m) - 3);
                            defineZ(m, 0);
                            defineZ(m - 1, 3);
                            if (getY(m - 2)) {
                                defineY(m + 1, getY(m + 1) - 1);
                            } else {
                                defineX(m + 1, getX(m + 1) - 1);
                                defineY(m + 1, g - 1);
                            }
                        }
                    }
                } else if (getX(m - 1) + c[m - 1] == 2 && getX(m - 1) == 1 && c[m - 1] == 1) {
                    if (getZ(m - 1) != g - 1 && getY(m - 1)) {
                        ajustmentUsed = "IV.5.i";
                        defineY(m, getY(m) - 1);
                        defineZ(m - 1, getZ(m - 1) + 1);
                    } else if (getZ(m - 1) != g - 1 && !getY(m - 1)) {
                        ajustmentUsed = "IV.5.ii";
                        defineX(m, 0);
                        defineY(m, g - 1);
                        defineZ(m - 1, getZ(m - 1) + 1);
                    } else if (getZ(m - 1) == g - 1 && getZ(m - 2)) {
                        if (getY(m - 2) != g - 1) {
                            ajustmentUsed = "IV.5.iii.a";
                            defineX(m, 0);
                            defineY(m, getY(m) + 1);
                            defineY(m + 1, getY(m + 1) + 1);
                            defineZ(m, getZ(m) - 1);
                            defineZ(m - 1, g - 2);
                        } else if (getY(m - 2) == g - 1 && getY(m - 1) > 1) {
                            ajustmentUsed = "IV.5.iii.b";
                            defineX(m, 2);
                            defineY(m, getY(m) - 2);
                            defineY(m + 1, g - 2);
                            defineZ(m, getZ(m) + 1);
                            defineZ(m - 1, 1);
                        } else if (getY(m - 2) == g - 1 && !getY(m - 1)) {
                            ajustmentUsed = "IV.5.iii.c";
                            defineY(m, g - 2);
                            defineY(m + 1, g - 2);
                            defineZ(m, getZ(m) + 1);
                            defineZ(m - 1, 1);
                        } else if (getY(m - 2) == g - 1 && getY(m - 1) == 1) {
                            ajustmentUsed = "IV.5.iii.d";
                            defineY(m, g - 1);
                            defineY(m + 1, g - 2);
                            defineZ(m, getZ(m) + 1);
                            defineZ(m - 1, 1);
                        }
                    } else if (getZ(m - 1) == g - 1 && !getZ(m - 2) && getY(m - 2)) {
                        if (getY(m - 1) > 1) {
                            ajustmentUsed = "IV.5.iv.a";
                            defineX(m, 2);
                            defineY(m, getY(m) - 2);
                            defineY(m + 1, getY(m + 1) - 1);
                            defineZ(m, 1);
                            defineZ(m - 1, 1);
                        } else if (!getY(m - 1)) {
                            ajustmentUsed = "IV.5.iv.b";
                            defineY(m, g - 2);
                            defineY(m + 1, getY(m + 1) - 1);
                            defineZ(m, 1);
                            defineZ(m - 1, 1);
                        } else if (getY(m - 1) == 1) {
                            ajustmentUsed = "IV.5.iv.c";
                            defineY(m, g - 1);
                            defineY(m + 1, getY(m + 1) - 1);
                            defineZ(m, 1);
                            defineZ(m - 1, 1);
                        }
                    } else if (getZ(m - 1) == g - 1 && !getZ(m - 2) && !getY(m - 2)) {
                        if (getY(m - 1) > 1) {
                            ajustmentUsed = "IV.5.v.a";
                            defineX(m, 2);
                            defineX(m + 1, getX(m + 1) - 1);
                            defineY(m, getY(m) - 2);
                            defineY(m + 1, g - 1);
                            defineZ(m, 1);
                            defineZ(m - 1, 1);
                        } else if (!getY(m - 1)) {
                            ajustmentUsed = "IV.5.v.b";
                            defineX(m + 1, getX(m + 1) - 1);
                            defineY(m, g - 2);
                            defineY(m + 1, g - 1);
                            defineZ(m, 1);
                            defineZ(m - 1, 1);
                        } else if (getY(m - 1) == 1) {
                            ajustmentUsed = "IV.5.v.c";
                            defineX(m + 1, getX(m + 1) - 1);
                            defineY(m, g - 1);
                            defineY(m + 1, g - 1);
                            defineZ(m, 1);
                            defineZ(m - 1, 1);
                        }
                    }
                } else if (getX(m - 1) + c[m - 1] == 3) {
                    ajustmentUsed = "IV.6";
                    defineY(m, getY(m) - 1);
                    defineZ(m - 1, 0);
                }
            },
            5: () => {
                alg5 = true;
                reset();
                const s = calcStr.add(calcStr.pow(g, m), calcStr.pow(g, m - 1));
                n = calcStr.sub(n, s);
                defineFirstDigits();
                runAlg();
                n = calcStr.add(n, s);
                p[1] = calcStr.add(p[1].join(''), s).split('');
            }
        }

        if (algs[algToUse]) {
            algs[algToUse]();
        }
    }

    const reset = () => {
        p = {
            1: [],
            2: [],
            3: []
        };
        algToUse = undefined;
        typeUsed = undefined;
        ajustmentUsed = undefined;
    }

    const validateM = (_diff, _d) => {
        if (_diff == 201) {
            return false;
        }
        
        const calc = (_d + 1).toString(g) + _d.toString();
        return !(calc == _diff && _d >= 1 && calc.length == 2);
    }

    const findSmallPalindromes = {
        1: () => {
            definePsLength(1, 0, 0);
            defineX(1, n);
        },
        2: () => {
            if (n == g) {
                const d1 = Math.floor(parseInt(g) / 2);
                definePsLength(1, 1, 0);
                defineX(1, d1);
                defineY(1, g - d1);
            } else if (getDigit(1) <= getDigit(0)) {
                definePsLength(2, 1, 0);
                defineX(1, getDigit(1));
                defineY(1, getDigit(0) - getDigit(1));
            } else if (getDigit(1) > getDigit(0) + 1) {
                definePsLength(2, 1, 0);
                defineX(1, getDigit(1) - 1);
                defineY(1, g + getDigit(0) - getDigit(1) + 1);
            } else if (getDigit(1) == getDigit(0) + 1 && getDigit(0) >= 1) {
                definePsLength(2, 1, 1);
                defineX(1, getDigit(0));
                defineY(1, g - 1);
                defineZ(1, 1);
            }
        },
        3: () => {
            const d0 = getDigit(0);
            const d1 = getDigit(1);
            const d2 = getDigit(2);

            if (d2 <= d0) {
                definePsLength(3, 1, 0);
                defineX(1, d2);
                defineX(2, d1);
                defineY(1, d0 - d2);
            } else if (d2 >= d0 + 1 && d1) {
                definePsLength(3, 1, 0);
                defineX(1, d2);
                defineX(2, d1 - 1);
                defineY(1, g + d0 - d2);
            } else if (d2 >= d0 + 1 && !d1 && D(d2 - d0 - 1) != 0) {
                definePsLength(3, 1, 0);
                defineX(1, d2 - 1);
                defineX(2, g - 1);
                defineY(1, g + d0 - d2 + 1);
            } else if (d2 >= 3) {
                definePsLength(3, 3, 0);
                defineX(1, d2 - 2);
                defineX(2, g - 1);
                defineY(1, 1);
                defineY(2, 1);
            } else if (d2 == 2) {
                definePsLength(3, 2, 1);
                defineX(1, 1);
                defineX(2, 0);
                defineY(1, g - 1);
                defineZ(1, 1);
            } else if (d2 == 1) {
                definePsLength(2, 1);
                defineX(1, g - 1);
                defineY(1, 1);
            }
        },
        4: () => {
            const number = parseInt(n, g);
            const d0 = getDigit(0);
            const d3 = getDigit(3);
            const diffN = parseInt(`${d3}00${d3}`, g);
            const preDiff = parseInt(n, g) - diffN;
            const diff = preDiff < 0 ? '0' : preDiff.toString(g);
            const d = parseInt(diff[diff.length - 1], g);

            if (number >= diffN && validateM(diff, d)) {
                const oldN = n;
                n = preDiff.toString(g);

                findSmallPalindromes[n.length]();

                const _p = p;
                reset();
                definePsLength(4, _p[1].length, _p[2].length);

                n = oldN;
                p[1] = diffN.toString(g).split('');
                p[2] = _p[1];
                p[3] = _p[2];

            } else if (diff == 201) {
                if (d3 != 1 && d3 != g - 1) {
                    definePsLength(4, 3, 0);
                    defineX(1, d3 - 1);
                    defineX(2, g - 1);
                    defineY(1, 2);
                    defineY(2, 1);
                } else if (d3 == 1) {
                    definePsLength(4, 2, 0);
                    defineX(1, 1);
                    defineX(2, 1);
                    defineY(1, g - 2);
                    defineZ(1, 3);
                } else {
                    definePsLength(4, 2, 0);
                    defineX(1, g - 1);
                    defineX(2, 1);
                    defineY(1, g - 2);
                    defineZ(1, 3);
                }
            } else if (d >= 1 && d <= g - 2) {
                if (D(d3 + d) == d0) {
                    if (d3 != 1) {
                        definePsLength(4, 3, 2);
                        defineX(1, d3 - 1);
                        defineX(2, g - 2);
                        defineY(1, 1);
                        defineY(2, 3);
                        defineZ(1, d);
                    } else {
                        definePsLength(3, 2, 1);
                        defineX(1, g - 1);
                        defineX(2, g - 1);
                        defineY(1, d + 1);
                        defineZ(1, 1);
                    }
                } else if (D(d3 + d) == D(g + d0) && d0 >= g - 1) {
                    definePsLength(4, 3, 2);
                    defineX(1, d3 - 1);
                    defineX(2, g - 2);
                    defineY(1, 1);
                    defineY(2, 3);
                    defineZ(1, d);
                }
            } else if (!getDigit(1) && !getDigit(2) && d0 <= d3 - 1 && d3 != 1) {
                definePsLength(4, 1, 1);
                defineX(1, d3 - 1);
                defineX(2, g - 1);
                defineY(1, g + d0 - d3);
                defineZ(1, 1);
            } else if (number == 1000) {
                definePsLength(3, 1, 0);
                defineX(1, g - 1);
                defineX(2, g - 1);
                defineY(1, 1);
            }
        },
        5: () => {
            if (getDigit(4) != 1) {
                defineFirstDigits();
                runAlg();
            } else {
                const number = parseInt(n, g);
                const d3 = getDigit(3);
                const diffN = parseInt(`1${d3}0${d3}1`, g);
                const preDiff = parseInt(n, g) - diffN;
                const diff = preDiff < 0 ? '0' : preDiff.toString(g);
                const d = parseInt(diff[diff.length - 1], g);

                if (number >= diffN && validateM(diff, d)) {
                    const oldN = n;
                    n = preDiff.toString(g);

                    findSmallPalindromes[n.length]();

                    const _p = p;
                    reset();
                    definePsLength(4, _p[1].length, _p[2].length);

                    n = oldN;
                    p[1] = diffN.toString(g).split('');
                    p[2] = _p[1];
                    p[3] = _p[2];
                } else if (diff == 201) {
                    definePsLength(5, 3, 0);
                    defineX(1, 1);
                    defineX(2, d3);
                    defineX(3, 1);
                    defineY(1, 1);
                    defineY(2, 0);
                } else if (d >= 1 && d <= g - 2) {
                    if (d3) {
                        if (d + 1 + d3 <= g - 1) {
                            definePsLength(5, 3, 1);
                            defineX(1, 1);
                            defineX(2, d3 - 1);
                            defineX(3, 1);
                            defineY(1, g - 1);
                            defineY(2, d + 1);
                            defineZ(1, d + 1);
                        } else {
                            definePsLength(5, 3, 1);
                            defineX(1, 1);
                            defineX(2, d3 - 1);
                            defineX(3, 1);
                            defineY(1, g - 1);
                            defineY(2, d + 1);
                            defineZ(1, d + 1);
                        }
                    } else {
                        definePsLength(4, 2, 1);
                        defineX(1, g - 1);
                        defineX(2, g - 1);
                        defineY(1, d + 1);
                        defineY(2, d + 1);
                        defineZ(1, 1);
                    }
                } else if (n <= diffN - 1) {
                    if (!d3) {
                        definePsLength(4, 1, 0);
                        defineX(1, g - 1);
                        defineX(2, g - 1);
                        defineY(1, 1);
                    } else {
                        const diffN2 = parseInt(`1${d3 - 1}${g - 1}${d3 - 1}1`, g);
                        const preDiff2 = parseInt(n, g) - diffN2;
                        const diff2 = preDiff2 < 0 ? '0' : preDiff2.toString(g);
                        const d2 = parseInt(diff2[diff2.length - 1], g);
                        
                        if (validateM(diff2, d2)) {
                            const oldN = n;
                            n = preDiff2.toString(g);

                            findSmallPalindromes[n.length]();

                            const _p = p;
                            reset();
                            definePsLength(4, _p[1].length, _p[2].length);

                            n = oldN;
                            p[1] = diffN2.toString(g).split('');
                            p[2] = _p[1];
                            p[3] = _p[2];
                        } else {
                            definePsLength(5, 3, 1);
                            defineX(1, 1);
                            defineX(2, d3 - 1);
                            defineX(3, g - 2);
                            defineY(1, 1);
                            defineY(2, d2 + 1);
                            defineZ(1, d2 - 1);
                        }
                    }
                }
            }
        },
        6: () => {
            if (getDigit(5) != 1) {
                defineFirstDigits();
                runAlg();
            } else {
                
            }
        }
    };


    debug = () => {

        const pPreRender = (index) => {
            p[index].reverse();
            for (let i = p[index].length; i < l; i++) {
                p[index].push(' ');
            }
            p[index].reverse();
        }

        const p1 = p[1].join('');
        const p2 = p[2].join('');
        const p3 = p[3].join('');

        const psPlusValue = calcStr.add(calcStr.add(p1, p2), p3);

        if (n != psPlusValue) {
            console.log(n);
        }
        
        if(_debug3) {
            return n == psPlusValue;
        }
        console.log(n == psPlusValue);

        pPreRender(1);
        pPreRender(2);
        pPreRender(3);

        const render = (arr) => {
            let print = '%c';
            for (let i = 1; i <= arr.length; i++) {
                let pc = "";
                let y = algToUse == 4 ? m + 1 : m;
                if ((i == y && !(l / 2 % 2)) || (i == y + 1 && l / 2 % 2)) {
                    pc = '%c';
                }

                print += `${pc} ${arr[i - 1]} `;
            }
            return print + '\n';
        }

        let print = "";

        print += render(n.split(''));
        print += render(p[1]);
        print += render(p[2]);
        print += render(p[3]);

        const defaultStyle = [
            'color: #fff',
            'font-size: 16px',
            'padding: 10px 0',
            'line-height: 35px'
        ];

        const styleTitle1 = [
            'background: #191919'
        ].concat(defaultStyle).join(';');

        const styleTitle2 = [
            'background: #6f81a1'
        ].concat(defaultStyle).join(';');

        const style1 = [
            'background: #000'
        ].concat(defaultStyle).join(';');

        const style2 = [
            'background: #88aacc'
        ].concat(defaultStyle).join(';');

        if (_debug2) {
            console.log(
                print,
                styleTitle1,
                styleTitle2,
                style1,
                style2,
                style1,
                style2,
                style1,
                style2,
            );
        }
    }

    var smallDigits = true;
    if (l && l < 7) {
        const a = findSmallPalindromes[l]()
        // if (_debug2) return debug();
        // return a;
    }


    if (l >= 7) {
        smallDigits = false;
        defineFirstDigits();
        runAlg();
    }

    if (_debug) debug();

    return {
        smallDigits,
        typeUsed,
        algToUse,
        ajustmentUsed,
        alg5,
        p
    }
}