// Duas faixas que correm pela tela e aceleram quando a página é rolada
// (animação em Animacoes.tsx). Sem JavaScript, correm por CSS puro.

const LARANJA = ["Desde 1894", "Moinho em funcionamento", "Cascata", "Roda d'água", "Farinha de milho", "Antônio Prado"];
const AZUL = ["Visita guiada", "Bodega do Moinho", "Passeio de carreto", "Trilhas", "Galpão de eventos", "Serra Gaúcha"];

function Trilho({ itens }: { itens: string[] }) {
  // o conteúdo é repetido duas vezes para o laço ficar contínuo (-50%)
  const grupo = [...itens, ...itens];
  return (
    <div className="band__track">
      {[0, 1].map((n) => (
        <div key={n} className="flex shrink-0">
          {grupo.map((t, i) => (
            <span key={`${n}-${i}`}>
              {t} <i className="not-italic">✦</i>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Faixas() {
  return (
    <div className="faixas" aria-hidden="true">
      <div className="band band--laranja">
        <Trilho itens={LARANJA} />
      </div>
      <div className="band band--azul">
        <Trilho itens={AZUL} />
      </div>
    </div>
  );
}
