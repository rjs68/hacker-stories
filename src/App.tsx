const list = [
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
]

function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />

      <hr />

      {list.map((item) => {
        return (
          <li key={item.objectID}>
            Title: {item.title}
            <div>Author: {item.author}</div>
            <div>Comments: {item.num_comments}</div>
            <div>Points: {item.points}</div>
            <div>Link: <a href={item.url}>{item.url}</a></div>
          </li>
        )
      })}
    </div>
  )
}

export default App
