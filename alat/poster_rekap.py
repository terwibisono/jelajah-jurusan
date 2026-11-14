#!/usr/bin/env python3
"""Poster rekap hasil Jelajah Jurusan dari CSV sheet hasil (1080x1350)."""
import csv, json
from collections import Counter, defaultdict
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1350
BG1, BG2 = (223, 241, 242), (191, 227, 230)
INK, MUTED, CARD = (20, 48, 74), (88, 112, 134), (255, 255, 255)
SUN, ACCENT = (255, 201, 60), (239, 106, 76)
ISLC = {'kes': '#e2574c', 'man': '#8a5cd0', 'tek': '#2b7fd6', 'tnk': '#d98a1f', 'bis': '#1f9d76', 'kre': '#e0499a'}
ISLN = {'kes': 'Kesehatan', 'man': 'Manusia', 'tek': 'Teknologi', 'tnk': 'Teknik', 'bis': 'Bisnis', 'kre': 'Kreatif'}
SHORT = {
    'kedokteran': 'Kedokteran', 'keperawatan': 'Keperawatan', 'farmasi': 'Farmasi',
    'kesmas': 'Kesmas, Gizi & K3', 'psikologi': 'Psikologi', 'hukum': 'Hukum',
    'ilkom': 'Ilmu Komunikasi', 'pendidikan': 'Pendidikan', 'informatika': 'Informatika',
    'sidata': 'Sistem Informasi & Sains Data', 'biomedis': 'Teknik Biomedis',
    'industri': 'Teknik Industri', 'sipil': 'Teknik Sipil & Pertambangan',
    'manajemen': 'Manajemen & Bisnis', 'akuntansi': 'Akuntansi & Keuangan',
    'dkv': 'Desain Komunikasi Visual', 'elektro': 'Elektro, Mesin & Telkom',
    'arsitektur': 'Arsitektur & Kota', 'agro': 'Pertanian & Pangan',
    'sospol': 'HI, Politik & Adm. Publik', 'sastra': 'Bahasa & Sastra', 'wisata': 'Pariwisata & Perhotelan',
}
F = '/path/to/.local/share/fonts/Poppins-%s.ttf'
def font(style, size): return ImageFont.truetype(F % style, size)

master = {m['id']: m for m in json.load(open('/tmp/jj_master.json'))['majors']}
rows = list(csv.reader(open('/tmp/jj_hasil2.csv')))
head, data = rows[0], rows[1:]
recs = [dict(zip(head, r)) for r in data]
payloads = [json.loads(r['json lengkap']) for r in recs]

tot = defaultdict(list)
for p in payloads:
    for mid, pc in p['rank']:
        tot[mid].append(pc)
avg = sorted(((sum(v) / len(v), mid) for mid, v in tot.items()), reverse=True)
confs = [p['conf'] for p in payloads]
avgconf = round(sum(confs) / len(confs))
top1s = [(p['rank'][0][0], p['rank'][0][1], p['conf']) for p in payloads]
inc = Counter()
for p in payloads:
    inc.update(p['ans'].get('incar', []))

img = Image.new('RGB', (W, H), BG1)
d = ImageDraw.Draw(img)
for y in range(H):
    t = y / H
    d.line([(0, y), (W, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(BG1, BG2)))

M = 64
def pill(x, y, text, fnt, fg, bg, padx=20, pady=10):
    b = d.textbbox((0, 0), text, font=fnt)
    w, h = b[2] - b[0], b[3] - b[1]
    d.rounded_rectangle([x, y, x + w + padx * 2, y + h + pady * 2], radius=(h + pady * 2) // 2, fill=bg)
    d.text((x + padx, y + pady - b[1]), text, font=fnt, fill=fg)

# header
pill(M, 48, 'REKAP HASIL  ·  13 NOVEMBER 2026', font('SemiBold', 25), (110, 78, 8), SUN, padx=22, pady=11)
d.text((M, 100), 'Jelajah Jurusan', font=font('Bold', 72), fill=INK)
d.text((M, 192), f'{len(recs)} orang sudah selesai main  ·  7 babak  ·  ±15 menit', font=font('Regular', 28), fill=MUTED)

# KPI
ky, kh = 252, 112
kw = (W - M * 2 - 32) // 3
for i, (big, small) in enumerate([(f'{len(recs)}', 'responden'), (f'{avgconf}', 'rata-rata kemantapan'), ('0%', 'minat belum terbaca')]):
    x = M + i * (kw + 16)
    d.rounded_rectangle([x, ky, x + kw, ky + kh], radius=20, fill=CARD)
    b = d.textbbox((0, 0), big, font=font('Bold', 46))
    d.text((x + 24, ky + 16 - b[1]), big, font=font('Bold', 46), fill=ACCENT if i == 0 else INK)
    d.text((x + 24, ky + 74), small, font=font('SemiBold', 20), fill=MUTED)

# section 1 — top 5 jurusan
sy = 396
d.text((M, sy), '5 jurusan paling nyambung', font=font('Bold', 38), fill=INK)
d.text((M, sy + 50), 'rata-rata nilai minat 22 jurusan dari semua responden', font=font('Regular', 22), fill=MUTED)
by = sy + 96
for i, (score, mid) in enumerate(avg[:5]):
    yy = by + i * 62
    col = ISLC[master[mid]['isl']]
    d.ellipse([M, yy + 14, M + 17, yy + 31], fill=col)
    d.text((M + 28, yy + 4), SHORT[mid], font=font('SemiBold', 26), fill=INK)
    d.text((M + 28, yy + 36), ISLN[master[mid]['isl']], font=font('Regular', 18), fill=MUTED)
    bx, bw = 636, 258
    d.rounded_rectangle([bx, yy + 16, bx + bw, yy + 33], radius=8, fill=CARD)
    d.rounded_rectangle([bx, yy + 16, bx + bw * score / 100, yy + 33], radius=8, fill=col)
    d.text((bx + bw + 16, yy + 9), f'{score:.0f}%', font=font('Bold', 25), fill=INK)

# section 2 — pilihan #1
py2 = by + 5 * 62 + 22
d.text((M, py2), 'Pilihan #1 tiap orang', font=font('Bold', 38), fill=INK)
ry = py2 + 58
for i, (mid, pc, conf) in enumerate(top1s):
    y = ry + i * 56
    d.rounded_rectangle([M, y, W - M, y + 50], radius=14, fill=CARD)
    d.rounded_rectangle([M, y, M + 7, y + 50], radius=3, fill=ISLC[master[mid]['isl']])
    d.text((M + 22, y + 7), SHORT[mid], font=font('SemiBold', 23), fill=INK)
    d.text((M + 22, y + 30), ISLN[master[mid]['isl']], font=font('Regular', 16), fill=MUTED)
    d.text((W - M - 24, y + 15), f'minat {pc}%  ·  mantap {conf}', font=font('SemiBold', 21), fill=INK, anchor='ra')

# insight strip
iy = ry + 5 * 56 + 12
d.rounded_rectangle([M, iy, W - M, iy + 84], radius=18, fill=(255, 255, 255))
d.text((M + 24, iy + 14), 'Paling diincar', font=font('SemiBold', 22), fill=MUTED)
d.text((M + 24, iy + 42), '  ·  '.join(SHORT[m] for m, c in inc.most_common(3)), font=font('Bold', 24), fill=INK)

# footer
d.text((M, H - 62), 'jelajah-jurusan.vercel.app', font=font('Bold', 26), fill=INK)
d.text((W - M, H - 58), f'{len(recs)} responden · otomatis masuk Google Sheet', font=font('Regular', 19), fill=MUTED, anchor='ra')

out = '/path/to/jelajah-jurusan/poster_rekap_5.png'
img.save(out, optimize=True)
print('saved', out)
print('strip_y', iy, 'strip_end', iy + 92, 'footer_y', H - 62)
