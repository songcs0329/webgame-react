import React, { useEffect, useRef, useState } from 'react';

const rspCoord = {
	rock: '0',
	scissors: '-142px',
	paper: '-284px',
}
const scores = {
	scissors: 1,
	rock: 0,
	paper: -1,
}
const computerChoice = imgCoord => {
	return Object.entries(rspCoord).find(v => {
		return v[1] === imgCoord
	})[0]
}

const RSP = () => {
	const [imgCoord, setImgCoord] = useState(rspCoord.rock)
	const [result, setResult] = useState('')
	const [score, setScore] = useState(0)
	const interval = useRef()

	useEffect(() => {
		// console.log('useEffect')
		interval.current = setInterval(changeHand, 100);
		return () => {
			// console.log('cleanup')
			clearInterval(interval.current)
		}
	}, [imgCoord])

	const changeHand = () => {
		let hand = null;
		if(imgCoord === rspCoord.rock) hand = 'scissors'
		else if(imgCoord === rspCoord.scissors) hand = 'paper'
		else if(imgCoord === rspCoord.paper) hand = 'rock'
		setImgCoord(rspCoord[hand])
	}
	const onClickBtn = choice => () => {
		clearInterval(interval.current)
		const myScore = scores[choice]
		const cpuScore = scores[computerChoice(imgCoord)]
		const diff = myScore - cpuScore
		if(diff === 0) setResult('비김')
		else if([-1,2].includes(diff)) {
			setResult('이김')
			setScore(prevScore => prevScore + 1)
		} else {
			setResult('짐')
			setScore(prevScore => prevScore - 1)
		}
		setTimeout(() => {
			interval.current = setInterval(changeHand, 100);
		}, 1000)
	}

	return (
		<>
			<div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
			<div>
				<button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
				<button id="scissor" className="btn" onClick={onClickBtn('scissors')}>가위</button>
				<button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
			</div>
			<div>{result}</div>
			<div>현재 {score}점</div>
		</>
	);
};

export default RSP;