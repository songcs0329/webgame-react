import * as React from 'react'
import { Component } from 'react'
import BallClass from './BallClass'

const getWinNumbers = () => {
	console.log('getWinNumbers')
	const candidate = Array(45).fill(null).map((v, i) => i + 1)
	const shuffle = []
	while(candidate.length > 0) {
		shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
	}
	const bonusNumber = shuffle[shuffle.length - 1]
	const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
	return [...winNumbers, bonusNumber]
}
type State = {
	winNumbers: number[],
	winBalls: number[],
	bonus: number | null,
	redo: boolean
}

class LottoClass extends Component<{}, State> {
	state: State = {
		winNumbers: getWinNumbers(),
		winBalls: [],
		bonus: null,
		redo: false
	}
	timeouts: number[] = []

	componentDidMount() {
		console.log('didMount')
		this.runTimeouts()
	}
	componentDidUpdate(prevProps: {}, prevState: State) {
		console.log('didUpdate')
		if(this.state.winBalls.length === 0) {
			this.runTimeouts()
		}
		if(prevState.winNumbers !== this.state.winNumbers) {
			console.log('로또숫자를 생성합니다.')
		}
	}
	componentWillUnmount() {
		this.timeouts.forEach(v => clearTimeout(v))
	}

	runTimeouts = () => {
		console.log('runTimeouts');
		const { winNumbers } = this.state
		for(let i = 0; i < winNumbers.length - 1; i++) {
			this.timeouts[i] = window.setTimeout(() => {
				this.setState(prevState => {
					return {
						winBalls: [...prevState.winBalls, winNumbers[i]],
					}
				})
			}, (i + 1) * 1000);
		}
		this.timeouts[6] = window.setTimeout(() => {
			this.setState({
				bonus: winNumbers[6],
				redo: true,
			})
		}, 7000);
	}
	onClickRedo = () => {
		console.log('onClickRedo');
		this.setState({
			winNumbers: getWinNumbers(),
			winBalls: [],
			bonus: null,
			redo: false,
		})
		this.timeouts = []
	}

	render() {
		const { winBalls, bonus, redo } = this.state
		return (
			<>
				<div>당첨 숫자</div>
				<div id="결과창">
					{winBalls.map((v) => <BallClass key={v} number={v} />)}
				</div>
				<div>보너스!</div>
				{bonus && <BallClass number={bonus} />}
				{redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
			</>
		)
	}
}

export default LottoClass