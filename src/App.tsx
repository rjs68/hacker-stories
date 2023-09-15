import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import axios from 'axios';

type Story = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type StoriesState = {
  data: Story[];
  isLoading: boolean;
  isError: boolean;
};

type StoriesFetchInitAction = {
  type: 'STORIES_FETCH_INIT';
};

type StoriesFetchSuccessAction = {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Story[];
};

type StoriesFetchFailureAction = {
  type: 'STORIES_FETCH_FAILURE';
};

type StoriesRemoveAction = {
  type: 'REMOVE_STORY';
  payload: Story;
};

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState: (key: string, initialState: string) => [string, Dispatch<SetStateAction<string>>] = (key: string, initialState: string) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {  
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    axios.get(url)
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  return (
    <>
      <h1>My Hacker Stories</h1>

      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearchInput}>
        <strong>Search:</strong>
      </InputWithLabel>

      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory}/>
      )}
    </>
  );
}

type ListProps = {
  list: Array<Story>,
  onRemoveItem: (item: Story) => void
}

const List = ({ list, onRemoveItem }: ListProps) => (
    <ul>
      {list.map((item) => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />)}
    </ul>
);

type ItemProps = {
  item: Story,
  onRemoveItem: (item: Story) => void
}

const Item = ({ item, onRemoveItem }: ItemProps) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <br />
    <span>{item.author}</span>
    <br />
    <span>{item.num_comments}</span>
    <br />
    <span>{item.points}</span>
    <br />
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

type InputWithLabelProps = {
  children?: string | JSX.Element,
  id: string,
  value: string,
  type?: string,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isFocused?: boolean
}

const InputWithLabel = (
  { 
    children,
    id,
    value,
    type="text",
    onInputChange,
    isFocused
  }: InputWithLabelProps) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id}
      type={type}
      onChange={onInputChange}
      value={value}
      autoFocus={isFocused}
    />
  </>
);

export default App
