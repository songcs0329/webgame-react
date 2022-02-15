import * as React from 'react'
import { useRef, useState } from 'react'

const GuGuDan = () => {
	const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
	const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
	const [value, setValue] = useState('')
	const [result, setResult] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
	const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const inputEl = inputRef.current
		if(first * second !== parseInt(value)) {
			setResult('땡')
		} else {
			setResult(`${first} * ${second} = ${value} 정답!`)
			setFirst(Math.ceil(Math.random() * 9))
			setSecond(Math.ceil(Math.random() * 9))
		}
		setValue('')
		if(inputEl) inputEl.focus()
	}

	return (
		<>
			<div>{first} 곱하기 {second}는?</div>
			<form onSubmit={onSubmitForm}>
				<input type="number" ref={inputRef} value={value} onChange={handleValue} />
				<button type="submit">입력</button>
			</form>
			<div>{result}</div>
		</>
	)
}

export default GuGuDan