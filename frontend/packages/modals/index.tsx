import React, { Suspense, memo, lazy, ComponentType, createElement, useCallback } from "react";
import { atom } from "recoil";
import isEqual from "lodash/isEqual";
import omit from "lodash/omit";
import uniqueId from "lodash/uniqueId";

import { useImRecoilState } from "work-common/hooks/useImRecoilState";
import Loader from "work-common/components/Loader";

type UnknownProps = Record<string, unknown>;

/* eslint-disable @typescript-eslint/no-explicit-any */
const modals = new Map<string, ComponentType<any>>();

export type ExtendModalProps<T> = T & { onClose: () => void };

type DynamicImport<P> = () => Promise<{ default: ComponentType<ExtendModalProps<P>> }>;

type OpenModalProps<T> = {
  __modalId: string;
  dynamicImport: DynamicImport<T>;
};

const modalsState = atom<Record<string, UnknownProps>>({
  key: "Modals",
  default: {},
});

export const createModal = <P,>(dynamicImport: DynamicImport<P>) =>
  Object.assign({}, { dynamicImport, __modalId: uniqueId() });

export const loadModal = <T,>({ __modalId, dynamicImport }: OpenModalProps<T>, props?: T) => {
  modals.set(__modalId, lazy(dynamicImport));

  return { id: __modalId, props: props || {} };
};

export const useShowModal = () => {
  const [storedModals, setModals] = useImRecoilState(modalsState);

  return useCallback(
    <T extends UnknownProps>({ id, props }: { id: string; props: T }) => {
      if (storedModals[id] && isEqual(storedModals[id], props)) {
        return;
      }

      setModals((prevState) => {
        prevState[id] = props;
      });
    },
    [storedModals],
  );
};

const PureModalProvider = () => {
  const [storedModals, setModals] = useImRecoilState(modalsState);

  return (
    <Suspense fallback={<Loader />}>
      <>
        {Object.entries(storedModals).map(([id, props]) => {
          const Component = modals.get(id);

          if (Component) {
            Object.assign(Component, { displayName: `Modal-${Component.displayName || "-"}${id}` });

            return createElement(Component, {
              key: id,
              ...props,
              onClose: () => setModals((modals) => omit(modals, id)),
            });
          }
        })}
      </>
    </Suspense>
  );
};

export const ModalProvider = memo(PureModalProvider);
