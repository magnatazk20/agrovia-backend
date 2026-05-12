# TODO - Retroativo comissão + roleta (depósitos afetados)

- [x] Mapear no `server.ts` os fluxos atuais de CASHIN/webhook, comissão e roleta.
- [ ] Implementar rotina/endpoint admin idempotente para reprocessar depósitos `paid` já existentes.
- [ ] Garantir proteção contra duplicidade de crédito (comissão e roleta).
- [ ] Executar teste de caminho crítico com curl.
- [ ] Commit e push das alterações no backend.
