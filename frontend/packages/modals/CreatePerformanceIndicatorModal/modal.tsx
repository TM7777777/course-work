import React from "react";
import { Button, Modal, Box, TextField, Typography, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UnitOfMeasurement } from "work-types/performanceIndicator";

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
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  unit_of_measurement: Yup.string().required("Unit of measurment is required"),
  importance: Yup.number().required("Importance key is required"),
});

const CreatePerformanceIndicatorModal = ({ onClose, onSubmit: onSubmitPure }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      unit_of_measurement: UnitOfMeasurement.UAH,
      importance: 1,
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
          New Performance Indicator
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Indicator name"
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
          id="description"
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Select
          fullWidth
          value={formik.values.unit_of_measurement}
          name="unit_of_measurement"
          onChange={formik.handleChange}
          error={formik.touched.unit_of_measurement && Boolean(formik.errors.unit_of_measurement)}
          displayEmpty>
          <MenuItem value={UnitOfMeasurement.UAH}>UAH</MenuItem>
          <MenuItem value={UnitOfMeasurement.USD}>USD</MenuItem>
          <MenuItem value={UnitOfMeasurement.EUR}>EUR</MenuItem>
        </Select>
        <TextField
          margin="normal"
          required
          fullWidth
          id="importance"
          label="Importance"
          name="importance"
          value={formik.values.importance}
          onChange={formik.handleChange}
          error={formik.touched.importance && Boolean(formik.errors.importance)}
          helperText={formik.touched.importance && formik.errors.importance}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePerformanceIndicatorModal;
