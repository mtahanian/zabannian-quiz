import React, { Component } from 'react';

class Review extends Component {
    isAnswered = (q) => {
        return q.options.some(x => x.selected) ? 'پاسخ داده شده' : 'پاسخ نداده اید';
    }

    render() {
        return <div>
            <h2 className="text-center font-weight-normal">مرور سوالات {this.props.quiz.name}</h2>
            <hr />
            <div className="row text-center">
                {this.props.quiz.questions.map((q, index) =>
                    <div key={q.id} className="col-3 cursor-pointer">
                        <div id={index} onClick={this.props.move} className={`p-3 mb-2 ${this.isAnswered(q) === 'پاسخ داده شده' ? 'bg-info' : 'bg-danger'}`}>{index + 1}. {this.isAnswered(q)}</div>
                    </div>
                )}
            </div>
        </div >
    }
}

export default Review;