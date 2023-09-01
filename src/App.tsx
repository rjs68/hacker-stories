import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Story {
  title: string,
  url: string,
  author: string,
  num_comments: number,
  points: number,
  objectID: number
}

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

const useStorageState: (key: string, initialState: string) => [string, Dispatch<SetStateAction<string>>] = (key: string, initialState: string) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const App = () => {
  const [stories, setStories] = useState(initialStories);
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleRemoveStory = (item: Story) => {
    const newStories = stories.filter((story) => item.objectID !== story.objectID);

    setStories(newStories);
  }

  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <h1>My Hacker Stories</h1>

      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch}>
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
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
