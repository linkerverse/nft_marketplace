import React, { FC } from "react";

interface INailTokenCardProps {
  imgUrl: string;
}

const NailTokenCard: FC<INailTokenCardProps> = ({ imgUrl }) => {
  return <img src={imgUrl} alt="NailTokenCard" />;
};

export default NailTokenCard;
