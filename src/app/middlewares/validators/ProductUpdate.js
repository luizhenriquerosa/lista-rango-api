import * as Yup from "yup";
import ErrorMessages from "../../../config/ErrorMessages";
import validMinTimeDifference from "../../../utils/validMinTimeDifference";
import fs from "fs";

export default async (req, res, next) => {
  try {
    if (req.file) {
      req.body.dirPhoto = req.file.path;
    }

    if (req.body.sales && typeof req.body.sales === "string") {
      req.body.sales = (() => {
        try {
          return JSON.parse(req.body.sales);
        } catch {
          return [{ formatInvalid: "" }];
        }
      }).call();
    }

    if (req.body.categories && typeof req.body.categories === "string") {
      req.body.categories = (() => {
        try {
          return JSON.parse(req.body.categories).map((c) =>
            c.length > 1
              ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()
              : c
          );
        } catch {
          return null;
        }
      }).call();
    }

    const schema = Yup.object().shape({
      name: Yup.string().typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      price: Yup.number().typeError(ErrorMessages.TYPE_ERROR_MUST_BE_NUMBER),
      categories: Yup.array()
        .of(Yup.string())
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_ARRAY),
      sales: Yup.array()
        .of(
          Yup.object({
            weekday: Yup.string()
              .required(ErrorMessages.FIELD_REQUIRED)
              .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING)
              .matches(
                /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/,
                ErrorMessages.FORMAT_ERROR_WEEKDAY
              ),
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
                validMinTimeDifference
              ),
            price: Yup.number()
              .required(ErrorMessages.FIELD_REQUIRED)
              .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_NUMBER),
            description: Yup.string()
              .required(ErrorMessages.FIELD_REQUIRED)
              .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
          })
        )
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
