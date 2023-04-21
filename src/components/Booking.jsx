import React, { useState } from 'react';
import { Button, TextField, Stepper, Step, StepLabel, StepContent } from '@mui/material';

function Booking() {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFatherNameChange = (event) => {
    setFatherName(event.target.value);
  };

  const steps = ['Enter your name', "Enter your father's name"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
        );
      case 1:
        return (
          <TextField
            label="Father's Name"
            variant="outlined"
            value={fatherName}
            onChange={handleFatherNameChange}
          />
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>{getStepContent(index)}</StepContent>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep !== 0 && (
          <Button onClick={handleBack}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={activeStep === steps.length - 1 ? handleNext : handleNext}
        >
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

export default Booking;
