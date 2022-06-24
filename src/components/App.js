import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(resp => resp.json())
      .then(questions => setQuestions(questions))
  }, [])

  function onQuestionAdd(newFormData) {
    setQuestions([...questions, newFormData])
  }
  
  function onDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm  onQuestionAdd={onQuestionAdd} /> : <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion} />}
    </main>
  );
}

export default App;
