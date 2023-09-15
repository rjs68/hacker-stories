import styled from "styled-components";

export const StyledColumn = styled.span<{width: string}>`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: inherit;
  }

  width: ${(props: { width: string }) => props.width};
`;
