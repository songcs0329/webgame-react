import React, { memo, useRef, useState } from 'react';
import Try from './Try';

const getNumbers = () => {
	// 숫자 4개 중복없이 생성
	const candidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	const array = []
	for(let i = 0; i < 4; i += 1) array.push(candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0])
	return array
}
const checkBallCount = (value, answer) => {
	const answerArray = value.split('').map(v => parseInt(v))
	let strike = 0
	let ball = 0
	for(let i = 0; i < 4; i += 1) {
		if(answerArray[i] === answer[i]) strike += 1
		else if(answer.includes(answerArray[i])) ball += 1
	}
	return `${strike} 스트라이크, ${ball} 볼입니다.`
}

const NumberBaseball = memo(() => {
	const [result, setResult] = useState('')
	const [value, setValue] = useState('')
	const [answer, setAnswer] = useState(getNumbers())
	const [tries, setTries] = useState([])
	const inputRef = useRef(null)

	const onChangeInput = e => setValue(e.target.value)
	const onSubmitForm = e => {
		e.preventDefault()
		if(value === answer.join('')) {
			setResult('홈런!')
			setTries(prevTries => {
				return [...prevTries, { try: value, result: '홈런!' }]
			})
			restartGame()
		} else {
			if(tries.length >= 9) {
				setResult(`10번 넘게 틀려서 실패 답은 ${answer.join(',')}`)
				restartGame()
			} else {
				setValue('')
				setTries(prevTries => {
					return [...prevTries, { try: value, result: checkBallCount(value, answer) }]
				})
			}
		}
		inputRef.current.focus()
	}
	const restartGame = () => {
		alert('게임을 다시 시작합니다!')
		setValue('')
		setAnswer(getNumbers())
		setTries([])
	}

	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={onSubmitForm}>
				<input type="text" ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
				<button>입력</button>
			</form>
			<div>시도: {tries.length}</div>
			<ul>
				{
					tries.map((val, idx) => (<Try key={`${idx + 1}차 시도`} tryInfo={val} />))
				}
			</ul>
		</>
	);
})

export default NumberBaseball;