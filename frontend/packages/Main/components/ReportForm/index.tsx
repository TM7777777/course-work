import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";

const TaxFormComponent = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {/* Header */}
          <TableRow>
            <TableCell align="center" colSpan={5}>
              <Typography variant="h6">
                ПОДАТКОВА ДЕКЛАРАЦІЯ ПЛАТНИКА ЄДИНОГО ПОДАТКУ - ФІЗИЧНОЇ ОСОБИ - ПІДПРИЄМЦЯ
              </Typography>
            </TableCell>
          </TableRow>

          {/* Row for report period selection */}
          <TableRow>
            <TableCell>Податковий (звітний) період:</TableCell>
            <TableCell>
              <Checkbox />
              <span>І квартал</span>
            </TableCell>
            {/* ... other quarters */}
            <TableCell>
              <TextField
                type="number"
                label="Рік"
                // bind value to state and create an onChange handler
              />
            </TableCell>
          </TableRow>

          {/* ... other rows according to the form */}

          {/* Row for name and address */}
          <TableRow>
            <TableCell>Платник:</TableCell>
            <TableCell colSpan={4}>
              <TextField
                fullWidth
                label="Ім'я платника"
                // bind value to state and create an onChange handler
              />
              <TextField
                fullWidth
                label="Адреса"
                // bind value to state and create an onChange handler
              />
            </TableCell>
          </TableRow>

          {/* Submit Button */}
          <TableRow>
            <TableCell colSpan={5}>
              <Button variant="contained">Відправити</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxFormComponent;
