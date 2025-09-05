export interface MessageDTO {
    mensagemId: string;
    conteudoMensagem: string;
}

export type StatusMensagem = 'PROCESSADO_SUCESSO' | 'FALHA_PROCESSAMENTO';
