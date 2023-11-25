import { atom } from "recoil";

export interface Enterprise {
  id: string;
  name: string;
  details: string;
  phone: string;
  contact_person: string;
}

export const enterprisesState = atom<Enterprise[]>({
  key: "enterprisesState",
  default: [
    { id: "1", name: "name", details: "details", phone: "phone", contact_person: "contact_person" },
    {
      id: "2",
      name: "name",
      details: "details",
      phone: "phone",
      contact_person: "contact_person",
    },
    {
      id: "3",
      name: "name",
      details: "details",
      phone: "phone",
      contact_person: "contact_person",
    },
    {
      id: "4",
      name: "name",
      details: "details",
      phone: "phone",
      contact_person: "contact_person",
    },
  ],
});
