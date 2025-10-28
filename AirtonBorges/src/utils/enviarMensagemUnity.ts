type UnityInstance = {
    SendMessage: (
        gameObject: string,
        method: string,
        params?: string | number,
    ) => {};
};

export type method =
    | "LimparParticulas"
    | "AdicionarParticula"
    | "AlterarDescricao"
    | "AlterarTitulo";

export function enviarMensagemUnity(method: method, params?: string | number) {
    const unityInstance = (window as any).unityInstance as UnityInstance;

    if (params !== undefined && params !== null) {
        unityInstance.SendMessage(
            "WebAssemblyReceiver",
            method,
            params,
        );
        return;
    }

    unityInstance.SendMessage("WebAssemblyReceiver", method);
}
