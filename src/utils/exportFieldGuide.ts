import { FieldGuideData } from './takeawayGenerator';

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function downloadFullFieldGuidePng(guide: FieldGuideData): void {
  const width = 1080;
  const pad = 64;
  const innerWidth = width - pad * 2;
  const measureCanvas = document.createElement('canvas');
  measureCanvas.width = width;
  const mctx = measureCanvas.getContext('2d');
  if (!mctx) return;

  type Block =
    | { kind: 'header' }
    | { kind: 'section'; title: string; color: string }
    | { kind: 'card'; title: string; subtitle?: string; body: string; script?: string; borderColor: string };

  const blocks: Block[] = [{ kind: 'header' }];

  blocks.push({ kind: 'section', title: 'YOUR STRENGTHS', color: '#FF1744' });
  guide.strengths.forEach((s, idx) => {
    blocks.push({
      kind: 'card',
      title: `${idx + 1}. ${s.title}`,
      subtitle: s.evidence,
      body: s.explanation,
      borderColor: '#10B981',
    });
  });

  blocks.push({ kind: 'section', title: 'WHAT YOU COULD WORK ON', color: '#FBBF24' });
  guide.opportunities.forEach((opp, idx) => {
    blocks.push({
      kind: 'card',
      title: guide.opportunities.length > 1 ? `${idx + 1}. ${opp.label}` : opp.label,
      subtitle: opp.evidence,
      body: opp.text,
      borderColor: '#FBBF24',
    });
  });

  blocks.push({ kind: 'section', title: 'WHAT TO TRY NEXT', color: '#00F0FF' });
  guide.actions.forEach((act, idx) => {
    blocks.push({
      kind: 'card',
      title: guide.actions.length > 1 ? `${idx + 1}. ${act.title}` : act.title,
      body: act.action,
      script: act.exampleScript,
      borderColor: '#00F0FF',
    });
  });

  blocks.push({ kind: 'section', title: 'ACROSS COMMUNITIES', color: '#C084FC' });
  blocks.push({
    kind: 'card',
    title: guide.crossWorldLesson.title,
    subtitle: guide.crossWorldLesson.worldContext,
    body: guide.crossWorldLesson.text,
    borderColor: '#C084FC',
  });

  if (guide.reflections.length > 0) {
    blocks.push({ kind: 'section', title: 'YOUR SCENARIO CHOICES', color: '#94A3B8' });
    guide.reflections.forEach((r) => {
      blocks.push({
        kind: 'card',
        title: `Chapter ${r.chapter} · ${r.topic}: "${r.youChose}"`,
        body: r.crossChapterNote || r.whatYouLeanedToward,
        borderColor: '#475569',
      });
    });
  }

  // First pass: measure total height cleanly
  let y = 56;
  const cardPad = 24;
  const contentW = innerWidth - cardPad * 2;
  const measuredHeights: number[] = [];

  for (const b of blocks) {
    if (b.kind === 'header') {
      const h = 156;
      measuredHeights.push(h);
      y += h + 24;
    } else if (b.kind === 'section') {
      const h = 42;
      measuredHeights.push(h);
      y += h + 12;
    } else {
      let ch = cardPad * 2;
      mctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      const titleLines = wrapLines(mctx, b.title, contentW);
      ch += titleLines.length * 34;

      if (b.subtitle) {
        mctx.font = '600 18px monospace';
        const subLines = wrapLines(mctx, b.subtitle, contentW);
        ch += 8 + subLines.length * 24;
      }

      mctx.font = '22px system-ui, -apple-system, sans-serif';
      const bodyLines = wrapLines(mctx, b.body, contentW);
      ch += 12 + bodyLines.length * 31;

      if (b.script) {
        mctx.font = 'italic 20px system-ui, -apple-system, sans-serif';
        const scriptLines = wrapLines(mctx, b.script, contentW - 24);
        ch += 18 + scriptLines.length * 28 + 20;
      }

      measuredHeights.push(ch);
      y += ch + 18;
    }
  }

  mctx.font = '18px system-ui, -apple-system, sans-serif';
  const disclaimerLines = wrapLines(mctx, guide.disclaimer, innerWidth);
  const footerHeight = 40 + disclaimerLines.length * 25 + 48;
  const totalHeight = y + footerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = totalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Solid deep slate background
  ctx.fillStyle = '#060810';
  ctx.fillRect(0, 0, width, totalHeight);

  let cy = 56;
  blocks.forEach((b, idx) => {
    const bh = measuredHeights[idx];
    if (b.kind === 'header') {
      ctx.fillStyle = '#0D1322';
      ctx.fillRect(pad, cy, innerWidth, bh);
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 3;
      ctx.strokeRect(pad, cy, innerWidth, bh);

      ctx.fillStyle = '#FFE600';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('RA: ACROSS THE MULTI-DOORS', pad + 26, cy + 40);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px system-ui, -apple-system, sans-serif';
      ctx.fillText(guide.title.toUpperCase(), pad + 26, cy + 90);

      ctx.fillStyle = '#00F0FF';
      ctx.font = '600 20px monospace';
      ctx.fillText(
        `SETTING: ${guide.community.toUpperCase()}  •  ${guide.answeredCount}/${guide.totalDecisions} SCENARIOS`,
        pad + 26,
        cy + 128
      );

      // Draw solid black Spider-Man chest emblem on textured red suit badge
      const answeredChs = new Set(guide.reflections.map((r) => r.chapter));
      const bw = 132;
      const bhBox = 112;
      const bx = pad + innerWidth - bw - 18;
      const by = cy + 22;
      ctx.save();
      ctx.beginPath();
      ctx.rect(bx, by, bw, bhBox);
      ctx.clip();

      // Rich crimson suit fill + dark blue waist corners
      const grad = ctx.createRadialGradient(bx + bw * 0.5, by + bhBox * 0.4, 8, bx + bw * 0.5, by + bhBox * 0.5, bw * 0.7);
      grad.addColorStop(0, '#E11D2F');
      grad.addColorStop(1, '#8B0B17');
      ctx.fillStyle = grad;
      ctx.fillRect(bx, by, bw, bhBox);

      // Subtle black suit webbing
      ctx.strokeStyle = 'rgba(17, 19, 24, 0.78)';
      ctx.lineWidth = 1.1;
      const cx0 = bx + bw * 0.5;
      const cy0 = by + 28;
      const spokes = [
        [cx0, by], [cx0, by + bhBox],
        [bx + 42, by], [bx + 90, by],
        [bx, by + 18], [bx + bw, by + 18],
        [bx, by + 48], [bx + bw, by + 48],
        [bx + 18, by + bhBox], [bx + bw - 18, by + bhBox],
      ];
      for (const [tx, ty] of spokes) {
        ctx.beginPath();
        ctx.moveTo(cx0, cy0);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(cx0, cy0 + 18, 44, 30, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx0, cy0 + 22, 64, 46, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Dark blue lower-side waist framing
      ctx.fillStyle = '#143161';
      ctx.beginPath();
      ctx.moveTo(bx, by + 56);
      ctx.lineTo(bx + 20, by + bhBox);
      ctx.lineTo(bx, by + bhBox);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bx + bw, by + 56);
      ctx.lineTo(bx + bw - 20, by + bhBox);
      ctx.lineTo(bx + bw, by + bhBox);
      ctx.closePath();
      ctx.fill();

      // Solid black Spider-Man chest emblem legs (mapped to Ch 2, 3, 4, 6)
      const scaleX = bw / 132;
      const drawLegPoly = (pts: [number, number][], active: boolean) => {
        for (const mirror of [false, true]) {
          ctx.beginPath();
          pts.forEach(([px, py], i) => {
            const rx = mirror ? bx + bw - px * scaleX : bx + px * scaleX;
            const ry = by + py;
            if (i === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          });
          ctx.closePath();
          if (active) {
            ctx.fillStyle = '#0B0B0F';
            ctx.fill();
          } else {
            ctx.strokeStyle = 'rgba(40, 5, 10, 0.45)';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      };

      drawLegPoly([[61, 41], [47, 33], [51, 14], [41, 36], [60, 42]], answeredChs.has(2));
      drawLegPoly([[60, 42], [37, 35], [44, 9], [31, 34], [59, 44]], answeredChs.has(3));
      drawLegPoly([[59, 45], [39, 47], [52, 84], [45, 50], [59, 46]], answeredChs.has(4));
      drawLegPoly([[59, 47], [30, 47], [46, 101], [35, 50], [59, 48]], answeredChs.has(6));

      // Solid black central spider head + faceted abdomen
      if (answeredChs.size > 0) {
        ctx.fillStyle = '#0B0B0F';
        ctx.beginPath();
        ctx.moveTo(cx0 - 5, by + 35);
        ctx.lineTo(cx0 + 5, by + 35);
        ctx.lineTo(cx0 + 6, by + 40);
        ctx.lineTo(cx0 - 6, by + 40);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx0 - 5, by + 43);
        ctx.lineTo(cx0 + 5, by + 43);
        ctx.lineTo(cx0 + 7, by + 48);
        ctx.lineTo(cx0, by + 66);
        ctx.lineTo(cx0 - 7, by + 48);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, bw, bhBox);

      cy += bh + 24;
    } else if (b.kind === 'section') {
      ctx.fillStyle = b.color;
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      ctx.fillText(b.title, pad, cy + 30);
      cy += bh + 12;
    } else {
      ctx.fillStyle = '#0B101D';
      ctx.fillRect(pad, cy, innerWidth, bh);
      ctx.strokeStyle = b.borderColor;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(pad, cy, innerWidth, bh);

      let ty = cy + cardPad + 26;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      for (const l of wrapLines(ctx, b.title, contentW)) {
        ctx.fillText(l, pad + cardPad, ty);
        ty += 34;
      }

      if (b.subtitle) {
        ty += 4;
        ctx.fillStyle = '#38BDF8';
        ctx.font = '600 18px monospace';
        for (const l of wrapLines(ctx, b.subtitle, contentW)) {
          ctx.fillText(l, pad + cardPad, ty);
          ty += 24;
        }
      }

      ty += 10;
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '22px system-ui, -apple-system, sans-serif';
      for (const l of wrapLines(ctx, b.body, contentW)) {
        ctx.fillText(l, pad + cardPad, ty);
        ty += 31;
      }

      if (b.script) {
        ty += 10;
        const scriptLines = wrapLines(ctx, b.script, contentW - 24);
        const boxH = scriptLines.length * 28 + 20;
        ctx.fillStyle = '#060A14';
        ctx.fillRect(pad + cardPad, ty - 18, contentW, boxH);
        ctx.fillStyle = '#FFE600';
        ctx.font = 'italic 20px system-ui, -apple-system, sans-serif';
        let sy = ty + 8;
        for (const l of scriptLines) {
          ctx.fillText(l, pad + cardPad + 12, sy);
          sy += 28;
        }
      }

      cy += bh + 18;
    }
  });

  cy += 16;
  ctx.fillStyle = '#94A3B8';
  ctx.font = '18px system-ui, -apple-system, sans-serif';
  for (const l of disclaimerLines) {
    ctx.fillText(l, pad, cy);
    cy += 25;
  }

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'my-ra-field-guide.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
