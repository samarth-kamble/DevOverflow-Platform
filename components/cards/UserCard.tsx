import Link from "next/link";

import ROUTES from "@/constants/routes";

import UserAvatar from "../UserAvatar";

const UserCard = ({ _id, name, image, username }: User) => {
  return (
    <div className="shadow-light100_darknone w-full xs:w-[230px]">
      <article
        className="background-light900_dark200 light-border flex flex-col items-center justify-center rounded-2xl
    border p-8"
      >
        <UserAvatar
          id={_id}
          name={name}
          imageUrl={image}
          fallbackClassName="text-3xl tracking-widest"
        />
        <Link href={ROUTES.PROFILE(_id)}>
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {name}
            </h3>
            <p className="body-regular text-dark200_light900 mt-2">
              @{username}
            </p>
          </div>
        </Link>
      </article>
    </div>
  );
};
export default UserCard;
