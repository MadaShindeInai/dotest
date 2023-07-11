import { useQueries } from "@tanstack/react-query";
import { Object_API } from "app-constants";
import { axiosInstance } from "utils";
import { Card } from "./card";
import { Collection } from "react-virtualized";

const queryObjects = (id: number) => {
  return axiosInstance.get(`${Object_API}${id}`).then((res) => res.data);
};

function cellSizeAndPositionGetter({ index }: any) {
  return {
    height: 700,
    width: 523,
    x: 0,
    y: 700 * index,
  };
}

export const CardsContainer = ({ ids }: { ids: number[] }) => {
  const queriesObject = ids.map((id) => ({
    queryKey: [id],
    queryFn: () => queryObjects(id),
  }));

  const results = useQueries({
    queries: queriesObject,
  });
  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (!results.length) return <div>No results</div>;

  function cellRenderer({ index, key, style }: any) {
    return (
      <div key={key} style={style}>
        <Card data={results[index].data} />
      </div>
    );
  }

  return (
    <div className="cardsContainer">
      <Collection
        cellCount={10}
        cellRenderer={cellRenderer}
        cellSizeAndPositionGetter={cellSizeAndPositionGetter}
        height={600}
        width={700}
      />
    </div>
  );
};
