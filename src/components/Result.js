import React, { useState } from 'react';

function Result(props) {
    const [show, setShow] = useState(false)
    let questions = props.questions;
    let corrects = 0;
    questions.forEach(q => { q.isCorrect = q.options.every(x => x.selected === x.isAnswer); })
    questions.forEach(q => q.isCorrect ? corrects++ : corrects);
    questions.forEach(q => q.isAnswered = q.options.every(x => x.selected === false))

    return (
        <div className="result">
            <h2 className="text-center font-weight-light">پاسخ ها</h2>
            {questions.map((q, index) =>
                <div key={q.id} className={`mb-2 ${q.isCorrect ? 'bg-success' : q.isAnswered ? 'bg-warning' : 'bg-danger'}`}>
                    <div className="result-question">
                        <h5>{index + 1}. {q.name}</h5>
                        <div className={`m-1 p-1 ${q.isCorrect ? 'text-success' : q.isAnswered ? 'text-warning' : 'text-danger'}`}>شما به این سوال پاسخ {q.isCorrect?"صحیح داده اید":q.isAnswered?"نداده اید":"اشتباه داده اید"}</div>
                        {/* <div className={`m-1 p-1 ${q.isCorrect ? 'text-success' : 'text-danger'}`}></div> */}
                        {q.isCorrect ? <h6> </h6> :show ? <h6>پاسخ صحیح:  {q.options[q.answer].name}</h6> : null}
                        {/* <div className="row">
                            {
                                q.options.map((option, index) =>
                                    <div key={option.id} className="col-6">
                                        <input id={option.id} type="checkbox" disabled="disabled" checked={option.selected} /> {option.name}
                                    </div>
                                )
                            }
                        </div> */}
                    </div>
                </div>
            )}
            <h4 className="alert alert-info text-center font-weight-light">شما به {corrects} سوال از 10 سوال پاسخ صحیح داده اید</h4>
            <button onClick={() => setShow(!show)}>نمایش پاسخ ها</button>
        </div>
    )
}

export default Result;