import Image from "next/image";

type Props = {
  imgUrl: string;
};

export const Thumb = ({ imgUrl }: Props) => {
  return (
    <Image
      placeholder="blur"
      blurDataURL="/placeholder.jpg"
      className="rounded-lg"
      layout="fill"
      objectFit="cover"
      src={imgUrl}
      alt="thumb"
    />
  );
};
