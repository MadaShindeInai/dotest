import { useState } from "react";

interface Props {
  searchAction: () => void;
  searchInput: string;
  setSearchInput: (arg: string) => void;
}

// TODO check accessibility

const Search = (props: Props) => {
  const { searchAction, setSearchInput, searchInput } = props;

  const [called, setCalled] = useState<any>();
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setCalled(true);
    searchAction();
  };

  return (
    <>
      <div className="searchContainer">
        <form onSubmit={handleFormSubmit}>
          <input
            className="searchInput"
            placeholder="Search anything..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="searchButton" type="submit">
            Search
          </button>
        </form>
      </div>
      {searchInput && called && <div>Search: {searchInput}</div>}
    </>
  );
};

export default Search;
