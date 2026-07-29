# Eluan Jesus — Fotografia (site)

Site estático puro. Sem framework, sem build step, sem dependências.

## Arquivos

- `index.html` — estrutura das seções (hero, retratos, casamentos, paisagens, álbuns, sobre, contato). Raramente muda.
- `style.css` — cores (paleta "hora dourada": dourado/terracota/azul-ardósia em `:root`), tipografia, layout, responsivo.
- `data.js` — conteúdo editável: fotos e álbuns. Edite aqui pro dia a dia, não em `app.js`.
- `app.js` — lê `data.js`, monta galerias, carrossel hero, lightbox, menu mobile, scroll-reveal. Raramente muda.
- `images/<secao>/` — arquivos de foto, uma pasta por seção (destaques, retratos, casamentos, paisagens, sobre, albuns).

## Convenções

- Cada foto em `data.js` é `{ src, alt, caption }`. `src` vazio = mostra placeholder colorido (bloco com "+"); nunca deixar `src` apontando pra arquivo inexistente.
- `alt` precisa ser descrição real (acessibilidade/SEO), não texto genérico tipo "retrato 01".
- `caption` é opcional, dado técnico tipo "50mm · f/5.6 · 1/200s".
- Fotos antes de subir: redimensionar pra no máx ~2000px lado maior, JPEG ~80–85% ou WebP. Lote via ImageMagick: `mogrify -resize 2000x2000\> -quality 85 *.jpg`.
- Álbum novo: adicionar objeto em `siteData.albuns` (`cover`, `title`, `desc`, `link`). `link` hoje é sempre `#` — sem página própria por álbum ainda.
- Seção/galeria nova: mexe nos três — `index.html` (marcação), `style.css` (se precisar estilo novo), `app.js` (chamada `renderGallery(...)` apontando pro array novo em `data.js`).

## Deploy

Netlify, direto da raiz do repo (`netlify.toml` define `publish = "."`, sem build command — é HTML/CSS/JS puro, servido como está).

## Gaps conhecidos (ver README.md pra detalhe)

- `images/*` só tem `LEIA-ME.txt`, nenhuma foto real ainda — todo `src` em `data.js` está vazio.
- Seção Sobre: foto de perfil comentada em `index.html`, texto biográfico com placeholder `[Escreva aqui...]`.
- Footer: `[sua cidade, estado]` sem preencher.
- Contato: Instagram e WhatsApp ainda são `href="#"`.
