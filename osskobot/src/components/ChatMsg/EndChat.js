import { privateAxios } from '../../services/axiosConfig';

export const EndChat = async (id) => {
    const response = await privateAxios.post(`dialogs/endchat/`,
        {
            conversation_id: id,
        }
    );
};

export default EndChat;