import styled from "styled-components";
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as Instargram } from '../../assets/instargram.svg';
import { ReactComponent as Youtube } from '../../assets/youtube.svg';

const Div = styled.div`
    &.BG{
        margin-top: 23px;
        width: 80%;
    }
    &.Frame{
        padding-bottom: 13px;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    &.CI{
        display: flex;
        align-items: center;
        font-family: 'Pretendard-SemiBold';
        font-size: 18px;
    }
    &.Content{
        display: flex;
        padding-top: 13px;
        justify-content: space-between;
        align-items: center;
    }
    &.Action{
        display: flex;
        gap: 8px
    }
`;

const CustomFooter = styled.footer`
    height: 173px;
    margin-top: 200px;
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(0,0,0,0.05);
    background-color: #FAFAFA;
`;

const P = styled.p`
    margin: 0;
    margin-left: 5px;
    font-family: 'Pretendard-Medium';
    font-size: 13px;
    color: rgba(55, 56, 60, 0.6);
`;

const InstaIcon = styled(Instargram)`
`;

const YoutubeIcon = styled(Youtube)`
`;

const _Logo = styled(Logo)`
    margin-right: 5px;
`;

function Footer(){
    const instaLink = "https://www.instagram.com/kobot_kmu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
    const youtubeLink = "";

    return(
        <CustomFooter>
            <Div className="BG">
                <Div className="Frame">
                    <Div className='CI'>
                        <_Logo />
                        아이랑 아이(AI)랑
                    </Div>
                </Div>
                <Div className="Content">
                    <P>© 2024 아이랑 아이(AI)랑</P>
                    <Div className="Action">
                        <InstaIcon onClick={() => (window.open(instaLink))} />
                        <YoutubeIcon onClick={() => (window.open(youtubeLink))}/>
                    </Div>
                </Div>
            </Div>
        </CustomFooter>
    );
}

export default Footer;