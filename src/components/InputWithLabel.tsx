import { StyledInput } from "./Input";
import { StyledLabel } from "./Label";

type InputWithLabelProps = {
    children?: string | JSX.Element,
    id: string,
    value: string,
    type?: string,
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    isFocused?: boolean
  }
  
export const InputWithLabel = (
  { 
    children,
    id,
    value,
    type="text",
    onInputChange,
    isFocused
  }: InputWithLabelProps) => (
  <>
    <StyledLabel htmlFor={id}>{children}</StyledLabel>
    &nbsp;
    <StyledInput id={id}
      type={type}
      onChange={onInputChange}
      value={value}
      autoFocus={isFocused}
    />
  </>
);
