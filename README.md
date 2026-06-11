# Guia Prático do Comerciante Campeão — Assaí

Landing page interativa do **Guia Prático de Compras** do Assaí Atacadista. O visitante escolhe a categoria do negócio, marca os produtos desejados e baixa uma lista personalizada em **PNG** ou **PDF**.

Produção: [assai.com.br/checklist](https://www.assai.com.br/checklist/)

Design de referência (Figma): ver [`skill.md`](skill.md).

---

## Estrutura do repositório

```
Checklist/
├── index.html              # Protótipo estático (desenvolvimento local)
├── assets/                 # Assets do protótipo estático
│   ├── css/styles.css
│   ├── js/data.js          # Conteúdo das categorias e produtos
│   ├── js/app.js
│   └── img/
│
└── sites/all/themes/assai_checklist/   # Tema Drupal 7 (produção)
    ├── assai_checklist.info
    ├── template.php
    ├── templates/
    │   ├── html.tpl.php
    │   └── page.tpl.php
    ├── css/styles.css
    ├── js/data.js
    ├── js/app.js
    ├── images/
    ├── fonts/              # FS Lola (opcional; fallback: Montserrat)
    └── track/              # Monitoramento (PHP puro, sem banco)
        ├── config.php
        ├── track.php       # Endpoint POST de eventos
        ├── report.php      # Relatório HTML
        └── data/           # events.jsonl (gerado em runtime)
```

O protótipo em `index.html` serve para validar layout e interações localmente. Em produção, o conteúdo vive no **tema Drupal 7** `assai_checklist`.

---

## Instalação no Drupal 7

1. Copie `sites/all/themes/assai_checklist/` para `sites/all/themes/` do Drupal.
2. Em **Aparência**, habilite o tema **Assaí - Guia do Comerciante**.
3. Crie a página na rota desejada (ex.: alias `/checklist`).
4. No **theme-key**, mapeie essa rota para o tema `assai_checklist`.
5. Garanta permissão de escrita em `track/data/`:

   ```bash
   chmod 775 sites/all/themes/assai_checklist/track/data
   ```

6. Altere a chave de acesso em `track/config.php` antes de ir para produção.
7. Limpe o cache do Drupal após cada deploy de arquivos do tema.

### Fontes

A marca usa **FS Lola**. Coloque os arquivos em `fonts/` (WOFF2/WOFF). Enquanto não estiverem disponíveis, o CSS usa **Montserrat** (Google Fonts) como fallback.

---

## Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| Categorias expansíveis | 6 segmentos de negócio (mini mercados, bares, confeiteiros, etc.) |
| Checklist interativo | Marcar/desmarcar produtos com dicas por item |
| Download PNG | Lista gerada via `<canvas>` |
| Download PDF | Lista gerada via [jsPDF](https://github.com/parallax/jsPDF) |
| Monitoramento | Registro de cliques e downloads em arquivo local |

O conteúdo (produtos, dicas, imagens) está em `js/data.js`. Para alterar textos ou adicionar itens, edite esse arquivo e sincronize entre `assets/js/` (protótipo) e `sites/all/themes/assai_checklist/js/` (Drupal).

**Paths de imagem em `data.js`:** use caminhos relativos curtos, por exemplo `images/cat-mini-mercados.png`. O `app.js` resolve a URL completa automaticamente.

---

## Monitoramento

Eventos são gravados em `track/data/events.jsonl` (uma linha JSON por evento), sem banco de dados.

| Tipo | Quando dispara | Dados registrados |
|------|----------------|-------------------|
| `item_toggle` | Marcar/desmarcar produto | categoria, seção, título, checked |
| `download` | Download PNG ou PDF | formato, categoria, quantidade, lista de itens |

Cada registro inclui timestamp (`ts`) e hash pseudonimizado do IP (`ipid`).

### URLs

| Uso | URL |
|-----|-----|
| Relatório | `https://www.assai.com.br/sites/all/themes/assai_checklist/track/report.php?key=SUA_CHAVE` |
| Exportar CSV | Adicione `&download=csv` à URL do relatório (ou use o botão **Baixar CSV**) |
| Diagnóstico | Adicione `&diag=1` à URL do relatório |
| Endpoint (POST) | `https://www.assai.com.br/sites/all/themes/assai_checklist/track/track.php` |

A chave padrão de desenvolvimento está em `track/config.php` (`ASSAI_CHECKLIST_REPORT_KEY`). **Altere em produção.**

### Debug no front-end

Abra a LP com `?track_debug=1` e use o console do navegador (F12):

```
https://www.assai.com.br/checklist/?track_debug=1
```

Logs esperados ao marcar um item:

```
[assai-track] behaviors attach { base: "...", trackUrl: "..." }
[assai-track] POST .../track/track.php { type: "item_toggle", ... }
[assai-track] OK 200 {"ok":true}
```

### Teste manual (curl)

```bash
curl -X POST "https://www.assai.com.br/sites/all/themes/assai_checklist/track/track.php" \
  -H "Content-Type: application/json" \
  -d '{"type":"item_toggle","category":"TESTE","section":"x","title":"Item teste","checked":true}'
```

Resposta esperada: `{"ok":true}`

---

## Desenvolvimento local (protótipo estático)

```bash
# Na raiz do projeto
python -m http.server 8080
```

Abra `http://localhost:8080/index.html`. O monitoramento **não** funciona no protótipo estático (depende do `Drupal.settings` e do endpoint PHP).

---

## Deploy

Arquivos que costumam mudar com mais frequência:

- `sites/all/themes/assai_checklist/js/data.js` — conteúdo
- `sites/all/themes/assai_checklist/js/app.js` — interações e tracking
- `sites/all/themes/assai_checklist/css/styles.css` — estilos
- `sites/all/themes/assai_checklist/images/` — imagens
- `sites/all/themes/assai_checklist/template.php` — assets e configuração JS

Após o upload, limpe o cache do Drupal e faça hard refresh no navegador (Ctrl+Shift+R).

---

## Módulo opcional (`assai_checklist_track`)

Existe um módulo em `sites/all/modules/assai_checklist_track/` que expõe rotas amigáveis (`/checklist/report`, `/checklist/track`). **Não é obrigatório** — em produção o acesso direto aos arquivos PHP do tema funciona normalmente.
