type Props = {
  data: any;
};

// CHECK MISSING CARD DATA
export const Card = ({ data }: Props) => {
  const {
    primaryImage,
    primaryImageSmall,
    title = "Missed",
    artistDisplayBio = "Missed",
    accessionNumber = "Missed",
  } = data;

  return (
    <div className="card">
      <h3>{title}</h3>
      {primaryImage || primaryImageSmall ? (
        <img
          className="cardImage"
          src={primaryImage || primaryImageSmall}
          alt={`${title}-representation`}
        />
      ) : (
        <div className="imageFallback">No image</div>
      )}
      <p className="bio">{artistDisplayBio}</p>
      <p className="bio">{accessionNumber}</p>
    </div>
  );
};
