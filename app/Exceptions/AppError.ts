export default class AppError{
  
  public message: string;
  public statusCode: number;
  public status: string;

  constructor(
      message: string = "Error Generico",
      statusCode: number = 500,
      status: string = "error"
    ){
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
  }
}