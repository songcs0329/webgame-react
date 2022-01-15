import { CODE } from './constants'

export const plantMine = (row, col, mine) => {
	const candidate = Array(row * col).fill().map((arr, i) => i)
	const shuffle = []
	while(candidate.length > row * col - mine) {
		const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
		shuffle.push(chosen)
	}
	const data = []
	for(let i = 0; i < row; i++) {
		const rowData = []
		data.push(rowData)
		for(let j = 0; j < col; j++) {
			rowData.push(CODE.NORMAL)
		}
	}
	for(let k = 0; k < shuffle.length; k++) {
		const ver = Math.floor(shuffle[k] / col)
		const hor = shuffle[k] % col
		data[ver][hor] = CODE.MINE
	}
	console.log(data)
	return data
}

export const arroundExcept = (tableArr, checkedArr, row, col) => {
	// console.log('arroundExcept', tableArr, checkedArr, row, col);
	if(
		row < 0 ||
		row >= tableArr.length ||
		col < 0 ||
		col >= tableArr[0].length
	) {
		// 상하좌우 없는 칸 안열기
		return true
	}
	if(
		[
			CODE.OPENED,
			CODE.FLAG,
			CODE.FLAG_MINE,
			CODE.QUESTION,
			CODE.QUESTION_MINE
		].includes(tableArr[row][col])
	) {
		// 닫힌 칸만 열기
		return true
	}
	if(checkedArr.includes(row + '/' + col)) {
		// 한번 연칸 무시
		return true
	}
}