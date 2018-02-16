import React, { Component } from 'react';

export default class AccordionBoxContent extends Componenet {
	render() {
		return (
			<div>
				<h4>{Title}<span><i>{iconUp}</i></span></h4>
				<p>{content}</p>
			</div>
		)
	}
}