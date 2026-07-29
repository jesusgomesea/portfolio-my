// data.js
// Edite este arquivo para adicionar, remover ou substituir fotos e álbuns.
// Cada foto: { src, alt, caption }
//   - src: caminho do arquivo dentro de images/ (ex: "images/retratos/01.jpg"). Vazio = mostra o placeholder.
//   - alt: descrição da foto (acessibilidade e SEO). Escreva algo real quando trocar a foto.
//   - caption: dados técnicos opcionais, tipo "50mm · f/5.6 · 1/200s".

const siteData = {
  // Carrossel do topo (hero). Use fotos horizontais e de impacto — são as primeiras que a pessoa vê.
  destaques: [
    { src: "", alt: "destaque 01", caption: "35mm · f/5.6 · 1/250s" },
    { src: "", alt: "destaque 02", caption: "24mm · f/8 · 1/200s" },
    { src: "", alt: "destaque 03", caption: "85mm · f/5 · 1/320s" },
    { src: "", alt: "destaque 04", caption: "18mm · f/11 · 1/60s" }
  ],
  retratos: [
    { src: "", alt: "retrato 01", caption: "50mm · f/5.6 · 1/200s" },
    { src: "", alt: "retrato 02", caption: "85mm · f/5 · 1/160s" },
    { src: "", alt: "retrato 03", caption: "135mm · f/5.6 · 1/250s" },
    { src: "", alt: "retrato 04", caption: "70mm · f/4.5 · 1/200s" }
  ],
  casamentos: [
    { src: "", alt: "casamento 01", caption: "24mm · f/4.5 · 1/125s" },
    { src: "", alt: "casamento 02", caption: "35mm · f/5 · 1/160s" },
    { src: "", alt: "casamento 03", caption: "55mm · f/5.6 · 1/200s" },
    { src: "", alt: "casamento 04", caption: "90mm · f/5 · 1/250s" }
  ],
  paisagens: [
    { src: "images/paisagens/paisagens01.jpg", alt: "Flor de buganvília rosa sobre muro de tijolos, com vegetação ao fundo", caption: "55mm · f/5.6 · 1/800s" },
    { src: "images/paisagens/paisagens02.jpg", alt: "Pimentas malagueta vermelhas em um pé de pimenta", caption: "135mm · f/5.6 · 1/100s" },
    { src: "images/paisagens/paisagens03.jpg", alt: "Cachorro salsicha farejando vegetação ao ar livre, luz solar entre as folhas", caption: "55mm · f/5.6 · 1/160s" },
    { src: "images/paisagens/paisagens04.jpg", alt: "Frutas vermelha e verde penduradas em galho com folhas, céu desfocado ao fundo", caption: "135mm · f/5.6 · 1/100s" },
    { src: "images/paisagens/paisagens05.jpg", alt: "Torre de telecomunicação vista entre galhos e folhas, contra o céu azul", caption: "55mm · f/5.6 · 1/250s" }
  ],
  albuns: [
    { cover: "images/albuns/niver/niver06.jpg", title: "Aniversário de 80 anos", desc: "Uma tarde em família, com bolo, flores, abraços e recados de carinho.", link: "#" },
    { cover: "", title: "Nome do projeto pessoal", desc: "Uma linha curta contando do que se trata esse trabalho.", link: "#" }
  ]
};
