import * as React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'stream-chat-react/dist/css/index.css';
import './App.scss';

import { Loading } from './loading/Loading';
const ChatCore = React.lazy(() => import('./chat-core/ChatCore'));
const AdminCore = React.lazy(() => import('./admin-core/AdminCore'));

function FourOhFour(): JSX.Element {
	return <h1>Oh no 404</h1>;
}

export const App = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Router>
				<div className="app">
					<Switch>
						<Route path="/live/:id" component={ChatCore} />
						<Route path="/admin/:id" component={AdminCore} />
						<Route render={() => <FourOhFour />} />
					</Switch>
				</div>
			</Router>
		</Suspense>
	);
};
