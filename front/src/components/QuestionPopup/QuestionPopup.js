import React from 'react';
import './QuestionPopup.css';

function QuestionPopup({ isOpen, onClose, onSubmit }) {

	const [ values, setValues ] = React.useState({ qtitle: '', qbody: '', qtag: '' });

	function handleChange(e) {
		const { name, value } = e.target;
    setValues({ ...values, [name]: value });
	}

	function sendQuestion(e) {
		e.preventDefault();
		setValues(values);
		onSubmit(values);
		onClose();
		document.getElementById('qform').reset(); 
	}

  return (

    <section className={`popup-state ${isOpen ? "popup-state-opened" : undefined}`}>
      <div className="popup-container">
				<h2 className="popup-title">Ask Question</h2>
				<button className="popup-close" type="button" aria-label="close modal" onClick={onClose}>X</button>

				<form id="qform" className="popup-form" onSubmit={sendQuestion}>
					<label className="popup-input-label">Title</label>
					<input className="popup-input" type="text" name="qtitle" maxLength="100" onChange={handleChange}></input>
					<label className="popup-input-label">Question</label>
					<textarea className="popup-input" type="text" name="qbody" maxLength="1000" onChange={handleChange}></textarea>
					<label className="popup-input-label">Tags seperated by ,</label>
					<input className="popup-input" type="text" name="qtag" maxLength="100" onChange={handleChange}></input>
					<button className="popup-submit" type="submit">Submit</button>
				</form>
      </div>
    </section>
		
  );
}

export default QuestionPopup;
