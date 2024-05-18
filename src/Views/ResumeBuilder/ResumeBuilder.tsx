import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/utils/Input/Input";
import styles from "./ResumeBuilder.module.scss";
import { AppContextType, Context } from "../../AppContext";
import Select from "../../components/utils/Select/Select";
import Textarea from "../../components/utils/Textarea/Textarea";
import { useNavigate } from "react-router-dom";

const validation = {
  required: "This field is required.",
};

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const { createResume } = React.useContext(Context) as AppContextType;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ResumeForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  function submit(data: ResumeForm) {
    const resume = createResume(data);

    navigate("/resume/" + resume.id);
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Create your Resume</h1>
      <p className={styles.legend}>fields without ( * ) are optional.</p>

      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: validation.required }}
          render={({ field }) => (
            <Input
              label="First Name*"
              placeholder="First Name"
              error={errors.firstName?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{ required: validation.required }}
          render={({ field }) => (
            <Input
              label="Last Name*"
              placeholder="Last Name"
              error={errors.lastName?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: validation.required,
            pattern: { value: /\S+@\S+\.\S+/, message: "Must be an email" },
          }}
          render={({ field }) => (
            <Input
              label="email*"
              placeholder="email@domain"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="birthdate"
          control={control}
          rules={{
            required: validation.required,
          }}
          render={({ field }) => (
            <Input
              label="Birthdate*"
              type="date"
              error={errors.birthdate?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="cpf"
          control={control}
          rules={{
            required: validation.required,
            minLength: { value: 9, message: "Must be fullfiled" },
          }}
          render={({ field }) => (
            <Input
              label="CPF*"
              placeholder="CPF"
              mask={"000.000.000-00"}
              error={errors.cpf?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={{
            required: validation.required,
            minLength: { value: 11, message: "Must be fullfiled" },
          }}
          render={({ field }) => (
            <Input
              label="phone*"
              placeholder="phone"
              type="tel"
              mask={"(00) 00000-0000"}
              error={errors.phone?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              label="Gender"
              defaultOption={{ value: "Select your Gender", disabled: false }}
              options={[
                { value: "Male" },
                { value: "Female" },
                { value: "other" },
              ]}
              error={errors.gender?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="experience"
          control={control}
          rules={{ required: validation.required }}
          render={({ field }) => (
            <Textarea
              label="Experience*"
              placeholder="Experiences"
              error={errors.experience?.message}
              {...field}
            ></Textarea>
          )}
        />

        <button className={styles.button} disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}
