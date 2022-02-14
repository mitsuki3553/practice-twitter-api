import Image from "next/image";
import { useRouter } from "next/router";

import { useSharedState } from "src/utils/globalState";

export const Header = () => {
  const [user] = useSharedState("user");
  const { replace } = useRouter();

  return (
    <>
      {user ? (
        <>
          <Image
            src={user.data.profile_image_url}
            alt="プロフ画像"
            height={50}
            width={50}
          />
          <div>
            {user.data.name}@{user.data.username}
          </div>
        </>
      ) : (
        <div>NoUser</div>
      )}
      <button
        onClick={() => {
          replace("/");
        }}
      >
        トップへ戻る
      </button>
    </>
  );
};
