import { format } from 'date-fns';

function PreviousChat({ conversations, onChatClick }) {
    return (
        <div>
            <h1>이전 대화</h1>
            <ul>
                {conversations.map(conversation => (
                    <li key={conversation.id} onClick={() => onChatClick(conversation.id, conversation.character)}>
                        <p>책 제목: {conversation.book_title}</p>
                        <p>대화한 등장인물: {conversation.character_name}</p>
                        <p>마지막 대화: {format(new Date(conversation.updated_at), 'yyyy-MM-dd hh:mm aa')}</p>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreviousChat;