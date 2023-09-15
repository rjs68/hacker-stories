import { Story } from "../App";
import { StyledButtonSmall } from "./Button";
import { StyledColumn } from "./Column";
import { StyledItem } from "./StyledItem";

type ItemProps = {
    item: Story,
    onRemoveItem: (item: Story) => void
  }
  
export const Item = ({ item, onRemoveItem }: ItemProps) => (
    <StyledItem>
        <StyledColumn width="40%">
        <a href={item.url}>{item.title}</a>
        </StyledColumn>
        <StyledColumn width="30%">{item.author}</StyledColumn>
        <StyledColumn width="10%">{item.num_comments}</StyledColumn>
        <StyledColumn width="10%">{item.points}</StyledColumn>
        <StyledColumn width="10%">
        <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
            Dismiss
        </StyledButtonSmall>
        </StyledColumn>
    </StyledItem>
);