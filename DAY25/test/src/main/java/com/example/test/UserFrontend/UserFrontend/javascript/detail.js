console.log(document.location.href);
const href = document.location.href;
const index = href.lastIndexOf("=");
const id = href.substring(index + 1);

const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const avaPreview = document.getElementById("avatar-preview");
console.log(avaPreview);
const changePassBtn = document.querySelector(".btn-primary");
const updateUser = document.getElementById("btn-save");
const btnBack = document.querySelector(".btn-back");
const forgotPassword = document.getElementById("btn-forgot-password");

btnBack.innerHTML = "";
btnBack.appendChild(document.createElement("a"));
btnBack.getElementsByTagName("a")[0].href = "./index.html";
btnBack.getElementsByTagName("a")[0].textContent = "Quay lại";

const checkAddress = (options, addressName) => {
	for (i = 0; i < options.length; i++) {
		if (options[i].text === addressName) return i;
	}
};
let user = { fullName: "", email: "", phone: "", address: [], avatar: "" };
const findUserById = async (id) => {
	await axios
		.get(`http://localhost:8079/api/v1/users/${id}`)
		.then((res) => {
			console.log(res.data);
			fillInformation(res.data);
		})
		.catch(error => console.log(error));
};
findUserById(id);

const fillInformation = (user) => {
	fullName.value = user.name;
	email.value = user.email;
	phone.value = user.phone;
	avaPreview.src = `http://localhost:8079${user.avatar}`;
	console.log(user.avatar);
	getAddress(user.address);
	user = {
		fullName: user.name,
		email: user.email,
		phone: user.phone,
		address: user.address,
		avatar: user.avatar,
	};
	console.log(user);
};

let getAddress = async (address) => {
	await getProvince();
	let options = formSelect.options;
	console.log(options);
	formSelect.selectedIndex = checkAddress(options, address[0]);
	if (address[1] !== null) {
		await getDistrict();
		let districtSelected = document.querySelector(".district select");
		districtSelected.selectedIndex = checkAddress(
			districtSelected.options,
			address[1]
		);
		await getWards();
	}

	if (address[2] !== null) {
		let wardSelected = document.querySelector(".ward select");
		wardSelected.selectedIndex = checkAddress(wardSelected.options, address[2]);
	}
};

// update

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
	console.log(avaPreview.parentNode.parentNode);
	p4.insertBefore(divSelect, avaPreview.parentNode.parentNode);
};

// province
const getProvince = async () => {
	return await axios
		.get(`https://provinces.open-api.vn/api/p/`)
		.then((res) => {
			addOptionForSelect(res.data, formSelect);
		})
		.catch(error => console.log(error));
};

formSelect.addEventListener("change", () => {
	formSelect.selected = "true";
	getDistrict();
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
			let districtSelected = document.querySelector(".district select");
			console.log(districtSelected);
			// add event for select lv 2
			districtSelected.addEventListener("change", () => {
				districtSelected.selected = "true";
				getWards();
			});
		})
		.catch(error => console.log(error));
};

// ward
const getWards = async () => {
	removeElementByClass("ward");
	let districtSelected = document.querySelector(".district select");
	let ward = districtSelected.options[districtSelected.selectedIndex];
	let wardDiv = document.createElement("div");
	wardDiv.classList.add("ward");
	await axios
		.get(`https://provinces.open-api.vn/api/d/${ward.dataset.code}?depth=2`)
		.then((res) => {
			let wards = res.data.wards;
			createSelectOption(wards, wardDiv);
		})
		.catch(error => console.log(error));
};

// thay doi mat khau
changePassBtn.addEventListener("click", async () => {
	try {
		let passwordModel = getOldNewPass();
		await axios.post(
			`http://localhost:8079/api/v1/users/${id}/update-password`,
			{
				oldPassword: passwordModel.oldPassword,
				newPassword: passwordModel.newPassword,
			}
		);
	} catch {
		(error) => console.log(error);
	}
});

let getOldNewPass = () => {
	let btnChangePass = document.getElementById("btn-change-password");
	btnChangePass.addEventListener("click", () => {
		let oldPassword = document.getElementById("old-password").value;
		let newPassword = document.getElementById("new-password").value;
		return {
			oldPassword: oldPassword,
			newPassword: newPassword,
		};
	});
};

// update user
updateUser.addEventListener("click", async () => {
	let fullNameChanged = "";
	user.fullName === fullName.value
		? (fullNameChanged = null)
		: (fullNameChanged = fullName.value);
	let phoneChanged = "";
	user.phone === phone.value
		? (phoneChanged = null)
		: (phoneChanged = phone.value);
	let emailChanged = "";
	user.email === email.value
		? (emailChanged = null)
		: (emailChanged = email.value);
	let addressChanged = [];

	let selects = document.getElementsByClassName("form-select");
	for (i = 0; i < selects.length; i++) {
		let options = selects[i].options;
		console.log(options);
		if (user.address[i] != options[options.selectedIndex].text) {
			user.address[i] = options[options.selectedIndex].text;
			addressChanged.push(selects[i].text);
		}
	}
	if (addressChanged.length !== 0) {
		addressChanged = user.address;
	}
	console.log(addressChanged);
	debugger;
	await axios
		.put(`http://localhost:8079/api/v1/users/${id}`, {
			name: fullNameChanged,
			email: emailChanged,
			phone: phoneChanged,
			address: addressChanged,
		})
		.then(() => {
			alert("Update user successfully");
			updateUser.appendChild(document.createElement("a"));
			updateUser.getElementsByTagName("a")[0].href = `./detail.html?id=${id}`;
			debugger;
		})
		.catch((error) => {
			alert("Update fail");
			console.log(error);
		});
});

// quen mat khau
forgotPassword.addEventListener("click", async () => {
	await axios
		.get(`http://localhost:8079/api/v1/users/${id}/fotgot-password`)
		.then((res) => {
			res.data;
			alert("your password is: " + res.data);
		})
		.catch(error => console.log(error));
});
