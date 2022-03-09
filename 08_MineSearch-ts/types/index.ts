import { Dispatch } from 'react';
import { START_GAME, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, INCREMENT_TIMER } from './../constants/index';
import { CODE } from "../constants";

export type TCode = typeof CODE[keyof typeof CODE]

export interface TContext {
	tableData: TCode[][],
	halted: boolean,
	dispatch: Dispatch<TActions>
}

export interface TState {
	tableData: TCode[][],
	halted: boolean,
	data: {
		row: number,
		col: number,
		mine: number,
	},
	opendCount: number,
	timer: number,
	result: string,
}

export interface ActionTableData {
	row: number,
	col: number,
}
export interface StartGameAction extends ActionTableData {
	type: typeof START_GAME,
	mine: number,
}
export interface OpenCellAction extends ActionTableData {
	type: typeof OPEN_CELL,
}
export interface ClickMineAction extends ActionTableData {
	type: typeof CLICK_MINE,
}
export interface FlagCellAction extends ActionTableData {
	type: typeof FLAG_CELL,
}
export interface QuestionCellAction extends ActionTableData {
	type: typeof QUESTION_CELL,
}
export interface NormalizeCellAction extends ActionTableData {
	type: typeof NORMALIZE_CELL,
}
export interface IncrementTimerAction {
	type: typeof INCREMENT_TIMER,
}

export type TActions = StartGameAction | OpenCellAction | ClickMineAction | FlagCellAction | QuestionCellAction | NormalizeCellAction | IncrementTimerAction