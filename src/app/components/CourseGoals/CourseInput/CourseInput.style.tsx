import styled from "styled-components";

export const FormControl = styled.div<{ $invalid?: string }>`
    margin: 0.5rem 0;

    & label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
        color: ${props => props.$invalid === 'true' ? 'red' : 'black'};
    }
  
    & input {
        display: block;
        width: 100%;
        border: 1px solid ${props => props.$invalid === 'true' ? 'red' : '#ccc'};
        background: ${props => props.$invalid === 'true' ? '#ffd7d7' : 'transparent'};
        font: inherit;
        line-height: 1.5rem;
        padding: 0 0.25rem;
    }
    
    & input:focus {
        outline: none;
        background: #fad0ec;
        border-color: #8b005d;
    }
`;