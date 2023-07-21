function getTitle(title: string) {
  return title
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  return (
    <div>
      <h1>Hello {getTitle('React')}</h1>

      {array.map((item) => {
        return (
          <div key={item}>
            <span>{item}</span>
          </div>
        )
      })}

      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />
    </div>
  )
}

export default App
