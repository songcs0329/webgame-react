import * as React from 'react';
import { useParams } from 'react-router';
import { Routes, Route } from 'react-router';
import Lotto from './components/Lotto/Lotto';
import NumberBaseball from './components/NumberBaseball/NumberBaseball';
import RSP from './components/RSP/RSP';

const GameMatcher = () => {
	// const { name } = useParams()
	// console.log('params name', name)
	// if(!name) return <div>no match games</div>
	// if(name === 'number-baseball') return <NumberBaseball />
	// else if(name === 'rsp') return <RSP />
	// else if(name === 'lotto') return <Lotto />
	// else return <div>no match games</div>
		
    return (
      <Routes>
          <Route path="number-baseball" element={<NumberBaseball />} />
          <Route path="rsp" element={<RSP />} />
          <Route path="lotto" element={<Lotto />} />
          <Route
            path="*"
            element={<div>
              일치하는 게임이 없습니다.
            </div>}
          />
      </Routes>
    );
}

export default GameMatcher;