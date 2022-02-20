import React, { Component } from 'react'

type State = {
	state: 'waiting' | 'ready' | 'now',
	msg: string,
	result: number[],
}

class ResponseCheckClass extends Component<{}, State> {
	state: State = {
		state: 'waiting',
		msg: '클릭해서 시작하세요.',
		result: [],
	}
	timeout: number | null = null
	startTime: number | null = null
	endTime: number | null = null
	
	reset = () => {
		this.setState({
			result: []
		})
	}
	renderAverage = () => {
		const { result } = this.state
		return result.length !== 0
		&& <>
			<div>평균시간: {result.reduce((acc, cur) => acc + cur) / result.length}ms</div>
			<button onClick={this.reset}>reset</button>
		</>
	}
	onClickScreen = () => {
		const { state } = this.state
		if(state === 'waiting') {
			this.setState({
				state: 'ready',
				msg: '초록색이 되면 클릭하세요.',
			})

			this.timeout = window.setTimeout(() => {
				this.setState({
					state: 'now',
					msg: '지금 클릭.',
				})
				this.startTime = new Date().getTime()
			}, Math.floor(Math.random() * 1000) + 2000) // 2~3초 랜덤
		} else if(state === 'ready') {
			if(this.timeout) {
				clearTimeout(this.timeout)
			}
			this.setState({
				state: 'waiting',
				msg: '너무 성급하시군요! 초록색이 된 후 클릭하세요.',
			})
		} else if(state === 'now') {
			this.endTime = new Date().getTime()
			this.setState(prevState => {
				return {
					state: 'waiting',
					msg: '클릭해서 시작하세요.',
					// endTime, startTime 둘다 number로 명시적... => typescript 한계
					result: [...prevState.result, this.endTime! - this.startTime!],
				}
			})
		}
	}

	render() {
		const { state, msg } = this.state
		return (
			<>
				<div id='screen' className={state} onClick={this.onClickScreen}>{msg}</div>
				{ this.renderAverage() }
			</>
		);
	}
}

export default ResponseCheckClass