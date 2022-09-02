import React, { Component } from 'react';
import { ActionTypes } from '../constants/actionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.quiz, ...state.mode, ...state.pager });

const mapDispatchToProps = dispatch => ({
    onAnswer: payload => dispatch({ type: ActionTypes.QuizAnswer, payload })
});

class Questions extends Component {

    onAnswer(question, option) {
        let quiz = JSON.parse(JSON.stringify(this.props.quiz));
        let q = quiz.questions.find(x => x.id === question.id);
        if (q.questionTypeId === 1) {
            q.options.forEach((x) => { x.selected = false; });
        }
        q.options.find(x => x.id === option.id).selected = true;
        this.props.onAnswer(quiz);
    }

    render() {
        let questions = (this.props.quiz.questions) ?
            this.props.quiz.questions.slice(this.props.pager.index, this.props.pager.index + this.props.pager.size) : [];
        return (
            <div id="quiz">
                <h2 className="text-center font-weight-normal">{this.props.quiz.name}</h2>
                <hr style={{borderTop:"1px solid white"}}  />
                {questions.map(q =>
                    <div key={q.id}>
                        <div className='text-right'><div className="badge badge-info">سوال {this.props.pager.index + 1} از {this.props.pager.count}</div></div>
                        <h3 className="font-weight-normal">{this.props.pager.index + 1}. <span>{q.name}</span></h3>
                        <div className="row text-left options">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        <div className="option">
                                            <label className="font-weight-normal" htmlFor={option.id}>
                                                <input id={option.id} checked={option.selected} type="checkbox" onChange={() => this.onAnswer(q, option)} />
                                                {option.name}
                                            </label>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                <hr />
                <div>
                <div className="text-center">
                <button id="last" className="btn btn-default" onClick={this.props.move}>آخرین سوال</button>
                <button id="next" className="btn btn-primary" onClick={this.props.move}>سوال بعد</button>
                {this.props.quiz.config.allowBack && <button id="prev" className="btn btn-default" onClick={this.props.move}>سوال قبل</button>}
                {this.props.quiz.config.allowBack && <button id="first" className="btn btn-default" onClick={this.props.move}>اولین سوال</button>}
                </div>
                </div>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);