import { StyledButtonLarge } from "./Button";
import { InputWithLabel } from "./InputWithLabel";
import { StyledSearchForm } from "./StyledSearchForm";

type SearchFormProps = {
    searchTerm: string,
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSearchSubmit: (event: React.SyntheticEvent) => void
  }
  
export const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit
}: SearchFormProps) => (
<StyledSearchForm onSubmit={onSearchSubmit}>
    <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>
    <strong>Search:</strong>
    </InputWithLabel>

    <StyledButtonLarge
    type="submit"
    disabled={!searchTerm}
    >
    Submit
    </StyledButtonLarge>
</StyledSearchForm>
);
