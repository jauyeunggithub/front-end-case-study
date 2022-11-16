import { useEffect, useMemo, useState } from "react";
import SearchForm from "./components/SearchForm";
import { SEARCH_TYPE } from "./constants/searchType";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async ({ keyword, type, calledFromSearchForm = false }) => {
    setLoading(true);
    if (calledFromSearchForm) {
      const url = new URL(window.location);
      url.searchParams.set("keyword", keyword);
      url.searchParams.set("type", type);
      window.history.pushState({}, "", url);
    }
    let res;
    if (type === SEARCH_TYPE.USER) {
      res = await fetch(`https://api.github.com/search/users?q=${keyword}`);
    } else if (type === SEARCH_TYPE.ORG) {
      res = await fetch(
        `https://api.github.com/search/users?q=${keyword}+type:org`
      );
    }
    if (!res) {
      setLoading(false);
      return;
    }
    const json = await res.json();
    setResults(json.items);
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("keyword");
    const type = params.get("type");
    onSearch({ keyword, type });
  }, []);

  const resultsDisplay = useMemo(() => {
    if (loading) {
      return <>Loading</>;
    } else {
      if (Array.isArray(results) && results.length > 0) {
        return results?.map((r) => {
          return (
            <section key={r.id}>
              <p>login: {r.login}</p>
              <p>is site admin: {r.site_admin.toString()}</p>
              <p>avatar:</p>
              <img src={r.avatar_url} alt={r.login} />
            </section>
          );
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
