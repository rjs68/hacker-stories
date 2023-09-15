import { Story } from "../App";
import { Item } from "./Item";

type ListProps = {
    list: Array<Story>,
    onRemoveItem: (item: Story) => void
  }
  
export const List = ({ list, onRemoveItem }: ListProps) => (
    <ul>
    {list.map((item) => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />)}
    </ul>
);