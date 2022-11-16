import { useMemo, useState } from "react";
import SearchForm from "./components/SearchForm";
import { SEARCH_TYPE } from "./constants/searchType";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async ({ keyword, type }) => {
    setLoading(true);
    let res;
    if (type === SEARCH_TYPE.USER) {
      res = await fetch(`https://api.github.com/search/users?q=${keyword}`);
    } else if (type === SEARCH_TYPE.ORG) {
      res = await fetch(
        `https://api.github.com/search/users?q=${keyword}+type:org`
      );
    }
    const json = await res.json();
    setResults(json.items);
    setLoading(false);
  };

  const resultsDisplay = useMemo(() => {
    if (loading) {
      return <>Loading</>;
    } else {
      if (Array.isArray(results) && results.length > 0) {
        return results?.map((r) => {
          return <section key={r.id}>{r.login}</section>;
        });
      } else {
        <>No Results Found</>;
      }
    }
  }, [loading, results]);

  return (
    <div className="App">
      <SearchForm onSearch={onSearch} />
      <h2>Results</h2>
      {resultsDisplay}
    </div>
  );
}

export default App;
