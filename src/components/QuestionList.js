import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestions(updatedQuestions);
      });
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem 
        key={question.id} 
        question={question} 
        setQuestions={setQuestions} 
        onDeleteClick={handleDeleteClick}
        onAnswerChange={handleAnswerChange}
      />)}</ul>
    </section>
  );
}

export default QuestionList;
