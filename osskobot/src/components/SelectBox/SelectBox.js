import styled from "styled-components";

const Select = styled.select`
    font-family: 'Pretendard-SemiBold';
    font-size: ${props => props.fontSize}px;
    border: none;
    color: rgba(55, 56, 60, 0.6);
    &:focus{
        outline: 0;
    }
    text-align: right;
    padding-right: 10px;
    cursor: pointer;
`;

function SelectBox({selectList, fontSize=14, onChange}) {
    return(
        <Select fontSize={fontSize} onChange={(e) => onChange(e.target.value)}>
            {selectList.map((value, key) => {
                return <option value={value.value} key={key}>
                    {value.name}
                </option>
            })}
        </Select>
    )
}

export default SelectBox;