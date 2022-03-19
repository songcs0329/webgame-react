import { TCode } from './../types/index';
import { CODE } from '../constants'

export const plantMine = (row: number, col: number, mine: number): TCode[][] => {
	const candidate = Array(row * col).fill(undefined).map((arr, i) => i)
	const shuffle = []
	while(candidate.length > row * col - mine) {
		const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
		shuffle.push(chosen)
	}
	const data: TCode[][] = []
	for(let i = 0; i < row; i++) {
		const rowData: TCode[] = []
		data.push(rowData)
		for(let j = 0; j < col; j++) {
			rowData.push(CODE.NORMAL)
		}
	}
	shuffle.forEach(shuffleItem => {
		const ver = Math.floor(shuffleItem / col)
		const hor = shuffleItem % col
		data[ver][hor] = CODE.MINE
	})
	console.log(data)
	return data
}

export const arroundExcept = (tableArr: TCode[][], checkedArr: string[], row: number, col: number) => {
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
		([
			CODE.OPENED,
			CODE.FLAG,
			CODE.FLAG_MINE,
			CODE.QUESTION,
			CODE.QUESTION_MINE
		] as TCode[]).includes(tableArr[row][col])
	) {
		// 닫힌 칸만 열기
		return true
	}
	if(checkedArr.includes(row + '/' + col)) {
		// 한번 연칸 무시
		return true
	}
}

export const getTdStyle = (code: TCode) => {
	switch (code) {
		case CODE.NORMAL:
		case CODE.MINE:
			return {
				background: '#444',
			}
		case CODE.OPENED:
			return {
				background: '#fff',
			}
		case CODE.QUESTION:
		case CODE.QUESTION_MINE:
			return {
				background: '#ffdd00'
			}
		case CODE.FLAG:
		case CODE.FLAG_MINE:
			return {
				background: '#ff3300'
			}
		default:
			return {
				background: '#fff',
			}
	}
}

export const getTdText = (code: TCode) => {
	// console.log('getTdText');
	switch (code) {
		case CODE.NORMAL:
			return ''
		case CODE.MINE:
			return 'X'
		case CODE.CLICK_MINE:
			return '💣'
		case CODE.FLAG:
		case CODE.FLAG_MINE:
			return '🚩'
		case CODE.QUESTION:
		case CODE.QUESTION_MINE:
			return '?'
		default:
			return code || ''
	}
}