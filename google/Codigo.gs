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
  'Foto', 'Vídeo', 'Áudio', 'PDF', 'Autorizou divulgação', 'ID da inscrição',
];

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  } else {
    // Garante que todas as colunas existam, mesmo em planilhas criadas por versões antigas
    const existing = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    const missing = HEADERS.filter(h => existing.indexOf(h) === -1);
    if (missing.length) {
      sh.getRange(1, sh.getLastColumn() + 1, 1, missing.length).setValues([missing]).setFontWeight('bold');
    }
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function saveFile_(folder, file, prefix) {
  if (!file || !file.data) return '';
  let created;
  try {
    const blob = Utilities.newBlob(Utilities.base64Decode(file.data), file.type || 'application/octet-stream', prefix + ' - ' + file.name);
    created = folder.createFile(blob);
  } catch (err) {
    console.error('Falha ao salvar arquivo no Drive: ' + err);
    return 'ERRO ao salvar arquivo: ' + err;
  }
  // Tenta liberar o link; se a conta/empresa bloquear, o arquivo continua salvo na pasta
  try {
    created.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    console.warn('Não foi possível liberar o link público: ' + err);
  }
  return created.getUrl();
}

// Escreve cada valor na coluna certa, pelo nome do cabeçalho (não pela posição)
function appendRowByHeader_(sh, valuesByHeader) {
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
  const row = headers.map(h => valuesByHeader[h] !== undefined ? valuesByHeader[h] : '');
  sh.appendRow(row);
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

    appendRowByHeader_(sh, {
      'Data/Hora': new Date(),
      'Nome completo': d.name,
      'E-mail': email,
      'Área/Equipe': d.area,
      'Nome do talento/projeto': d.talentName,
      'Categoria': d.category,
      'Descrição': d.description,
      'Tipo de participação': d.participation,
      'Link externo': d.externalLink || '',
      'Foto': saveFile_(folder, d.photo, prefix),
      'Vídeo': saveFile_(folder, d.video, prefix),
      'Áudio': saveFile_(folder, d.audio, prefix),
      'PDF': saveFile_(folder, d.pdf, prefix),
      'Autorizou divulgação': 'Sim',
      'ID da inscrição': id,
    });

    return json_({ ok: true, id: id });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Erro ao salvar a inscrição. Tente novamente em instantes.', detalhe: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, status: 'Inscrições CANTA Talentos ativas', versao: 'v4-anexos-corrigidos' });
}
