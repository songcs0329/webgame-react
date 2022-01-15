import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball'

const getWinNumbers = () => {
	console.log('getWinNumbers')
	const candidate = Array(45).fill().map((v, i) => i + 1)
	const shuffle = []
	while(candidate.length > 0) {
		shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
	}
	const bonusNumber = shuffle[shuffle.length - 1]
	const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
	return [...winNumbers, bonusNumber]
}

const Lotto = () => {
	const lottoNumbers = useMemo(() => getWinNumbers(), [])
	const [winNumbers, setWinNumbers] = useState(lottoNumbers)
	const [winBalls, setWinBalls] = useState([])
	const [bonus, setBonus] = useState(null)
	const [redo, setRedo] = useState(false)
	const timeouts = useRef([])

	useEffect(() => {
		console.log('useEffect');
		runTimeout()
		return () => timeouts.current.forEach(v => clearTimeout(v))
	}, [timeouts.current]) // state만 들어가는거 아님!
	useEffect(() => {
		console.log('로또숫자를 생성합니다.')
	}, [winNumbers])

	const runTimeout = () => {
		console.log('runTimeouts')
		for(let i = 0; i < winNumbers.length - 1; i++) {
			timeouts.current[i] = setTimeout(() => {
				setWinBalls(prevWinBalls => [...prevWinBalls, winNumbers[i]])
			}, (i + 1) * 1000)
		}
		timeouts.current[6] = setTimeout(() => {
			setBonus(winNumbers[6])
			setRedo(true)
		}, 7000)
	}
	const onClickRedo = useCallback(() => {
		console.log('onClickRedo', winNumbers)
		setWinNumbers(getWinNumbers())
		setWinBalls([])
		setBonus(null)
		setRedo(false)
		timeouts.current = []
	}, [winNumbers])
	// 자식컴포넌트에 props로 함수 전달할 때 useCallback 사용해야한다.
	// 매번 새로운 함수가 생성되기 때문에 자식컴포넌트가 리랜더링된다.

	return (
		<>
			<div>당첨 숫자</div>
			<div id="결과창">
				{winBalls.map((v) => <Ball key={v} number={v} />)}
			</div>
			<div>보너스!</div>
			{bonus && <Ball number={bonus} />}
			{redo && <button onClick={onClickRedo}>한 번 더!</button>}
		</>
	);
};

export default Lotto;