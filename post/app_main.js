/**
 * Created by dujinqiao on 16-7-28.
 */


function isValueNum(input) {
    return /^\d{5}(-?\d{4})?$/.test(input);
}

function addACode(input) {
    let verifiedNum = [];
    let cd = 0;
    let splitInput = input.split("");
    let sum = splitInput.reduce(function (a, b) {
        if (b !== '-') {
            a = parseInt(a) + parseInt(b);
        }
        return a;
    });
    verifiedNum = input.replace('-', '');
    if (sum % 10 === 0) {
        verifiedNum += '0';
    }
    else {
        cd = (10 - sum % 10).toString();
        verifiedNum += cd;
    }
    return verifiedNum;
}


function matchCode(verifiedNum) {
    let barcodes = [];
    let allCodes = loadAllCodes();
    let arr = verifiedNum.split('');
    barcodes = arr.map((a)=>allCodes[a]);
    return barcodes;
}


function num2code(input) {
    if(isValueNum(input)){
        let barcodes = matchCode(addACode(input));
        let text = 'Validation Check:       ' + input + '   ==   |' + barcodes.join("") + '|' + '\n' + 'cd is ' + addACode(input).slice(-1);
        return text;
    }

}


function isValueAll(input) {
    let bool = false;
    if (isValue(input)) {
        if (hasFrame(input)) {
            let noFrame = input.slice(1, -1);
            if (isFiveLength(noFrame)) {
                return bool = true;
            }
        }
    }
    return bool;
}
function isValue(input) {
    let bool = true;
    for (let i of input) {
        if (i !== '|' && i !== ' ' && i !== ':') {
            return bool = false;
        }
    }
    return bool;
}

function hasFrame(barcode) {
    let bool = false;
    let arr = barcode.split('');
    if (arr[0] === '|' && arr[1] === ' ' && arr[arr.length - 1] === '|' && arr[arr.length - 2] === ' ') {
        bool = true;
    }
    return bool;
}

function isFiveLength2(input) {
    let bool = true;
    let arr = input.split(' ');
    for (let i of arr) {
        if (i.length !== 5) {
            bool = false;
        }
    }
    return bool;
}

function isFiveLength(input) {
    return input.split(' ').filter((v, k, arr)=> {
        return k > 0 && k < arr.length - 1;
    }).every(v=>v.length === 5);
}


function loadAllCodes() {
    return [
        '||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'
    ];
}


function splitCode(input) {

    return input.slice(2, -2).split(' ');
}


function matchNum(splitedCodes) {
    let allCodes = loadAllCodes();
    let matchedNum = '';

    matchedNum = splitedCodes.map((a)=> {
        if (allCodes.includes(a)) {
            return allCodes.indexOf(a);
        }
    });

    return matchedNum.join('');
}

function codeTurnNum(barcode) {
    if(isValueAll(barcode)){
        let splitedCodes = splitCode(barcode);
        let nums = matchNum(splitedCodes);
        let text = '';

        if (nums.length === 6) {
            text += 'Validation Check:       ' + barcode + '   ==   ' + parseInt(nums.slice(0, -1)) + '\n' + 'cd is ' + nums.slice(-1);
        }
        else if (nums.length === 10) {
            text += 'Validation Check:       ' + barcode + '   ==   ' + nums.slice(0, 5) + '-' + nums.slice(5, 9) + '\n' + 'cd is ' + nums.slice(-1);

        }
        return text;
    }
   
}


module.exports = {
    isValueNum: isValueNum,
    addACode: addACode,
    matchCode: matchCode,
    num2code: num2code,
    isValueAll: isValueAll,
    splitCode: splitCode,
    matchNum: matchNum,
    codeTurnNum: codeTurnNum
};