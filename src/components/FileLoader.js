import React from 'react';
import {parseString} from 'xml2js';

export default class FileLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            busy: false,
            loaded: false
        }
    }

    onFileChange(event) {
        let file = event.target.files[0];
        if (file.type !== 'text/xml') {
            alert('Please give xml file');
            return;
        }
        this.setState({busy: true}, () => {
            this.loadFile(file);
        });
    }

    loadFile(file) {
        const reader = new FileReader();
        reader.addEventListener('load', this.fileLoaded.bind(this));
        reader.readAsText(file);
    }

    fileLoaded(event) {
        parseString(event.target.result, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            this.setState({busy: false, loaded: true}, () => {
                let rawCFDI = result['cfdi:Comprobante'];
                let cfdi = {
                    ...rawCFDI.$,
                    emisor: rawCFDI['cfdi:Emisor'][0].$,
                    receptor: rawCFDI['cfdi:Receptor'][0].$,
                    timbreFiscalDigital: rawCFDI['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$,
                    impuestos: {
                        total: rawCFDI['cfdi:Impuestos'][0].$['TotalImpuestosTrasladados'],
                        translados: rawCFDI['cfdi:Impuestos'][0]['cfdi:Traslados'].map(translado => {
                            return translado['cfdi:Traslado'][0].$
                        })
                    },
                    conceptos: rawCFDI['cfdi:Conceptos'].map(row => {
                        let concepto = row['cfdi:Concepto'][0].$;
                        concepto.impuestos = row['cfdi:Concepto'][0]['cfdi:Impuestos'].map(row => {
                            return row['cfdi:Traslados'][0]['cfdi:Traslado'][0].$;
                        })
                        return concepto;
                    })
                };
                this.props.setCfdi(cfdi);
            });
        });
    }

    render() {
        let {busy, loaded} = this.state;

        if (busy || loaded) {
            return null;
        }

        return (
            <div style={{padding: 20}}>
                <input type="file" onChange={this.onFileChange.bind(this)}/>
            </div>
        );
    }
}
