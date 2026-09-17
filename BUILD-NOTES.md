# Faithful frontend rebuild

The production `index.html` remains the visual source of truth during the rebuild. Next.js reads that source at build time and emits the approved page as static HTML/CSS. The legacy `app.js` presentation bootstrap is not loaded; `app-core.js` is retained only for genuine interaction behavior.
