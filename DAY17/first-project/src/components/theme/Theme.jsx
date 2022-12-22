import { React, useState } from "react";

const themes = [
	{
		colorHeading: "#2C3639", // light theme
		colorText: "#3F4E4F",
		bg: "#F9F5EB",
	},
	{
		colorHeading: "#EAE3D2", // dark theme
		colorText: "#F9F5EB",
		bg: "#100720",
	},
];

function Theme() {
	// const [checkedSelected, isCheckedSelected] = useState(true);
  const [theme, setTheme] = useState(themes[0]);
  const [value, setValue] = useState("Light");

	const handleChange = (e) => {
    setValue(e.target.value);
    e.target.value === "Light" ?  setTheme(themes[0]) : setTheme(themes[1])
  };

	return (
		<div style={{backgroundColor: theme.bg}}>
			<select value={value} onChange={(e) => handleChange(e)}>
				<option value="Light">Light Theme</option>
				<option value="Dark">Dark Theme</option>
			</select>

			<h2 style={{colorHeading:theme.colorHeading}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
			<p style={{colorText:theme.colorText}}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis placeat
				necessitatibus, vitae laboriosam in quos, nesciunt modi error sit porro,
				reprehenderit voluptatem dolore libero incidunt. Illo mollitia fugit
				quam inventore?
			</p>
		</div>
	);
}

export default Theme;


