# Site — Eluan Jesus Fotografia

## Estrutura do projeto

- `index.html` — a estrutura das seções. Você raramente precisa mexer aqui.
- `style.css` — cores, tipografia, espaçamento, layout.
- `data.js` — **é aqui que você mexe no dia a dia**: adicionar, remover ou trocar fotos e álbuns.
- `app.js` — lê o `data.js` e monta as galerias na página; também cuida do menu mobile e das animações de entrada. Raramente precisa mexer aqui.
- `images/` — suas fotos, já organizadas por seção.

## Paleta e interação da grade

As cores mudaram para uma paleta "hora dourada": dourado (Retratos), terracota (Casamentos & Eventos) e azul-ardósia (Paisagens) — tons de `style.css`, seção `:root`. Cada foto da grade aparece como um bloco colorido com um "+"; a foto de verdade só aparece ao clicar, numa janela (lightbox) com legenda, setas pra navegar e fecha com Esc ou clicando fora.

## Carrossel do topo (hero)

O array `destaques` em `data.js` alimenta o carrossel de entrada — use de 4 a 6 fotos horizontais e marcantes, já que são as primeiras que a pessoa vê. O carrossel troca de foto sozinho, pausa ao passar o mouse, e avança se a pessoa clicar na imagem. Se a pessoa tiver a preferência de "reduzir movimento" ativada no sistema, ele para de trocar sozinho (mas o clique continua funcionando).

## Como adicionar ou trocar uma foto

1. Salve o arquivo de imagem na pasta certa dentro de `images/` (ex: `images/retratos/01.jpg`).
2. Abra `data.js` e, no item correspondente, preencha `src` com o caminho do arquivo.
3. Escreva um `alt` de verdade (descrição curta da foto — importante pra acessibilidade e SEO) e ajuste o `caption` com os dados reais da foto, se quiser manter as legendas técnicas.
4. Se ainda não tiver a foto, deixe `src` vazio — o espaço continua aparecendo como placeholder.

## Preparando as fotos antes de subir

Arquivos direto da câmera costumam ser pesados demais pra web:

- Redimensione para no máximo ~2000px no lado maior.
- Exporte em JPEG com qualidade ~80–85%, ou WebP se quiser arquivos ainda menores.
- No Lightroom: use "Exportar" com essas configurações.
- No Linux, pra fazer isso em lote com ImageMagick:
  ```
  mogrify -resize 2000x2000\> -quality 85 *.jpg
  ```

## Adicionando um álbum novo

Em `data.js`, adicione um novo objeto no array `albuns` com `cover`, `title`, `desc` e `link`. Por enquanto o `link` de cada álbum é só um `#` — quando você quiser, dá pra transformar isso numa página própria por álbum (posso ajudar nessa próxima etapa).

## Adicionando uma seção ou galeria nova

Isso envolve os três arquivos: a seção em `index.html`, o estilo (se precisar de algo novo) em `style.css`, e uma chamada `renderGallery(...)` em `app.js` apontando pros dados novos em `data.js`.
