import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { enterprisesState } from "../../state/enterprises";
import { useShowModal } from "../../../modals";
import { openDeleteEnterprise } from "../../../modals/DeleteEnterpriseModal";
import { useImRecoilState } from "../../../common/hooks/useImRecoilState";

const EnterprisesList = () => {
  const [enterprises, setEnterprises] = useImRecoilState(enterprisesState);
  const showModal = useShowModal();

  const navigate = useNavigate();

  return (
    <>
      {enterprises.map((enterprise) => (
        <Card
          key={enterprise.id}
          style={{ width: "80%", margin: "16px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
          sx={{
            cursor: "pointer",
            "&:hover": {
              boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            },
          }}
          onClick={() => navigate(`/enterprise/${enterprise.id}`)}>
          <React.Fragment key={enterprise.id}>
            <ListItem
              key={enterprise.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() =>
                    showModal(
                      openDeleteEnterprise({
                        onDelete: () =>
                          setEnterprises((entrps) =>
                            entrps.filter((entrp) => entrp.id !== enterprise.id),
                          ),
                      }),
                    )
                  }>
                  <DeleteIcon />
                </IconButton>
              }
              alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Enterprise Image" src="/static/images/avatar/1.jpg" />
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

{
  /* <React.Fragment key={enterprise.id}>
<ListItem alignItems="flex-start">
  <ListItemAvatar>
    <Avatar alt="Enterprise Image" src="/static/images/avatar/1.jpg" />
  </ListItemAvatar>
  <ListItemText
    primary={enterprise.name}
    secondary={`
      ${enterprise.details}
      Phone: ${enterprise.phone}
      Contact: ${enterprise.contact_person}
    `}
  />
</ListItem>
{index < enterprises.length - 1 && <Divider variant="inset" component="li" />}
</React.Fragment> */
}
