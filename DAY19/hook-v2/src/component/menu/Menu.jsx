import React, { useState, useEffect } from "react";

function Menu() {
	const [time, setTime] = useState(() => {
		let now = new Date();
		return now.toLocaleString();
	});

	useEffect(() => {
		const handleScroll = () => {
			console.log("scroll event");
		};
		// window add function
		window.addEventListener("scroll", handleScroll);
		// clean up
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Timer - setInterval
	useEffect(() => {
    const interval = setInterval(() => {
      console.log("inside Interval");
      setTime(new Date().toLocaleString())   
    }, 1000);

    // clean up
    return () => {
      clearInterval(interval);
    }
  },[]);

	return (
	<>
		<h1>Menu component </h1>
		<h2>Time : {time}</h2>
	</> 
  );
}

export default Menu;
