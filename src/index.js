import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';

const render = App =>
	ReactDOM.render(
		<AppContainer>
			<App/>
		</AppContainer>,
		document.getElementById('root')
	);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./components/App.js', () => {
		const App = require('./components/App').default;
		render(App);
	});
}

render(App);
