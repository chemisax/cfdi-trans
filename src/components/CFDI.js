import React from 'react';
import moment from 'moment';
import {tJa, tEs} from '../locale';

const formatDate = date => moment(date).format('YYYY.MM.DD HH:mm:ss');

const formatNumber = (value, maxDecimals = 2) => {
    const number = Number(value);
    if (value === undefined || value === '' || isNaN(number)) {
        return value;
    }
    return number.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: maxDecimals});
};

const formatQuantity = value => {
    const number = Number(value);
    return isNaN(number) ? value : String(number);
};

// "日本語 · Español"
const Label = ({k}) => (
    <div className="label">
        <span className="ja">{tJa(k)}</span>
        <span className="dot"> · </span>
        <span className="es">{tEs(k)}</span>
    </div>
);

// "01 宛先 Receptor"
const Section = ({n, k}) => (
    <div className="section">
        <span className="n">{n}</span>
        <span className="ja">{tJa(k)}</span>
        <span className="es">{tEs(k)}</span>
    </div>
);

// "626 簡易信頼制度" + "Régimen Simplificado de Confianza"
const Entry = ({code, k, small}) => {
    const ja = tJa(k);
    const es = tEs(k);
    return (
        <div className={'entry' + (small ? ' small' : '')}>
            <div className="entry-ja"><span className="code">{code}</span> {ja}</div>
            {es && <div className="entry-es">{es}</div>}
        </div>
    );
};

export default class CFDI extends React.Component {

    componentDidMount() {
        this.createQR();
    }

    createQR() {
        let cfdi = this.props;
        let sello = cfdi.timbreFiscalDigital.SelloCFD;
        sello = sello.substr(sello.length - 8);
        let element = document.getElementById('qrcode');
        element.innerHTML = '';
        new window.QRCode(element, {
            text: `https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?id=${cfdi.timbreFiscalDigital.UUID}&re=${cfdi.emisor.Rfc}&rr=${cfdi.receptor.Rfc}&tt=${cfdi.Total}&fe=${sello}`
        })
    }

    cadenaOriginal() {
        let tfd = this.props.timbreFiscalDigital;
        return `||${tfd.Version}|${tfd.UUID.toLowerCase()}|${tfd.FechaTimbrado}|${tfd.RfcProvCertif}|${tfd.SelloCFD}|${tfd.NoCertificadoSAT}||`;
    }

    render() {
        let cfdi = this.props;
        let tfd = cfdi.timbreFiscalDigital;
        let folio = (cfdi.Serie ? cfdi.Serie + '-' : '') + cfdi.Folio;

        return (
            <div className="page">

                <div className="topbar">
                    <span><span className="bullet">●</span> cfdi/{cfdi.Version} · {cfdi.TipoDeComprobante}</span>
                    <span>{tfd.UUID}</span>
                </div>

                <div className="emisor">
                    <div className="emisor-info">
                        <Label k="emisor"/>
                        <div className="name">{cfdi.emisor.Nombre}</div>
                        <div className="rfc">{cfdi.emisor.Rfc}</div>
                        <Entry code={cfdi.emisor.RegimenFiscal} k={`regimen_${cfdi.emisor.RegimenFiscal}`} small/>
                    </div>
                    <div className="folio">
                        <Label k="factura"/>
                        <div className="folio-number"><span className="no">№</span>{folio}</div>
                        <div className="pill">
                            {tJa(`efecto_${cfdi.TipoDeComprobante}`)} · {tEs(`efecto_${cfdi.TipoDeComprobante}`)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-4 meta">
                    <div className="cell">
                        <Label k="fechaEmision"/>
                        <div className="value mono">{formatDate(cfdi.Fecha)}</div>
                    </div>
                    <div className="cell">
                        <Label k="lugarExpedicion"/>
                        <div className="value mono">{cfdi.LugarExpedicion}</div>
                    </div>
                    <div className="cell">
                        <Label k="moneda"/>
                        <div className="value mono">{cfdi.Moneda}</div>
                    </div>
                    <div className="cell">
                        <Label k="tipoCambio"/>
                        <div className="value mono">{cfdi.TipoCambio ? Number(cfdi.TipoCambio).toFixed(1) : '1.0'}</div>
                    </div>
                </div>

                <Section n="01" k="receptor"/>
                <div className="receptor">
                    <div className="receptor-main">
                        <div className="name small-name">{cfdi.receptor.Nombre}</div>
                        <div className="taxid">
                            <span className="taxid-label">{tJa('rfc')} / {tEs('rfc')}</span>
                            <span className="taxid-value">{cfdi.receptor.Rfc}</span>
                        </div>
                        <Entry code={cfdi.receptor.RegimenFiscalReceptor} k={`regimen_${cfdi.receptor.RegimenFiscalReceptor}`} small/>
                    </div>
                    <div className="receptor-right">
                        <div>
                            <Label k="usoCFDI"/>
                            <Entry code={cfdi.receptor.UsoCFDI} k={`usoCFDI_${cfdi.receptor.UsoCFDI}`}/>
                        </div>
                        <div>
                            <Label k="residenciaFiscal"/>
                            <Entry code={cfdi.receptor.ResidenciaFiscal} k={`residencia_${cfdi.receptor.ResidenciaFiscal}`}/>
                        </div>
                        <div>
                            <Label k="numRegIdTrib"/>
                            <div className="value mono">{cfdi.receptor.NumRegIdTrib}</div>
                        </div>
                    </div>
                </div>

                <Section n="02" k="conceptos"/>
                <div className="conceptos">
                    <div className="row header">
                        <div className="unit"><Label k="unidad"/></div>
                        <div className="description"><Label k="descripcion"/></div>
                        <div className="num"><Label k="valorUnitario"/></div>
                        <div className="num"><Label k="cantidad"/></div>
                        <div className="num"><Label k="importe"/></div>
                    </div>
                    {cfdi.conceptos.map((concepto, key) =>
                        <div key={key} className="row concepto">
                            <div className="unit">
                                <div className="unit-ja">{tJa(`unidad_${concepto.ClaveUnidad}`) || concepto.ClaveUnidad}</div>
                                <div className="unit-es">{tEs(`unidad_${concepto.ClaveUnidad}`) || concepto.Unidad}</div>
                            </div>
                            <div className="description">
                                <div className="description-title">{concepto.Descripcion}</div>
                                {(tJa(`producto_${concepto.ClaveProdServ}`) || tEs(`producto_${concepto.ClaveProdServ}`)) &&
                                <div className="description-detail">
                                    {tJa(`producto_${concepto.ClaveProdServ}`)} {tEs(`producto_${concepto.ClaveProdServ}`)}
                                </div>}
                            </div>
                            <div className="num mono">{formatNumber(concepto.ValorUnitario, 6)}</div>
                            <div className="num mono">{formatQuantity(concepto.Cantidad)}</div>
                            <div className="num mono strong">{formatNumber(concepto.Importe)}</div>
                        </div>
                    )}
                </div>

                <div className="totals">
                    <div className="totals-row">
                        <Label k="subtotal"/>
                        <div className="mono">{formatNumber(cfdi.SubTotal)}</div>
                    </div>
                    {cfdi.impuestos.translados.map((impuesto, key, list) =>
                        <div key={key} className={'totals-row' + (key === list.length - 1 ? ' last' : '')}>
                            <div className="label">
                                <span className="ja">{tJa(`impuesto_${impuesto.Impuesto}`)}</span>
                                <span className="dot"> · </span>
                                <span className="es">
                                    {tEs(`impuesto_${impuesto.Impuesto}`)} {+(parseFloat(impuesto.TasaOCuota) * 100).toFixed(2)}%
                                </span>
                            </div>
                            <div className="mono">{formatNumber(impuesto.Importe)}</div>
                        </div>
                    )}
                    <div className="totals-total">
                        <Label k="total"/>
                        <div>
                            <span className="currency mono">{cfdi.Moneda}</span>
                            <span className="amount mono">{formatNumber(cfdi.Total)}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-3 pago">
                    <div className="cell">
                        <Label k="metodoPago"/>
                        <Entry code={cfdi.MetodoPago} k={`metodoPago_${cfdi.MetodoPago}`}/>
                    </div>
                    <div className="cell">
                        <Label k="formaPago"/>
                        <Entry code={cfdi.FormaPago} k={`formaPago_${cfdi.FormaPago}`}/>
                    </div>
                    <div className="cell">
                        <Label k="exportacion"/>
                        <Entry code={cfdi.Exportacion} k={`exportacion_${cfdi.Exportacion}`}/>
                    </div>
                </div>

                <Section n="03" k="timbre"/>
                <div className="timbre">
                    <div className="qrcode"><div id="qrcode"/></div>
                    <div className="timbre-box">
                        <div className="timbre-full">
                            <Label k="folioFiscal"/>
                            <div className="uuid mono">{tfd.UUID}</div>
                        </div>
                        <div>
                            <Label k="fechaCertificacion"/>
                            <div className="value mono">{formatDate(tfd.FechaTimbrado)}</div>
                        </div>
                        <div>
                            <Label k="rfcProvCertif"/>
                            <div className="value mono">{tfd.RfcProvCertif}</div>
                        </div>
                        <div>
                            <Label k="noCertificadoSAT"/>
                            <div className="value mono">{tfd.NoCertificadoSAT}</div>
                        </div>
                        <div>
                            <Label k="noCertificadoEmisor"/>
                            <div className="value mono">{cfdi.NoCertificado}</div>
                        </div>
                    </div>
                </div>

                <div className="sellos">
                    <Label k="selloCFDI"/>
                    <div className="sello mono">{tfd.SelloCFD}</div>
                    <Label k="selloSAT"/>
                    <div className="sello mono">{tfd.SelloSAT}</div>
                    <Label k="cadenaOriginal"/>
                    <div className="sello mono">{this.cadenaOriginal()}</div>
                </div>
            </div>
        );
    }
}
