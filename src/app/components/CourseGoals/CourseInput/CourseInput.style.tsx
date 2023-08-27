import { DetailedHTMLProps, HTMLAttributes } from "react";
import styled, { IStyledComponent } from "styled-components";
import { Substitute } from "styled-components/dist/types";

export const FormControl: IStyledComponent<"web", Substitute<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
    $invalid?: boolean | undefined;
}>> = styled.div<{ $invalid?: boolean }>`
    margin: 0.5rem 0;

    & label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
        color: ${props => props.$invalid ? 'red' : 'black'};
    }
  
    & input {
        display: block;
        width: 100%;
        border: 1px solid ${props => props.$invalid ? 'red' : '#ccc'};
        background: ${props => props.$invalid ? '#ffd7d7' : 'transparent'};
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