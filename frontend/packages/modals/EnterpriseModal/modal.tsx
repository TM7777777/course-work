import React from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Props } from "./types";

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

const validationSchema = Yup.object({
  name: Yup.string().required("Назва обов’язкова"),
  details: Yup.string().required("Деталі обов’язкові"),
  phone: Yup.string()
    .required("Телефон обов’язковий")
    .matches(/^[0-9]+$/, "Номер телефону має містити лише цифри"),
  contact_person: Yup.string().required("Контактна особа обов’язкова"),
});

const CreateEnterprise = ({ onClose, onSubmit: onSubmitPure, title, initialValues }: Props) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      details: "",
      phone: "",
      contact_person: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmitPure(values).then(() => onClose());
    },
  });

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style} component="form" onSubmit={formik.handleSubmit} noValidate>
        <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
          {title}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Enterprise Name"
          name="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="details"
          label="Details"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          error={formik.touched.details && Boolean(formik.errors.details)}
          helperText={formik.touched.details && formik.errors.details}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="contact_person"
          label="Contact Person"
          name="contact_person"
          value={formik.values.contact_person}
          onChange={formik.handleChange}
          error={formik.touched.contact_person && Boolean(formik.errors.contact_person)}
          helperText={formik.touched.contact_person && formik.errors.contact_person}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateEnterprise;
