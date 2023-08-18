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

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      <List list={stories} />
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

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </>
  );
}

export default App
