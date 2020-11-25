import './App.css';
import React from 'react';
import FileLoader from "./components/FileLoader";
import CFDI from "./components/CFDI";

let tmpCert = {"xmlns:cfdi":"http://www.sat.gob.mx/cfd/3","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","Certificado":"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","Fecha":"2020-11-20T14:02:11","Folio":"9","FormaPago":"03","LugarExpedicion":"58170","MetodoPago":"PUE","Moneda":"USD","NoCertificado":"00001000000504871752","Serie":"A","SubTotal":"3860.64","TipoCambio":"20.000000","TipoDeComprobante":"I","Total":"3860.64","Version":"3.3","xsi:schemaLocation":"http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd","Sello":"ZYb6+xPKDPiWM+jwK6fOTEI9+eEiXNAA810EWgFUoMjUbEqDhLgUQgeG/uIUhOkbiAiSMwsNXCTu9xW3LtrAMd8IyCYggtdnDgQHENyefoGbREouj3s7ZV7F5GrDbFt+kvAG/sRTzzIIeKKVtCIDptqSVg+wgygIqDhffXJQcBkc5quH7Gpi09Chav1jkZJ5KTHjy4zp24nY/woj/Pr0aabNb5wE4OUXkIFzGJriEECbJUo67NcAnihRMMcg2Vy31K5+M8+azvmPJ3RM20NwIdLPgD1wXbpxV4qixGpjqMH36oAq+1Nvb/f7nPWKQQZbM0TxHayeLYoB0s43VAafDA==","emisor":{"Nombre":"JOSE MARIA CAMPAÑA ROJAS","RegimenFiscal":"612","Rfc":"CARM890227R66"},"receptor":{"Nombre":"pickupon Inc","NumRegIdTrib":"8040001103567","ResidenciaFiscal":"JPN","Rfc":"XEXX010101000","UsoCFDI":"P01"},"timbreFiscalDigital":{"xmlns:tfd":"http://www.sat.gob.mx/TimbreFiscalDigital","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation":"http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd","Version":"1.1","UUID":"A8FF22CB-3042-46CC-B5ED-A8DF86661BFF","FechaTimbrado":"2020-11-20T14:07:49","RfcProvCertif":"SED1102088J7","SelloCFD":"ZYb6+xPKDPiWM+jwK6fOTEI9+eEiXNAA810EWgFUoMjUbEqDhLgUQgeG/uIUhOkbiAiSMwsNXCTu9xW3LtrAMd8IyCYggtdnDgQHENyefoGbREouj3s7ZV7F5GrDbFt+kvAG/sRTzzIIeKKVtCIDptqSVg+wgygIqDhffXJQcBkc5quH7Gpi09Chav1jkZJ5KTHjy4zp24nY/woj/Pr0aabNb5wE4OUXkIFzGJriEECbJUo67NcAnihRMMcg2Vy31K5+M8+azvmPJ3RM20NwIdLPgD1wXbpxV4qixGpjqMH36oAq+1Nvb/f7nPWKQQZbM0TxHayeLYoB0s43VAafDA==","NoCertificadoSAT":"00001000000503938001","SelloSAT":"ERhABmlrr42bqxz6l8pTGdb/TWD+uYbuFfLRHDP+4yKCUWqsGEdUqYa39xE6JX1SggLgjLTkrXn3p/S1GHj2NsuFgDdeLTV1FHDg43QQlqxF3odyg0YNbFGdusm0fCl+LzMM7oJ3HRiyCRe5zblyVgpsq2LoSC99QbPHkapubuZbEjsQaqRkMR3YnUIpJd5UqVVU1nCMqmjO8oNpxzT1xI7T81+9SSUODjj3fANYNvsm1sZGK+Q2w33yFkp2B60aliNUpl+OvvGO6GWLZUnaP82y6b6cah277jsZp9B+Sq7G3rSTuvV+sZDbP5PAeKnGv65jFWMOdxmOi7+GE11m0g=="},"impuestos":{"total":"0.00","translados":[{"Importe":"0.00","Impuesto":"002","TasaOCuota":"0.000000","TipoFactor":"Tasa"}]},"conceptos":[{"Cantidad":"1.00","ClaveProdServ":"81111510","ClaveUnidad":"E48","Descripcion":"Desarrollo de software.","Importe":"3860.64","NoIdentificacion":"1","Unidad":"Unidad de Servicio","ValorUnitario":"3860.64","impuestos":[{"Base":"3860.64","Importe":"0.00","Impuesto":"002","TasaOCuota":"0.000000","TipoFactor":"Tasa"}]}]};
tmpCert = null;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cfdi: tmpCert
        }
    }

    setCfdi(cfdi) {
        this.setState({cfdi});
    }

    render() {
        let {cfdi} = this.state;

        return (
            <div className="App">
                {cfdi === null && <FileLoader setCfdi={this.setCfdi.bind(this)}/>}
                {cfdi !== null && <CFDI {...cfdi} />}
            </div>
        );
    }
}
