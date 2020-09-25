import * as React from 'react';
import './Loading.scss';

export class Loading extends React.PureComponent<any, any> {
	render() {
		return (
			<div className="loading-container flex-center">
				<video poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" src="https://res.cloudinary.com/bleachr/image/upload/v1586361676/TennisONE/T1%20Icons/spinner.mp4" muted autoPlay loop></video>
			</div>
		);
	}
}
