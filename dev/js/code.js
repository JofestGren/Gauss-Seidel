window.onload = () => {
    
    let valueInput = v => document.getElementById(v);
    let count = 0;
    let counts = 1;
    let rowsColums = 4;
    
    let sizeMatrixBtn = valueInput('sizeMatrix');
    let answerBtn = valueInput('answer-btn');
    let matrix = valueInput('matrix');

    let matrixRow = () => {
        let firstLine = document.createElement('div');
        firstLine.className = "animated lightSpeedIn line";
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

    let firstNorms = valueInput('firstNorm');
    let secondNorms = valueInput('secondNorm');
    let thirdNorms = valueInput('thirdNorm');
    let thirdNormMax = valueInput('thirdNormMax');

    let NormRow = (v, i, z) => {
        let firstLine = document.createElement('div');
        firstLine.innerHTML = `<span class="animated zoomIn">${v}<sub>${i+1}</sub>: ${z}</span>`;
        return firstLine;
    }

    let table = valueInput('table');
    let answer = valueInput('answer');

    let tableRow = (i, m) => {
        let firstLine = document.createElement('tr');
        firstLine.innerHTML = `<td>${i}</td><td>${m[i][0]}</td><td>${m[i][1]}</td><td>${m[i][2]}</td><td>${m[i][3]}</td><td>${m[i][4]}</td>`;
        return firstLine;
    }

    let answerRow = (i, m) => {
        let firstLine = document.createElement('div');
        firstLine.innerHTML = `<span>x<sub>${1}</sub>: ${m[i][0]}</span><span>x<sub>${2}</sub>: ${m[i][1]}</span><span>x<sub>${3}</sub>: ${m[i][2]}</span><span>x<sub>${4}</sub>: ${m[i][3]}</span>`;
        return firstLine;
    }


    let createMatrix = () => {
        let createArr = (rowsColums) => {
            let arr = [];
            for (let i = 0; i < rowsColums; i++) {
                arr[i] = [];
                matrix.appendChild(matrixRow());
                for (let j = 0; j <= rowsColums; j++) {
                    if (j === rowsColums) {
                        arr[i][j] = 0;
                        matrixColum(arr[i][j], i, i, 'b', '');
                    } else if (j === rowsColums-1) {
                        arr[i][j] = 1;
                        matrixColum(arr[i][j], i, j, 'x', '=');
                    } else {
                        arr[i][j] = 1;
                        matrixColum(arr[i][j], i, j, 'x', '+');
                    }           
                }
            }
            return arr;
        }

        let mass = createArr(rowsColums);

        document.getElementById('blockMatrixBtn').classList.remove('hidden');
        
    }
    
    sizeMatrixBtn.onclick = createMatrix;

    let reading = () => {
        let accuracy = valueInput('accuracy').value;

        // reading values matrix
        let createArray = (rowsColums) => {
            let array = [];
            for (let i = 0; i < rowsColums; i++) {
                array[i] = [];
                for(let j = 0; j <= rowsColums; j++ ) {
                    array[i][j] = inputColums(count);
                    count++;
                }
            }
            return array;
        }

        let mass = createArray(rowsColums);

        //  r
        let firstNorm = (mass, rowsColums) => {
            let sum = [0], subSum, ss, s;
            for (let i = 0; i < rowsColums; i++) {
                subSum = 0;
                for (let j = 0; j < rowsColums; j++) {
                    if (i === j) {
                        ss = mass[i][j];
                        s = j;
                        
                    } else if (i > 0) {
                        if (j <= s) {
                            subSum += mass[i][j];
                        }
                    }
                                           
                }
                
                sum[i] = Math.abs(subSum/ss).toFixed(5);
                firstNorms.appendChild(NormRow('s', i, sum[i]));
            }
            return sum;
        }

        let s = firstNorm(mass, rowsColums);

        // s
        let secondNorm = (mass, rowsColums) => {
            let sum = [], subSum, ss, s;
            for (let i = 0; i < rowsColums; i++) {
                subSum = 0;
                for (let j = 0; j < rowsColums; j++) {
                    if (i === j) {
                        ss = mass[i][j];
                        s = j;
                    } else if (i < rowsColums) {
                        if (j > s) {
                            subSum += mass[i][j];
                        }
                    }
                                           
                }
                sum[i] = Math.abs(subSum/ss).toFixed(5);
                secondNorms.appendChild(NormRow('r', i, sum[i]));
                
            }
            return sum;
        }

        let r = secondNorm(mass, rowsColums);

        // M
        let thirdNorm = (s, r, rowsColums) => {
            let m = [], mMax = 0;
            for (let i = 0; i < rowsColums; i++) {
                m[i] = (r[i]/(1-s[i])).toFixed(5);
                thirdNorms.appendChild(NormRow('M', i, m[i]));
            }
            for (let j = 0; j < m.length; j++) {
                if (mMax < m[j]) {
                    mMax = m[j];
                }
            }
            thirdNormMax.appendChild(NormRow('Mmax', '', mMax));
            return mMax;
        }

        let M = thirdNorm(s, r, rowsColums);
        
        // Answer matrix
        if (M < 1) {
            let iterations = (mass, rowsColums) => {
                // values Aii and Bi
                let nn = [], b = [];
                for (let i = 0; i < rowsColums; i++) {
                    for (let j = 0; j <= rowsColums; j++) {
                        if (i === j) {
                            nn[j] = +mass[i][j];
                        } 
                        if (i < rowsColums) {
                            if (j === rowsColums) {
                                b[i] = +mass[i][j];
                            }
                        }                                                 
                    }                
                }
                
                //  finally answers table
                let array = [];
                for (let i = 0; i < counts; i++) {
                    array[i] = [];
                    for (let j = 0; j <= rowsColums; j++) {
                        if (i === 0) {
                            j < rowsColums ? array[i][j] = (b[j]/nn[j]).toFixed(5) :  array[i][j] = '-';           
                        } else if (i > 0) {
                            j === 0 ? array[i][j] = ((1/nn[j]) * (b[j] - mass[j][j+1] * array[i-1][1] - mass[j][j+2] * array[i-1][2] - mass[j][j+3] * array[i-1][3])).toFixed(5) :
                            j === 1 ? array[i][j] = ((1/nn[j]) * (b[j] - mass[j][j-1] * array[i][0] - mass[j][j+1] * array[i-1][2] - mass[j][j+2] * array[i-1][3])).toFixed(5) :
                            j === 2 ? array[i][j] = ((1/nn[j]) * (b[j] - mass[j][j-2] * array[i][0] - mass[j][j-1] * array[i][1] - mass[j][j+1] * array[i-1][3])).toFixed(5) :
                            j === 3 ? array[i][j] = ((1/nn[j]) * (b[j] - mass[j][j-3] * array[i][0] - mass[j][j-2] * array[i][1] - mass[j][j-1] * array[i][2])).toFixed(5) :
                            array[i][j] = ((M / (1 - M)) * Math.max(Math.abs(array[i-1][0] - array[i][0]), Math.abs(array[i-1][1] - array[i][1]),
                            Math.abs(array[i-1][2] - array[i][2]), Math.abs(array[i-1][3] - array[i][3]))).toFixed(5);
                        }
                    }
                    table.appendChild(tableRow(i, array));
                    if (array[i][4] < 0.001) {
                        answer.appendChild(answerRow(i, array));
                        console.log(`Iteration: ${i}, x1: ${array[i][0]}, x2: ${array[i][1]}, x3: ${array[i][2]}, x4: ${array[i][3]}, Error: ${array[i][4]},`);
                        break;
                    }
                    counts++;     
                }

                console.log(array);
                return array;
            }

            let res = iterations(mass, rowsColums);
        }

        document.getElementById('blockAnswer').classList.remove('hidden');
        document.getElementById('blockAnswer').classList.add('answer-info');
    }

    answerBtn.onclick = reading;
};