/**
 * Jelajah Jurusan | Google Apps Script, dipasang dari Google Sheet (Extensions > Apps Script).
 * Script Properties WAJIB: INGEST_SECRET (harus sama dengan GOOGLE_SCRIPT_SECRET di Vercel).
 * Script Properties OPSIONAL: NOTIFY_EMAIL (email notifikasi setiap hasil baru).
 * Deploy: Web app > Execute as: Me > Who has access: Anyone.
 * Hasil dikirim dengan nama panggilan (bukan nama lengkap), tanpa avatar/poin. Deduplikasi via kode hasil.
 * Catatan: versi live (deployment YOUR_DEPLOYMENT_ID) juga punya jalur fallback `JJ_SS_ID` + `jj_setup()`
 *         untuk mengisi INGEST_SECRET dari konstanta. Yang di bawah ini versi bersih tanpa rahasia.
 */
const JJ_SS_ID = 'YOUR_SPREADSHEET_ID';
const HEAD = [
  "waktu", "kode", "kuliah dulu", "kerja 1", "kerja 2", "kerja 3", "betah", "catatan kerja",
  "top1", "top2", "top3", "kemantapan", "minat terbaca", "incaran",
  "di luar 22", "bidang luar 1", "terasa pas", "bidang yang kurang", "stabilitas", "json lengkap",
  "industri", "peminatan kuliah", "nama"
];

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function cleanCell_(value, maxLen) {
  let x = String(value === null || value === undefined ? "" : value).slice(0, maxLen || 400);
  // Google Sheets mengenali nilai yang dimulai = + - @ sebagai rumus; paksa teks.
  if (/^[\s]*[=+\-@]/.test(x)) x = "'" + x;
  return x;
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || !e.postData.contents || e.postData.contents.length > 85000) throw new Error("Data hilang atau terlalu besar.");
    const d = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    const required = props.getProperty("INGEST_SECRET");
    if (!required || typeof d.auth !== "string" || d.auth !== required) throw new Error("Akses tidak diizinkan.");
    if (d.app !== "jelajah-jurusan" || !/^JJ-[0-9A-F]{12,32}$/.test(String(d.sid || "")) || !Array.isArray(d.rank) || d.rank.length !== 22) throw new Error("Format hasil tidak valid.");
    const ss = SpreadsheetApp.openById(JJ_SS_ID);
    lock = LockService.getScriptLock(); lock.waitLock(20000);
    let sh = ss.getSheetByName("hasil");
    if (!sh) sh = ss.insertSheet("hasil");
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEAD);
      sh.setFrozenRows(1);
      sh.getRange(1,1,1,HEAD.length).setFontWeight("bold");
    } else if (sh.getLastColumn() < HEAD.length) {
      // Migrasi sheet dari versi lama dengan kolom lebih sedikit.
      sh.getRange(1,1,1,HEAD.length).setValues([HEAD]);
      sh.setFrozenRows(1);
    }
    const rank = d.rank || [], u = d.uji || {}, k = Array.isArray(u.kerja) ? u.kerja : [];
    const out = d.out || {}, ft = d.fit || {}, a = d.ans || {};
    const top = i => rank[i] ? cleanCell_(rank[i][0] + " " + rank[i][1] + "%", 100) : "";
    const row = [
      cleanCell_(d.t, 40), cleanCell_(d.sid, 40), cleanCell_(u.kuliah, 70), cleanCell_(k[0], 70), cleanCell_(k[1], 70), cleanCell_(k[2], 70),
      cleanCell_(u.betah, 40), cleanCell_(u.catatan, 160), top(0), top(1), top(2),
      Number(d.conf) || 0, d.unread ? "tidak" : "ya", cleanCell_((a.incar || []).join(", "), 200),
      cleanCell_(out.level, 30), out.top && out.top[0] ? cleanCell_(out.top[0][0] + " " + out.top[0][1] + "%", 100) : "",
      cleanCell_(ft.pas, 50), cleanCell_(ft.kurang, 160), cleanCell_((d.stab || {}).level, 40),
      JSON.stringify((() => { const { auth, ...rest } = d; return rest; })()).slice(0, 45000),
      cleanCell_(u.industri, 60), cleanCell_(u.peminatan, 90), cleanCell_(d.nama, 40)
    ];
    // Satu kode = satu baris. Feedback/ulasan belakangan meng-update baris yang sama.
    const finder = sh.getRange(1, 2, Math.max(1, sh.getLastRow()), 1).createTextFinder(d.sid).matchEntireCell(true).findNext();
    const existing = finder && finder.getRow() > 1 ? finder.getRow() : null;
    if (existing) sh.getRange(existing, 1, 1, HEAD.length).setValues([row]);
    else sh.appendRow(row);
    lock.releaseLock(); lock = null;
    // Notifikasi email opsional; gagal email tidak membatalkan penyimpanan.
    if (!existing) {
      const email = props.getProperty("NOTIFY_EMAIL");
      if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        try {
          MailApp.sendEmail(email, "Hasil baru Jelajah Jurusan: " + d.sid,
            "Ada peserta menyelesaikan Jelajah Jurusan.\n\nKode: " + d.sid + "\nNama: " + (d.nama || "-") + "\nWaktu: " + d.t +
            "\nTop 3: " + [top(0), top(1), top(2)].join(" | ") + "\nKemantapan: " + (Number(d.conf) || 0) +
            "%\n\nLihat data lengkap di Google Sheet tab 'hasil'.");
        } catch (mailErr) { console.log("Notifikasi email gagal: " + mailErr.message); }
      }
    }
    return jsonResponse_({ ok: true, sid: d.sid, updated: !!existing });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err.message || err).slice(0, 160) });
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (e) {} }
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: "jelajah-jurusan-receiver" });
}

/** Cek apakah INGEST_SECRET sudah terpasang di Script Properties. */
function jj_cek_secret() {
  var v = PropertiesService.getScriptProperties().getProperty('INGEST_SECRET');
  return v ? 'ok (panjang ' + v.length + ')' : 'belum diisi';
}
