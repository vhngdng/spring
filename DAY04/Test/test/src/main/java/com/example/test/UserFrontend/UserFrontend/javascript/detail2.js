const params = new URLSearchParams(window.location.search);
const userId = params.get("id");
console.log(userId);
const API_URL = "http://localhost:8079/api/v1";
// truy cap
const imageContainerEl = document.querySelector(".image-container");
//chon anh
const btnChooseImg = document.getElementById("btn-chose-image");
const btnDeleteImg = document.getElementById("btn-delete-image");
const avatarReview = document.getElementById("avatar-preview");
const avatarEl = document.getElementById("avatar");
const modalImageEl = new bootstrap.Modal(document.getElementById('modal-image'), {
  keyboard: false
})

if (!userId) {
	window.location.href = "./404.html";
}


// Quản lý ảnh
let images = [];

const getImages = async () => {
	try {
		let res = await axios.get(`${API_URL}/users/${userId}/files`);
		console.log(res);
		images = res.data;
		renderPaginationAndRenderImages(images);
	} catch (error) {
		console.log(error);
	}
};
// Hien thi image tren UI
const renderImage = (images) => {
	imageContainerEl.innerHTML = "";
	let html = "";
	images.forEach((i) => {
		html += `
    <div class="image-item" onclick="chooseImage(this)">
      <img src="http://localhost:8079${i}" alt="ảnh" data-url=${i}>
    </div>
    `;
	});
	imageContainerEl.innerHTML = html;
	btnChooseImg.disabled = true;
	btnDeleteImg.disabled = true;
};

// phan trang
const renderPaginationAndRenderImages = (arr) => {
	$(".pagination-container").pagination({
		dataSource: arr,
		pageSize: 8,
		callback: function (data, pagination) {
			// template method of yourself
			console.log(data);
			console.log(pagination);
			renderImage(data);
		},
	});
};

getImages();
// Chon 1 hinh anh
const chooseImage = (imageEL) => {
	console.log("choose image");
	// Xoa anh duoc active truoc do neu co
	const imageActiveEl = document.querySelector(".image-active");
	if (imageActiveEl) {
		imageActiveEl.classList.remove("image-active");
	}

	//active duoc hinh anh
	imageEL.classList.add("image-active");
	//active cac nut chuc nang
	btnChooseImg.disabled = false;
	btnDeleteImg.disabled = false;
};

// xoa anh

btnDeleteImg.addEventListener("click", async () => {
	try {
		const imageActiveEl = document.querySelector(".image-active img");
		if (!imageActiveEl) return;
		const url = imageActiveEl.src;src

		//xoa tren server
		await axios.delete(url);

		// xoa tren client
		images = images.filter((image) => !url.include(image));
		//render lai image

		renderPaginationAndRenderImages(images);
	} catch (error) {
		console.log(error);
	}
});

btnChooseImg.addEventListener("click", async () => {
	const imageActiveEl = document.querySelector(".image-active img");
	if (!imageActiveEl) return;
	const url = imageActiveEl.dataset.url;
  console.log(url);
  //goi api
  await axios.put(`${API_URL}/users/${userId}/update-avatar`, {
    avatar: url
  })
  console.log(url);
  console.log(avatarReview.src);
  avatarReview.src = `http://localhost:8079${url}`;
  console.log(avatarReview.src);

  // dong modal
  modalImageEl.hide();
});

// Upload anh

avatarEl.addEventListener("change", async (e) => {
  try {
    // Lay ra file upload
    const file = e.target.files[0];
    console.log(file);
    
    //Tao doi tuong form data
    const formData = new FormData;
    formData.append('file', file);
    //Gui APi
    const res = await axios.post(`${API_URL}/users/${userId}/files`, formData)

    //Cap nhat UI
    images.unshift(res.data);
    renderPaginationAndRenderImages(images);
    modalImageEl.hide();
  } catch (error) {
    console.log(error)
  }
})