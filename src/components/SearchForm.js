import { useState } from "react";
import { SEARCH_TYPE } from "../constants/searchType";

const SearchForm = ({ onSearch }) => {
  const [payload, setPayload] = useState({
    keyword: "",
    type: SEARCH_TYPE.USER,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity) {
      return;
    }

    onSearch({ ...payload, calledFromSearchForm: true });
  };

  const onChange = (e) =>
    setPayload((oldPayload) => ({
      ...oldPayload,
      [e.target.name]: e.target.value,
    }));
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="Keyword">Keyword</label>
      <br />
      <input
        placeholder="Keyword"
        name="keyword"
        required
        onChange={onChange}
        value={payload.keyword}
      />
      <br />
      <label htmlFor="type">Type</label>
      <br />
      <input
        type="radio"
        name="type"
        onChange={onChange}
        checked={payload.type === SEARCH_TYPE.USER}
        value={SEARCH_TYPE.USER}
      />
      User
      <input
        type="radio"
        name="type"
        onChange={onChange}
        checked={payload.type === SEARCH_TYPE.ORG}
        value={SEARCH_TYPE.ORG}
      />
      Organization
      <br />
      <button type="submit">Search</button>
    </form>
  );
};
export default SearchForm;
