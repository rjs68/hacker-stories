import React, { useEffect } from "react"

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

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  );

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

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

const List = ({ list }: {list: Array<Story>}) => (
    <ul>
      {list.map((item) => <Item key={item.objectID} item={item} />)}
    </ul>
);

const Item = ({ item }: {item: Story}) => (
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
  </li>
);

type SearchProps = {
  searchTerm: string,
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ searchTerm, onSearch}: SearchProps) => (
  <>
    <label htmlFor="search">Search: </label>
    <input type="text"
      id="search"
      onChange={onSearch}
      value={searchTerm}
    />

    <p>
      Searching for <strong>{searchTerm}</strong>.
    </p>
  </>
);

export default App
