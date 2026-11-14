/**
 * Jelajah Jurusan | penerima catatan kunjungan + penyedia data dasbor.
 * Project terpisah dari penerima hasil, supaya jalur hasil tidak tersentuh.
 * Sheet: YOUR_SPREADSHEET_ID
 * Deploy: Web app > Execute as: Me > Who has access: Anyone.
 * Rahasia: Script Property HIT_SECRET (kalau kosong, pakai SECRET di bawah).
 */
const SS_ID = "YOUR_SPREADSHEET_ID";
const SECRET = "133684bc4d8b51f688e4089289fc71572e156e406b5393d0";
const HIT_HEAD = ["waktu", "perangkat", "kejadian", "babak", "total babak", "versi", "asal", "peramban"];
const HIT_EVENTS = ["buka", "babak", "hasil", "kirim"];

function secret_() {
  const p = PropertiesService.getScriptProperties().getProperty("HIT_SECRET");
  return p || SECRET;
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function clean_(v, n) {
  let x = String(v === null || v === undefined ? "" : v).slice(0, n || 140);
  if (/^[\s]*[=+\-@]/.test(x)) x = "'" + x;
  return x;
}
function sheetWithHead_(ss, name, head) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(head);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, head.length).setFontWeight("bold");
  } else if (sh.getLastColumn() < head.length) {
    sh.getRange(1, 1, 1, head.length).setValues([head]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || !e.postData.contents || e.postData.contents.length > 20000) throw new Error("Data hilang atau terlalu besar.");
    const d = JSON.parse(e.postData.contents);
    if (String(d.auth || "") !== secret_()) throw new Error("Akses tidak diizinkan.");
    if (d.kind !== "hit" || d.app !== "jelajah-jurusan") throw new Error("Format tidak dikenal.");
    const ev = String(d.e || "");
    if (HIT_EVENTS.indexOf(ev) < 0) throw new Error("Kejadian tidak dikenal.");
    if (!/^V-[0-9a-z]{6,20}$/i.test(String(d.vid || ""))) throw new Error("Id perangkat tidak valid.");
    const ss = SpreadsheetApp.openById(SS_ID);
    lock = LockService.getScriptLock(); lock.waitLock(20000);
    const hs = sheetWithHead_(ss, "kunjungan", HIT_HEAD);
    hs.appendRow([
      clean_(d.t0 || new Date().toISOString(), 40), clean_(d.vid, 40), ev,
      Number(d.b) || 0, Number(d.t) || 0, clean_(d.ver, 40), clean_(d.r, 140), clean_(d.ua, 160)
    ]);
    lock.releaseLock(); lock = null;
    return json_({ ok: true, hit: ev });
  } catch (err) {
    return json_({ ok: false, error: String(err.message || err).slice(0, 160) });
  } finally {
    if (lock) { try { lock.releaseLock(); } catch (e2) {} }
  }
}

/** Tab "kunjungan" + "hasil" sebagai array ringkas untuk dasbor. */
function dataPack_() {
  const ss = SpreadsheetApp.openById(SS_ID);
  const out = { ok: true, hasil: [], hits: [] };
  const hs = ss.getSheetByName("hasil");
  if (hs && hs.getLastRow() > 1) {
    const n = hs.getLastRow() - 1;
    const cols = Math.max(19, hs.getLastColumn());
    const vals = hs.getRange(2, 1, n, cols).getValues();
    out.hasil = vals.map(function (r) { return [r[0], r[1], r[8], r[9], r[10], r[11], r[13], r[18]]; });
  }
  const ks = ss.getSheetByName("kunjungan");
  if (ks && ks.getLastRow() > 1) {
    const n = Math.min(ks.getLastRow() - 1, 20000);
    const vals = ks.getRange(ks.getLastRow() - n + 1, 1, n, HIT_HEAD.length).getValues();
    out.hits = vals.map(function (r) { return [r[0], r[1], r[2], r[3], r[4], r[5], r[6]]; });
  }
  return out;
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.data === "1") {
    if (String(p.token || "") !== secret_()) return json_({ ok: false, error: "Akses tidak diizinkan." });
    try { return json_(dataPack_()); }
    catch (err) { return json_({ ok: false, error: String(err.message || err).slice(0, 160) }); }
  }
  return json_({ ok: true, service: "jelajah-jurusan-kunjungan" });
}
