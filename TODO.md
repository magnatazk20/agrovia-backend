# TODO - Ajuste de comissão por depósito via link

- [ ] Remover gatilho de comissão por compra de VIP em `/api/vip/activate`
- [ ] Implementar função de comissão por depósito via link (níveis 1, 2, 3)
- [ ] Integrar função no webhook `/api/CASHIN/webhook` apenas quando pagamento virar `paid` pela primeira vez
- [ ] Garantir validações: link presente, dono do link válido, depositante pertencente à rede
- [ ] Registrar logs de comissão e emitir `emitBalanceUpdate` para beneficiários
- [ ] Revisar cenários de não duplicação de comissão em reprocessamento/webhook repetido
- [ ] Executar testes de fluxo crítico
- [ ] Commit e push no `main`
