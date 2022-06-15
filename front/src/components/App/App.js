import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';
import Login from '../Login/Login';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import QuestionPopup from '../QuestionPopup/QuestionPopup';

function App() {

  let questions = [
    {
      qtitle: "How to find a job as a web developer?",
      qbody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      qtag: "Dream job, Web Developer, Fullstack",
      qdate: new Date().toDateString(),
      qname: "Ido",
      qvote: 0,
      qanswer: 0
    },
    {
      qtitle: "How fast can I set a Node.js Server with DB, models, routes, middleware, errors handling etc.?",
      qbody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      qtag: "throw new Error, Node.js, Server",
      qdate: new Date().toDateString(),
      qname: "Ido",
      qvote: 0,
      qanswer: 0
    },
    {
      qtitle: "Does React18 has a full compatibility with react-router-dom ^5.3?",
      qbody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      qtag: "React.js 18, Javascript",
      qdate: new Date().toDateString(),
      qname: "Ido",
      qvote: 0,
      qanswer: 0
    }
  ];

  const token = localStorage.token;
  const history = useHistory();

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ isQuestionPopupOpen, setQuestionPopupOpen ] = React.useState(false);
  const [ questionsList, setQuestionsList ] = React.useState(questions);
  const [ userInfo, setUserInfo ] = React.useState({});
  const [ userToken, setUserToken ] = React.useState(token);

  function handleOpenPopup() {
    setQuestionPopupOpen(true);
  }

  function closePopup() {
    setQuestionPopupOpen(false);
  }

  // check for token - allowing users to stay on page even after refresh
  React.useEffect(() => {
    if (localStorage.token) {
      setIsLoggedIn(true);
      history.push('/home');
    } else {
      return;
    }
  }, [userToken]);

  function handleLogin(values) {
    fetch('http://localhost:8082/ivoverflow', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values
      }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.statusText);
      }
    })
    .then((data) => {
      setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      setUserToken(localStorage.token);
      setUserInfo(data);
      history.push('/home');
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
  }

  function handleSubmit(question) {
    question.qdate = new Date().toDateString();
    question.qname = userInfo.name;
    question.qvote = 0;
    question.qanswer = 0;
    setQuestionsList([...questionsList, question]);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    history.push('/login');
    localStorage.removeItem('token');
  }

  return (
    <div className="page">
      <Switch>
        <ProtectedRoute path="/home" loggedIn={isLoggedIn}>
          <Main
            onClick={handleOpenPopup}
            onLogout={handleLogout}
            questionsList={questionsList}
          />
        </ProtectedRoute>
        <Route path="/login">
          <Login
            onLogin={handleLogin}
          />
        </Route>
      </Switch>

      <QuestionPopup
        isOpen={isQuestionPopupOpen}
        onClose={closePopup}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
