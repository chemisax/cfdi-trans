import React from 'react';
import t from "../locale";
import moment from 'moment';

export default class CFDI extends React.Component {

    componentDidMount() {
        this.createQR();
    }

    componentDidUpdate() {
       this.createQR();
    }

    createQR() {
        let cfdi = this.props;
        let sello = cfdi.timbreFiscalDigital.SelloCFD;
        sello = sello.substr(sello.length-8);
        new window.QRCode(document.getElementById('qrcode'), {
            text: `https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?id=${cfdi.timbreFiscalDigital.UUID}&re=${cfdi.emisor.Rfc}&rr=${cfdi.receptor.Rfc}&tt=${cfdi.Total}&fe=${sello}`
        })
    }

    render() {
        let cfdi = this.props;

        return (
            <div>

                <div className="flex" style={{marginBottom: 10}}>
                    <div className="flex-col-1">
                        <h3>{cfdi.emisor.Nombre}</h3>
                        <p>{t('rfc')}: {cfdi.emisor.Rfc}</p>
                        <p className="small">
                            {t('regimenFiscal')}<br />
                            <strong>{t('regimen_'+cfdi.emisor.RegimenFiscal)}</strong>
                        </p>
                        <p className="small">
                            {t('numeroCertidicado')}<br/>
                            <strong>{cfdi.NoCertificado}</strong>
                        </p>
                    </div>
                    <div className="flex-col-1 small">
                        <h5 style={{textAlign: 'center'}}><strong>{t('factura')}</strong></h5>
                        <div className="content">
                            <div className="flex flex-wrap">
                                <div className="flex-wrap-2">
                                    <p>{t('serieFolio')}</p>
                                    <p><strong>{cfdi.Serie}-{cfdi.Folio}</strong></p>
                                </div>
                                <div className="flex-wrap-2">
                                    <p>{t('efecto')}</p>
                                    <p><strong>{t(`efecto_${cfdi.TipoDeComprobante}`)}</strong></p>
                                </div>
                                <div className="flex-wrap-2">
                                    <p>{t('lugarExpedicion')}</p>
                                    <p><strong>{cfdi.LugarExpedicion}</strong></p>
                                </div>
                                <div className="flex-wrap-2">
                                    <p>{t('fechaHora')}</p>
                                    <p><strong>{moment(cfdi.Fecha).format('YYYY.MM.DD HH:mm:ss')}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-col-1">
                        <h5>{t('informacionCliente')}</h5>
                        <div className="content">
                            <p>
                                <strong>{cfdi.receptor.Nombre}</strong>
                            </p>
                            <p>
                                {t('rfc')} <strong>{cfdi.receptor.Rfc}</strong><br />
                            </p>
                        </div>
                    </div>
                    <div className="flex-col-1">
                        <h5>{t('otrosDatos')}</h5>
                        <div className="content small flex">
                            <div className="flex-col-1">
                                <strong>{t('uso')}</strong><br />
                                {t('usoCFDI_'+cfdi.receptor.UsoCFDI)}
                            </div>
                            <div className="flex-col-1">
                                <strong>{t('residenciaFiscal')}</strong><br />
                                {t('residencias_'+cfdi.receptor.ResidenciaFiscal)}
                            </div>
                            <div className="flex-col-2">
                                <strong>{t('numRegistroTrib')}</strong><br />
                                {cfdi.receptor.NumRegIdTrib}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="conceptos small">
                    <div className="conceptosRow header smaller">
                        <div className="unit">{t('claveUnidad')}</div>
                        <div className="description">{t('descripcion')}</div>
                        <div className="value">{t('valorUnitario')}</div>
                        <div className="quantity">{t('cantidad')}</div>
                        <div className="price">{t('importe')}</div>
                    </div>
                    {cfdi.conceptos.map((concepto, key) =>
                        <div key={key} className="concepto">
                            <div className="conceptosRow" >
                                <div className="unit">{concepto.ClaveUnidad}</div>
                                <div className="description">
                                    {concepto.Descripcion}<br />
                                    <span className="smaller">
                                        {t('codigoSat')}: {concepto.ClaveProdServ}
                                    </span>
                                </div>
                                <div className="value">{concepto.ValorUnitario}</div>
                                <div className="quantity">{concepto.Cantidad}</div>
                                <div className="price"><strong>{concepto.Importe}</strong></div>
                            </div>
                            <div className="impuestos smaller"></div>
                        </div>
                    )}
                    <div className="subtotal">
                        <div>
                            {t('subtotal')}: {cfdi.SubTotal}
                        </div>
                        {cfdi.impuestos.translados.map((impuesto, key) =>
                            <div key={key}>
                                {t('impuesto_'+impuesto.Impuesto)}: {impuesto.Importe}
                            </div>
                        )}
                    </div>
                </div>

                <div className="total">
                    {t('total')} {cfdi.Moneda} <strong>{cfdi.Total}</strong>
                </div>

                <div className="flex small content">
                    <div className="flex-col-1">
                        <p>
                            <strong>{t('metodoDePago')}</strong><br />
                            {t('pago_'+cfdi.MetodoPago)}
                        </p>
                    </div>
                    <div className="flex-col-1">
                        <p>
                            <strong>{t('formaPago')}</strong><br />
                            {t('formaPago_'+cfdi.FormaPago)}
                        </p>
                    </div>
                    <div className="flex-col-1">
                        <p>
                            <strong>{t('tipoCambio')}</strong><br />
                            {cfdi.TipoCambio}
                        </p>
                    </div>
                </div>

                <div className="footer flex small">
                    <div className="flex-col-3 qrcode">
                        <div id="qrcode"/>
                    </div>
                    <div className="flex-col-4">
                        <div className="mb-5">
                            <h5>{t('folioFiscal')}</h5>
                            <div className="content small">
                                <strong>{cfdi.timbreFiscalDigital.UUID}</strong>
                            </div>
                        </div>
                        <div className="mb-5">
                            <h5>{t('rfcProvCert')}</h5>
                            <div className="content">
                                {cfdi.timbreFiscalDigital.RfcProvCertif}
                            </div>
                        </div>
                        <div>
                            <h5>{t('cadenaOriginal')}</h5>
                            <div className="content">
                                -
                            </div>
                        </div>
                    </div>
                    <div className="flex-col-3">
                        <div className="mb-5">
                            <h5>{t('numeroCertSAT')}</h5>
                            <div className="content">
                                {cfdi.timbreFiscalDigital.NoCertificadoSAT}
                            </div>
                        </div>
                        <div className="mb-5">
                            <h5>{t('selloDigitalSat')}</h5>
                            <div className="content">
                                <div className="sello">
                                    {cfdi.timbreFiscalDigital.SelloSAT}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col-3">
                        <div className="mb-5">
                            <h5>{t('fechaHoraCert')}</h5>
                            <div className="content">
                                {moment(cfdi.timbreFiscalDigital.FechaTimbrado).format('YYYY.MM.DD HH:mm:ss')}
                            </div>
                        </div>
                        <div>
                            <h5>{t('selloDigitalCFDI')}</h5>
                            <div className="content">
                                <div className="sello">
                                    {cfdi.timbreFiscalDigital.SelloCFD}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="smaller footer" style={{textAlign: 'center'}} dangerouslySetInnerHTML={{__html: t('footer')}} />
            </div>
        );
    }
}
