import React, { lazy, Suspense } from "react";
import Loader from "./Loader";

const LazyProfileImage = lazy(() => {
  return new Promise<typeof import("./ProfileImage")>((resolve) => {
    setTimeout(() => resolve(import("./ProfileImage")), 10000);
  });
});

const ProfileImage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
): JSX.Element => (
  <Suspense fallback={<Loader />}>
    <LazyProfileImage {...props} />
  </Suspense>
);

export default ProfileImage;
