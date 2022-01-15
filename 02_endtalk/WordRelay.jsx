const React = require('react')
const { useState, useRef } = React

const WordRelay = () => {
	const [word, setWord] = useState('송창석')
	const [value, setValue] = useState('')
	const [result, setResult] = useState('')
	const inputRef = useRef(null)

	const onChange = e => setValue(e.target.value)
	const onSubmit = e => {
		e.preventDefault()
		if(word[word.length - 1] === value[0]) {
			setResult(`${value} 딩동댕`)
			setWord(value)
			setValue('')
		} else {
			setResult(`땡`)
			setValue('')
		}
		inputRef.current.focus()
	}

	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmit}>
				<input type="text" ref={inputRef} value={value} onChange={onChange} />
				<button onClick={onSubmit}>입력</button>
			</form>
			<div>{result}</div>
		</>
	)
}

module.exports = WordRelay;