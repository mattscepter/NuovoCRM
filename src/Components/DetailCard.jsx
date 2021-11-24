const DetailCard = ({ title, detail }) => {
  return (
    <>
      {detail ? (
        <div className="flex w-full">
          <p className="flex text-lg font-semibold mr-2">{title}:</p>
          <p className="text-lg">{detail}</p>
        </div>
      ) : null}
    </>
  );
};

export default DetailCard;
