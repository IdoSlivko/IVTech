import './Question.css';
import Tag from '../Tag/Tag';

function Question({ question }) {

	const {
		vote = question.qvote,
		answer = question.qanswer,
		title = question.qtitle,
		body = question.qbody,
		tag = question.qtag,
		user = question.qname,
		date = question.qdate
	} = question;

	const tagArray = tag.split(',');

	return (

		<li className="question">
			<div className="answer-rate">
				<div className="answer-numberInfo">
					<p className="vote-number">{vote}</p>
					<p className="subtitle">votes</p>
				</div>
				<div className="answer-numberInfo">
					<p className="answer-number">{answer}</p>
					<p className="subtitle">answers</p>
				</div>
			</div>
			<div className="question-body">
				<h3 className="question-title">{title}</h3>
				<p className="question-info">{body}</p>
				<ul className="question-tags">
					{tagArray.map((tag, index) => {
							return (
								<Tag
									tag={tag}
									key={index}
								/>
							);
						})}
				</ul>
				<div className="question-date">
					<p className="question-dateInfo">{date}</p>
					<p className="question-dateInfo">by {user}</p>
				</div>
			</div>
		</li>

	);

}

export default Question;
