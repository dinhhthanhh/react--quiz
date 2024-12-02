import { get } from "../utils/request"

export const getQuestionInTopic = async (ToipcId) => {
    const result = await get(`questions?topicId=${ToipcId}`);
    return result;
}