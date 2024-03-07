"use client";
import styles from "./page.module.css";
import { Button, MenuItem, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
// import { CustomInput, CustomSelect } from "@/common/Index";
import { useForm } from "react-hook-form";
import FieldError from "../common/FieldError";
import { useEffect, useState } from "react";
import FullPackageContract from "./FullPackageContract";
import { sendContactForm } from "../app/service/mailService";
 import Navbar from "../common/Navbar";
import { CustomInput, CustomSelect } from "../common/Index";
const CONTRACT_TYPE = [
  {
    value: 1,
    label: "Full Package (Maintenance & Financials)",
  },
  {
    value: 2,
    label: "Financials Only",
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    const finalData = {
      to_name: `${data?.firstName ? data?.firstName : ""} ${
        data?.lastName ? data?.lastName : ""
      }`,
      associatesName: data?.associatesName,
      propertyName: data?.propertyName,
      to_email: data?.email,
      phone: data?.phone,
      message: "",
      subject: CONTRACT_TYPE?.find((item) => item?.value == data?.contractType)
        ?.label,
      // address: data?.mailingAddress+"," + " " + data?.propertyAddress+"," + " " + data?.city+"," + " " +  data?.state + " " + data?.zipCode,
      address: data?.mailingAddress,
      contractType: data?.contractType,
    };
    
    const response = await sendContactForm(finalData);
    console.log(response)

    if(response.success === true){
      setSubmitted(true)
      reset();
    }
  };
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            sx={{
              flexGrow: 1,
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
            }}
            container
            spacing={2}
          >
            <Grid item xs={12} md={12}>
            <Typography
          variant="h6"
          noWrap
          component="a"
          href="https://socalhoa.com/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            fontFamily: "Oswald, arial, Sans-Serif",
            fontWeight: 700,
            letterSpacing: "0",
            color: "#55a630",
            textDecoration: "none",
            fontSize: "30px",
            whiteSpace: "pre-line",
            marginBottom:"15px",
            lineHeight: "1.2",
            overflowWrap: "break-word",
          }}
        >
          SoCal Financial Services & HOA Property Management
        </Typography>
              <p className={styles.paragraph2}>GET A FREE QUOTE</p>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <CustomSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...register("contractType")}
                      defaultValue={1}
                    >
                      {CONTRACT_TYPE?.map((item, idx) => (
                        <MenuItem value={item?.value} key={idx}>
                          {item?.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      First Name<span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("firstName", { required: true })}
                      placeholder="Enter your first name"
                    />
                    {errors?.firstName && (
                      <FieldError message={"First Name is required"} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Last Name<span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("lastName", { required: true })}
                      placeholder="Enter your last name"
                    />
                    {errors?.lastName && (
                      <FieldError message={"Last Name is required"} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Associates Name<span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("associatesName", { required: true })}
                      placeholder="Associate Name"
                    />
                    {errors?.associatesName && (
                      <FieldError message={"Associates Name is required"} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Property Name<span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("propertyName")}
                      placeholder="Property Name"
                    />
                    {errors?.propertyName && (
                      <FieldError message={"Property Name is required"} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Mailing Address
                      <span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("mailingAddress", { required: true })}
                      placeholder="Mailing Address"
                    />
                    {errors?.mailingAddress && (
                      <FieldError message={"Mailing Address is required"} />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Property Address
                      <span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("propertyAddress", { required: true })}
                      placeholder="Property Address"
                    />
                    {errors?.propertyAddress && (
                      <FieldError message={"Property Address is required"} />
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} className={styles.tripleInput}>
                <Grid item xs={4}>
                  <FormControl variant="standard" fullWidth>
                    <CustomInput {...register("city")} placeholder="City" />
                    <div className={styles.labelDown}>City</div>
                    {/* {errors?.city && (
                      <FieldError message={"City is required"} />
                    )} */}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="standard" fullWidth>
                    <CustomInput
                      {...register("state")}
                      placeholder="State / Province"
                    />
                    <div className={styles.labelDown}>State / Province</div>
                    {/* {errors?.state && (
                      <FieldError message={"State is required"} />
                    )} */}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="standard" fullWidth>
                    <CustomInput
                      type="number"
                      {...register("zipCode")}
                      placeholder="Zip / Postal"
                    />
                    <div className={styles.labelDown}>Zip / Postal</div>
                    {/* {errors?.zipCode && (
                      <FieldError message={"Zip is required"} />
                    )} */}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Email<span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Email"
                    />
                    {errors?.email && (
                      <FieldError
                        message={
                          errors.type === "pattern"
                            ? errors.message
                            : "Email is required"
                        }
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Phone<span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("phone", {
                        required: true,
                        message: "phone ",
                      })}
                      type="number"
                      placeholder="Phone Number"
                    />
                    {errors?.phone && (
                      <FieldError message={"Phone Number is required"} />
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ marginTop: "15px" }}>
                <Grid item xs={12} md={12}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel shrink className={styles.inputLabel}>
                      Number of units in your building
                      <span className={styles.starLabel}>*</span>
                    </InputLabel>
                    <CustomInput
                      {...register("noOfUnits", { required: true })}
                      type="number"
                      placeholder="No of units"
                    />
                    {errors?.noOfUnits && (
                      <FieldError message={"Number of Units is required"} />
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <p className={styles.paragraph1}>
                By submitting this request, you are agreeing for us to reach out
                to engage with you regarding your HOA proposal request.
              </p>

              <Button
                type="submit"
                variant="contained"
                className={styles.buttonSubmit}
              >
                Submit
              </Button>
              <p className={styles.paragraph1}>
              {submitted && 
              "Your request has been submitted successfully."
            }
              </p>
              <Grid container xs={12} md={12}>
              <Grid item xs={12} md={6}>
              <h6 className={styles.paragraph1}> 
                    SOCAL FINANCIAL SERVICES
                  </h6>
                  <br />
                  <p className={styles.paragraph1}>Encino Financial Center</p>
                  <p className={styles.paragraph1}> 16133 Ventura Blvd., 7th Floor, Encino, CA 91202</p>
                  <p className={styles.paragraph1}> Santa Monica Location</p>
                  <p className={styles.paragraph1}> 100 Wilshire Blvd., Suite 700, Santa Monica, CA 90401</p>
                  <p className={styles.paragraph1}> 547 South St Unit 4 Glendale CA 91202</p>
                  <a className={styles.paragraph1}>(818) 900-4041</a>
                </Grid>
                <Grid item xs={12} md={6}>
                <h6>
                    HOURS
                  </h6>
                  <br/>
                  <p className={styles.paragraph1}>
Mon 09:00 am – 05:00 pm<br/>
Tue 09:00 am – 05:00 pm<br/>
Wed 09:00 am – 05:00 pm<br/>
Thu 09:00 am – 05:00 pm<br/>
Fri 09:00 am – 05:00 pm<br/>
Sat Closed<br/>
Sun Closed</p>
                  <p className={styles.paragraph1}> Monday - Friday: 9am - 5pm<br/>

Saturday: Closed<br/>

Sunday: Closed</p>
                </Grid>
                </Grid>

            </Grid>
          </Grid>

        </form>
      </main>
      <Grid container xs={12} md={12}  sx={{ backgroundColor: "#69cd3c", padding: 6, }}>
  <Grid item xs={12} md={6}>
    <p>Copyright © 2024 SoCal Financial Services - All Rights Reserved.</p>
  </Grid>
  <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "right" } }}>
  <p>Website Created By <a href="https://www.citrusappslab.com" target="_blank"> Citrus Apps Lab</a></p>
</Grid>

</Grid>
    </>
  );
}
