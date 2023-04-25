import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {
  TextField,
  Button,
  Stack,
  Box,
  FormLabel,
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
import { API_BASE_URL } from "../setting";
import Lottie from "lottie-react";
import Success from '../animations/Success.json';
const validationSchema = Yup.object({
  firstName: Yup.string().required("FirstName is Required"),
  lastName: Yup.string().required("LastName is Required"),
  numberOfWheels: Yup.string().required("No. of Wheels is Required"),
  vehicleType: Yup.string().required("Vehicle Type is Required"),
  vehicleModel: Yup.string().required("Vehicle Model is Required"),
  startDate: Yup.date().required("Start Date is Required"),
  endDate: Yup.date().required("End Date is Required"),
});


const Booking = () => {
  const [step, setStep] = useState(0);
  const [carType, setCarType] = useState()
  const [bikeType, setBikeType] = useState()
  const [bikeModel, setBikeModel] = useState()
  const [carModel, setCarModel] = useState()
  const [loading, setLoading] = useState(false)

  const getCars = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/vehicle-type/carTypes`);
      setCarType(res.data);
    } catch (e) {
      console.error(e)
    }
  }

  const getBikes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/vehicle-type/bikeTypes`);
      setBikeType(res.data);
    } catch (e) {
      console.error(e)
    }
  }
  const getBikModels = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/vehicl-model/cars`);
      setBikeModel(res.data);
    } catch (e) {
      console.error(e)
    }
  }
  const getCarModels = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/vehicl-model/bikes`);
      setCarModel(res.data);
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getBikModels();
    getCarModels();
    getCars();
    getBikes();
  }, [])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      numberOfWheels: '',
      vehicleType: "",
      vehicleModel: "",
      startDate: "",
      endDate: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const apiRes = await axios.post(`${API_BASE_URL}/bookings`,
          {
            firstName: values.firstName,
            lastName: values.lastName,
            numberOfWheels: values.numberOfWheels,
            vehicleType: values.vehicleType,
            vehicleModel: values.vehicleModel,
            startDate: new Date(values.startDate).toISOString(),
            endDate: new Date(values.endDate).toISOString(),
          });
        if (apiRes.status === 201) {
          setLoading(true);
        } else {
          setLoading(false);
          alert(apiRes?.data?.message)
        }
      } catch (err) {
        setLoading(false);
        alert('Something went wrong!, Please try again.')
      }
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
                sx={{ width: '100%' }}
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.firstName}</p>}

            </Box>
            <Box>
              <TextField
                sx={{ width: '100%' }}
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                  {formik.values.numberOfWheels === "2" ? (
                    <>
                      <FormLabel id="demo-radio-buttons-group-label">Bikes</FormLabel>
                      <RadioGroup
                        aria-label="vehicleType"
                        name="vehicleType"
                        value={formik.values.vehicleType}
                        onChange={formik.handleChange}
                      >
                        {bikeType?.map((type) => (
                          <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                        ))}
                      </RadioGroup>
                    </>
                  ) : (
                    <>
                      <FormLabel id="demo-radio-buttons-group-label">Cars</FormLabel>
                      <RadioGroup
                        aria-label="vehicleType"
                        name="vehicleType"
                        value={formik.values.vehicleType}
                        onChange={formik.handleChange}
                      >
                        {carType?.map((type) => (
                          <FormControlLabel key={type} value={type} control={<Radio />} label={type} />
                        ))}
                      </RadioGroup>
                    </>
                  )}
                </FormControl>
                {formik.touched.vehicleType && formik.errors.vehicleType && (
                  <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.vehicleType}</p>
                )}
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
                {formik.values.numberOfWheels === "2" ? (
                  <>
                    <FormLabel id="demo-radio-buttons-group-label">Bikes</FormLabel>
                    <RadioGroup
                      aria-label="vehicleModel"
                      name="vehicleModel"
                      value={formik.values.vehicleModel}
                      onChange={formik.handleChange}
                    >
                      {bikeModel?.vehicleModels?.map((item) => (
                        <FormControlLabel key={item.modelName} value={item.modelName} control={<Radio />} label={item.modelName} />
                      ))}
                    </RadioGroup>
                  </>
                ) : (
                  <>
                    <FormLabel id="demo-radio-buttons-group-label">Cars</FormLabel>
                    <RadioGroup
                      aria-label="vehicleType"
                      name="vehicleModel"
                      value={formik.values.vehicleModel}
                      onChange={formik.handleChange}
                    >
                      {carModel?.vehicleModels?.map((item) => (
                        <FormControlLabel key={item.modelName} value={item.modelName} control={<Radio />} label={item.modelName} />
                      ))}
                    </RadioGroup>
                  </>
                )}
              </FormControl>
              {formik.touched.vehicleModel && formik.errors.vehicleModel && <p style={{ color: 'red', marginTop: '5px', marginBottom: '-15px' }}>{formik.errors.vehicleModel}</p>}
            </Box>
          </>
        )
      }
      {
        step === 4 && (
          loading ? (
            <Box sx={{ bgcolor: 'white', mt: 3, textAlign: 'center' }}>
              <Lottie style={{ height: '300px' }} loop animationData={Success} />
              <Typography variant="h3">
                Booking Received
              </Typography>
            </Box>

          ) :
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Pick a date range?
              </Typography>

              <Stack direction={'row'} sx={{ width: "100%" }} spacing={2} alignItems="center">
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
                <Typography>To</Typography>
                <Box
                  sx={{
                    width: '100%',
                  }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DesktopDatePicker
                      label="End Date"
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

export default Booking;
