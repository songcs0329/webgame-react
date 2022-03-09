export const CODE = {
	MINE: -7,
	NORMAL: -1,
	QUESTION: -2,
	FLAG: -3,
	QUESTION_MINE: -4,
	FLAG_MINE: -5,
	CLICK_MINE: -6,
	OPENED: 0, // 0 이상이면 다 OPENED
} as const
export const START_GAME = "START_GAME" as const
export const OPEN_CELL = "OPEN_CELL" as const
export const CLICK_MINE = "CLICK_MINE" as const
export const FLAG_CELL = "FLAG_CELL" as const
export const QUESTION_CELL = "QUESTION_CELL" as const
export const NORMALIZE_CELL = "NORMALIZE_CELL" as const
export const INCREMENT_TIMER = "INCREMENT_TIMER" as const