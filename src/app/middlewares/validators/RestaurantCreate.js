import * as Yup from "yup";
import ErrorMessages from "../../../config/ErrorMessages";
import fs from "fs";
import checkTimeDifferenceInMinutes from "../../../utils/checkTimeDifferenceInMinutes";

export default async (req, res, next) => {
  try {
    if (req.file) {
      req.body.dirPhoto = req.file.path;
    }

    if (req.body.openingHours && typeof req.body.openingHours === "string") {
      req.body.openingHours = (() => {
        try {
          return JSON.parse(req.body.openingHours);
        } catch {
          return [];
        }
      }).call();
    }

    const schema = Yup.object().shape({
      name: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressStreet: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressNumber: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressDistrict: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressCity: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressState: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressCountry: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressZipCode: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      adressObs: Yup.string().typeError(
        ErrorMessages.TYPE_ERROR_MUST_BE_STRING
      ),
      openingHours: Yup.array()
        .of(
          Yup.object({
            weekday: Yup.string()
              .required(ErrorMessages.FIELD_REQUIRED)
              .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
            schedule: Yup.object({
              start: Yup.string()
                .required(ErrorMessages.FIELD_REQUIRED)
                .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING)
                .matches(
                  /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                  ErrorMessages.FORMAT_ERROR_TIME
                ),
              end: Yup.string()
                .required(ErrorMessages.FIELD_REQUIRED)
                .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING)
                .matches(
                  /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                  ErrorMessages.FORMAT_ERROR_TIME
                ),
            })
              .required(ErrorMessages.FIELD_REQUIRED)
              .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_OBJECT)
              .test(
                "TIME_DIFFERENCE",
                ErrorMessages.TIME_DIFFERENCE_MIN,
                checkTimeDifferenceInMinutes
              ),
          })
        )
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_ARRAY),
      dirPhoto: Yup.string().typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const errorsFormatted = error.inner
      ? error.inner.map((e) => ({
          key: e.path,
          errors: e.errors,
        }))
      : [error.message];

    req.file && fs.unlinkSync(req.file.path);

    return res.status(400).json({
      error: `Falha na validação dos parâmetros`,
      errors: errorsFormatted,
    });
  }
};
