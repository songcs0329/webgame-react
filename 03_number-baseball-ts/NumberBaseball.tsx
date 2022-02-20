import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import Try from './Try'
import { TryInfo } from './types'
import { checkBallCount, getNumbers } from './utils'

const NumberBaseball = () => {
	const [answer, setAnswer] = useState(getNumbers())
	const [result, setResult] = useState("")
	const [value, setValue] = useState("")
	const [tries, setTries] = useState<TryInfo[]>([]) // 빈배열 사용시 배열 내 값들 타입정의 해줘야한다.
	const inputRef = useRef<HTMLInputElement | null>(null)

	const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>  {
		setValue(e.target.value)
	}, [])
	const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const inputEl = inputRef.current
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

		inputEl?.focus()
	}, [value])

	const restartGame = useCallback(() => {
		alert('게임을 다시 시작합니다!')
		setValue('')
		setAnswer(getNumbers())
		setTries([])
	}, [])


	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={onSubmitForm}>
				<input type="text" ref={inputRef} maxLength={4} value={value} onChange={onChangeValue} />
				<button>입력</button>
			</form>
			<div>시도: {tries.length}</div>
			<ul>
				{
					tries.map((val, idx) => (<Try key={`${idx + 1}차 시도`} tryInfo={val} />))
				}
			</ul>
		</>
	)
}

export default NumberBaseball