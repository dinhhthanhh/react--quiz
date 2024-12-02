import { getCookie } from "../helper/cookie";
import { get, post } from "../utils/request";

export const getAnswerByUserID = async () => {
    const userId = getCookie("id");
    const result = await get(`answers?userId=${userId}`);
    return result;
}

export const getDetailAnswerByUserId = async (AnswerId) => {
    const userId = getCookie("id");
    const result = await get(`answers?userId=${userId}&id=${AnswerId}`);
    return result;
}

export const createAnwserByUserId = async (option) => {
    const result = await post(`answers`,option);
    return result;
}

export const getAllAnswers = async()=>{
    const result = await get(`answers`);
    return result;
}