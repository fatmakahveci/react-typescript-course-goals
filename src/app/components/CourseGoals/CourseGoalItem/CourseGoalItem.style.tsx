import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import styled, { IStyledComponent } from "styled-components";

export const GoalItem: IStyledComponent<"web", DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>> = styled.li`
  margin: 1rem 0;
  background: #8b005d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  color: white;
  padding: 1rem 2rem;
  cursor: pointer;
`;
