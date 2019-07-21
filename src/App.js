import React, { Component } from 'react';

import Header from './components/global/Header';
import Main from './components/global/Main';

class App extends Component {

	render() {
		return (
			<div className="App" styles="margin:0,padding:0">
				<Header />
				<Main />
			</div>
		);
	}
}

export default App;
