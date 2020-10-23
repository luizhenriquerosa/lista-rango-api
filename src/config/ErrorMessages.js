import "dotenv/config";
class ErrorMessages {
  TYPE_ERROR_MUST_BE_STRING = "Tipo inválido, precisa ser uma string";
  TYPE_ERROR_MUST_BE_NUMBER = "Tipo inválido, precisa ser um integer ou float";
  TYPE_ERROR_MUST_BE_ARRAY = "Tipo inválido, precisa ser um array";
  TYPE_ERROR_MUST_BE_OBJECT = "Tipo inválido, precisa ser um objeto";
  FIELD_REQUIRED = "Campo obrigatório";
  FORMAT_ERROR_TIME = "Formato do horário precisa ser HH:MM";
  FORMAT_ERROR_WEEKDAY =
    "Dia da semana precisa ser em inglês, ex: Saturday, Friday";
  TIME_DIFFERENCE_MIN = `Os horários precisam ter ao menos ${process.env.MIN_TIME_DIFFERENCE_MINUTES} minutos de diferença`;
}

export default new ErrorMessages();
