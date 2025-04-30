import { IImportFromTo } from "App/Interfaces/ImportFromTo";
import { IImportType } from "App/Interfaces/ImportType";
import ImportFromTo from "App/Models/ImportFromTo";
import { parse } from "date-fns";
import { DateTime } from "luxon";
import Xlsx from "xlsx";

export function searchImportType(data: any[], workSheet: any, nameSheet: string): IImportType{

  let importInfo = {};

    data.forEach((table: any) => {

      let identifiers: any;
      let notFoundName: boolean = false;


      if(table.identifier){
        identifiers = table.identifier.split(";");
        
        identifiers.forEach((item: string) => {
          if(!nameSheet?.toUpperCase().includes(item.toUpperCase())){
            notFoundName = true;
          }
          // console.log("notFoundName", notFoundName, nameSheet?.toUpperCase(), item.toUpperCase());
        });
      }

      let notFound: boolean = false;
      
      if(notFoundName){
        return;
      }

      let body: any[] = Xlsx.utils.sheet_to_json(workSheet, {
        range: table.skip_rows,
        header: 1,
      });

      const element = body[0];

      // console.log("element", element);

      table.arrayRequired.forEach((item: any) => {
        if(!element?.includes(item)){
          notFound = true;
        }
        // console.log("notFound", notFound, item);
      });

      table.import_date = new Date();

      if(!notFound){
        importInfo = table;
      }
    });

  return importInfo;
}

export function addRequired(data: any){
  data.forEach((element: any) => {
    let arrayColumnRequired: any[] = [];

    element.import_from_to.forEach((item: IImportFromTo) => {
      if(item.required == true){
        arrayColumnRequired.push(item.worksheet_column)
      }
    });

    element.arrayRequired = arrayColumnRequired;
    })
}

export function bodyMultiplayer(data: any, body: any){

  let newBody: any[] = [];
  
  body.forEach((obj: any) => {
    let multiplierFound = false;
    Object.keys(obj).forEach((element) => {
    
      data.import_from_to.forEach((item: ImportFromTo) => {
        if(item.worksheet_column == element && item.split_multiplier){
          multiplierFound = true;
          const regexp = new RegExp(item.split_multiplier, "g");
          const uniqueValues = [...new Set(String(obj[element]).match(regexp))];
          if(uniqueValues.length == 0){
            uniqueValues.push(String(obj[element]));
          }
          uniqueValues?.forEach((value: string) => newBody.push({ ...obj, [element]: value.trim()}));

          // console.log("Teste Push", obj.Order_Reference, uniqueValues, newBody.length)
        }
      })
    })
    
    if(!multiplierFound){
      newBody.push({...obj});
    }
  })

  return newBody;
}


export function renameKeyColumn(data: any, body: any){
  body.forEach((obj: any) => {
    Object.keys(obj).forEach((element) => {
      
      let newKey: string;
      
      data.import_from_to.forEach((item: ImportFromTo) => {
        if(item.worksheet_column == element){
          newKey = item.db_column_name.name;
          obj[element] = obj[element] && obj[element] !== "" ? obj[element] : null;
          obj[newKey] = obj[element];

          if(obj[newKey] == null){
            return;
          }

          if(item.match_substring){
            const regexp = new RegExp(item.match_substring, "g");
            const objElement = String(obj[element]).match(regexp);
            obj[newKey] = objElement ? objElement[0] : null;
          }

          if(item.replacer){
            try{
              let partString = String(obj[element]);
              const replaceArray = JSON.parse(item.replacer);

              replaceArray?.forEach((element) => {
                const replacerFull = String(element).split(",");
                const stringReplace = replacerFull.length ? replacerFull.pop() : "";
                const stringReplaceFinal = stringReplace ? stringReplace : "";
                const replaceRegexp = replacerFull.join("");
                const regexp = new RegExp(replaceRegexp, "gi");
                partString = partString.replace(regexp, stringReplaceFinal);
              });
              obj[newKey] = partString;

            } catch(err){
              console.log("Replacer", err);
            }
          }

          if(item.type == "date-string"){
            let dateFirst: any;
            try{
              dateFirst = obj[element]?.split("|")[0]?.trim();
              if(dateFirst){
                obj[newKey] = DateTime.fromJSDate(parse(dateFirst, item.format, new Date())).toISODate();
              } else {
                obj[newKey] = undefined;
              }
            } catch(err) {
              dateFirst = obj[element];
              obj[newKey] = DateTime.fromJSDate(dateFirst).toISODate();
            }

          }
          else if(item.type == "date-field"){
            
          }
        }
      });
  
      delete obj[element];
    })
  })
}

export function keyColumnDefault(data: any, body: any){
  body.forEach((obj: any) => {
    data.import_from_to.forEach((item: ImportFromTo) => {
      if(item.default && !obj.hasOwnProperty(item.db_column_name.name)){
        obj[item.db_column_name.name] = item.default;
      }
    })
  })
}