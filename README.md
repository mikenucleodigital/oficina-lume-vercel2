# Oficina Lume

Site e área de cliente para uma oficina de bicicletas fictícia em Lisboa. Construído com Next.js App Router, TypeScript, Tailwind CSS e componentes shadcn/ui.

## Rotas

- `/` — apresentação da oficina, serviços e testemunhos
- `/precos` — planos, preços e perguntas frequentes
- `/marcar` — pedido de marcação com validação Zod
- `/area-cliente` — pedidos guardados, estado e gráfico mensal
- `/sobre` — equipa, localização e horário
- Qualquer rota inexistente apresenta a página 404 personalizada.

## Variáveis de ambiente

- `NEXT_PUBLIC_SHOP_NAME` — nome apresentado no site (predefinição: `Oficina Lume`)
- `NEXT_PUBLIC_SHOP_PHONE` — telefone de contacto (predefinição: `+351 213 456 789`)

As marcações e a preferência de tema são guardadas no `localStorage` do navegador. Não existe base de dados nem sincronização entre dispositivos. O projeto usa a configuração Next.js existente, sem `output: 'export'`.
