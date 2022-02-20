import React, { Component, createRef } from 'react'
import TryClass from './TryClass'
import { TryInfo } from './types'
import { getNumbers, checkBallCount } from './utils'

type State = {
	answer: number[],
	result: string,
	value: string,
	tries: TryInfo[]
}

class NumberBaseballClass extends Component<{}, State> {
	state = {
		answer: getNumbers(),
		result: "",
		value: "",
		tries: []
	}
	inputRef = createRef<HTMLInputElement>()

	onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			value: e.target.value
		})
	}
	onSubmitForm = (e: React.FocusEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { value, answer, tries } = this.state
		const inputEl = this.inputRef.current
		if(value === answer.join('')) {
			this.setState(prevState => {
				return {
					result: `홈런!`,
					tries: [...prevState.tries, { try: value, result: '홈런!' }],
				}
			})
			this.restartGame()
		} else {
			if(tries.length >= 9) {
				this.setState({
					result: `10번 넘게 틀려서 실패 답은 ${answer.join(',')}`,
				})
				this.restartGame()
			} else {
				this.setState(prevState => {
					return {
						value: '',
						tries: [...prevState.tries, { try: value, result: checkBallCount(prevState.value, prevState.answer) }],
					}
				})
			}
		}
		inputEl?.focus()
	}
	restartGame() {
		alert('게임을 다시 시작합니다!')
		this.setState({
			value: '',
			answer: getNumbers(),
			tries: [],
		})
	}

	render() {
		const { result, value, tries } = this.state

		return (
			<>
				<h1>{result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input type="text" ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeValue} />
					<button>입력</button>
				</form>
				<div>시도: {tries.length}</div>
				<ul>
					{
						tries.map((val, idx) => (<TryClass key={`${idx + 1}차 시도`} tryInfo={val} />))
					}
				</ul>
			</>
		)
	}
}

export default NumberBaseballClass
