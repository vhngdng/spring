import React, { useRef, useEffect, useState } from "react";
import videoTiktok from "../../music/videoTiktok.mp4";

const colors = ["red", "green", "blue", "pink", "yellow"];

function Blog() {
	const [color, setColor] = useState("red");
	const inputRef = useRef();
	console.log(inputRef);
	const videoRef = useRef();

  //background ref
  const backgroundRef = useRef();

	useEffect(() => {
		console.log(inputRef);
		inputRef.current.focus();
	}, []);

	const play = () => {
		videoRef.current.play();
	};

	const pause = () => {
		videoRef.current.pause();
	};


  // Random 1 color trong mảng colors bên trên
  // Mỗi lần random không được trùng với màu đang có trong state
  const randomColor = () => {
    console.log(backgroundRef.current)
    // let color = backgroundRef.current.style.backgroundColor;
    // let newColors = colors.filter(c => c !== color);
    // setColor(newColors[Math.floor(Math.random() * newColors.length)]);
  }

	return (
		<>
			<h1>useRef Hook</h1>
			<input placeholder="Enter name: ..." ref={inputRef} />

			<hr />

			<video src={videoTiktok} style={{ height: 300 }} ref={videoRef}></video>
			<button onClick={play}>Play</button>
			<button onClick={pause}>Pause</button>

			<hr />

			<div
				style={{
					height: 200,
					width: 200,
					border: "1px solid #333",
					backgroundColor: color, 
				}}
        
			></div>
			<button 
        onClick={randomColor}
        style={{ backgroundColor: "#fff" }}
        >
				Random Background Color
			</button>
		</>
	);
}

export default Blog;
