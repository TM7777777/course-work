import React, { useCallback } from "react";
import { Card, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useImRecoilState } from "../../../../../common/hooks/useImRecoilState";

import { useShowModal } from "../../../../../modals";
import { openDeleteModal } from "../../../../../modals/DeleteModal";

import { usersState } from "../../../../state/users";
import { IUser } from "../../../../../types/user";
import service from "../../../../../service";

const UsersList = () => {
  const [users, setUsers] = useImRecoilState(usersState);
  const showModal = useShowModal();

  const onDelete = useCallback(
    (userId: IUser["user_id"]) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      return showModal(
        openDeleteModal({
          onDelete: () =>
            service
              .deleteUser(userId)
              .then(() => setUsers((users) => users.filter((user) => user.user_id !== userId))),
          entity: "user",
        }),
      );
    },
    [],
  );

  return (
    <>
      {users.map((user) => (
        <Card
          key={user.user_id}
          style={{ width: "80%", margin: "16px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
          <React.Fragment key={user.user_id}>
            <ListItem
              key={user.user_id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={onDelete(user.user_id)}>
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemAvatar>
                <Avatar alt={user.email} />
              </ListItemAvatar>
              <div>
                <ListItemText primary={`Email: ${user.email}`} secondary={`Role: ${user.role}`} />
                <ListItemText secondary={`Created at: ${user.created_at}`} />
              </div>
            </ListItem>
          </React.Fragment>
        </Card>
      ))}
    </>
  );
};

export default UsersList;
