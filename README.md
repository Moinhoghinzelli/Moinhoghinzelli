# Site institucional — Moinho Ghinzelli

Site institucional do Moinho Ghinzelli (Antônio Prado/RS), com páginas de história,
atrações, contato e um formulário de **reserva de visita** (sem pagamento online — a
confirmação é feita manualmente por WhatsApp/e-mail).

Stack: **Next.js 15 (App Router) + TypeScript + Tailwind CSS + Supabase**, pronto para
deploy na **Vercel**.

## Conteúdo do site

- `/` — Home
- `/sobre` — História do moinho e da família Ghinzelli
- `/atracoes` — Atrações do parque
- `/ingressos` — Preços + formulário de reserva
- `/contato` — WhatsApp, Instagram, Facebook, mapa

## Imagens

Logo e fotos profissionais (fornecidas pelo cliente, pasta "Mídias Moinho Ghinzelli" no
Google Drive) já estão em `public/images/`:

- `logo.png` — logo completo (desenho do moinho + nome "Moinho Ghinzelli" manuscrito),
  fundo transparente, recortado a partir do arquivo original em alta resolução enviado
  pelo cliente. Não é exibido diretamente em nenhuma página, mas é a fonte dos recortes
  abaixo.
- `logo-icon.png` — só o desenho do moinho. Usado no cabeçalho e no ícone da aba do
  navegador (`src/app/icon.png`).
- `logo-wordmark.png` — só o nome "Moinho Ghinzelli" manuscrito (tinta escura). Usado ao
  lado do ícone no cabeçalho.
- `logo-wordmark-light.png` — mesmo nome, em creme, para o rodapé (fundo escuro).
- `moinho-exterior.jpg` — moinho visto de fora, com a cascata ao fundo. Usada no destaque
  da Home, na imagem de compartilhamento (Open Graph) e na página `/sobre`.
- `vista-aerea.jpg` — foto aérea (drone) de toda a propriedade: cascata, riacho, ponte,
  parque infantil e prédios. Usada na página `/sobre`.
- `moinho-interior.jpg` — interior do moinho, com as engrenagens originais. Usada na
  atração "Visitação guiada à casa e ao moinho".
- `cachoeira.jpg` — a cascata do parque. Usada na atração "Trilhas e recantos da natureza".
- `parque.jpg` — parque infantil e ponte sobre o riacho. Usada na atração "Parque e
  espaços de lazer".
- `passeio-carreto.jpg` — o carreto com visitantes em frente ao moinho. Usada na atração
  "Passeio de Carreto".
- `bodega.jpg` — pátio da Bodega com as mesas ao ar livre. Usada na atração "Bodega do
  Moinho".
- `galpao-eventos.jpg` — o galpão de eventos ao entardecer. Usada na atração "Galpão de
  Eventos".
- `farinha-produto.jpg` — pacote da farinha de milho do Moinho. Usada no bloco de produtos
  da Bodega em `/atracoes`.

Para trocar qualquer imagem, basta substituir o arquivo em `public/images/` mantendo o
mesmo nome (ou atualizar o caminho em `src/lib/constants.ts` / no componente da página).
Ainda tem muita coisa boa sobrando na pasta do Drive (fotos de detalhes, do carreto, das
redes na Trilha do Pinheiro, do galpão à noite com evento) que não foi usada — vale dar
uma olhada se quiserem variar mais as fotos no futuro.

Todos os textos, preços, horários e contatos vêm de **um único arquivo**, fácil de
editar: `src/lib/constants.ts`. Os valores atuais foram confirmados pelo proprietário via
briefing oficial (set/2026) — não são mais estimativas de pesquisa.

## 1. Abrir o projeto no VS Code

1. Extraia a pasta do projeto e abra-a no VS Code (`File > Open Folder`).
2. Instale o [Node.js](https://nodejs.org/) versão 20 ou superior, se ainda não tiver.
3. No terminal do VS Code, instale as dependências:

   ```bash
   npm install
   ```

4. Rode o site localmente:

   ```bash
   npm run dev
   ```

   Acesse http://localhost:3000

## 2. Configurar o Supabase (para o formulário de reservas funcionar)

O formulário de reservas grava os pedidos em uma tabela do Supabase. Sem essa
configuração, o site funciona normalmente, mas o formulário retorna um aviso
pedindo para reservar por WhatsApp.

1. Crie uma conta e um projeto em [supabase.com](https://supabase.com) (gratuito).
2. No painel do projeto, vá em **SQL Editor**, cole o conteúdo do arquivo
   [`supabase/schema.sql`](./supabase/schema.sql) e clique em **Run**. Isso cria a
   tabela `reservas` já com segurança (RLS) habilitada.
3. Vá em **Project Settings > API** e copie:
   - **Project URL**
   - **service_role key** (em "Project API keys" — é uma chave secreta, nunca a
     compartilhe nem exponha no navegador)
4. Copie o arquivo `.env.local.example` para `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

5. Preencha `.env.local`:

   ```
   SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

6. Reinicie `npm run dev`. Teste o formulário em `/ingressos` e confira se a
   reserva aparece na tabela `reservas` (Table Editor, no painel do Supabase).

### Ver e gerenciar as reservas recebidas

Por enquanto, as reservas ficam visíveis apenas no **Table Editor** do Supabase
(Supabase Dashboard > Table Editor > `reservas`). Dá para filtrar por data,
marcar o campo `status` como `confirmada`/`cancelada`, etc. Se no futuro quiserem
uma tela de administração dentro do próprio site, isso pode ser adicionado depois.

## 3. Publicar na Vercel

1. Suba o código para um repositório no GitHub (crie um repositório vazio no
   GitHub e siga as instruções de `git push` que ele mostra).
2. Acesse [vercel.com](https://vercel.com), crie uma conta e clique em
   **Add New > Project**, importando o repositório do GitHub.
3. Em **Environment Variables**, adicione as mesmas variáveis do `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Clique em **Deploy**. Em poucos minutos o site estará no ar em um endereço
   `.vercel.app` (é possível depois configurar um domínio próprio, como
   `moinhoghinzelli.com.br`, em **Project Settings > Domains**).

Qualquer novo `git push` para a branch principal gera automaticamente um novo
deploy.

## 4. Próximos passos sugeridos

- [ ] Publicar o vídeo institucional (`Moinho.mp4`, na pasta do Drive) em um serviço de
      hospedagem de vídeo (YouTube não listado ou Vimeo — o arquivo é grande demais
      para ficar dentro do próprio site) e embutir o player em `/sobre` ou na Home.
- [ ] Adicionar uma seção de depoimentos com as avaliações do Google (sugestão do
      próprio proprietário no briefing) assim que houver acesso a elas.
- [ ] Conforme mais fotos forem chegando (a pasta do Drive tem bem mais do que foi
      usado), adicionar em `public/images/` e ligar aos itens correspondentes em
      `src/lib/constants.ts` (campo `imagem`).
- [ ] Definir um domínio próprio e configurá-lo na Vercel.
- [ ] Se quiserem cobrar o ingresso online no futuro, é possível integrar um
      gateway de pagamento brasileiro (ex: Mercado Pago) na página `/ingressos`.
- [ ] Configurar um e-mail ou notificação automática (ex: webhook do Supabase)
      para avisar a equipe assim que uma nova reserva chegar.

## Estrutura do projeto

```
src/
  app/
    page.tsx              # Home
    sobre/page.tsx         # História
    atracoes/page.tsx      # Atrações
    ingressos/page.tsx      # Preços + formulário de reserva
    contato/page.tsx        # Contato + mapa
    api/reservas/route.ts   # Endpoint que grava a reserva no Supabase
  components/               # Header, Footer, formulário, mapa, etc.
  lib/
    constants.ts             # Todas as informações do parque (editar aqui!)
    supabase-server.ts        # Cliente Supabase (uso interno, servidor)
  types/reserva.ts            # Tipos do formulário de reserva
supabase/schema.sql            # Script para criar a tabela de reservas
```
