import React, { lazy, Suspense } from "react";

const LazyProfileImage = lazy(() => import("./ProfileImage"));

const ProfileImage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
): JSX.Element => (
  <Suspense fallback={null}>
    <LazyProfileImage {...props} />
  </Suspense>
);

export default ProfileImage;
