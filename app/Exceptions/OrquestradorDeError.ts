import AppError from "App/Exceptions/AppError";

export default class OrquestradorDeError{
  
  public handle(response: any, error: any){
    if(error instanceof AppError){
      response.status(error.statusCode).send({status: error.status, message: error.message});
    } else {
      console.error("Error Orquestrador Message", error);
      response.status(500).send({status: "error", message: "Error Generico"});
    }
  }
}