import { Link } from "react-router-dom";
import "./topic.scss";
import { useEffect, useState } from "react";
import { getListTopic } from "../../service/topicService";

function Topic() {
    const [topic, setTopic] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListTopic();
            setTopic(response);
        }
        fetchApi();
    }, []);

    return (
        <div className="topic-container">
            <h2 className="topic-title">Danh sách chủ đề</h2>
            {topic.length > 0 && (
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
                            {topic.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Link to={"/quiz/"+item.id} className="topic-link">Làm bài</Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}
export default Topic;