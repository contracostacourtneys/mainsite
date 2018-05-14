import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './template/navbar';
import Search from './template/search';
import Footer from './template/footer';

class Layout extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<Search />
				<Footer />
			</div>
		)
	}
}

export default Layout;