import './Main.css';
import Question from '../Question/Question'

function Main({ onClick, onLogout, questionsList }) {

	function handleLogout() {
		onLogout();
	}

	return (

		<div className="main-container">
			<header className="main-header">
				<div className="main-logo">LOGO</div>

				<form className="main-form">
					<input className="main-input" type="text" maxLength="100" placeholder="Search"></input>
					<button className="main-button" type="button" onClick={onClick}>Ask question</button>
				</form>
				
				<button className="logout-submit" onClick={handleLogout}>logout</button>
			</header>

			<ul className="questions-container">
				{questionsList.map((question, index) => {
					return (
						<Question
							question={question}
							key={index}
						/>
					);
				})}
			</ul>
		</div>

	);
}

export default Main;
