export const SET_WINNER = 'SET_WINNER' as const
export const CLICK_CELL = 'CLICK_CELL' as const
export const CHANGE_TURN = 'CHANGE_TURN' as const
export const RESET_GAME = 'RESET_GAME' as const

export type TableData = string[][]
export type Turn = 'O' | 'X'
export type Winner = 'O' | 'X' | ''
export interface ReducerState {
	winner: Winner,
  turn: Turn,
  tableData: TableData,
  recentCell: [number, number],
}
export type ReducerActions = SetWinnerAction | ClickCellAction | ChangeTurnAction | ResetGameAction
export interface SetWinnerAction {
	type: typeof SET_WINNER,
	winner: Winner,
}
export interface ClickCellAction {
	type: typeof CLICK_CELL,
	row: number,
	cell: number,
}
export interface ChangeTurnAction {
	type: typeof CHANGE_TURN
}
export interface ResetGameAction {
	type: typeof RESET_GAME
}