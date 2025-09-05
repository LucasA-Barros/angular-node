export interface Notification {
    mensagemId: string;
    conteudoMensagem: string;
    status: 'PROCESSADO_SUCESSO' | 'FALHA_PROCESSAMENTO'
}