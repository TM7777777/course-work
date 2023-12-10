import React from "react";
import {
  Paper,
  Select,
  MenuItem,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { pipe, omit } from "ramda";

import { Props } from "./types";
import { IReportDTO } from "../../types/report";
import { IPerformanceIndicator } from "../../types/performanceIndicator";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxHeight: "90%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TaxForm = ({ onClose, onSubmit, performanceIndicators }: Props) => {
  const indicators = [
    { name: "Дохід", indicator: "income", indicator_id: "uniq-id", description: "Весь дохід" },
    ...performanceIndicators,
  ] as IPerformanceIndicator[];

  const formik = useFormik<IReportDTO>({
    initialValues: {
      year: 2023,
      quarter: 1,
      payer: "",
      ...indicators.reduce(
        (acc, pfInd) => ({
          ...acc,
          [pfInd.indicator]: 0,
        }),
        {},
      ),
    } as IReportDTO,
    validationSchema: Yup.object({
      year: Yup.number().required("Рік є обов’язковим"),
      quarter: Yup.number().required("Квартал є обов’язковим"),
      payer: Yup.string().required("Ім’я платника є обов’язковим"),
      ...indicators.reduce(
        (acc, pfInd) => ({
          ...acc,
          [pfInd.indicator]: Yup.number().required(`${pfInd.name} є обов’язковим`),
        }),
        {},
      ),
    }),
    onSubmit: (values) => {
      const indicatorValues = pipe(omit(["year", "quarter", "payer", "income"]), JSON.stringify);

      const report = {
        year: values.year,
        quarter: values.quarter,
        payer: values.payer,
        income: values.income,
        fin_values: indicatorValues(values),
      };

      onSubmit(report).then(onClose);
    },
  });

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style} component="form" onSubmit={formik.handleSubmit} noValidate>
        <TableContainer component={Paper}>
          <TableRow>
            <TableCell>Податковий (звітний) період:</TableCell>
            <TableCell>
              <Select
                value={formik.values.quarter}
                onChange={formik.handleChange}
                name="quarter"
                error={formik.touched.quarter && Boolean(formik.errors.quarter)}
                displayEmpty>
                <MenuItem value={1}>І квартал</MenuItem>
                <MenuItem value={2}>II квартал</MenuItem>
                <MenuItem value={3}>III квартал</MenuItem>
                <MenuItem value={4}>IV квартал</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <TextField
                type="number"
                label="Рік"
                name="year"
                value={formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Платник:</TableCell>
            <TableCell colSpan={4}>
              <TextField
                fullWidth
                label="Ім'я платника"
                name="payer"
                value={formik.values.payer}
                onChange={formik.handleChange}
                error={formik.touched.payer && Boolean(formik.errors.payer)}
                helperText={formik.touched.payer && formik.errors.payer}
              />
            </TableCell>
          </TableRow>

          {indicators.map((pfInd) => (
            <TableRow key={pfInd.indicator_id}>
              <TableCell>{`${pfInd.name}:`}</TableCell>
              <TableCell colSpan={4}>
                <TextField
                  fullWidth
                  label={pfInd.name}
                  type="number"
                  name={pfInd.indicator}
                  // @ts-ignore
                  value={formik.values[pfInd.indicator]}
                  onChange={formik.handleChange}
                  // @ts-ignore
                  error={formik.touched[pfInd.indicator] && Boolean(formik.errors[pfInd.indicator])}
                  // @ts-ignore
                  helperText={formik.touched[pfInd.indicator] && formik.errors[pfInd.indicator]}
                />
                {pfInd.description}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5}>
              <Button variant="contained" type="submit">
                Send
              </Button>
            </TableCell>
          </TableRow>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default TaxForm;