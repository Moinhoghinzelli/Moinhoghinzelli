# Site institucional — Moinho Ghinzelli

Site institucional do Moinho Ghinzelli (Antônio Prado/RS), com páginas de história,
atrações, contato e um formulário de **reserva de visita** para dias de semana. O
formulário não grava em nenhum banco de dados — ele monta a mensagem com os dados
preenchidos e abre o WhatsApp da equipe já com tudo pronto para enviar.

Stack: **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, pronto para deploy na
**Vercel**. Não depende de nenhum serviço externo (banco de dados, API paga, etc.) —
é só instalar e rodar.

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

### Animações (padrão Kyvo / Serra Summit)

As animações usam **GSAP + ScrollTrigger** e ficam em `src/components/`:

- `Abertura.tsx` — abertura com a logo e dois painéis (laranja e azul) que varrem a tela,
  uma vez por sessão (clique para pular).
- `Animacoes.tsx` — todo o resto: topo da Home entrando em cascata, títulos palavra por
  palavra, revelações ao rolar, parallax nas fotos, cards que inclinam e botões
  magnéticos (só com mouse), barra de progresso de leitura e sombra no cabeçalho.
- `Faixas.tsx` — duas faixas que correm e aceleram conforme a página é rolada.

Para animar um elemento novo, basta colocar um atributo nele: `data-reveal` (sobe e
aparece), `data-reveal="card"` (idem, com escala), `data-parallax` (foto dentro de um
quadro com `overflow-hidden`), `data-tilt` (inclina no hover) ou `data-magnetic` (botão
que atrai o cursor). Quem prefere menos movimento no sistema (`prefers-reduced-motion`)
vê o site completo, sem nenhuma animação nem a abertura.

### Vídeo do hero

`public/videos/hero-loop.mp4` é um recorte de ~9s do vídeo institucional do cliente
(cascata, roda d'água e a farinha sendo moída), sem áudio, em loop, usado como fundo
animado da foto principal na Home (`src/app/page.tsx`). É só a foto (`moinho-exterior.jpg`)
por baixo do vídeo — em conexões lentas ou para quem prefere menos movimento na tela
(`prefers-reduced-motion`), a foto aparece sozinha e o vídeo fica escondido.

Para trocar o trecho usado, edite os tempos de início/fim no `ffmpeg` a partir do
`Moinho.mp4` original (pasta do Drive) — os comandos usados estão no histórico do Git
deste commit, procure por "hero_loop" caso precise recriá-los.

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

## 2. Publicar na Vercel

1. Suba o código para um repositório no GitHub (crie um repositório vazio no
   GitHub e siga as instruções de `git push` que ele mostra).
2. Acesse [vercel.com](https://vercel.com), crie uma conta e clique em
   **Add New > Project**, importando o repositório do GitHub.
3. Clique em **Deploy**. Em poucos minutos o site estará no ar em um endereço
   `.vercel.app` (é possível depois configurar um domínio próprio, como já foi
   feito com `moinhoghinzelli.com.br`, em **Project Settings > Domains**). Não
   precisa configurar nenhuma variável de ambiente — o site não depende de nenhum
   serviço externo.

Qualquer novo `git push` para a branch principal gera automaticamente um novo
deploy.

## 3. Próximos passos sugeridos

- [ ] O vídeo institucional completo (`Moinho.mp4`, na pasta do Drive) ainda não está
      no site na íntegra — só um recorte de ~9s virou o loop de fundo do hero (veja
      `public/videos/hero-loop.mp4` abaixo). Se quiserem o vídeo completo disponível
      pra assistir (não só como fundo), o caminho é publicá-lo no YouTube (não
      listado) ou Vimeo e embutir o player em `/sobre` — o arquivo original
      (~250 MB) é grande demais para ficar hospedado dentro do próprio site.
- [ ] Conforme mais fotos forem chegando (a pasta do Drive tem bem mais do que foi
      usado), adicionar em `public/images/` e ligar aos itens correspondentes em
      `src/lib/constants.ts` (campo `imagem`).
- [ ] Se no futuro quiserem guardar as reservas em algum lugar (não só como mensagem
      de WhatsApp) — por exemplo para ter uma lista/planilha organizada — dá para
      reintroduzir um banco de dados (Supabase, Google Sheets via API, etc.) mais
      pra frente sem precisar refazer o formulário.
- [ ] Se quiserem cobrar o ingresso online no futuro, é possível integrar um
      gateway de pagamento brasileiro (ex: Mercado Pago) na página `/ingressos`.

## Estrutura do projeto

```
src/
  app/
    page.tsx              # Home
    sobre/page.tsx         # História
    atracoes/page.tsx      # Atrações
    ingressos/page.tsx      # Preços + formulário de reserva
    contato/page.tsx        # Contato + mapa
    sitemap.ts               # Gera /sitemap.xml
    robots.ts                # Gera /robots.txt
  components/               # Header, Footer, formulário (ReservaForm), mapa, etc.
  lib/
    constants.ts             # Todas as informações do parque (editar aqui!)
  types/reserva.ts            # Tipos do formulário de reserva
```
