import React from 'react';
import NewMovie from '../newMovie/NewMovie';

import './home.css';

export default function AdminHome() {
	return (
		<div className='home'>
			<NewMovie />
		</div>
	);
}
