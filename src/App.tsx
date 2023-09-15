import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

type Story = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const getAsyncStories = () => new Promise<{data: {stories: Story[]}}>((resolve) => 
  setTimeout(
    () => resolve({data: {stories: initialStories}}),
    2000
  )
);

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

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    getAsyncStories()
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.stories,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const searchedStories = stories.data.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <h1>My Hacker Stories</h1>

      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch}>
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
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

    <p>
      Searching for <strong>{value}</strong>.
    </p>
  </>
);

export default App
