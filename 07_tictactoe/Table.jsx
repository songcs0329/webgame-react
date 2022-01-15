import React from 'react';
import Tr from './Tr';

const Table = ({ dispatch, tableData }) => {
	return (
		<table>
			<tbody>
				{
					Array(tableData.length).fill().map((tr, index) => {
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
};

export default Table;