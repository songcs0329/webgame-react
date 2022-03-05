import { CHANGE_TURN, ClickCellAction, CLICK_CELL, ReducerState, RESET_GAME, SetWinnerAction, SET_WINNER, ReducerActions, Winner } from "../types";

export const initialState: ReducerState = {
	winner: '',
	turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
}

export const setWinner = (winner: Winner): SetWinnerAction => {
	return { type: SET_WINNER, winner }
}
export const clickCell = (row: number, cell: number): ClickCellAction => {
	return { type: CLICK_CELL, row, cell }
}

export const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
	switch(action.type) {
		case SET_WINNER:
			return {
				...state,
				winner: action.winner
			}
		case CLICK_CELL: {
			const tableData = [...state.tableData]
			tableData[action.row] = [...tableData[action.row]] //immer로 가독성 해결
			tableData[action.row][action.cell] = state.turn

			return {
				...state,
				tableData,
				recentCell: [action.row, action.cell],
			}
		}
		case CHANGE_TURN:
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			}
		case RESET_GAME:
			return {
				...state,
				turn: 'O',
				tableData: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				recentCell: [-1, -1],
			}
		default:
			return state
	}
}