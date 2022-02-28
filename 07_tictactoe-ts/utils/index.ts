import { TableData, Turn } from '../types';
export const checkWin = (table: TableData, turn: Turn, row: number, cell: number) => {
	console.log(table, turn, row, cell)
	let win = false
	if (table[row][0] === turn && table[row][1] === turn && table[row][2] === turn) {
		// 가로선
		win = true
	}
	if (table[0][cell] === turn && table[1][cell] === turn && table[2][cell] === turn) {
		// 세로선
		win = true
	}
	if (table[0][0] === turn && table[1][1] === turn && table[2][2] === turn) {
		// 왼쪽위 오른쪽아래 대각선
		win = true
	}
	if (table[0][2] === turn && table[1][1] === turn && table[2][0] === turn) {
		// 왼쪽아래 오른쪽위 대각선
		win = true
	}
	return win
}