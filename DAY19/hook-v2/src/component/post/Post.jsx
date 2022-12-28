import axios from "axios";
import React, { useEffect, useState } from "react";

/*
useEffect(callback, dependences)
  TH1: useEffect(callback)   :Được gọi sau mỗi lần re-render
  TH2: useEffect(callback, []): Chỉ được gọi 1 lần duy nhất sau lần render đầu tiên
  TH3: useEffect(callback, [deps]) : Được gọi khi deps thay đổi giá trị

  Đặc điểm chung: đều chạy sau lần render đầu tiên
*/

function Post() {
	const [count, setCount] = useState(0);
	const [count1, setCount1] = useState(0);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [type, setType] = useState("posts");

	useEffect(() => {
		const getPosts = async () => {
			try {
				setLoading(true);
				let res = await axios.get(
					`https://jsonplaceholder.typicode.com/${type}`
				);
				console.log(res);
				setPosts(res.data);

				setTimeout(() => {
					setLoading(false);
				}, 1000);
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, [type]);

	//TH1 : useEffect(callback)
	// useEffect(() => {
	//   console.log("useEffect(callback)");
	// })

	// TH2: useEffect(callback, [])
	// useEffect(() => {
	//   console.log("useEffect(callback, [])");
	// }, []);

	// TH3: useEffect(callback, [deps])
	// useEffect(() => {
	//   console.log("useEffect(callback, [])");
	// }, [count]);

	const increment = () => {
		setCount(count + 1); // bất đồng bộ
		console.log(count);
	};
	const decrement = () => {
		setCount((count) => count - 1); // state moi duoc tinh theo state cu
	};

	const increment1 = () => {
		setCount1(count + 1); // bất đồng bộ
		console.log(count);
	};
	const decrement1 = () => {
		setCount1((count) => count - 1); // state moi duoc tinh theo state cu
	};

	if (loading) {
		return <h2>Loading....</h2>;
	}
	return (
		<>
			{console.log("render")}
			<h1>Count : {count}</h1>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			<hr />
			<h1>Count1 : {count1}</h1>
			<button onClick={increment1}>Increment</button>
			<button onClick={decrement1}>Decrement</button>
			<hr />
			{/* 			
			<button
				onClick={() => setType("posts")}
				style={type === "posts" ? { backgroundColor: "red" } : {}}
			>
				posts
			</button>
			<button
				onClick={() => setType("comments")}
				style={type === "comments" ? { backgroundColor: "red" } : {}}
			>
				comments
			</button>
			<button                    {console.log(productList)};
		
				onClick={() => setType("albums")}
				style={type === "albums" ? { backgroundColor: "red" } : {}}
			>
				albums
			</button> */}
			{["posts", "comments", "albums"].map((ele, index) => (
				<button
					key={index}
					onClick={() => setType(ele)}
					style={type === ele ? { backgroundColor: "red" } : {}}
				>
					{ele}
				</button>
			))}
			<ul>
				{posts.map((ele, index) => (
					<li key={index}>{ele.title || ele.body}</li>
				))}
			</ul>
		</>
	);
}

export default Post;
