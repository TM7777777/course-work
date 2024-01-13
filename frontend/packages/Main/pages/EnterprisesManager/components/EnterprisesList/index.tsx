import React, { useCallback, useMemo } from "react";
import { useLocation } from "wouter";
import { useRecoilValue } from "recoil";
import { Card, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useShowModal } from "recoil-modals/dist/tools";
import { openDeleteModal } from "work-modals/DeleteModal";
import { openEnterpriseModal } from "work-modals/EnterpriseModal";
import { useImRecoilState } from "work-common/hooks/useImRecoilState";
import { IEnterprise } from "work-types/enterprise";
import service from "work-service";

import { enterprisesTotalIncomeState } from "../../../../state/enterprisesTotalIncome";
import { enterprisesState } from "../../../../state/enterprises";

const EnterprisesList = () => {
  const [enterprises, setEnterprises] = useImRecoilState(enterprisesState);
  const enterprisesTotalIncome = useRecoilValue(enterprisesTotalIncomeState);
  const showModal = useShowModal();

  const [_, navigate] = useLocation();

  const enterprisesTotalIncomeSet = useMemo(
    () =>
      enterprisesTotalIncome.reduce(
        (acc, { enterprise_id, total_income }) => acc.set(enterprise_id, Number(total_income) || 0),
        new Map(),
      ),
    [enterprisesTotalIncome],
  );

  const onDelete = useCallback(
    (enterprise_id: IEnterprise["enterprise_id"]) =>
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        return showModal(
          openDeleteModal({
            onDelete: () =>
              service
                .deleteEnterprise(enterprise_id)
                .then(() =>
                  setEnterprises((entrps) =>
                    entrps.filter((entrp) => entrp.enterprise_id !== enterprise_id),
                  ),
                ),
            entity: "enterprise",
          }),
        );
      },
    [],
  );

  const onEdit = useCallback(
    (enterprise: IEnterprise) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      const { enterprise_id, ...initialValues } = enterprise;

      return showModal(
        openEnterpriseModal({
          onSubmit: (values) =>
            service
              .editEnterprise(enterprise_id, values)
              .then(() =>
                setEnterprises((entrps) =>
                  entrps.map((entr) =>
                    entr.enterprise_id === enterprise_id ? { enterprise_id, ...values } : entr,
                  ),
                ),
              ),
          title: "Edit Enterprise",
          initialValues,
        }),
      );
    },
    [],
  );

  return (
    <>
      {enterprises.map((enterprise) => (
        <Card
          key={enterprise.enterprise_id}
          style={{ width: "80%", margin: "16px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
          sx={{
            cursor: "pointer",
            "&:hover": {
              boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            },
          }}
          onClick={() => navigate(`/enterprise/${enterprise.enterprise_id}`)}>
          <React.Fragment key={enterprise.enterprise_id}>
            <ListItem
              key={enterprise.enterprise_id}
              secondaryAction={
                <div>
                  <IconButton edge="start" aria-label="edit" onClick={onEdit(enterprise)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={onDelete(enterprise.enterprise_id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              }
              alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={enterprise.name} />
              </ListItemAvatar>
              <ListItemText
                primary={enterprise.name}
                secondary={
                  <>
                    {enterprise.details}
                    <br />
                    Phone: {enterprise.phone}
                    <br />
                    Contact: {enterprise.contact_person}
                    <br />
                    Total income: {enterprisesTotalIncomeSet.get(enterprise.enterprise_id) || 0} UAH
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        </Card>
      ))}
    </>
  );
};

export default EnterprisesList;
