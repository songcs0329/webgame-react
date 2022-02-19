import * as React from 'react'
import { useCallback, useRef, useState } from 'react'

const EndTalk = () => {
	const [word, setWord] = useState("이상해")
	const [value, setValue] = useState("")
	const [result , setResult] = useState("")
	const inputRef= useRef<HTMLInputElement | null>(null)

	// useCallback에 타입선언(함수로, 타입추론)
	const onChange = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>((e) => {
		setValue(e.target.value)
	}, [])

	// 함수에 타입선언
	const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const inputEl = inputRef.current
		if(word[word.length - 1] === value[0]) {
			setResult(`${value} 딩동댕`)
			setWord(value)
		} else {
			setResult(`땡`)
		}
		setValue('')
		if(inputEl) inputEl.focus()
	}, [word, value])


	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmit}>
				<input type="text" ref={inputRef} value={value} onChange={onChange} />
				<button>입력</button>
			</form>
			<div>{result}</div>
		</>
	)
}

export default EndTalk