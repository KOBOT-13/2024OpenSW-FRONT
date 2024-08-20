import {ReactComponent as Logo} from '../assets/Logo320.svg'
import styled from 'styled-components';
import Profile from '../components/Profile/Profile';

const Div = styled.div`
    &.BG{
        margin-top: 124px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &.Top{
        width: 80%;
        display: flex;
        justify-content: center;
    }

    &.Intro{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 150px;
    }

    &.Bottom{
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 60px;
    }

    &.Profiles{
        display: flex;
        height: 200px;
        justify-content: center;
        align-items: center;
        background-color: #fafafa;
        border-radius: 20px;
        margin-top: 20px;
    }
`;

const P = styled.p`
    margin: 0;
    font-family: 'Pretendard-Bold';
    user-select: none;
    &.title{
        font-size: 56px;
        margin-bottom: 20px;
    }
    &.content{
        font-size: 24px;
        margin-bottom: 10px;
    }
    &.sub-content{
        font-family: 'Pretendard-Regular';
        font-size: 16px;
        line-height: 26px;
    }
    &.developer{
        font-family: 'Pretendard-SemiBold';
        font-size: 22px;
    }
`;



function ServiceInfo() {
    const developerInfo = [
        {url : "https://github.com/rktlskan021", img : "https://avatars.githubusercontent.com/u/68416831?v=4", id : "@rktlskan021"},
        {url : "https://github.com/forestsol", img : "https://avatars.githubusercontent.com/u/51287968?v=4", id : "@forestsol"},
        {url : "https://github.com/ima9ine4", img : "https://avatars.githubusercontent.com/u/105336619?v=4", id : "@ima9ine4"},
        {url : "https://github.com/IamWonILuvWon", img : "https://avatars.githubusercontent.com/u/113083948?v=4", id : "@IamWonILuvWon"},
        {url : "https://github.com/coladribble", img : "https://avatars.githubusercontent.com/u/134242170?v=4", id : "@coladribble"},
    ]

    return (
        <Div className='BG'>
            <Div className='Top'>
                <Logo/>
                <Div className='Intro'>
                    <P className='title'>아이랑 아이(AI)랑</P>
                    <P className='content'>인공지능이 도와주는 아이들의 독후활동</P>
                    <P className='sub-content'>‘아이랑 아이(AI)랑’에서는 아이들과 인공지능(AI)이 함께 새로운 학습 경험을 만들어갑니다.
                        <br/>책 속 등장인물과 직접 대화하고, 독서퀴즈 풀이와 독후감 작성까지 풍부한 독후활동을 즐겨보세요.
                        <br/>꾸준한 독서를 위해 사용자 개인의 독서 선호도를 기반으로 책을 추천해드립니다.
                        <br/>단순한 독후활동의 도구를 넘어, 독서의 재미를 느끼고 사고력을 넓힐 수 있도록 도와드릴게요.</P>
                </Div>
            </Div>
            <Div className='Bottom'>
                <P className='developer'>개발진</P>
                <Div className='Profiles'>
                    {developerInfo.map((item) => {
                        return <Profile url={item.url} img={item.img} id={item.id} />
                    })}
                </Div>
            </Div>
        </Div>
    )
}

export default ServiceInfo;