import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailAnswerByUserId } from "../../service/answerService";
import { getTopic } from "../../service/topicService";
import { getQuestionInTopic } from "../../service/questionService";
import "./result.scss";

function Result() {
    const params = useParams();
    const [dataTopic, setDataTopic] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [correct,setCorrect] = useState(0);

    // useEffect(() => {
    //     const fetchTopicData = async () => {
    //         const response = await getTopic(params.id);
    //         setDataTopic(response);
    //     };
    //     fetchTopicData();
    // }, [params.id]);

    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            let countCorrect = 0;
            let result = [];
            const response = await getDetailAnswerByUserId(params.id);
            if (response && response.length > 0) {
                const questionsResponse = await getQuestionInTopic(response[0].topicId);
                questionsResponse.map((question) => {
                    const userAnswer = response[0].answers.find((answer1) => parseInt(answer1.questionId) === parseInt(question.id));
                    if (userAnswer) {
                        result.push({
                            ...question,
                            answerUser: userAnswer.answer
                        });
                    }
                });
            }
            result.map(res => {
                if(res.answerUser === res.correctAnswer){
                    countCorrect++;
                }
            })
            setCorrect(countCorrect);
            setQuestions(result);
        };
        fetchQuestionAndAnswers();
    }, [params.id]);

    return (
        <>
            <h2 className="topic-title">Kết quả chủ đề: {dataTopic && dataTopic.name}</h2>
            
            <p>Correct: <strong>{correct}</strong> | Wrong: <strong>{questions.length-correct}</strong> | Total question: <strong>{questions.length}</strong> | Correct Rate: <strong>{(correct*100/questions.length).toFixed(2)}%</strong></p>
            
            <ul className="question-list">
                {questions.map((question, index) => (
                    <li key={index} className="question-item">
                        <p className="question-text">Câu {index + 1}: {question.question}</p>
                        <ul className="answers-list">
                            {question.answers.map((item, index1) => (
                                <li key={index1}>
                                    <input
                                        type="radio"
                                        id={`q${index}-a${index1}`}
                                        checked={question.answerUser === index1}
                                        name={`question${index}`}
                                        disabled
                                    />
                                    <label
                                        htmlFor={`q${index}-a${index1}`}
                                        className={`answer-item ${
                                            index1 === question.correctAnswer ? "answer-true" :
                                            index1 === question.answerUser ? "answer-false" : ""
                                        }`}
                                    >
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p className={`result-label ${question.answerUser === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                            {question.answerUser === question.correctAnswer ? 'Đúng' : 'Sai'}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Result;