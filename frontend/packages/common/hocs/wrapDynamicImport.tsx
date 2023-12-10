import React, { ComponentType, lazy, Suspense } from "react";

import Loader from "../components/Loader";

type DynamicImport = () => Promise<{ default: ComponentType<any> }>;

const wrapDynamicImport = <T extends DynamicImport>(
  dynamicImport: T,
  LazyComponent = lazy(dynamicImport),
) => (
  <Suspense fallback={<Loader />}>
    <LazyComponent />
  </Suspense>
);

export default wrapDynamicImport;
