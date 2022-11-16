import { useMemo, useState } from "react";
import SearchForm from "./components/SearchForm";
import { SEARCH_TYPE } from "./constants/searchType";
import { searchUsers, searchOrgs } from "./helpers/http";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async ({ keyword, type }) => {
    setLoading(true);
    let json;
    if (type === SEARCH_TYPE.USER) {
      json = await searchUsers(keyword);
    } else if (type === SEARCH_TYPE.ORG) {
      json = await searchOrgs(keyword);
    }
    if (!json) {
      setLoading(false);
      return;
    }
    setResults(json.items);
    setLoading(false);
  };

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
        return <>No Results Found</>;
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
