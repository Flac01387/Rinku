import { autoinject, bindable, bindingMode, observable  } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as EventosControles from '../eventos/eventos-controles';

export class ConfiguracionAlertaConfirmacion
{
    id: string = 'default';
    titulo: string = '';
    mensaje: string = '';
}

@autoinject
export class CtrlAlertaConfirmacion
{
    @bindable({ defaultBindingMode: bindingMode.twoWay }) configAlertaConfirmacion: ConfiguracionAlertaConfirmacion;

    modal: any;

    //Subscripciones
    subscribeMostrarModal: any;

    constructor(private ea: EventAggregator){ }

    attached()
    {
        var self = this;

        var element = document.getElementById(this.configAlertaConfirmacion.id);
        this.modal = M.Modal.init(element);

        this.subscribeMostrarModal = this.ea.subscribe(EventosControles.MostrarModal, msg => {
            self.modal.open();
        });
    }

    clickAceptar()
    {
        this.ea.publish(new EventosControles.ModalClickAceptar());
    }
}