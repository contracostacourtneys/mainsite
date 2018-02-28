import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
	render() {
		return (
			<div className='Footer'>
				<div className='Footer-div Footer-left'>
					<h3>About</h3>
					<p>Legal information for all of California.</p>
					<p>A project of Contra Costa Superior Court</p>
					<p>&copy;2018 Superior Court of California, Contra Costa County</p>
				</div>
				<div className='Footer-div Footer-right'>
					<h3>Contact</h3>
					<p><Link target="_blank" to='http://www.cc-courts.org/'>Contra Costa Superior Court Main Site</Link></p>
					<p><Link target="_blank" to='http://www.cc-courts.org/locations/locations.aspx'>Find a Courthouse</Link></p>
					<p><Link target="_blank" to='#'>Report missing or bad content</Link></p>
				</div>
			</div>
		)
	}
}