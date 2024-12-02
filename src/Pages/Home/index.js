import { Link } from "react-router-dom";
import { getCookie } from "../../helper/cookie";
import "./home.scss";

function Home() {
    const token = getCookie("token");

    return (
        <>
            {token && (
                <>
                    <p className="welcome-message">Chúc mừng bạn đã đăng nhập thành công!</p>
                    <div className="button-container">
                        <Link to="/topic" className="styled-button">Danh sách chủ đề ôn luyện</Link>
                        <Link to="/answer" className="styled-button">Danh sách chủ đề đã ôn luyện</Link>
                    </div>
                </>
            )}

            <p className="description">
                Website trắc nghiệm online thực hiện các bài kiểm tra, trắc nghiệm, đánh giá kiến thức
            </p>
        </>
    );
}
export default Home;