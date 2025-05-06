import { isBefore } from "date-fns";
import * as Yup from "yup";

export const getTransitTimeShape = () => {
  return {
    carrierId: Yup.number().required("Selecione a transportadora").typeError("Selecione a transportadora"),
    type: Yup.string().required("Selecione o tipo").typeError("Selecione o tipo"),
    weight: Yup.number().required("Digite o peso").typeError("Digite o peso"),
    deadlineFractional: Yup.number().required("Campo obrigatório").typeError("Campo obrigatório"),
    deadlineDedicated: Yup.number().required("Campo obrigatório").typeError("Campo obrigatório"),
    countFractional: Yup.string().required("Campo obrigatório").typeError("Campo obrigatório"),
    countDedicated: Yup.string().required("Campo obrigatório").typeError("Campo obrigatório"),
    cutHour: Yup.string().required("Informe o horário").typeError("Informe o horário"),
    start: Yup.number().required("Informe os dias").typeError("Informe os dias"),
    validUntil: Yup.string().test({
      name: "validUntil", 
      test: function (value) {
        try {
          if(!value){
            throw new Error("Informe a validade")
          }
          if(isBefore(new Date(value), new Date())){
            throw new Error("Data inválida")
          }
          return true
        } catch (error: any) {
          return this.createError({
            message: error?.message
          })
        }
    }}),
    ufOrigin: Yup.string().required("Selecione o estado").typeError("Selecione o estado"),
    ibgeOrigin: Yup.string().required("Selecione a cidade").typeError("Selecione a cidade"),    

    kmInitial: Yup.string().typeError("Valor inválido").when('type', {
      is: (value: string) => value === 'KM',
      then: Yup.string().required('Informe o KM inicial'),
      otherwise: Yup.string()
    }),
    kmFinal: Yup.string().typeError("Valor inválido").when('type', {
      is: (value: string) => value === 'KM',
      then: Yup.string().required('Informe o KM final'),
      otherwise: Yup.string()
    }),
    ufDestiny: Yup.string().typeError("Valor inválido").when('type', {
      is: (value: string) => value === 'CIDADE',
      then: Yup.string().required('Selecione um UF'),
      otherwise: Yup.string()
    }),
    ibgeDestiny: Yup.string().typeError("Valor inválido").when('type', {
      is: (value: string) => value === 'CIDADE',
      then: Yup.string().required('Selecione o destino'),
      otherwise: Yup.string()
    }),
  };
};
