const inputWeight = document.getElementById("weight");
const inputHeight = document.getElementById("height");
const bmi = document.querySelector(".bmi-result");
// btnRandomColorName.addEventListener("click", async function (){
//     try {
//         let res = await axios.get(`http://localhost:8090/random-color?type=type=${index + 1}`);
//         console.log(res);
//         document.body.style.backgroundColor = res.data;
//         colorEl.innerHTML = res.data;
//     } catch (error) {
//         console.log(error);
//     }
// })

// lang nghe toan bo cac nut



//

function getCalBmi() {
    let weight = inputWeight.value;
    let height = inputHeight.value;
    console.log(weight);
    console.log(height);
    calBmi(weight, height);
}

function postCalBmi() {
    let weight = inputWeight.value;
    let height = inputHeight.value;
    console.log(weight);
    console.log(height);
    postBmi(weight, height);
}


async function calBmi(weight, height) {
    try {
        let res = await axios.get(`http://localhost:8090/bmi-get?height=${weight}&weight=${height}`);
        bmi.textContent = "bmi: " + res.data;
        console.log(res);
    }catch(error) {
        console.log(error);
    }
}

async function postBmi(weight, height) {
    try {
        let res = await axios.post(`http://localhost:8090/bmi-post`, {
            height: height,
            weight: weight
        });
        bmi.textContent = "bmi: " + res.data;
        console.log(res);
    }catch(error) {
        console.log(error);
    }
}


const getBtn = document.querySelector("get-btn");


