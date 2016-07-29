'use strict';
const call=require('../../post/app_main');

function num2code2(num) {
    num = num === 0 ? 11 : num;
    let times = 0;
    let result = "";
    [7, 4, 2, 1, 0].forEach(w => {
        if (num >= w && times < 2) {
            num -= w;
            times++;
            result += '|';
        } else {
            result += ':';
        }
    });
    return result;
}

describe("judge if value number",function () {
    it("should return true when users' input if 5 digit string",function () {
        let input='32343';
        let result=call.isValueNum(input);
        expect(result).toEqual(true);
    }) ;

    it("should return true when users' input if 9 digit string",function () {
        let input='323434444';
        let result=call.isValueNum(input);
        expect(result).toEqual(true);
    }) ;

    it("should return true when users' input if 10 digit string",function () {
        let input='32343-4444';
        let result=call.isValueNum(input);
        expect(result).toEqual(true);
    }) ;

    it("should return false when users' input other thing",function () {
        let input='rrrr';
        let result=call.isValueNum(input);
        expect(result).toEqual(false);
    }) ;
});

describe("calculate addACode code", function () {
    it("should get string with a verified code", function () {
        let input = '23414';
        let result = call.addACode(input);
        expect(result).toEqual('234146');
    });

    it("should get string with a verified code", function () {
        let input = '111111111';
        let result = call.addACode(input);
        expect(result).toEqual('1111111111');
    });

    it("should get string with a verified code", function () {
        let input = '11111-1111';
        let result = call.addACode(input);
        expect(result).toEqual('1111111111');
    });
});



xdescribe("num2code", ()=> {
    it("should return :::|| when number is 1", ()=> {
        expect(num2code(1)).toEqual(':::||');
    });

    it("should return ::|:| when number is 2", ()=> {
        expect(num2code(2)).toEqual('::|:|');
    });

    it("should return ::||: when number is 3", ()=> {
        expect(num2code(3)).toEqual('::||:');
    });

    it("should return |:|:: when number is 3", ()=> {
        expect(num2code(9)).toEqual('|:|::');
    });

    it("should return ||::: when number is 3", ()=> {
        expect(num2code(0)).toEqual('||:::');
    });
});


describe("judge if value number",function () {
    it("should return true when users' input if 5 digit string",function () {
        let input='32343';
        let result=call.isValueNum(input);
        expect(result).toEqual(true);
    }) ;

    it("should return true when users' input if 9 digit string",function () {
        let input='323434444';
        let result=call.isValueNum(input);
        expect(result).toEqual(true);
    }) ;

    it("should return true when users' input if 10 digit string",function () {
        let input='32343-4444';
        let result=call.isValueNum(input);
        expect(result).toEqual(true);
    }) ;

    it("should return false when users' input other thing",function () {
        let input='rrrr';
        let result=call.isValueNum(input);
        expect(result).toEqual(false);
    }) ;
});

describe("calculate addACode code", function () {
    it("should get string with a verified code", function () {
        let input = '23414';
        let result = call.addACode(input);
        expect(result).toEqual('234146');
    });
});

describe("match code", function () {
    it("should match number to barcode", function () {
        let verifiedNum = '63097';
        let result = call.matchCode(verifiedNum);
        let expected = [':||::', '::||:', '||:::', '|:|::', '|:::|'];
        expect(result).toEqual(expected);
    })
});

describe("numTurnCode", function () {
    it("should put out ", function () {
        let input = '63097';
        let result = call.num2code(input);
        let expeced = 'Validation Check:       ' + 63097 + '   ==   |:||::::||:||:::|:|::|:::|:|:|:|' + '\n' + 'cd is ' + 5;
        expect(result).toEqual(expeced);
    })
});


describe("judge if correct", function () {
    it("alert prompt infomation", function () {
        let input = '| ||::: ::||: ||::: |:|:: |:::| |';
        let result = call.isValueAll(input);
        expect(result).toEqual(true);
    });

    it("alert prompt infomation", function () {
        let input = '| ||::: ::||: ||::: |:|:: |:::| ||:::';
        let result = call.isValueAll(input);
        expect(result).toEqual(false);
    });

    it("alert prompt infomation", function () {
        let input = '| ||::: ::||: ||::: |:|:: |:::| 88 |';
        let result = call.isValueAll(input);
        expect(result).toEqual(false);
    });

});

describe("split code ", function () {
    it("should split code by ' '", function () {
        let barcode = '| ||::: ::||: ||::: |:|:: |:::| |';
        let result = call.splitCode(barcode);
        let expected = ['||:::', '::||:', '||:::', '|:|::', '|:::|'];
        expect(result).toEqual(expected);
    })
});

describe("matchNum", function () {
    it("should match ||::: ..to 0..", function () {
        let splitedCodes = [':||::', '::||:', '||:::', '|:|::', '|:::|'];
        let result = call.matchNum(splitedCodes);
        let expected = '63097';
        expect(result).toEqual(expected);
    })
});

describe("code to number", function () {
    it("should input barcode output number", function () {
        let barcode = '| |:|:: ::||: ||::: |:|:: |:::| :|:|: |';
        let result = call.codeTurnNum(barcode);
        let expected = 'Validation Check:       ' + '| |:|:: ::||: ||::: |:|:: |:::| :|:|: |   ==   ' + 93097 + '\n' + 'cd is ' + 5;
        expect(result).toEqual(expected);
    });

});