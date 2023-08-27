import { DetailedHTMLProps, HTMLAttributes } from "react";
import styled, { IStyledComponent } from "styled-components";

export const GoalList: IStyledComponent<"web", DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>> = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;
