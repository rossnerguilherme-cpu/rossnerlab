# Rossner.lab® — arquivos prontos para GitHub Pages

Este pacote contém o site completo: 12 projetos, fotografias, capas, vídeos, animações e contatos. Não precisa instalar programas nem executar comandos.

## Correção do seu repositório atual

Repositório: https://github.com/rossnerguilherme-cpu/rossnerlab
Site: https://rossnerguilherme-cpu.github.io/rossnerlab/

Na conferência de 06/10/2026, a raiz do repositório continha imagens `prancha-*.webp` soltas, mas não as pastas `media/` e `projetos/`. A página `projetos/vowed.html` retornava 404. A organização precisa ser mantida: por exemplo, a capa VOWED fica em `media/vowed/capa.webp`, e seu projeto em `projetos/vowed.html`.

No envio pelo navegador, **arraste as pastas completas**, conforme os três lotes; selecionar somente as imagens de dentro delas e enviá-las à raiz perde os caminhos. Os arquivos soltos já existentes não impedem o novo pacote de funcionar e não precisam ser apagados para esta correção. Substitua os HTML, CSS e JS e acrescente as pastas fornecidas.

## Publicar de graça

1. No GitHub, crie um repositório **público** (por exemplo, `portfolio`) ou abra o repositório em que você já fez o teste.
2. Extraia o ZIP no computador. **O ZIP não deve ser enviado ao GitHub.** Envie seu conteúdo mantendo as pastas. `index.html`, `projetos.html`, `projetos/` e `media/` devem ficar diretamente na raiz do repositório — não dentro de outra pasta `Rossner.lab`, `dist` ou `rossner-lab-github`.
3. Como o site tem mais de 100 arquivos, use o pacote **Rossner.lab-GitHub-envio-em-etapas.zip**: há três lotes, cada um com menos de 100 arquivos. As instruções desse pacote mostram exatamente o que arrastar em cada envio. Se usar GitHub Desktop, pode copiar todo o conteúdo deste pacote de uma vez.
4. No repositório, vá a **Settings → Pages → Build and deployment**. Em **Source**, selecione **Deploy from a branch**; escolha **main** (ou a branch em que enviou os arquivos) e **/(root)**; clique em **Save**.
5. Aguarde o GitHub concluir a publicação. Abra o endereço exibido em **Settings → Pages**. Esse será o link para compartilhar com clientes. O endereço da página do repositório não é o endereço do site.

## Estrutura que deve aparecer na aba Code

```text
index.html
projetos.html
styles.css
portfolio.css
motion.css
app.js
motion.js
.nojekyll
README.md
projetos/
  america-steak-house.html
  decorvitri.html
  hako.html
  haus.html
  konscret.html
  mestre-do-frango.html
  morada-blindada.html
  pepperoni.html
  por-ju.html
  raro-aroma.html
  tomodachi.html
  vowed.html
media/
  america-steak-house/
  decorvitri/
  hako/
  haus/
  konscret/
  mestre-do-frango/
  morada-blindada/
  pepperoni/
  por-ju/
  raro-aroma/
  tomodachi/
  vowed/
```

## Evitar imagens ausentes e páginas com erro

- Envie também todas as subpastas de `media/` e os 12 arquivos de `projetos/`. Apenas os arquivos da página inicial não bastam.
- Não renomeie arquivos, extensões ou pastas; o GitHub diferencia letras maiúsculas e minúsculas.
- Os links são relativos. Funcionam tanto em `usuario.github.io/` quanto em `usuario.github.io/portfolio/`, sem editar o nome do repositório no código.
- Se estiver substituindo uma tentativa anterior, mantenha a estrutura acima na raiz e confirme `/(root)` em Pages. Copiar o pacote para dentro de uma pasta extra muda o endereço da página inicial.
- `.nojekyll` é um arquivo oculto que mantém a publicação estática. No Finder, **Command + Shift + .** mostra arquivos ocultos. Estes HTMLs também funcionam no processamento padrão do Pages, mas prefira incluir o arquivo fornecido.
- No pacote preparado, nenhum arquivo individual ultrapassa 25 MiB; não precisa usar Git LFS.

## Contatos incluídos

- Telefone: 51 99617-6951 (link para ligação).
- E-mail: rossnerguilherme@gmail.com.
- Instagram no rodapé de todas as páginas: @rossner.lab.

## Uso offline

Também é possível abrir `index.html` no computador sem internet, mantendo as pastas juntas. Imagens e vídeos são locais. Instagram, e-mail e links externos dependem dos aplicativos/conexão do dispositivo.

## Referências oficiais

- [Configurar GitHub Pages: plano gratuito, branch e pasta de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Envio pelo navegador: até 100 arquivos por vez e 25 MiB por arquivo](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
