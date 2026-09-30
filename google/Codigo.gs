/**
 * CANTA Talentos — recebe inscrições do site e salva na planilha + anexos no Drive.
 * Cole este código em: Planilha > Extensões > Apps Script.
 */
const SPREADSHEET_ID = '10-stOAE7eN2d0QbJlPpxGZtOYU4RvzyN5zKxnydmp4U';
const FOLDER_ID = '1cvMGwVP0pJ50-PDexMKhQ5LA0zWodk3R';
const SHEET_NAME = 'Inscricoes';

const HEADERS = [
  'Data/Hora', 'Nome completo', 'E-mail', 'Área/Equipe', 'Nome do talento/projeto',
  'Categoria', 'Descrição', 'Tipo de participação', 'Link externo',
  'Foto', 'Vídeo', 'Áudio', 'Autorizou divulgação', 'ID da inscrição',
];

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function saveFile_(folder, file, prefix) {
  if (!file || !file.data) return '';
  const blob = Utilities.newBlob(Utilities.base64Decode(file.data), file.type, prefix + ' - ' + file.name);
  return folder.createFile(blob).getUrl();
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const d = JSON.parse(e.postData.contents);
    const required = ['name', 'email', 'area', 'talentName', 'category', 'description'];
    for (const k of required) {
      if (!d[k] || String(d[k]).trim() === '') return json_({ ok: false, error: 'Preencha todos os campos obrigatórios.' });
    }
    if (!d.authorized) return json_({ ok: false, error: 'É preciso autorizar a divulgação do conteúdo.' });

    const sh = getSheet_();
    const email = String(d.email).toLowerCase().trim();

    // Regra: apenas 1 inscrição individual por e-mail
    if (d.participation === 'individual' && sh.getLastRow() > 1) {
      const rows = sh.getRange(2, 3, sh.getLastRow() - 1, 6).getValues(); // colunas C..H
      const dup = rows.some(r => String(r[0]).toLowerCase().trim() === email && r[5] === 'individual');
      if (dup) return json_({ ok: false, error: 'Este e-mail já possui uma inscrição individual. Projetos em dupla ou grupo podem ser enviados à vontade!' });
    }

    const id = Utilities.getUuid().slice(0, 8).toUpperCase();
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const prefix = id + ' - ' + d.name;

    sh.appendRow([
      new Date(), d.name, email, d.area, d.talentName, d.category, d.description,
      d.participation, d.externalLink || '',
      saveFile_(folder, d.photo, prefix), saveFile_(folder, d.video, prefix), saveFile_(folder, d.audio, prefix),
      'Sim', id,
    ]);

    return json_({ ok: true, id: id });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Erro ao salvar a inscrição. Tente novamente em instantes.' });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, status: 'Inscrições CANTA Talentos ativas' });
}
