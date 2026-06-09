---
description: Diretrizes para conversão de design Figma para HTML/CSS com fidelidade 100%
alwaysApply: true
---
link do design no figma https://www.figma.com/design/BsNkWGoT6gNFDMlJta8ARe/Checklist-LP--Copy-?node-id=0-1&p=f&m=dev


# Figma → HTML/CSS — Regras


## Crie um arquivo chamado index.html


## Postura
- Atuar como Desenvolvedor Front-end Especialista em UX/UI e QA
- Fidelidade 100% ao layout: extrair valores EXATOS do Figma (spacing, font-size, font-weight, line-height, colors, border-radius)
- NUNCA improvisar. Se o design não mostra um elemento, não criá-lo
- Textos devem ser copiados EXATAMENTE como estão no Figma
- Observar sobreposições, camadas e z-index — reproduzir fielmente a ordem de empilhamento do Figma
- Use o Playwright está aí para validar


## Workflow obrigatório
1. Buscar dados do Figma via MCP (`get_figma_data`, `download_figma_images`)
2. Implementar HTML/CSS com valores exatos do Figma
3. Iniciar servidor local se necessário (`python3 -m http.server`)
4. Validar com Playwright MCP: renderizar, tirar screenshot, comparar com Figma
5. Corrigir discrepâncias e repetir até ficar "espelho" do design


## Detalhes críticos frequentemente esquecidos
- **Z-index / camadas**: respeitar a ordem dos children no Figma (bottom→top). Folhas, imagens decorativas e overlaps devem seguir a hierarquia exata
- **Texto com múltiplas cores**: Figma API nem sempre mostra overrides por caractere. Sempre verificar visualmente o render do Figma
- **Fontes custom**: testar carregamento via `browser_evaluate`. Se der erro OTS/cmap, usar `fonttools` para rebuild e converter para WOFF
- **Imagens**: sempre baixar do Figma, nunca gerar. Verificar orientação (inversão)
- **Dots / indicadores**: a ordem das cores importa (ex: claro→escuro, não o inverso)
- **Footer / Header**: separar cada ícone em `<a href="#">` individual com SVG inline — NUNCA usar imagem única para barras de navegação
- **Sobreposições entre seções**: usar `margin-top` negativo + `background: transparent` + `::before` para fundo parcial
- **Overflow**: seções com elementos que se sobrepõem usam `overflow: visible`


## Fontes — ordem de prioridade
1. Tentar extrair do Figma
2. Se não disponível, pedir para a Stefany colocar na pasta `assets/fonts/`
3. Registrar com `@font-face` (WOFF prioritário, TTF fallback)
4. Se a fonte não carregar, diagnosticar com `fonttools` antes de usar fallback


## Validação com Playwright
- Usar `browser_evaluate` para verificar: font loaded, computed styles, offsetTop, z-index
- Comparar valores computados vs esperados do Figma de CADA elemento
- Tirar screenshots seção por seção, não apenas full-page
- Somar alturas das seções e comparar com a altura total do frame Figma


## Idioma
- Sempre responder em Português