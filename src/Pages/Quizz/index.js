import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../service/topicService";
import { getQuestionInTopic } from "../../service/questionService";
import { getCookie } from "../../helper/cookie";
import { createAnwserByUserId, getAllAnswers } from "../../service/answerService";

function Quizz() {
    const params = useParams();
    const navigate = useNavigate();
    const [dataTopic,setDataTopic] = useState();
    const [dataQuestionInTopic,setQuestionInTopic] = useState([]);
    const [dataUserAnswer,setDataUSerAnswer] = useState([]);
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        const fetchApi = async () => {
            const response = await getTopic(params.id);
            setDataTopic(response);
        }
        fetchApi();
    },[])
    
    useEffect(()=>{
        const fetchApi = async () => {
            const response = await getQuestionInTopic(params.id);
            setQuestionInTopic(response);
        }
        fetchApi();
    },[])

    useEffect(()=>{
        const fetchApi = async () => {
            const response = await getAllAnswers();
            setTotal(response.length);
        }
        fetchApi();
    },[total])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const option = {
            "userId": (getCookie("id")),
            "topicId": parseInt(params.id),
            "answers": (dataUserAnswer),
            "id" : (total + 1)
        }
        
        const result = await createAnwserByUserId(option);
        if(result){
            navigate(`/result/${option.id}`);
        }
    }

    const handleChange = (e)=>{
        const q = parseInt(e.target.id.split('-')[0][1]);
        const a = parseInt(e.target.id.split('-')[1][1]);
        const newAnswers = [...dataUserAnswer];
        const IndexexistQuestion = newAnswers.findIndex(item => item.questionId === parseInt(dataQuestionInTopic[q].id));
        
        if(IndexexistQuestion == -1){
            newAnswers.push({
                "questionId": parseInt(dataQuestionInTopic[q].id),
                "answer": a
            });
        }else{
            newAnswers[IndexexistQuestion] = {
                "questionId": parseInt(dataQuestionInTopic[q].id),
                "answer": a
            }
        }
        setDataUSerAnswer(newAnswers);
    }

    return (
        <>
            <h2>Bài Quiz chủ đề: {dataTopic && (<>{dataTopic.name}</>)}</h2>
            <form onSubmit={handleSubmit}>
                <ul className="question-list">
                    {dataQuestionInTopic.map((question,index)=>(
                        <li key={index} className="question-item">
                            <p className="question-text">Câu {index + 1}: {question.question}</p>
                            <ul className="answers-list">
                                {question.answers.map((item,index1)=>(
                                    <li key={index1}>
                                        <input type="radio" id={`q${index}-a${index1}`} name={`question${index}`} onChange={handleChange} required />
                                        <label htmlFor={`q${index}-a${index1}`} className="answer-item">{item}</label>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <button class="submit-button">Submit</button>
            </form>
        </>
    )
}
export default Quizz;