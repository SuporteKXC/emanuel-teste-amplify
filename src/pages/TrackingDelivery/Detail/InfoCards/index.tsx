import { Card } from "@/components/ui/CardGs";
import { Warehouse, PackageCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

interface InfoCardProps {
  data: any;
}

export function InfoCards({ data }: InfoCardProps) {
  const { t } = useTranslation();
  const { carrier, company, client, originAddress, originCity, originState } =
    data;
  const origin = {
    originAddress,
    originCity,
    originState,
  };

  const InfoCard = ({ title, type, value, origin, carrier }: any) => {
    const destEnderdestXbairro =
      value?.destEnderdestXbairro != "NULL" &&
      value?.destEnderdestXbairro != null
        ? value?.destEnderdestXbairro
        : "";
    const destEnderdestNro =
      value?.destEnderdestNro != "NULL" && value?.destEnderdestNro != null
        ? value?.destEnderdestNro
        : "";

    const carrierAddress = `${
      carrier?.addressStreet ? carrier.addressStreet : ""
    }${carrier?.addressComplement ? carrier.addressComplement : ""} ${
      carrier?.addressNumber ? carrier.addressNumber + ", " : ""
    }${carrier?.addressCity ? carrier.addressCity + "/" : ""}${
      carrier?.addressState ? carrier.addressState : ""
    }`;
    const transportadoraAaddress = `${
      value?.transpTransportaXender ? value.transpTransportaXender + ", " : ""
    }${value?.transpTransportaXmun ? value.transpTransportaXmun + "/" : ""}${
      value?.transpTransportaUf ? value.transpTransportaUf : ""
    }`;
    const destinatarioAaddress = `${
      value?.destEnderdestXlgr ? value.destEnderdestXlgr + ", " : ""
    }${destEnderdestNro ? destEnderdestNro + " - " : ""}${
      destEnderdestXbairro ? destEnderdestXbairro + " - " : ""
    }${value?.destEnderdestXmun ? value.destEnderdestXmun + "/" : ""}${
      value?.destEnderdestUf ? value.destEnderdestUf : ""
    }`;
    const remetendeAddress = `${origin?.originAddress}, ${origin?.originCity}/${origin?.originState}`;

    return (
      <Card.Root>
        <Card.Header>
          <div className="flex items-center justify-between w-full">
            <h5 className="font-GilroySemibold text-base text-slate-800">
              {title}
            </h5>
            {type === "Remetente" && (
              <Warehouse size={16} className="stroke-slate-800" />
            )}
            {type === "Transportadora" && (
              <Truck size={16} className="stroke-slate-800" />
            )}
            {type === "Destinatário" && (
              <PackageCheck size={16} className="stroke-slate-800" />
            )}
          </div>
        </Card.Header>
        <Card.Content>
          <div className="w-full mb-2">
            <h6 className="font-GilroySemibold text-sm text-slate-800">
              Empresa
            </h6>
            <span className="font-sans text-sm text-slate-600">
              {type === "Remetente" && value?.nameFantasy}
              {type === "Transportadora" &&
                (carrier?.tradeName ?? value?.transpTransportaXnome)}
              {type === "Destinatário" && value?.destXnome}
            </span>
          </div>
          <div className="w-full mb-2">
            <h6 className="font-GilroySemibold text-sm text-slate-800">
              Documento
            </h6>
            <span className="font-sans text-sm text-slate-600">
              {/* {title === 'Remetente' ? value?.cnpj : value?.documentNumber} */}
              {type === "Remetente" && value?.cnpj}
              {type === "Transportadora" &&
                (carrier?.documentNumber ?? value?.transpTransportaCnpj)}
              {type === "Destinatário" && value?.destCnpj}
            </span>
          </div>
          <div className="w-full">
            <h6 className="font-GilroySemibold text-sm text-slate-800">
              Endereço
            </h6>
            <span className="font-sans text-sm uppercase text-slate-600">
              {type === "Remetente" && remetendeAddress}
              {type === "Transportadora" &&
                (carrier ? carrierAddress : transportadoraAaddress)}
              {type === "Destinatário" && destinatarioAaddress}

              {/* {title !== 'Remetente' 
                    ? remetendeAddress
                    : `${origin.originAddress}, ${origin.originCity}/${origin.originState}`
                } */}
            </span>
          </div>
        </Card.Content>
      </Card.Root>
    );
  };

  return (
    <section className="grid md:grid-cols-3 gap-4 mb-4">
      <InfoCard
        type="Remetente"
        title={t("trackingDelivery.fields.sender")}
        value={company}
        origin={origin}
      />
      <InfoCard
        type="Transportadora"
        title={t("trackingDelivery.fields.carrier")}
        value={data?.brazilDocument}
        carrier={carrier}
      />
      <InfoCard
        type="Destinatário"
        title={t("trackingDelivery.fields.recipient")}
        value={data?.brazilDocument}
      />
    </section>
  );
}
