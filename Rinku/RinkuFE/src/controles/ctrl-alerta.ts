export class CtrlAlerta
{
    constructor(mensaje: string)
    {
        M.toast({html: mensaje});
    }
}