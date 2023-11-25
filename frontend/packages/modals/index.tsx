import React, { Suspense, memo, lazy, ComponentType, createElement, useCallback } from "react";
import { atom } from "recoil";
import isEqual from "lodash/isEqual";
import omit from "lodash/omit";
import { useImRecoilState } from "../common/hooks/useImRecoilState";
import Loader from "../common/components/Loader";

type UnknownProps = Record<string, unknown>;

/* eslint-disable @typescript-eslint/no-explicit-any */
const modals = new Map<string, ComponentType<any>>();

export type ExtendModalProps<T> = T & { onClose: () => void };

type OpenModalProps<T> = {
  id: string;
  dynamicImport: () => Promise<{ default: ComponentType<ExtendModalProps<T>> }>;
};

const modalsState = atom<Record<string, UnknownProps>>({
  key: "Modals",
  default: {},
});

export const loadModal = <T,>({ id, dynamicImport }: OpenModalProps<T>, props?: T) => {
  modals.set(id, lazy(dynamicImport));

  return { id, props: props || {} };
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
            Object.assign(Component, { displayName: `Modal-${id}` });

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
