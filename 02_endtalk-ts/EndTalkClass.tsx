import React, { Component, createRef } from 'react'

interface State {
	word: string,
	value: string,
	result: string,
}

class EndTalkClas extends Component<{}, State> {
	state = {
		word: "이상해",
		value: "",
		result: "",
	}

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			value: e.target.value
		})
	}
	onSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { word, value } = this.state
		const input = this.onRefInput.current
		if(word[word.length - 1] === value[0]) {
			this.setState({
				result: `${value} 딩동댕`,
				word: value,
				value: '',
			})
		} else {
			this.setState({
				result: `땡`,
				value: '',
			})
		}
		input?.focus()
	}
	onRefInput = createRef<HTMLInputElement>()

	render() {
		const { word, value, result } = this.state
		return (
			<>
				<div>{word}</div>
				<form onSubmit={this.onSubmit}>
					<input type="text" ref={this.onRefInput} value={value} onChange={this.onChange} />
					<button>입력</button>
				</form>
				<div>{result}</div>
			</>
		)
	}
}

export default EndTalkClas