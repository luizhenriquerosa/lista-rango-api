import * as Yup from "yup";

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
        .required("Name obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressStreet: Yup.string()
        .required("adressStreet obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressNumber: Yup.string()
        .required("adressNumber obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressDistrict: Yup.string()
        .required("adressDistrict obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressCity: Yup.string()
        .required("adressCity obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressState: Yup.string()
        .required("adressState obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressCountry: Yup.string()
        .required("adressCountry obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressZipCode: Yup.string()
        .required("adressZipCode obrigatório")
        .typeError("Tipo inválido, envie uma string"),
      adressObs: Yup.string().typeError("Precisa ser uma string"),
      openingHours: Yup.array()
        .required("openingHours obrigatório")
        .typeError("Tipo inválido, envie um array"),
      dirPhoto: Yup.string().required("photo obrigatório"),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const errorsFormatted = error.inner.map((e) => ({
      key: e.path,
      errors: e.errors,
    }));

    return res.status(400).json({
      error: `Falha na validação dos parâmetros`,
      errors: errorsFormatted,
    });
  }
};
