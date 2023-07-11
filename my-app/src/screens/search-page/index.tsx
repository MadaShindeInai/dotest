import { ObjectIDs_API } from "app-constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "utils";
import Search from "./components/search";
import { Pagination } from "components";
import { CardsContainer } from "./components/cards-container";

const queryObjectIDs = (searchInput: string) => {
  return axiosInstance
    .get(`${ObjectIDs_API}search?q=${searchInput ?? ""}`)
    .then((res) => res.data as { objectIDs: number[]; total: number });
};

export const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const { error, data, isFetching, refetch } = useQuery({
    queryKey: ["objectIDs"],
    queryFn: () => queryObjectIDs(searchInput),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const isNoData = !data?.objectIDs?.length && !searchInput;
  const maximumPages = Math.ceil(data?.total ?? 0 / 10);
  const firstItem = (page - 1) * 10;
  const lastItem = page * 10;
  const currArray = data?.objectIDs?.slice(firstItem, lastItem) ?? [];

  if (error)
    return <div>{"An error has occurred: please try again later"}</div>;

  return (
    <>
      <div>
        {isFetching && <p className="notification">Updating...</p>}
        <Search
          searchAction={refetch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>

      {isNoData && (
        <p>
          Start type someting into search input and press search to see results
        </p>
      )}
      <div>
        <CardsContainer ids={currArray} />
        {maximumPages > 1 && (
          <Pagination
            page={page}
            setPage={setPage}
            maximumPages={maximumPages}
          />
        )}
      </div>
    </>
  );
};
