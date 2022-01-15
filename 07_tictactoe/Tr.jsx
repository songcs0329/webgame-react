import React, { memo, useEffect, useRef } from 'react';
import Td from './Td';

const Tr = memo(({ dispatch, rowIndex, rowData }) => {
	console.log('tr rendered')
	const ref = useRef([])
	useEffect(() => {
		console.log(dispatch === ref.current[0], rowIndex === ref.current[1], rowData === ref.current[2])
		ref.current = [dispatch, rowIndex, rowData]
	}, [dispatch, rowIndex, rowData])

	return (
		<tr>
			{
				Array(rowData.length).fill().map((td, index) => {
					return (
						<Td
							key={index}
							dispatch={dispatch}
							rowIndex={rowIndex}
							cellIndex={index}
							cellData={rowData[index]}
						/>
					)
				})
			}
		</tr>
	)
})

export default Tr;