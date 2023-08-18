import React from "react"

interface Story {
  title: string,
  url: string,
  author: string,
  num_comments: number,
  points: number,
  objectID: number
}

const App = () => {
  const stories = [
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

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search searchTerm={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
}

const List = (props: {list: Array<Story>}) => (
    <ul>
      {props.list.map((item) => <Item key={item.objectID} item={item} />)}
    </ul>
);

const Item = (props: {item: Story}) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <br />
    <span>{props.item.author}</span>
    <br />
    <span>{props.item.num_comments}</span>
    <br />
    <span>{props.item.points}</span>
  </li>
);

const Search = (props: {searchTerm: string,onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch(event);
  }

  return (
    <>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={handleChange} />

      <p>
        Searching for <strong>{props.searchTerm}</strong>.
      </p>
    </>
  );
}

export default App
