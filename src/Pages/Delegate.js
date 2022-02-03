import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

//function that defines all the steps
function getSteps() {
  return ["Personal details", "Contact Information", "Payment"];
}
//Function of the first step
const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      {/* First name input field */}
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <TextField
            id="first-name"
            className="form-control"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="narrow"
            autoComplete="false"
            required
            {...field}
          />
        )}
      />

      {/* Last name input field */}
      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            required
            {...field}
          />
        )}
      />
      {/* Organization name input field */}
      <Controller
        control={control}
        name="organizationName"
        render={({ field }) => (
          <TextField
            id="organization-name"
            label="Organization Name"
            variant="outlined"
            placeholder="Enter Organization Name"
            fullWidth
            margin="normal"
            required
            {...field}
          />
        )}
      />
      {/* Job title input field */}
      <Controller
        control={control}
        name="jobTitle"
        render={({ field }) => (
          <TextField
            id="job title"
            label="Job Title"
            variant="outlined"
            placeholder="Enter your Job Title"
            fullWidth
            margin="normal"
            required
            {...field}
          />
        )}
      />
    </>
  );
};
//Functional component of the second step
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      {/* Email address input field */}
      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            required
            {...field}
          />
        )}
      />
      {/* Phone number input field */}
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            type="number"
            placeholder="Enter Your Phone Number"
            fullWidth
            required
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
//Functional component of the third step
const PaymentForm = () => {
  const { control } = useFormContext();
  const [show, setShow] = useState(false);

  //handles state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="orderInfo">
      <h3>Order Summary</h3>
      {/* Order summary table */}
      <Table color="#c4c4c4" style={{}} responsive="lg">
        <thead>
          <tr>
            {/* Hard coded field but we shall generate from the database */}
            <th>Number of Slots</th>
            <th>&nbsp;&nbsp;</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <th>&nbsp;&nbsp;</th>
            <td>kshs 1200</td>
          </tr>
        </tbody>
      </Table>
      <h3>Mode of Payment</h3>

      {/* select mode of payment radio buttons */}
      <input type="radio" id="html" name="fav_language" value="HTML" />
      <label for="Mpesa">Mpesa</label>
      <br />
      <input type="radio" id="Mpesa" name="payment" value="Mpesa" />
      <label for="Paypal">Paypal</label>
      <br />
      <Button className="pay" onClick={handleShow}>
        Pay
      </Button>

      {/* Mpesa payment modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mpesa Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <form action="mpesa.php" method="post">
            <label>Enter Phone Number: </label>
            <input
              class="form-control"
              type="number"
              id="phone"
              placeholder="2547000000000"
              name="phone"
              required
            />
            <br />

            <label>Amount to be paid:</label>
            <input
              class="form-control"
              value="1200"
              type="text"
              name="amt"
              disabled
            />
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <input
            type="submit"
            name="submit"
            class="btn btn-pay"
            value="Pay"
            name="btnPay"
            onClick={showAlert}
          ></input>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
//Confirmation message that shows up after payment is sucessful
function showAlert() {
  Swal.fire({
    // position: 'top-end',
    icon: "success",
    title: "Payment Successful",
    showConfirmButton: false,
    timer: 1500,
  });
}

//Function for routing from one step to the next
function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      organizationName: "",
      jobTitle: "",
      emailAddress: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      country: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
    },
  });
  //React hook for managing state of the steps if whether they are active or not
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };
  //handles next btn
  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  //Handles back btn
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      {/* Manages the whole process of moving to the next pages */}
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        //outputs the final message after the whole process is complete
        <Typography align="center">
          <h2 className="registrationComplete">Registration Complete</h2>
          <br />
          <p className="deliverymessage">
            Your order number is #290549. We have emailed your order
            confirmation, and an invitation letter.
          </p>
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                style={{ marginTop: "10%" }}
                onClick={handleBack}
              >
                back
              </Button>

              <Button
                className={classes.button}
                variant="contained"
                style={{
                  marginTop: "10%",
                  color: "white",
                  backgroundColor: "#ec232a",
                }}
                // onClick={handleNext}
                type="submit"
              >
                {/* Ternary operator if the last step print finish instead of next */}
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
