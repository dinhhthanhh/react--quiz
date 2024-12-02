import { useEffect, useState } from "react";
import { getListTopic } from "../../service/topicService";
import { getAnswerByUserID } from "../../service/answerService";
import { Link } from "react-router-dom";

function Answer() {
    const [dataAnswer, setDataAnswer] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const AnswerByUserID = await getAnswerByUserID();
            const topics = await getListTopic();
            let result = AnswerByUserID.map(answer => {
                const topic = topics.find(item => item.id === answer.topicId.toString());
                return {
                    ...answer,
                    name: topic.name
                }
            });
            setDataAnswer(result.reverse());
        }
        fetchApi();
    }, [])

    return (
        <>
            <h2>Danh sách bài đã luyện</h2>

            <div className="topic-container">
                <h2 className="topic-title">Danh sách chủ đề</h2>
                {dataAnswer.length > 0 && (
                    <>
                        <table className="topic-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên chủ đề</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataAnswer.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={"/result/" + item.id} className="topic-link">Xem chi tiết</Link>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    )
}
export default Answer;