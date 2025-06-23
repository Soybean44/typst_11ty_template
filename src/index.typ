= Hello world

#show raw.where(block: true): it => context {
  block(width: 100% - 0.5em, radius: 0.3em, stroke: luma(60%), inset: 1em, fill: luma(97%))[
    #show raw.line: l => context {
      box(width: measure([#it.lines.last().count]).width, align(right, text(fill:
      luma(50%))[#l.number]))
      h(0.5em)
      l.body
    }
    #it
  ]
}

The following is the time independent Schr$accent(op("o"), diaer)$dinger's equation 

$
- planck.reduce/(2m) nabla^2 psi(x) + V(x) psi(x) = E psi(x)
$

Pretty neat huh.

I can even add code blocks

```bash
sudo rm -rf --no-preserve-root /
```
