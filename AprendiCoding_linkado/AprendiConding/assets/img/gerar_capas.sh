#!/usr/bin/env bash
# Gera imagens de capa (SVG) para os cards de curso, coloridas por categoria.
set -euo pipefail

OUT="C:/Users/Cesar/Documents/teste-claude/espaco-mana/AprendiConding/AprendiCoding_linkado/AprendiConding/assets/img"

# id;categoria;cor;icone
cursos=(
  "1;web;#0f3691;M20 13h24v38H20zM20 13h14v14H20zM34 27h10v10H34z"
  "2;dados;#10b981;M3 6h18M3 12h18M3 18h18M15 13l5 2v3c0 1.1-.9 2-2 2"
  "3;web;#0f3691;M20 13h24v38H20zM20 13h14v14H20zM34 27h10v10H34z"
  "4;dados;#10b981;M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3c0 1.1-.9 2-2 2"
  "5;linguagens;#f59e0b;M3 4h18v12H3zM10.5 8 10.5 12.5 14.5 10.25M9 20h6M12 16v4"
  "6;linguagens;#f59e0b;M3 4h18v12H3zM10.5 8 10.5 12.5 14.5 10.25M9 20h6M12 16v4"
  "7;web;#0f3691;M20 13h24v38H20zM20 13h14v14H20zM34 27h10v10H34z"
  "8;dados;#10b981;M3 6h18M3 12h18M3 18h18M15 13l5 2v3c0 1.1-.9 2-2 2"
  "9;dados;#10b981;M12 6c-2-1.3-5-1.5-8-1v13c3-.5 6-.3 8 1 2-1.3 5-1.5 8-1V5c-3-.5-6-.3-8 1zM12 6v13"
  "10;linguagens;#f59e0b;M3 4h18v12H3zM10.5 8 10.5 12.5 14.5 10.25M9 20h6M12 16v4"
  "11;web;#0f3691;M20 13h24v38H20zM20 13h14v14H20zM34 27h10v10H34z"
)

for entrada in "${cursos[@]}"; do
  IFS=';' read -r id categoria cor icone <<< "$entrada"
  cat > "$OUT/curso-${id}.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" aria-label="Capa do curso ${id} - ${categoria}">
  <defs>
    <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${cor}" />
      <stop offset="100%" stop-color="${cor}" />
    </linearGradient>
  </defs>
  <rect width="300" height="200" rx="16" fill="url(#g${id})" />
  <path d="${icone}" fill="none" stroke="#ffffff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" transform="translate(50 30) scale(1.6)" />
</svg>
EOF
  echo "criado curso-${id}.svg ($categoria)"
done

echo "Concluído: $(ls "$OUT" | wc -l) arquivos."
