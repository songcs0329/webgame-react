import React, { memo, useState, useCallback, useContext } from 'react';
import { START_GAME } from '../modules/constants';
import { TableContext } from '../MineSearch';

const Form = memo(() => {
	const [row, setRow] = useState(5)
	const [col, setCol] = useState(5)
	const [mine, setMine] = useState(5)
	const { dispatch } = useContext(TableContext)

	const handleChangeRow = useCallback(e => setRow(e.target.value), [])
	const handleChangeCol = useCallback(e => setCol(e.target.value), [])
	const handleChangeMine = useCallback(e => setMine(e.target.value), [])
	const onClickBtn = useCallback(() => {
		dispatch({ type: START_GAME, row, col, mine })
	}, [row, col, mine])

	return (
		<div>
			<input type="text" name="row" value={row} onChange={handleChangeRow} />
			<input type="text" name="col" value={col} onChange={handleChangeCol} />
			<input type="text" name="mine" value={mine} onChange={handleChangeMine} />
			<button type="buttton" onClick={onClickBtn}>START</button>
		</div>
		
	);
});

export default Form;