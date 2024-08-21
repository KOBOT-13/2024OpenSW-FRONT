import { useState } from "react";
import styled from "styled-components";

const Div = styled.div`
    &.BG1440{
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FAFAFA;
    }
    &.BG{
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.Menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    &.Content{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const P = styled.p`
    margin: 0;
    font-family: 'Pretendard-Bold';
    font-size: 20px;
    color: ${({ $props }) => ($props ? 'black' : '#BBBBBB')};
    user-select: none;
`;

const Ul = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    width: 100%;
`;

const Li = styled.li`
    width: 33.333%;
    height: 80px;
    background-color: #FAFAFA;
    display: flex;
    align-items: center;
    &::before {
        content: '|';
        font-size: 25px;
        padding-right: 30px;
        color: #D8D8D8;
    }

    &:first-child::before {
        content: none;
    }
    cursor: pointer;
`;

function SubHeader({index, setSubHeaderIndex}) {
    const handleMenuClick = (index) => {
        console.log(index);
        setSubHeaderIndex(index);
    };

    return (
        <header>
            <Div className="BG1440">
                <Div className="BG">
                    <Div className="Menu">
                        <Ul>
                            <Li onClick={() => handleMenuClick(0)} >
                                <Div className="Content">
                                    <P $props={index === 0}>둘러보기</P>
                                </Div>
                            </Li>
                            <Li onClick={() => handleMenuClick(1)}>
                                <Div className="Content">
                                    <P $props={index === 1}>내 책장</P>
                                </Div>
                            </Li>
                            <Li onClick={() => handleMenuClick(2)}>
                                <Div className="Content">
                                    <P $props={index === 2}>추천 도서</P>
                                </Div>
                            </Li>
                        </Ul>
                    </Div>
                </Div>
            </Div>
        </header>
    )
}

export default SubHeader;