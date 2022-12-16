const formSelect = document.getElementById("address");
console.log(formSelect);
const p4 = document.querySelector(".p-4");
const btnSave = document.getElementById("btn-save");
// console.log(p4.lastElementChild);

// add option
const addOptionForSelect = (options, select) => {
	select.innerHtml = "";
	options.forEach((address) => {
		let option = document.createElement("option");
		option.text = address.name;
		option.setAttribute("data-code", address.code);
		select.appendChild(option);
	});
};

// reset select tag
const removeElementByClass = (className) => {
	const elements = document.getElementsByClassName(className);
	while (elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}
};

// create select and option after choose
const createSelectOption = (options, divSelect) => {
	divSelect.innerHtml = "";
	let select = document.createElement("select");
	select.classList.add("form-select");
	addOptionForSelect(options, select);
	divSelect.appendChild(select);
	p4.insertBefore(divSelect, p4.lastElementChild);
};

// province
const getProvince = async () => {
	return await axios
		.get(`https://provinces.open-api.vn/api/p/`)
		.then((res) => {
			let provinces = res.data;
			addOptionForSelect(provinces, formSelect);
		})
		.catch((error) => {
			console.log(error);
		});
};
getProvince();

formSelect.addEventListener("change", async () => {
	formSelect.selected = "true";
	// console.log(formSelect.value);
	await getDistrict();
});

// district
const getDistrict = async () => {
	removeElementByClass("district");
	removeElementByClass("ward");
	let district = formSelect.options[formSelect.selectedIndex];
	let districtDiv = document.createElement("div");
	districtDiv.classList.add("district");

	await axios
		.get(`https://provinces.open-api.vn/api/p/${district.dataset.code}?depth=2`)
		.then((res) => {
			let districts = res.data.districts;
			createSelectOption(districts, districtDiv);

			// get select lv 2
			let districtSelected = document
				.querySelector(".district")
				.getElementsByTagName("select")[0];
			// add event for select lv 2
			districtSelected.addEventListener("change", () => {
				districtSelected.selected = "true";
				getWards();
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

// ward
const getWards = async () => {
	removeElementByClass("ward");
	let districtSelected = document
		.querySelector(".district")
		.getElementsByTagName("select")[0];
	let ward = districtSelected.options[districtSelected.selectedIndex];
	let wardDiv = document.createElement("div");
	wardDiv.classList.add("ward");
	await axios
		.get(`https://provinces.open-api.vn/api/d/${ward.dataset.code}?depth=2`)
		.then((res) => {
			let wards = res.data.wards;
			createSelectOption(wards, wardDiv);
		})
		.catch((error) => {
			console.log(error);
		});
};

const address = document.getElementsByClassName("form-select");
console.log(address);
// create user

btnSave.addEventListener("click", async () => {
	// debugger;
	const name = document.getElementById("name");
	const email = document.getElementById("email");
	const phone = document.getElementById("phone");
	const password = document.getElementById("password");
	const addresses = document.getElementsByClassName("form-select");
	let address = [];
	for (i = 0; i < addresses.length; i++) {
		address.push(addresses[i].value);
	}
	console.log(addresses);
	if (
		name.value == null ||
		email.value == null ||
		phone.value == null ||
		password.value == null ||
		address == null
	) {
		alert("insufficient information");
	}
	console.log(addresses);

	await axios
		.post(`http://localhost:8079/api/v1/users`, {
			name: name.value,
			email: email.value,
			phone: phone.value,
			address: address,
			password: password.value,
		})
		.then(async () => {
			debugger;
			await axios
				.get(`http://localhost:8079/api/v1/users/search?name=${name.value}`)
				.then((res) => {
					alert(
						"user name " + res.data.name + " has been created successfully"
					);
				})
				.catch((error) => console.log(error));
		})
		.catch((error) => {
			console.log(error);
		});
});
