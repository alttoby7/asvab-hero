# Lead magnets (PDFs in public/)

These PDFs are gated behind the email opt-in (EmailCapture / MathCheatSheetCapture)
and delivered as an instant download on submit. They are public URLs by design.

| File | Source of truth | Rebuild command |
|---|---|---|
| `afqt-math-cheat-sheet.pdf` + `images/afqt-math-cheat-sheet-preview.png` | Typst: `0-AI/Academy-ROTC/Marketing/Books/kdp-books/asvab-math/lead-magnet/afqt-math-cheatsheet.typ` | see below |
| `ar-formula-card.pdf`, `gt-booster-guide.pdf`, `pc-trap-patterns.pdf`, `wk-100-words.pdf`, `study-plan.pdf` | built via the headless-Chrome-from-HTML scripts (older convention) | see `scripts/` |

## Rebuilding the AFQT Math Cheat-Sheet (Typst)

The cheat-sheet is authored in Typst (it shares the toolchain with the ASVAB Math
KDP book). To regenerate after editing the `.typ` source:

```bash
SRC="$HOME/google-drive/0-AI/Academy-ROTC/Marketing/Books/kdp-books/asvab-math/lead-magnet"
# the gated PDF
typst compile "$SRC/afqt-math-cheatsheet.typ" public/afqt-math-cheat-sheet.pdf
# the page-1 preview shown in the capture block
typst compile --format png --ppi 150 --pages 1 \
  "$SRC/afqt-math-cheatsheet.typ" public/images/afqt-math-cheat-sheet-preview.png
```

(`typst` lives at `~/.local/bin/typst`.) Do not hand-edit the PDF; edit the `.typ`
source and recompile so the lead magnet and the book stay in sync.
