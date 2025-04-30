import imaps from "imap-simple";
import Env from "@ioc:Adonis/Core/Env";

import ImportTypeService from "App/Services/ImportTypeService";
import { addRequired } from "App/Utils/SearchImportType";
import ReadFileService from "App/Services/ReadFileService";
import DtoImportService from "App/Services/DtoImportService";
import ClientRules from "App/ClientRules";


export default class GetFileEmailJob {
  public config: any;
  public importTypeService: ImportTypeService;
  public readFileService: ReadFileService;
  public dtoImportService: DtoImportService;
  public clientRules: ClientRules;

  constructor() {
    this.config = {
      imap: {
        user: Env.get("EMAIL_USER"),
        password: Env.get("EMAIL_PASSWORD"),
        host: 'imap.gmail.com',
        port: '993',
        tls: 'true',
        authTimeout: '10000',
        tlsOptions: {
          rejectUnauthorized: false,
        },
      },
    };
    
    this.importTypeService = new ImportTypeService();
    this.readFileService = new ReadFileService();
    this.dtoImportService = new DtoImportService();
    this.clientRules = new ClientRules();
  }

  // async getAttachmentFromMessages(messages, connection) {
  //   let attachments = [];

  //   messages.forEach(async (message) => {
  //     let parts:any = imaps.getParts(message.attributes.struct);
  //     attachments = attachments.concat(
  //       parts
  //         .filter((part) => {
  //           return (
  //             part.disposition &&
  //             part.disposition.type.toUpperCase() === 'ATTACHMENT'
  //           );
  //         })
  //         .map(async (part) => {
  //           let partData = await connection.getPartData(message, part);
  //           return {
  //             filename: part.params.name,
  //             data: partData,
  //           };
  //         })
  //     );
  //     console.log(message);
  //   });

  //   return await Promise.all(attachments);
  // }


  async getAttachmentFromMessages(messages, email) {
    let attachments:any = [];

    messages.map(async (message) => {
      let parts = imaps.getParts(message.attributes.struct);

      const partFilter = parts.filter((element) => {
        return (
          element.disposition &&
          element.disposition.type.toUpperCase() === 'ATTACHMENT'
        );
      })

      const files = partFilter.map(async (element) =>{
        let partData = await email.getPartData(message, element);
        return {
          filename: element?.params?.name,
          data: partData,
        };
      });

      attachments = attachments.concat(files);
    })

    return await Promise.all(attachments);
  }

  async getFile(){
    
    try {

      const email = await imaps.connect(this.config);

      await email.openBox('INBOX');
      
      const searchCriteria = [
        'UNSEEN',
        // ['FROM', Env.get("EMAIL_FROM")],
        ['TO', Env.get("EMAIL_TO")]
      ];

      const fetchOptions = {
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
        struct: true,
        markSeen: false,
      };

      let messages = await email.search(searchCriteria, fetchOptions);

      let attachments:any = [];

      if(messages && messages[0]){

        const firstEmail = messages[0].attributes.uid;
        
        const searchCriteriaFirst = [
          ["UID", firstEmail]
        ];
    
        const fetchOptionsFirst = {
          bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
          struct: true,
          markSeen: true,
        };

    
        const firstMessage = await email.search(searchCriteriaFirst, fetchOptionsFirst);

        const importTypeAll = await this.importTypeService.import();
        const importTypeAllJson = JSON.parse(JSON.stringify(importTypeAll));
        addRequired(importTypeAllJson);
        
        
        attachments = await this.getAttachmentFromMessages(
          firstMessage,
          email
        );
        
        let attachmentsCount = 0;

        while(attachmentsCount < attachments.length){

          const element = attachments[attachmentsCount];

          const fileDataJson = await this.readFileService.readXlsx(element, importTypeAllJson);

          console.log('result', fileDataJson);

          for(let data of fileDataJson){

            const isUpdateOnly = this.clientRules.isOnlyUpdate(data.importType);

            // console.log("isUpdateOnly", isUpdateOnly);

            if(isUpdateOnly){
              await this.dtoImportService.importUpdateOnly(data);
            } else {
              await this.dtoImportService.import(data);
            }
          }

          attachmentsCount++;
        }

        console.log("SCHEDULER JOB FINALIZADO");
      }

      console.log('Fechando Connection Com Imap');

      email.closeBox(false, (err) => {
        if (err) {
          console.log('Error ao Fechar Imap Box');
        }
      });

      email.end();

    } catch(error: any){
      console.error("Error Job GetFileEmailJob", error.message);
    }
  }
}