import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const validationSchema = Yup.object({
  firstName: Yup.string().required("FirstName is Required"),
  lastName: Yup.string().required("LastName is Required"),
  numberOfWheels: Yup.string().required("No. of Wheels is Required"),
  vehicleType: Yup.date().required("Vehicle Type is Required"),
  vehicleModel: Yup.date().required("Vehicle Model is Required"),
  startDate: Yup.date().required("Start Date is Required"),
  endDate: Yup.date().required("End Date is Required"),
});

const MyForm = () => {
  const [step, setStep] = useState(0);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      numberOfWheels: '',
      vehicleType: "",
      vehicleModel: "",
      startDate: "",
      endDate: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleNext = () => {
    const errors = formik.errors;
    const touched = formik.touched;
    let hasError = false;
    if (step === 0) {
      if (!formik.values.firstName || (touched.firstName && errors.firstName)) {
        formik.setFieldTouched("firstName", true);
        hasError = true;
      }
      if (!formik.values.lastName || (touched.lastName && errors.lastName)) {
        formik.setFieldTouched("lastName", true);
        hasError = true;
      }
    } else if (step === 1) {
      if (!formik.values.numberOfWheels || (touched.numberOfWheels && errors.numberOfWheels)) {
        formik.setFieldTouched("numberOfWheels", true);
        hasError = true;
      }
    } else if (step === 2) {
      if (!formik.values.vehicleType || (touched.vehicleType && errors.vehicleType)) {
        formik.setFieldTouched("vehicleType", true);
        hasError = true;
      }
    } else if (step === 3) {
      if (!formik.values.vehicleModel || (touched.vehicleModel && errors.vehicleModel)) {
        formik.setFieldTouched("vehicleModel", true);
        hasError = true;
      }
    } else if (step === 4) {
      if (!formik.values.startDate || (touched.startDate && errors.startDate)) {
        formik.setFieldTouched("startDate", true);
        hasError = true;
      }
      if (!formik.values.endDate || (touched.endDate && errors.endDate)) {
        formik.setFieldTouched("endDate", true);
        hasError = true;
      }
    }
    if (!hasError) {
      setStep((prevStep) => prevStep + 1);
    }
  };


  return (
    <Box p={5} sx={{ maxWidth: 500, mx: "auto", boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.2)' }}>
      {step === 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            What's your name?
          </Typography>

          < Stack direction={'column'} spacing={2}>
            <Box>
              <TextField
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              />
              {formik.touched.firstName && formik.errors.firstName && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.firstName}</p>}

            </Box>
            <Box>
              <TextField
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.lastName}</p>}
            </Box>

          </Stack>
        </>
      )
      }
      {
        step === 1 && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              No. of wheels?
            </Typography>

            <Stack direction={'column'} spacing={2}>
              <Box>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="No. of wheels"
                    name="numberOfWheels"
                    value={formik.values.numberOfWheels}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="2" control={<Radio />} label="2 wheels" />
                    <FormControlLabel value="4" control={<Radio />} label="4 wheels" />
                  </RadioGroup>
                </FormControl>
                {formik.touched.numberOfWheels && formik.errors.numberOfWheels && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.numberOfWheels}</p>}
              </Box>
            </Stack>
          </>
        )

      }
      {
        step === 2 && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Type of vehicle?
            </Typography>

            <Stack direction={'column'} spacing={2}>
              <Box>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="vehicleType"
                    name="vehicleType"
                    value={formik.values.vehicleType}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="cars" control={<Radio />} label="Cars" />
                    <FormControlLabel value="Bikes" control={<Radio />} label="Bikes" />
                  </RadioGroup>
                </FormControl>
                {formik.touched.vehicleType && formik.errors.vehicleType && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.vehicleType}</p>}
              </Box>
            </Stack>
          </>
        )
      }
      {
        step === 3 && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Choose specific model?
            </Typography>

            <Box>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="vehicleModel"
                  name="vehicleModel"
                  value={formik.values.vehicleModel}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel value="Maruti suzuki swift" control={<Radio />} label="Maruti suzuki swift" />
                  <FormControlLabel value="Honda xblade" control={<Radio />} label="Honda xblade" />
                </RadioGroup>
              </FormControl>
              {formik.touched.vehicleModel && formik.errors.vehicleModel && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.vehicleModel}</p>}
            </Box>
          </>
        )
      }
      {
        step === 4 && (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Pick a date range?
            </Typography>

            <Stack direction={'column'} spacing={2}>
              <Box
                sx={{
                  width: '100%',
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="DD/MM/YYYY"
                    value={formik.values?.startDate}
                    onChange={(newValue) => {
                      formik.setFieldValue(
                        "startDate",
                        newValue
                      );
                      formik.setFieldTouched("startDate", true);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          width: "100%"
                        }}
                        {...params}
                        name="startDate"
                        onBlur={formik.handleBlur}
                        error={formik.errors.startDate && formik.touched.startDate}
                      />
                    )}
                  />

                </LocalizationProvider>
                {formik.touched.startDate && formik.errors.startDate && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.startDate}</p>}
              </Box>
              <Box
                sx={{
                  width: '100%',
                }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DesktopDatePicker
                    label="End Date(Expected)"
                    inputFormat="DD/MM/YYYY"
                    value={formik.values?.endDate}
                    onChange={(newValue) => {
                      formik.setFieldValue(
                        "endDate",
                        newValue
                      );
                      formik.setFieldTouched("endDate", true);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          width: "100%"
                        }}
                        {...params}
                        name="endDate"
                        onBlur={formik.handleBlur}
                        error={formik.errors.endDate && formik.touched.endDate}
                      />
                    )}
                  />

                </LocalizationProvider>
                {formik.touched.endDate && formik.errors.endDate && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.endDate}</p>}
              </Box>
            </Stack>
          </>
        )
      }
      <Box width={'100%'} sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
        {step === 4 ?
          <Button width={'100%'} variant="contained" onClick={formik.handleSubmit}>
            Submit
          </Button> :
          <Button width={'100%'} variant="contained" onClick={handleNext}>
            Next
          </Button>
        }
      </Box>
    </Box >
  );
}


export default MyForm
