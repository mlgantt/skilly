import React, { Component } from 'react';

import Header from './components/Shared/Header';
import Main from './components/Shared/Main';

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
