var inn, step1, step2, step3, temp,tmp;






$(document).ready(function () {

    $('input').val(0);

    $('#calc').on('click', async function () {
        $('.steps').text('');
        inn = [Number($('.1 > input').val()), Number($('.2 > input').val()), Number($('.3 > input').val()), Number($('.4 > input').val()), Number($('.5 > input').val()), Number($('.6 > input').val()), Number($('.7 > input').val()), Number($('.8 > input').val()), Number($('.9 > input').val()), Number($('.10 > input').val()), Number($('.11 > input').val()), Number($('.12 > input').val())];
        step1 = [];
        step2 = [];
        step3 = [];
        temp = [];
        
        await (async function(){return new Promise(function(resolve){inn.forEach(function(e,i){step1[i]=e;if((inn.length-1)==i){resolve()}})})})();
        

        if (inn[0] == 0) {
            temp[0] = inn[0];
            temp[1] = inn[1];
            temp[2] = inn[2];
            temp[3] = inn[3];

            inn[0] = inn[4];
            inn[1] = inn[5];
            inn[2] = inn[6];
            inn[3] = inn[7];

            inn[4] = temp[0];
            inn[5] = temp[1];
            inn[6] = temp[2];
            inn[7] = temp[3];
        }

        // ? START step1




        //  * L1 ~> L1/a1
        step1[0] = 1;
        step1[1] = inn[1] / inn[0];
        step1[2] = inn[2] / inn[0];
        step1[3] = inn[3] / inn[0];
        // !end
        await displaySteps("L1 ~> L1/a1",step1);

        //  * L2 ~> L2 - a2L1
        step1[4] = step1[4] - (inn[4] * step1[0]);
        step1[5] = step1[5] - (inn[4] * step1[1]);
        step1[6] = step1[6] - (inn[4] * step1[2]);
        step1[7] = step1[7] - (inn[4] * step1[3]);
        // !end

        await displaySteps("L2 ~> L2 - a2L1",step1);

        //  * L3 ~> L3 - a3L1
        step1[8] = step1[8] - (inn[8] * step1[0]);
        step1[9] = step1[9] - (inn[8] * step1[1]);
        step1[10] = step1[10] - (inn[8] * step1[2]);
        step1[11] = step1[11] - (inn[8] * step1[3]);
        // !end
        await displaySteps("L3 ~> L3 - a3L1",step1);


        // ? END STEP1

        if (step1[5] == 0) {
            temp[0] = step1[4];
            temp[1] = step1[5];
            temp[2] = step1[6];
            temp[3] = step1[7];

            step1[4] = step1[8];
            step1[5] = step1[9];
            step1[6] = step1[10];
            step1[7] = step1[11];

            step1[8] = temp[0];
            step1[9] = temp[1];
            step1[10] = temp[2];
            step1[11] = temp[3];


            if (step1[9] == 0) {
                displaySteps("Impossible!");
                return 0;
            }
        }

        await (async function(){return new Promise(function(resolve){step1.forEach(function(e,i){step2[i]=e;if((step1.length-1)==i){resolve()}})})})();


        // ? Start step2


        // * L2 ~> L2/b2'
        step2[4] = step2[4] / step1[5];
        step2[5] = step2[5] / step1[5];
        step2[6] = step2[6] / step1[5];
        step2[7] = step2[7] / step1[5];
        // !end

        await displaySteps("L2 ~> L2/b2'",step2);

        // * L3 ~> L3 - b3'L2
        tmp=step2[9];
        step2[8] = step2[8] - (tmp * step2[4]);
        step2[9] = step2[9] - (tmp * step2[5]);
        step2[10] = step2[10] - (tmp * step2[6]);
        step2[11] = step2[11] - (tmp * step2[7]);
        // !end

        await displaySteps("L3 ~> L3 - b3'L2'",step2);


        // ? END STEP2
        await (async function(){return new Promise(function(resolve){step2.forEach(function(e,i){step3[i]=e;if((step2.length-1)==i){resolve()}})})})();


        // ? Start step3


        // * L3 ~> L3/c3"
        step3[8] = step3[8] / step2[10];
        step3[9] = step3[9] / step2[10];
        step3[10] = step3[10] / step2[10];
        step3[11] = step3[11] / step2[10];
        // !end
        await displaySteps(`L3 ~> L3/c3"`,step3);

        // * L2 ~> L2 - c2"L3
        step3[4] = step3[4] - (step2[6] * step3[8]);
        step3[5] = step3[5] - (step2[6] * step3[9]);
        step3[6] = step3[6] - (step2[6] * step3[10]);
        step3[7] = step3[7] - (step2[6] * step3[11]);
        // !end
        await displaySteps(`L2 ~> L2 - c2"L3`,step3);

        // * L1 ~> L1 - c1'L3 - b1'L2
        step3[0] = step3[0] - (step2[2] * step3[8]) - (step2[1] * step3[4]);
        step3[1] = step3[1] - (step2[2] * step3[9]) - (step2[1] * step3[5]);
        step3[2] = step3[2] - (step2[2] * step3[10]) - (step2[1] * step3[6]);
        step3[3] = step3[3] - (step2[2] * step3[11]) - (step2[1] * step3[7]);
        // !end
        await displaySteps(`L1 ~> L1 - c1'L3 - b1'L2`,step3);


        // ? End Step3



        await displayAnswer(step3[3],step3[7],step3[11]);

        //console.log(step3)
    });
});




async function displayAnswer(x,y,z){
    return new Promise(async function(res){
        console.log(x,y,z);
        $('.x').text(x);
        $('.y').text(y);
        $('.z').text(z);
        res();
    })
}

async function displaySteps(title,arr){
    return new Promise(async function(res) {
        var el = $(`<div class="step">
        <div class="title">`+title+`</div>
        <div class="row">
            <div class="column">
                <div class="el">`+arr[0]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[1]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[2]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[3]+`</div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="el">`+arr[4]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[5]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[6]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[7]+`</div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <div class="el">`+arr[8]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[9]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[10]+`</div>
            </div>
            <div class="column">
                <div class="el">`+arr[11]+`</div>
            </div>
        </div>
    </div>`)[0];

        $('.steps').append(el);
        res()
    });
}