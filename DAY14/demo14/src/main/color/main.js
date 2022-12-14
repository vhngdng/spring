const btnRandomColorName = document.getElementById("btn-random-color-name");
const colorEl = document.getElementById("color");
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

const btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener("click", async () => {
        try {
            let index = btn.dataset.type;
            let res = await axios.get(`http://localhost:8090/random-color?type=${index}`);
            console.log(res);
            document.body.style.backgroundColor = res.data;
            colorEl.innerHTML = res.data;
            
        } catch (error) {
            console.log(error);
        }
    })
})