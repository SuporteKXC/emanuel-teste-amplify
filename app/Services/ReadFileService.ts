import Xlsx from "xlsx";
import rfc2047 from "rfc2047";
import { addRequired, renameKeyColumn, keyColumnDefault, searchImportType, bodyMultiplayer } from "App/Utils/SearchImportType";
import { IdataAttachments, IImportTypeRequired, IreadFileDeParam } from "App/Interfaces/ImportType";
import ImportTypeService from "App/Services/ImportTypeService";
import DtoImportService from "./DtoImportService";
import ClientRules from "App/ClientRules";


export default class ReadFileService {

  public importTypeService: ImportTypeService;
  public dtoImportService: DtoImportService;
  public clientRules: ClientRules;

  constructor(){
    this.importTypeService = new ImportTypeService();
    this.dtoImportService = new DtoImportService();
    this.clientRules = new ClientRules();
  }


  public async readImportFile(data: Buffer, name: string) {

    const importTypeAll = await this.importTypeService.import();
    const importTypeAllJson = JSON.parse(JSON.stringify(importTypeAll));
    addRequired(importTypeAllJson);

    const dataJson = {
      filename: name,
      data: data
    }

    const result = await this.readXlsx(dataJson, importTypeAllJson);

    // console.log('result', result);

    for(let data of result){
      const isUpdateOnly = this.clientRules.isOnlyUpdate(data.importType);

      // console.log("isUpdateOnly", isUpdateOnly);

      if(isUpdateOnly){
        await this.dtoImportService.importUpdateOnly(data);
      } else{
        await this.dtoImportService.import(data);
      }
    }

    return result;
  }


  public async readXlsx(data: IdataAttachments, importType: IImportTypeRequired[]): Promise<IreadFileDeParam[]>{

    let workbook = Xlsx.read(data.data, {
      type: 'buffer',
      cellDates: true,
    });

    let arrayFinal: IreadFileDeParam[] = [];

    // testar remover esse promise, pois não tem nenhum await dentro do async map
    // remover esse map async, deixando apenas o forEach sem o async
    // await Promise.all(
      workbook.SheetNames.forEach((item: any) => {
        const workSheet = workbook.Sheets[item];

        let body = Xlsx.utils.sheet_to_json(workSheet, {
          header: 0,
        });

        const name = rfc2047.decode(data.filename);

        const nameSplit = name.split('.');
        nameSplit.pop();
        const nameWithoutExtension = nameSplit.join(".");

        const nameSheet = nameWithoutExtension + "-" + item;

        // body.forEach((bodyObject: object) =>{
        //   Object.keys(bodyObject).forEach((key) => {
        //     const newKey = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        //     if(newKey != key){
        //       bodyObject[newKey] = bodyObject[key];
        //       delete bodyObject[key];
        //     }
        //   });
        // });

        if(body.length > 0){
          const result = searchImportType(importType, workSheet, nameSheet);

          if(result?.id){

            const bodyNew = Xlsx.utils.sheet_to_json(workSheet, {
              range: result.skip_rows,
              header: 0,
            });

            const bodyMultiplayed = bodyMultiplayer(result, bodyNew);

            renameKeyColumn(result, bodyMultiplayed);

            keyColumnDefault(result, bodyMultiplayed);

            arrayFinal.push({
              name: nameSheet,
              importType: result,
              body: bodyMultiplayed
            })

          }

        }
      })
    // )

    return arrayFinal;

  }

}
