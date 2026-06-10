/* ============================================================
   Checklist LP Assaí — interações
   - render das categorias (data-driven)
   - expandir / retrair
   - marcar produtos (Selecione os produtos)
   - baixar lista personalizada (PNG e PDF)
   ============================================================ */
(function () {
  "use strict";

  var BLUE = "#003ca8";
  var ORANGE = "#ea5b0c";
  var YELLOW = "#ffde00";

  var CHEVRON =
    '<svg viewBox="0 0 43 27" fill="none" aria-hidden="true"><path d="M2 2l19.5 21L41 2" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var DL_ICON =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* Título: parte antes do "(" em negrito, parêntese em peso leve */
  function titleHTML(title) {
    var i = title.indexOf("(");
    if (i > 0) {
      return esc(title.slice(0, i)) + '<span class="light">' + esc(title.slice(i)) + "</span>";
    }
    return esc(title);
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function renderCategory(cat) {
    var section = el("section", "cat");
    section.id = "cat-" + cat.id;

    /* Header clicável */
    var header = el("button", "cat__header");
    header.type = "button";
    header.setAttribute("aria-expanded", "false");
    header.setAttribute("aria-controls", "body-" + cat.id);

    var img = el("img", "cat__img");
    img.src = cat.image;
    img.alt = cat.name;
    header.appendChild(img);

    var toggle = el("span", "cat__toggle", "<span>Expandir</span>" + CHEVRON);
    header.appendChild(toggle);
    section.appendChild(header);

    /* Corpo */
    var body = el("div", "cat__body");
    body.id = "body-" + cat.id;
    body.hidden = true;

    cat.sections.forEach(function (sec) {
      if (sec.subtitle) body.appendChild(el("div", "subbar", esc(sec.subtitle)));
      var ul = el("ul", "items");
      sec.items.forEach(function (item) {
        var li = el("li", "item");
        li.dataset.title = item.title;
        li.dataset.desc = item.desc;
        li.dataset.section = sec.subtitle || "";

        var row = el("div", "item__row");
        var check = el("button", "item__check");
        check.type = "button";
        check.setAttribute("aria-label", "Selecionar " + item.title);
        check.setAttribute("aria-pressed", "false");
        row.appendChild(check);

        var txt = el("div", "item__text");
        txt.appendChild(el("h4", "item__title", titleHTML(item.title)));
        if (item.desc) txt.appendChild(el("p", "item__desc", esc(item.desc)));
        row.appendChild(txt);
        li.appendChild(row);

        if (item.tip) li.appendChild(el("div", "item__tip", esc(item.tip)));
        ul.appendChild(li);
      });
      body.appendChild(ul);
    });

    /* Imagem ilustrativa (cover) da categoria */
    if (cat.cover) {
      var cover = el("img", "cat__cover");
      cover.src = cat.cover;
      cover.alt = "Dica do Assaí — " + cat.name;
      cover.loading = "lazy";
      body.appendChild(cover);
    }

    /* Downloads */
    var hint = el("p", "cat__hint", "Selecione os produtos acima para montar a sua lista.");
    body.appendChild(hint);

    var dl = el("div", "downloads");
    var btnPdf = el("button", "btn-download", DL_ICON + "<span>Download PDF</span>");
    btnPdf.type = "button";
    btnPdf.disabled = true;
    var btnPng = el("button", "btn-download", DL_ICON + "<span>Download PNG</span>");
    btnPng.type = "button";
    btnPng.disabled = true;
    dl.appendChild(btnPdf);
    dl.appendChild(btnPng);
    body.appendChild(dl);

    section.appendChild(body);

    /* ---- interações ---- */
    header.addEventListener("click", function () {
      var open = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", String(!open));
      body.hidden = open;
      toggle.querySelector("span").textContent = open ? "Expandir" : "Retrair";
    });

    body.addEventListener("click", function (ev) {
      var c = ev.target.closest(".item__check");
      if (!c) return;
      var li = c.closest(".item");
      var checked = li.classList.toggle("is-checked");
      c.setAttribute("aria-pressed", String(checked));
      updateDownloads();
    });

    function selectedItems() {
      var out = [];
      body.querySelectorAll(".item.is-checked").forEach(function (li) {
        out.push({ title: li.dataset.title, desc: li.dataset.desc, section: li.dataset.section });
      });
      return out;
    }
    function updateDownloads() {
      var n = selectedItems().length;
      btnPdf.disabled = n === 0;
      btnPng.disabled = n === 0;
      hint.textContent = n === 0
        ? "Selecione os produtos acima para montar a sua lista."
        : n + (n === 1 ? " item selecionado." : " itens selecionados.");
    }

    btnPng.addEventListener("click", function () { downloadPNG(cat.name, selectedItems()); });
    btnPdf.addEventListener("click", function () { downloadPDF(cat.name, selectedItems()); });

    return section;
  }

  /* ---------- Geração da lista em PNG (canvas puro) ---------- */
  function buildLines(catName, items) {
    var lines = [];
    var bySec = {};
    var order = [];
    items.forEach(function (it) {
      var k = it.section || "Produtos";
      if (!bySec[k]) { bySec[k] = []; order.push(k); }
      bySec[k].push(it);
    });
    order.forEach(function (sec) {
      lines.push({ type: "sub", text: sec });
      bySec[sec].forEach(function (it) {
        lines.push({ type: "item", text: it.title, desc: it.desc });
      });
    });
    return lines;
  }

  function downloadPNG(catName, items) {
    if (!items.length) return;
    var W = 1080, pad = 60, lh = 40;
    var lines = buildLines(catName, items);
    /* mede altura aproximada */
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var H = 230;
    lines.forEach(function (l) {
      if (l.type === "sub") H += 70;
      else H += lh * 2 + 14;
    });
    H += pad;
    canvas.width = W;
    canvas.height = H;

    ctx.fillStyle = BLUE;
    ctx.fillRect(0, 0, W, H);

    var y = pad;
    ctx.fillStyle = YELLOW;
    ctx.font = "800 46px 'DM Sans', Arial, sans-serif";
    ctx.fillText("Minha Lista de Compras", pad, y + 20);
    y += 58;
    ctx.fillStyle = "#fff";
    ctx.font = "700 30px 'DM Sans', Arial, sans-serif";
    ctx.fillText(catName, pad, y + 18);
    y += 60;
    ctx.strokeStyle = ORANGE;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - pad, y); ctx.stroke();
    y += 40;

    lines.forEach(function (l) {
      if (l.type === "sub") {
        ctx.fillStyle = ORANGE;
        ctx.fillRect(pad, y - 6, W - pad * 2, 44);
        ctx.fillStyle = "#fff";
        ctx.font = "700 26px 'DM Sans', Arial, sans-serif";
        ctx.fillText(l.text, pad + 16, y + 24);
        y += 70;
      } else {
        ctx.fillStyle = "#fff";
        ctx.font = "800 28px 'DM Sans', Arial, sans-serif";
        ctx.fillText("\u2713 " + l.text, pad, y + 22);
        y += lh;
        if (l.desc) {
          ctx.fillStyle = "#cfe0ff";
          ctx.font = "400 22px 'DM Sans', Arial, sans-serif";
          ctx.fillText(l.desc, pad + 36, y + 18);
        }
        y += lh + 14;
      }
    });

    var a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "lista-assai-" + slug(catName) + ".png";
    a.click();
  }

  /* ---------- Geração da lista em PDF (jsPDF + fallback impressão) ---------- */
  function downloadPDF(catName, items) {
    if (!items.length) return;
    var jspdf = window.jspdf && window.jspdf.jsPDF;
    if (!jspdf) { printList(catName, items); return; }

    var doc = new jspdf({ unit: "pt", format: "a4" });
    var M = 48, y = 64, W = doc.internal.pageSize.getWidth();
    doc.setTextColor(0, 60, 168);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Minha Lista de Compras", M, y);
    y += 26;
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.text(catName, M, y);
    y += 14;
    doc.setDrawColor(234, 91, 12);
    doc.setLineWidth(2);
    doc.line(M, y, W - M, y);
    y += 26;

    var lines = buildLines(catName, items);
    lines.forEach(function (l) {
      if (y > doc.internal.pageSize.getHeight() - 60) { doc.addPage(); y = 64; }
      if (l.type === "sub") {
        doc.setFillColor(234, 91, 12);
        doc.rect(M, y - 12, W - M * 2, 20, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(l.text, M + 8, y + 2);
        y += 30;
      } else {
        doc.setTextColor(20, 20, 20);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("[  ] " + l.text, M, y);
        y += 16;
        if (l.desc) {
          doc.setTextColor(90, 90, 90);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          var wrapped = doc.splitTextToSize(l.desc, W - M * 2 - 24);
          doc.text(wrapped, M + 24, y);
          y += 12 * wrapped.length;
        }
        y += 8;
      }
    });

    doc.save("lista-assai-" + slug(catName) + ".pdf");
  }

  function printList(catName, items) {
    var lines = buildLines(catName, items);
    var html = '<html><head><title>Lista Assaí</title><meta charset="utf-8">' +
      '<style>body{font-family:Arial,sans-serif;color:#222;padding:32px}h1{color:#003ca8}' +
      '.sub{background:#ea5b0c;color:#fff;padding:6px 10px;border-radius:4px;margin:14px 0 8px;font-weight:700}' +
      '.it{font-weight:700;margin:6px 0}.d{color:#666;font-weight:400;font-size:13px;margin:0 0 6px 22px}</style></head><body>';
    html += "<h1>Minha Lista de Compras</h1><p>" + esc(catName) + "</p><hr>";
    lines.forEach(function (l) {
      if (l.type === "sub") html += '<div class="sub">' + esc(l.text) + "</div>";
      else html += '<div class="it">&#9744; ' + esc(l.text) + "</div>" + (l.desc ? '<div class="d">' + esc(l.desc) + "</div>" : "");
    });
    html += "</body></html>";
    var w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(function () { w.print(); }, 300);
  }

  function slug(s) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  }

  /* ---------- bootstrap ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("categories");
    if (!root || typeof CATEGORIES === "undefined") return;
    CATEGORIES.forEach(function (cat) { root.appendChild(renderCategory(cat)); });
  });
})();
