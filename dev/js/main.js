window.onload = () => {
    
    let valueInput = v => document.getElementById(v);
    let count = 0;
    
    let sizeMatrixBtn = valueInput('sizeMatrix');
    let answerBtn = valueInput('answer');
    let matrix = valueInput('matrix');
    let matrixRow = () => {
        let firstLine = document.createElement('div');
        firstLine.className = "line";
        return firstLine;
    }
    let matrixColum = (m, i, j, v, z) => {
        let firstColum = matrix;
        let input = firstColum.children[i];
        input.insertAdjacentHTML("beforeEnd", `<input type="text" class="matrixInput" value="${m}"><span> ${v}<sub>${j+1}</sub> ${z} </span>`);
    }

    let inputColums = (k) => {
        let input = +document.getElementsByClassName('matrixInput')[k].value;
        return input;
    }

    let array = [];

    // let a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b1, b2, b3, b4;
 
    // let s1, s2, s3, s4, r1, r2, r3, r4, m1, m2, m3, m4, mMax, x1, x2, x3, x4, xError;

    // console.log(rows, colums)
    let createMatrix = () => {
        let rows = +valueInput('rows').value;
        let colums = +valueInput('colums').value;
        let createArr = (rows, colums) => {
            let arr = [];
            for (let i = 0; i < rows; i++) {
                arr[i] = [];
                matrix.appendChild(matrixRow());
                for (let j = 0; j <= colums; j++) {
                    // j === colums-1 ? arr[i][j] = 0 : arr[i][j] = 1 ;
                    if (j === colums) {
                        arr[i][j] = 0;
                        matrixColum(arr[i][j], i, i, 'b', '');
                    } else if (j === colums-1) {
                        arr[i][j] = 1;
                        matrixColum(arr[i][j], i, j, 'x', '=');
                    } else {
                        arr[i][j] = 1;
                        matrixColum(arr[i][j], i, j, 'x', '+');
                    }
                    // console.log(j, colums);             
                }
            }
            return arr;
        }

        let mass = createArr(rows, colums);
        console.log(mass);
        
    }

    sizeMatrixBtn.onclick = createMatrix;

    let reading = () => {
        let rows = +valueInput('rows').value;
        let colums = +valueInput('colums').value;

        let createArray = (rows, colums) => {
            for (let i = 0; i < rows; i++) {
                array[i] = [];
                for(let j = 0; j <= colums; j++ ) {
                    array[i][j] = inputColums(count);
                    count++;
                }
            }
            return array;
        }

        let mass = createArray(rows, colums);
        console.log(mass);

        let firstNorm = (mass, colums, rows) => {
            let sum = [0], subSum, ss, s;
            for (let i = 0; i < rows; i++) {
                subSum = 0;
                for (let j = 0; j < colums; j++) {
                    if (i === j) {
                        ss = mass[i][j];
                        s = j;
                        
                    } else if (i > 0) {
                        if (j <= s) {
                            subSum += mass[i][j];
                        }
                    }
                                           
                }
                
                sum[i] = Math.abs(subSum/ss);
            }
            return sum;
        }

        let s = firstNorm(mass, colums, rows);
        console.log('massF: ', s);

        let secondNorm = (mass, colums, rows) => {
            let sum = [], subSum, ss, s;
            for (let i = 0; i < rows; i++) {
                subSum = 0;
                for (let j = 0; j < colums; j++) {
                    if (i === j) {
                        ss = mass[i][j];
                        s = j;
                        // console.log('ss ' + ss + 's ' + s);
                    } else if (i < rows) {
                        if (j > s) {
                            subSum += mass[i][j];
                            // console.log(mass[i][j]);
                        }
                    }
                                           
                }
                // console.log('rsubSum: ',subSum)
                // console.log('rsum:', sum);
                sum[i] = Math.abs(subSum/ss);
                
            }
            return sum;
        }

        let r = secondNorm(mass, colums, rows);
        console.log('massR: ', r);


        let thirdNorm = (s, r, rows) => {
            let m = [], mMax = 0;
            for (let i = 0; i < rows; i++) {
                m[i] = (r[i]/(1-s[i]));
            }
            for (let j = 0; j < m.length; j++) {
                if (mMax < m[j]) {
                    mMax = m[j];
                }
            }
            return mMax;
        }

        let M = thirdNorm(s, r, rows);
        console.log(M);

        if (M < 1) {
            let iterations = (mass, colums, rows) => {
                let z = 0, nn = [], sum = [], xSum = 0, b = [], xPrev = [], x = 0;
                let arr = [];
                for (let i = 0; i < rows; i++) {
                    // console.log(mass[i][4]);
                    xSum = 0;
                    // xPrev = 0;
                    for (let j = 0; j <= colums; j++) {
                        if (i === j) {
                            nn[j] = +mass[i][j];
                            z = +j;
                            // console.log('n: ' + nn + 'z: ' + z);
                        } /*else if (i > 0) {
                            if (j <= z) {
                                // console.log(j, z);
                                xPrev[i] = +mass[i][j];
                                // console.log('xPrev: ', xPrev);
                            }
                            
                        }*/
                        if (i < rows) {
                            /*if (j > z && j < colums) {
                                xSum += +mass[i][j];
                                // console.log(mass[i][j]);
                                // console.log('xSum: ', xSum);
                            }*/
                            if (j === colums) {
                                b[i] = +mass[i][j];
                                // console.log('b: ', b);
                            }
                        }                      
                                               
                    }
                    sum[i] = xSum;
                    
                }

                let sumArr = [], a, sumMass = [], D = 0, B = 0, sumArrP = [], sumMassP = [];
                for (let i = 0; i < rows; i++) {
                    arr[i] = [];
                    D = 0;
                    B = 0;

                    sumArr.splice(0,sumArr.length);
                    sumMass.splice(0,sumMass.length);
                    sumArrP.splice(0,sumArrP.length);
                    sumMassP.splice(0,sumMassP.length);

                    for (let j = 0; j <= colums; j++) {
                        if (i === 0) {
                            if (j < colums) {
                                arr[i][j] = (b[j]/nn[j]);
                            } else if (j === colums) {
                                arr[i][j] = '-';
                            }
                            
                        }

                        if (i === j && j < colums) {
                            a = j;
                        } else if (i > 0) {
                            if (j <= a && j < colums) {
                                // sumArr[j] = mass[i][j];
                                // console.log('massP ' + +i + ' ' + +j + '--' +  mass[i-1][j]);
                                // console.log(sumArr);
                            }
                            
                        }

                        if (i < rows) {
                            if (j > a && j < colums) {
                                sumMass[j-(a+1)] = mass[i][j];
                                // B = mass[i][j]
                                // console.log('massA ' + +i + ' ' + +j + '--' +  mass[i-1][j]);

                                // console.log('B: ' + B + '(' + j + ' , ' + i + ')');
                                // console.log(sumMass);
                            }

                            if (i === 1 && j > a && j <= colums) {
                                sumArrP[j-(a+1)] = arr[i-1][j-1];
                                // console.log('Arr: ' + arr[i-1][j-1] + ' a: ' + (j-1));
                                console.log(sumArrP);
                                sumMassP[j-(a+1)] = (sumMass[j-(a+1)] * sumArrP[j-(a+1)]);
                                console.log(sumMassP);

                            }

                        }

                        // console.log(sumMass);
                        // console.log(sumArrP);
                        
                        if (i > 0) {
                            if (j !== colums) {
                                // arr[i][j] = ((1/nn[j]) * (b[j] - sumArr[j] - sumMass[j]));
                            } else {
                                // arr[i][j] = ((M / (1 - M)) * Math.max(Math.abs(arr[i-1][j] - arr[i][j])));
                            }
                            // arr[i][j] = ((1/nn[j]) * (b[j] - xPrev[j] - xSum[j]));
                            // x = mass[i][j];
                        }
                        /*
                        if (j === colums) {
                            if (i !== 0) {
                                // arr[i][j] = ((M / (1 - M)) * Math.max(Math.abs(arr[i-1][j] - arr[i][j])));
                            }
                        }*/
                    }
                    // console.log(sumMass);
                    // console.log(sumArrP);
                    // console.log(sumMass);
                    // console.log(B);
                }

                console.log(nn);
                console.log(b);
                console.log(arr);
                return arr;
            }

            let kol = iterations(mass, colums, rows);
            // console.log(kol);
        }
    }

    answerBtn.onclick = reading;
};