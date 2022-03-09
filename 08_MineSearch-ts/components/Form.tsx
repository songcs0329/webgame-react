import * as React from 'react'
import { memo, useCallback, useContext, useState } from 'react'
import { startGame, TableContext } from '../store'

const Form = memo(() => {
	const [row, setRow] = useState(5)
	const [col, setCol] = useState(5)
	const [mine, setMine] = useState(5)
	const { dispatch } = useContext(TableContext)

	const handleChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setRow(Number(e.target.value))
	}, [])
	const handleChangeCol = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCol(Number(e.target.value))
	}, [])
	const handleChangeMine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setMine(Number(e.target.value))
	}, [])
	const onClickBtn = useCallback(() => {
		dispatch(startGame(row, col, mine))
	}, [row, col, mine])

	return (
		<div>
			<input type="text" name="row" value={row} onChange={handleChangeRow} />
			<input type="text" name="col" value={col} onChange={handleChangeCol} />
			<input type="text" name="mine" value={mine} onChange={handleChangeMine} />
			<button type="button" onClick={onClickBtn}>START</button>
		</div>
	)
})

export default Form