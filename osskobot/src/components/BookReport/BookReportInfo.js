import styled from "styled-components";
import BookReportModal from "../Modal/BookReportModal";
import { useRef, useState } from "react";

const Div = styled.div`
  padding: 20px 50px 0 50px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 25px;
`;

const Ul = styled.ul`
  display: flex;
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  color: rgba(0,0,0,0.4);
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  float: left;
  list-style: none;

  &::before {
    content: '|';
    margin-right: 10px;
    margin-left: 10px;
  }

  &:first-child::before {
    content: none;
  }
`;

const Content = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: 15px;
  margin: 0;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
`;

function BookReportInfo({title, reviewDate, content, id }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Div>
      <Ul>
        <Li>{title}</Li>
        <Li>{reviewDate}</Li>
      </Ul>
      <Content>{content}</Content>
      <BookReportModal isOpen={true} />
    </Div>
  );
}

export default BookReportInfo;