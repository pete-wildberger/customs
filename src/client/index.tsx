import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app/App';
import './favicon.ico';
declare global {
	interface Window {
		kill: any;
	}
	interface Document {
		msHidden: any;
		webkitHidden: any;
	}
}

render(<App />, document.getElementById('root') as HTMLElement);
