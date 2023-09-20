import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");

	const passwordRef = useRef(null);

	const copyPassword = useCallback(() => {
		passwordRef.current?.select();
		console.log(passwordRef.current.value);
		passwordRef.current?.setSelectionRange(0, length); //select range wise
		window.navigator.clipboard.writeText(password);
	}, [password, length]);

	// Password Generator
	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "!@#$%^&*(){}[]+-*/=~`";

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			console.log("star char=>", str.charAt(char));
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, numberAllowed, charAllowed, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, charAllowed, passwordGenerator]);

	return (
		<div className="mx-3">
			<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
				<h1 className="text-white text-center mb-2 text-base font-serif">
					Password Generator
				</h1>
				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						value={password}
						className="text-orange-500 outline-none w-full py-1 px-3"
						placeholder="Password"
						readOnly
						ref={passwordRef}
					/>
					<button
						onClick={copyPassword}
						className="outline-none bg-blue-700 hover:bg-blue-600 text-white px-3 py-0.5"
					>
						copy
					</button>
				</div>
				<div className="flex items-center justify-center md:justify-between flex-wrap text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={8}
							max={100}
							value={length}
							className="cursor-pointer"
							onChange={(e) => setLength(e.target.value)}
						/>
						<label>Length: {length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={numberAllowed}
							className="cursor-pointer"
							onChange={() => setNumberAllowed((prev) => !prev)}
						/>
						<label>Numbers</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={charAllowed}
							className="cursor-pointer"
							onChange={() => setCharAllowed((prev) => !prev)}
						/>
						<label>Characters</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
