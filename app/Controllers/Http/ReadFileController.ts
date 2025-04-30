import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ReadFileService from 'App/Services/ReadFileService';
import OrquestradorDeError from 'App/Exceptions/OrquestradorDeError';
import fs from 'fs';

export default class ReadFileController {
  public service: ReadFileService;
  public orquestradorDeError: OrquestradorDeError;
  
  constructor(){
    this.service = new ReadFileService();
    this.orquestradorDeError = new OrquestradorDeError();
  }

  public async import({ request, response }: HttpContextContract){
    try{
      const file = request.file('file');

      if(file && file.tmpPath){
        const buffer = fs.readFileSync(file.tmpPath);
        this.service.readImportFile(buffer, file.clientName);
  
        fs.unlinkSync(file.tmpPath);
      }

      // console.log('file', file);
      
      return;
    } catch(error: any){
      this.orquestradorDeError.handle(response, error);
    }
  }

}
