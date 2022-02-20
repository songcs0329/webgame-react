export const getNumbers = () => {
	// 숫자 4개 중복없이 생성
	const candidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	const array = []
	for(let i = 0; i < 4; i += 1) array.push(candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0])
	return array
}

export const checkBallCount = (value: string, answer: number[]): string => {
	const answerArray = value.split('').map(v => parseInt(v))
	let strike = 0
	let ball = 0
	for(let i = 0; i < 4; i += 1) {
		if(answerArray[i] === answer[i]) strike += 1
		else if(answer.includes(answerArray[i])) ball += 1
	}
	return `${strike} 스트라이크, ${ball} 볼입니다.`
}