import * as Yup from "yup";
import ErrorMessages from "../../../config/ErrorMessages";
import checkTimeDifferenceInMinutes from "../../../utils/checkTimeDifferenceInMinutes";

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
          return [];
        }
      }).call();
    }

    const schema = Yup.object().shape({
      _idRestaurant: Yup.string().required(ErrorMessages.FIELD_REQUIRED),
      name: Yup.string()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_STRING),
      price: Yup.number()
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_NUMBER),
      categories: Yup.array()
        .of(Yup.string())
        .required(ErrorMessages.FIELD_REQUIRED)
        .typeError(ErrorMessages.TYPE_ERROR_MUST_BE_ARRAY),
      sales: Yup.array()
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
