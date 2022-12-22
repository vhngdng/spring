import { React, useState } from "react";

//two way binding: Đồng bộ dữl iệu theo 2 chiều
// - state -> input : value
// - input -> state : onChange();
function Content() {
	const [name, setName] = useState("");
	const [gender, setGender] = useState("male");
	const [languages, setLanguage] = useState(["cn", "vn"]);

	const handleChooseLanguage = (language) => {
    languages.includes(language)
    ? setLanguage(languages.filter(l => l !== language)) 
    : setLanguage(prev => [...prev, language]);
	}

	return (
		<>
			<input
				type="text"
				placeholder="Enter name ...."
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label htmlFor="">Nam</label>
			<input
				type="radio"
				value={"male"}
				id="male"
				checked={gender === "male"}
				onChange={(e) => setGender(e.target.value)}
			/>
			<label htmlFor="">Nữ</label>
			<input
				type="radio"
				value={"female"}
				id="female"
				checked={gender === "female"}
				onChange={(e) => setGender(e.target.value)}
			/>

			<br />

			<label>Ngỗn ngữ: </label>
			<label htmlFor="vn">VN</label>
			<input
				type="checkbox"
				value={"vn"}
				id="vn"
				checked={languages.includes("vn")}
        onChange={(e) => handleChooseLanguage(e.target.value)}
			/>

			<label htmlFor="cn">CN</label>
			<input
				type="checkbox"
				value={"cn"}
				id="cn"
				checked={languages.includes("cn")}
        onChange={(e) => handleChooseLanguage(e.target.value)}
			/>

			<label htmlFor="jp">JP</label>
			<input
				type="checkbox"
				value={"jp"}
				id="jp"
				checked={languages.includes("jp")}
        onChange={(e) => handleChooseLanguage(e.target.value)}
			/>
		</>
	);
}

export default Content;
