const code = "println 123";

function lexer(code) {
	let list = [];
	const keywords = ["println"];
	let currentChar = undefined;
	let nextChar = undefined;
	let count = 0;

	for (; count <= code.length; count++) {
		currentChar = code[count];
		nextChar = code[count + 1];

		if (is_num(currentChar)) {
			list.push(read_number());
		} else if (!eof() && is_id_start(currentChar)) {
			list.push(read_keyword());
		} else if (eof()) {
			list.push({ type: "EOF " });
		}
	}

	return list;

	//===Helper Functions==

	function is_num(ch) {
		return /[0-9]/i.test(ch);
	}

	function is_id_start(ch) {
		return /[a-z]/i.test(ch);
	}

	function read_while(cbCondition) {
		let str = currentChar;

		while (cbCondition(nextChar)) {
			currentChar = code[++count];
			nextChar = code[count + 1];

			str += currentChar;
		}

		return str;
	}

	function read_keyword() {
		let kw = read_while(is_id_start);

		return {
			type: "keyword",
			value: kw,
		};
	}

	function read_number() {
		const number = read_while(is_num);

		return {
			type: "num",
			value: parseFloat(number),
		};
	}

	function eof() {
		return currentChar === undefined;
	}
}

console.log(lexer(code));
