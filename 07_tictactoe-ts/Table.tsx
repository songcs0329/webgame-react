import * as React from 'react'
import { Dispatch, FC } from 'react';
import Tr from './Tr';
import { TableData } from './types';

interface Props {
	dispatch: Dispatch<any>,
	tableData: TableData,
}

const Table: FC<Props> = ({ dispatch, tableData }) => {
	return (
		<table>
			<tbody>
				{
					Array(tableData.length).fill(null).map((tr, index) => {
						return (
							<Tr
								key={index}
								dispatch={dispatch}
								rowIndex={index}
								rowData={tableData[index]}
							/>
						)
					})
				}
			</tbody>
		</table>
	);
}

export default Table