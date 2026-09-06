// Todas as informações "de negócio" do parque ficam centralizadas aqui.
// Conteúdo confirmado a partir do briefing oficial preenchido pelo proprietário (set/2026).

export const PARK = {
  nome: "Moinho Ghinzelli",
  cidade: "Antônio Prado",
  estado: "RS",
  tagline: "Mais de 130 anos de história, natureza e tradição italiana em Antônio Prado, RS",

  endereco: "Capela São Roque, Linha 10 de Julho — interior de Antônio Prado/RS",
  enderecoObs: "Zona rural da Serra Gaúcha. Use o link do Google Maps abaixo para chegar certinho.",
  mapsEmbedQuery: "Moinho Ghinzelli, Capela São Roque, Antônio Prado, RS",
  mapsUrl: "https://maps.app.goo.gl/B9GVA6xLVoYJa6Zf6?g_st=iw",

  whatsappNumero: "5554999129216",
  whatsappDisplay: "(54) 99912-9216",
  instagramUrl: "https://www.instagram.com/moinhoghinzelli/",
  instagramHandle: "@moinhoghinzelli",
  facebookUrl: "https://www.facebook.com/share/1D3Ggu8UoK/?mibextid=wwXIfr",

  horarioResumo: "Sábados e domingos, das 13h30 às 18h30",
  horarioObs:
    "Sem necessidade de reserva prévia. A visitação guiada à casa e ao moinho acontece de hora em hora. Fora desses dias ou horários, agende com no mínimo 1 dia de antecedência, exclusivamente pelo WhatsApp.",
  climaObs:
    "Em caso de mau tempo, o funcionamento do parque pode ser alterado. Consulte nossas redes sociais ou o WhatsApp antes de vir.",

  precos: {
    parque: {
      label: "Entrada no parque",
      valor: "R$ 15",
      obs: "Grátis até 3 anos",
      inclui: [
        "Estacionamento, banheiros e parque infantil",
        "Trilhas e áreas de descanso",
        "Passeio de Carreto",
        "Degustação da Cachaça do Moinho",
      ],
    },
    guiada: {
      label: "Visitação guiada à casa e ao moinho",
      valor: "R$ 40",
      obsCrianca: "R$ 20 de 4 a 8 anos",
      obsBebe: "Grátis até 3 anos",
      obs: "Ingresso adicional à entrada do parque",
    },
  },

  reserva: {
    grupos:
      "Grupos acima de 15 pessoas, agências e guias de turismo, e escolas e instituições (turismo pedagógico) têm condições e valores especiais. Fale pelo WhatsApp para consultar disponibilidade.",
    foraDoHorario:
      "Reservas durante a semana ou fora do horário regular são cobradas no valor integral (parque + visita guiada) e exigem sinal de 30% para confirmar; o restante é pago no dia da visita.",
  },

  fundacao: {
    ano: 1894,
    fundador: "Cesare Ghinzelli",
    herdeiro: "Estevão Ghinzelli",
    fraseDestaque:
      "Visitar o Moinho Ghinzelli é vivenciar uma história que começou em 1894 e continua sendo escrita, geração após geração.",
  },
} as const;

export const ATRACOES = [
  {
    titulo: "Parque e espaços de lazer",
    descricao:
      "Uma ampla área ao ar livre cercada pela natureza, com estacionamento, banheiros, parque infantil, trilhas e áreas de descanso — diversos cantos para contemplar a paisagem e aproveitar em família ou com amigos.",
    imagem: "/images/parque.jpg",
  },
  {
    titulo: "Visitação guiada à casa e ao moinho",
    descricao:
      "Com acompanhamento de um guia, o visitante conhece uma casa que preserva estrutura, mobiliário, objetos e documentos originais de diferentes épocas, além de acompanhar de perto as engrenagens do moinho — com mais de 130 anos de história — fazendo a farinha.",
    imagem: "/images/moinho-interior.jpg",
  },
  {
    titulo: "Trilhas e recantos da natureza",
    descricao:
      "A Trilha do Pinheiro, o caminho até a Cascata, o percurso que leva ao Rodão (onde fica a roda d'água) e o Espaço de Redes: diferentes cantos espalhados pela propriedade, cada um com seu encanto e sua experiência.",
    imagem: "/images/cachoeira.jpg",
  },
  {
    titulo: "Passeio de Carreto",
    descricao:
      "O tradicional passeio de carreto percorre a propriedade e mostra diferentes áreas do Moinho de um jeito especial e divertido — uma experiência que agrada visitantes de todas as idades.",
    imagem: "/images/passeio-carreto.jpg",
  },
  {
    titulo: "Bodega do Moinho",
    descricao:
      "Sabores, bebidas, produtos artesanais e lembranças do Moinho. Prove no local ou leve para casa a farinha de milho moída no próprio moinho e a famosa Cachaça do Moinho, além de um cardápio com tábuas, pizzas, porções, vinhos e espumantes.",
    imagem: "/images/bodega.jpg",
  },
  {
    titulo: "Galpão de Eventos",
    descricao:
      "Um espaço completo para locação, preparado para aniversários, casamentos, eventos corporativos, confraternizações e ocasiões especiais — unindo estrutura, natureza e o charme histórico da propriedade.",
    imagem: "/images/galpao-eventos.jpg",
  },
] as const;

export const HISTORIA_TEXTO = [
  "Em 1894, na comunidade de São Roque, interior de Antônio Prado, o imigrante italiano Cesare Ghinzelli construiu um moinho movido pela força da água. A ideia era simples e essencial: transformar em farinha o alimento cultivado na própria terra, para sustento da família e de toda a comunidade ao redor.",
  "O moinho nasceu do trabalho, da necessidade e da criatividade de quem ajudou a construir a vida na região. Ao lado dele, a família preservou também a casa e os espaços do cotidiano da época, formando um conjunto que resiste até hoje como um retrato fiel de outros tempos. Com o passar dos anos, Cesare deixou o moinho como legado ao filho, Estevão Ghinzelli, que deu continuidade à atividade e manteve viva a tradição por muitos anos.",
  "Anos depois, esse patrimônio de família ganhou um novo significado: o neto de Estevão, ao lado do pai e de toda a família, retomou o cuidado do espaço e passou a enxergá-lo não apenas como uma construção antiga, mas como uma história que precisava ser preservada e compartilhada. Assim, o Moinho Ghinzelli voltou a ganhar vida — a casa, o moinho e seus elementos originais foram preservados, e a água voltou a ser parte essencial da experiência de quem visita o local.",
  "Hoje, mais de 130 anos depois de sua construção, o Moinho Ghinzelli é um lugar onde história, natureza, cultura e gastronomia se encontram — um convite para caminhar, ouvir histórias e sentir de perto o que foi vivido por quem construiu suas raízes nesta terra. Visitar o Moinho Ghinzelli é vivenciar uma história que começou em 1894 e continua sendo escrita, geração após geração.",
];

export const PRODUTOS_TEXTO = [
  "A Bodega do Moinho reúne uma seleção de produtos que valorizam os sabores, a cultura e o trabalho de Antônio Prado, com itens de diferentes produtores locais para degustar no local ou levar para casa. O espaço conta também com um setor de artesanato e uma área dedicada a alimentos produzidos no próprio Moinho e por parceiros da região.",
  "Para quem quer ficar um pouco mais, a Bodega oferece um cardápio completo — tábuas de frios, pizzas, porções, bebidas, vinhos e espumantes — em um ambiente acolhedor. Os destaques da casa são a farinha de milho moída no próprio moinho original e a famosa Cachaça do Moinho, produzidas e vendidas exclusivamente aqui.",
];
