import React from "react";
import { useState, FormEvent } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { Enterprise, enterprisesState } from "../../state/enterprises";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EnterpriseCreateButton = () => {
  const [open, setOpen] = useState(false);
  const setEnterprises = useSetRecoilState(enterprisesState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const enterprise = {
      id: "111",
      name: data.get("name"),
      details: data.get("details"),
      phone: data.get("phone"),
      contact_person: data?.get("contact_person"),
    } as Enterprise;

    console.log("enterprise", enterprise);

    setEnterprises((previousArray) => [enterprise, ...previousArray]);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create Enterprise
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Enterprise
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Enterprise Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="details"
            label="Details"
            name="details"
          />
          <TextField margin="normal" required fullWidth id="phone" label="Phone" name="phone" />
          <TextField
            margin="normal"
            required
            fullWidth
            id="contact_person"
            label="Contact Person"
            name="contact_person"
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EnterpriseCreateButton;
