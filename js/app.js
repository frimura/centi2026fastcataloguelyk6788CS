
'use strict';

/* =========================================================
   1. CONFIGURATION
   ========================================================= */

const CONFIG = {
  spreadsheetId: '1wTJRGfmdAARp9d_qNNQ1UUUssuNo5p9tarxPiYllGLo',
  gid: '0',
  currency: 'IDR',
  cacheKey: 'centi_catalog_rows_v1',
  cartKey: 'centi_catalog_cart_v1',
savedOrdersKey: 'centi_catalog_saved_orders_v1',
  settingsKey: 'centi_catalog_settings_v1',
  identityKey: 'centi_catalog_requester_v1',
  refreshInterval: 5 * 60 * 1000
};
const SUPABASE_URL = 'https://rtvxegwgcjoxcmmojhqk.supabase.co';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_but9O4L_QdZiTDU01hVn7w_UJ3VAYa6';
/* =========================================================
   2. LANGUAGE CONFIGURATION
   ========================================================= */

const LANGUAGE_KEY = 'centi_catalog_language_v1';

let currentLanguage =
  localStorage.getItem(LANGUAGE_KEY) === 'id' ? 'id' : 'en';

const LANG = {
  en: {
    connectionSettings: '⚙ Connection settings',
    language: 'Language / Bahasa',
    searchPlaceholder: 'Search SKU or product name…',
    loadingCatalog: 'Loading catalog…',
    connectingCatalog: 'Connecting to product catalog…',
    noProducts: 'No products found',
    tryAnother: 'Try another SKU or product name.',
    refresh: '↻ Refresh',
    selectQuantity: 'Select quantity',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    addToCart: 'Add to Cart',
    catalog: 'Catalog',
    cart: 'Cart',
    yourOrder: 'Your order',
    differentProducts: 'different products',
    total: 'Total',
    customerType: 'Customer type',
    selectCustomer: 'Select customer',
   
    
    sendTelegram: 'Send to Telegram',
    copyOrder: 'Copy order text',
    emptyCart: 'Empty cart',
    remove: 'Remove',
    emptyCartTitle: 'Your cart is empty',
    emptyCartText: 'Add products from the catalog.',
    saveSettings: 'Save settings',
    appsScriptURL: 'Apps Script Web App URL',
    orderPIN: 'Order access PIN',
    userSelect: 'Select name',
    changeUser: 'Change user',
    requesterTitle: 'Who is using this device?',
    requesterPrompt: 'Select your name before creating an order.',
    added: 'Added',
    toCart: 'to cart',
    cartEmptied: 'Cart emptied',
    confirmEmpty: 'Are you sure you want to remove all products from your cart?',
    selectName: 'Select your name before sending an order',
    selectCustomerFirst: 'Please select a customer type',
    
    setURL: 'Set your Apps Script URL first',
    enterPIN: 'Enter the order access PIN',
    orderTooLong: 'Order is too long. Copy it instead.',
    telegramTooLong: 'Order is too long for the secure bot request. Copy it instead.',
    confirmTelegram: 'CONFIRM TELEGRAM ORDER',
    
    destination: 'Destination',
    
    confirmSend: 'Are you sure you want to send this order?',
    sending: 'Sending…',
    
    sentTelegram: 'Order sent to Telegram',
    
    orderCopied: 'Order copied',
    copyUnavailable: 'Clipboard unavailable in this browser',
    settingsSaved: 'Settings saved',
    orderFailed: 'Send failed',
    
    catalogUnavailable: 'Catalog unavailable',
    first160: 'Showing first 160 matches. Refine your search to narrow results.',
    close: 'Close',
    sku: 'SKU',
    each: 'each',
    productsLoaded: 'products loaded',
    offline: 'offline',
    
    telegramRejected: 'Telegram rejected the order',
    
    usingSavedCatalog: 'Using saved catalog',
    refreshFailed: 'Refresh failed',
    connectingSheets: 'Connecting to Google Sheets…',
    couldNotLoad: 'Could not load catalog',
    showingFirst: 'Showing first',
    of: 'of',
    products: 'products',
    matching: 'matching products',
    spellingCorrected: 'spelling corrected',
    noEveryWord: 'No product matches every word',
    closest: 'closest products',
    fullTitle: 'found in full product title',
    ranked: 'ranked by relevance',
    sendFailedCopy: 'You can copy the order instead.',
    sentTo: 'Order sent to'
  },

  id: {
    connectionSettings: '⚙ Pengaturan koneksi',
    language: 'Bahasa / Language',
    searchPlaceholder: 'Cari SKU atau nama produk…',
    loadingCatalog: 'Memuat katalog…',
    connectingCatalog: 'Menghubungkan ke katalog produk…',
    noProducts: 'Produk tidak ditemukan',
    tryAnother: 'Coba SKU atau nama produk lainnya.',
    refresh: '↻ Muat ulang',
    selectQuantity: 'Pilih jumlah',
    quantity: 'Jumlah',
    subtotal: 'Subtotal',
    addToCart: 'Tambah ke Keranjang',
    catalog: 'Katalog',
    cart: 'Keranjang',
    yourOrder: 'Pesanan Anda',
    differentProducts: 'produk berbeda',
    total: 'Total',
    destinationPC: 'PC Tujuan',
    selectPC: 'Pilih PC',
    customerType: 'Jenis pelanggan',
    selectCustomer: 'Pilih pelanggan',
    sendToPC: 'Kirim ke PC',
    selectPCFirst: 'Pilih PC terlebih dahulu',
    sendTelegram: 'Kirim ke Telegram',
    copyOrder: 'Salin teks pesanan',
    emptyCart: 'Kosongkan keranjang',
    remove: 'Hapus',
    emptyCartTitle: 'Keranjang masih kosong',
    emptyCartText: 'Tambahkan produk dari katalog.',
    saveSettings: 'Simpan pengaturan',
    appsScriptURL: 'URL Apps Script Web App',
    orderPIN: 'PIN akses pesanan',
    userSelect: 'Pilih nama',
    changeUser: 'Ganti pengguna',
    requesterTitle: 'Siapa yang menggunakan perangkat ini?',
    requesterPrompt: 'Pilih nama Anda sebelum membuat pesanan.',
    added: 'Ditambahkan',
    toCart: 'ke keranjang',
    cartEmptied: 'Keranjang dikosongkan',
    confirmEmpty: 'Yakin ingin menghapus semua produk dari keranjang?',
    selectName: 'Pilih nama Anda sebelum mengirim pesanan',
    selectCustomerFirst: 'Silakan pilih jenis pelanggan',
    selectDestination: 'Silakan pilih PC tujuan',
    setURL: 'Masukkan URL Apps Script terlebih dahulu',
    enterPIN: 'Masukkan PIN akses pesanan',
    orderTooLong: 'Pesanan terlalu panjang. Silakan salin teks pesanan.',
    telegramTooLong: 'Pesanan terlalu panjang untuk dikirim melalui bot. Silakan salin teks pesanan.',
    confirmTelegram: 'KONFIRMASI PESANAN TELEGRAM',
    confirmPC: 'KONFIRMASI PESANAN KE PC',
    destination: 'Tujuan',
    listenerID: 'ID Listener',
    confirmSend: 'Apakah Anda yakin ingin mengirim pesanan ini?',
    sending: 'Mengirim…',
    sendingPC: 'Mengirim ke PC…',
    sentTelegram: 'Pesanan terkirim ke Telegram',
    sentToPC: 'Pesanan terkirim ke',
    orderCopied: 'Pesanan berhasil disalin',
    copyUnavailable: 'Clipboard tidak tersedia di browser ini',
    settingsSaved: 'Pengaturan berhasil disimpan',
    orderFailed: 'Pengiriman gagal',
    routingFailed: 'Pengiriman ke PC gagal',
    catalogUnavailable: 'Katalog tidak tersedia',
    first160: 'Menampilkan 160 hasil pertama. Persempit pencarian Anda.',
    close: 'Tutup',
    sku: 'SKU',
    each: 'per item',
    productsLoaded: 'produk dimuat',
    offline: 'offline',
    unknownPC: 'PC tidak dikenal',
    telegramRejected: 'Telegram menolak pesanan',
    pcFailed: 'Pengiriman ke PC gagal',
    usingSavedCatalog: 'Menggunakan katalog tersimpan',
    refreshFailed: 'Pembaruan gagal',
    connectingSheets: 'Menghubungkan ke Google Sheets…',
    couldNotLoad: 'Tidak dapat memuat katalog',
    showingFirst: 'Menampilkan',
    of: 'dari',
    products: 'produk',
    matching: 'produk cocok',
    spellingCorrected: 'ejaan diperbaiki',
    noEveryWord: 'Tidak ada produk yang cocok dengan semua kata',
    closest: 'produk terdekat',
    fullTitle: 'ditemukan dalam judul produk lengkap',
    ranked: 'diurutkan berdasarkan relevansi',
    sendFailedCopy: 'Anda dapat menyalin teks pesanan.',
    sentTo: 'Pesanan terkirim ke'
  }
};

function t(key) {
  return LANG[currentLanguage][key] || LANG.en[key] || key;
}

const $ = id => document.getElementById(id);

function setButtonLabel(id, label) {
  const button = $(id);
  if (button) button.textContent = label;
}
function applyLanguage() {
  document.documentElement.lang = currentLanguage;

  const languageSelect = $('languageSelect');
  if (languageSelect) languageSelect.value = currentLanguage;

  $('settingsButton').textContent = t('connectionSettings');
  $('searchInput').placeholder = t('searchPlaceholder');
  $('refreshBtn').textContent = t('refresh');

  $('emptyState').querySelector('strong').textContent = t('noProducts');
  $('emptyState').querySelector('span').textContent = t('tryAnother');

  $('quantityPanel').querySelector('.panel-head strong').textContent =
    t('selectQuantity');

  $('quantityPanel').querySelector('label').textContent = t('quantity');
  const addLabel = document.querySelector('#confirmAddToCart .quantity-add-label');
  if (addLabel) addLabel.textContent = t('addToCart');
  $('navCatalog').lastChild.textContent = t('catalog');
   const importNav = $('navImport');
if (importNav) {
  importNav.lastChild.textContent =
    currentLanguage === 'id' ? 'Impor' : 'Import';
}
  $('navCartLabel').textContent = t('cart');

  $('cartPanel').querySelector('.panel-head strong').textContent =
    t('yourOrder');

  $('cartPanel').querySelector('.total-line span').textContent = t('total');


  setButtonLabel('sendOrder', t('sendTelegram'));
setButtonLabel('copyOrder', t('copyOrder'));
setButtonLabel('emptyCart', t('emptyCart'));

    const pinLabel = $('orderPinLabel');
  if (pinLabel) pinLabel.textContent = t('orderPIN');

   const inboxPinLabel = $('inboxPinLabel');
if (inboxPinLabel) {
  inboxPinLabel.textContent =
    currentLanguage === 'id' ? 'PIN kotak masuk bersama' : 'Shared inbox PIN';
}
  updateRequesterBadge();
  renderProducts();
  renderCart();

}

/* =========================================================
   3. STATE AND STORAGE
   ========================================================= */

const CSV_URL =
  `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}/export?format=csv&gid=${CONFIG.gid}`;

let products = [];
let cart = readStorage(CONFIG.cartKey, {});
let settings = readStorage(CONFIG.settingsKey, {});
let savedOrders = readStorage(CONFIG.savedOrdersKey, []);
let requesterName = readStorage(CONFIG.identityKey, '');

let toastTimer;
let searchTimer;
let previousSearchQuery = '';
let refreshTimer = null;
let catalogRequest = null;
let selectedProduct = null;
const wooCommerceStockCache = new Map();
const wooCommerceStockExpiry = new Map();
const wooCommerceStockData = new Map();

const stockQueue = [];
const stockQueued = new Set();
const stockInFlight = new Set();

let activeStockBatches = 0;
let stockObserver = null;

const STOCK_BATCH_SIZE = 5;
const STOCK_MAX_CONCURRENT_BATCHES = 4;
const STOCK_CACHE_MS = 5 * 60 * 1000;
const ORDER_LOCATION_KEY = 'centi_catalog_order_location_v1';

let orderLocation = (() => {
  const saved = localStorage.getItem(ORDER_LOCATION_KEY);
  return ['Pusat', 'Cabang Solo'].includes(saved)
    ? saved
    : 'Pusat';
})();

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Could not read storage "${key}".`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save storage "${key}".`, error);
  }
}

/* =========================================================
   4. REQUESTER IDENTITY
   ========================================================= */

const REQUESTER_NAMES = [
  'Ye', 'Amin', 'Lukman', 'Resti', 'Bangkit', 'Arif',
  'Raga', 'Rauf', 'Budi', 'Frisky', 'Yudi', 'Serli'
];

// Fixed codes: never renumber. A new salesman gets the next free code.
const SALESMAN_CODES = {
  Ye: '01', Amin: '02', Lukman: '03', Resti: '04',
  Bangkit: '05', Arif: '06', Raga: '07', Rauf: '08',
  Budi: '09', Frisky: '10', Yudi: '11', Serli: '12'
};

function showRequesterPrompt() {
  let overlay = $('requesterIdentityOverlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'requesterIdentityOverlay';

    overlay.style.cssText = `
      position:fixed;inset:0;z-index:999999;
      display:none;align-items:center;justify-content:center;
      padding:20px;background:rgba(0,0,0,.72);
      font-family:Arial,sans-serif;
    `;

    overlay.innerHTML = `
      <section style="
        width:min(420px,100%);max-height:85vh;overflow:auto;
        padding:22px;background:#fff;color:#222;border-radius:14px;
        box-sizing:border-box
      ">
        <h2>${t('requesterTitle')}</h2>
        <p>${t('requesterPrompt')}</p>
        <div style="
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:9px;
        ">
          ${REQUESTER_NAMES.map(name => `
            <button type="button" data-requester="${esc(name)}"
              style="padding:12px;border:1px solid #ccc;
              border-radius:8px;background:#f7f7f7;
              color:#222;cursor:pointer">
              ${esc(name)}
            </button>
          `).join('')}
        </div>
      </section>
    `;

    document.body.appendChild(overlay);

    overlay.querySelectorAll('[data-requester]').forEach(button => {
      button.addEventListener('click', () => {
        requesterName = button.dataset.requester;
        writeStorage(CONFIG.identityKey, requesterName);
        overlay.style.display = 'none';
        updateRequesterBadge();
      });
    });
  } else {
    const heading = overlay.querySelector('h2');
    const paragraph = overlay.querySelector('p');

    if (heading) heading.textContent = t('requesterTitle');
    if (paragraph) paragraph.textContent = t('requesterPrompt');
  }

  overlay.style.display = 'flex';
}

function updateRequesterBadge() {
  const badge = $('requesterIdentityBadge');
  if (!badge) return;

  badge.textContent = requesterName || t('userSelect');
  badge.title = t('changeUser');
  badge.onclick = showRequesterPrompt;
}

function ensureRequesterIdentity() {
  updateRequesterBadge();

  if (!REQUESTER_NAMES.includes(requesterName)) {
    showRequesterPrompt();
  }
}

/* =========================================================
   5. GENERAL HELPERS
   ========================================================= */

function money(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: CONFIG.currency,
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

/* =========================================================
   6. GOOGLE SHEETS CSV PARSING
   ========================================================= */

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i++;

      row.push(cell);

      if (row.some(value => value !== '')) {
        rows.push(row);
      }

      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function normalize(rows) {
  if (!rows.length) return [];

  const headers = rows[0].map(value => value.trim().toLowerCase());
  const indexOf = name => headers.indexOf(name.toLowerCase());

  const columns = {
    sku: indexOf('sku'),
    short: indexOf('nama pendek'),
    image: indexOf('images'),
    notes: indexOf('notes'),
    price: indexOf('regular price'),
    name: indexOf('name'),
    variation: indexOf('variation'),
        category: indexOf('code categorizing'),
    description: indexOf('web description')
  };

  if (columns.sku < 0 || columns.price < 0) {
    throw new Error('Required columns SKU and regular price were not found.');
  }

  return rows.slice(1)
    .map(row => ({
      sku: String(row[columns.sku] || '').trim(),
      short: String(row[columns.short] || '').trim(),
      image: String(row[columns.image] || '').trim(),
      notes: String(row[columns.notes] || '').trim(),
      price: Number(
        String(row[columns.price] || '').replace(/[^0-9.-]/g, '')
      ) || 0,
      name: String(row[columns.name] || '').trim(),
      variation: String(row[columns.variation] || '').trim(),
      description: String(row[columns.description] || '').trim().slice(0, 1500),
      category: String(
        columns.category >= 0 ? row[columns.category] || '' : ''
      ).trim()
    }))
    .filter(product => product.sku);
}

/* =========================================================
   7. APPS SCRIPT CONNECTION
   ========================================================= */

function jsonp(url, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const callbackName =
      `centiJsonp_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

    const script = document.createElement('script');

    const timer = setTimeout(() => {
      finish(new Error('Request timed out'));
    }, timeoutMs);

    function finish(error, data) {
      clearTimeout(timer);
      delete window[callbackName];
      script.remove();

      if (error) reject(error);
      else resolve(data);
    }

    window[callbackName] = data => finish(null, data);
    script.onerror = () => finish(new Error('Could not reach Apps Script'));

    script.src =
      url + (url.includes('?') ? '&' : '?') + 'callback=' + callbackName;

    document.head.appendChild(script);
  });
}

async function fetchCatalogFromGoogleSheets() {
  const freshUrl = `${CSV_URL}&_=${Date.now()}`;

  const response = await fetch(freshUrl, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Google Sheets returned HTTP ${response.status}`);
  }

  const csvText = await response.text();
  const rows = normalize(parseCSV(csvText));

  if (!rows.length) {
    throw new Error('CSV export returned no product rows');
  }

  return rows;
}

async function fetchCatalogFromAppsScript() {
  if (!settings.scriptUrl) {
    throw new Error('Apps Script fallback is not configured');
  }

  const data = await jsonp(settings.scriptUrl + '?action=catalog');

  if (!data.ok) {
    throw new Error(data.error || 'Apps Script catalog request failed');
  }

  const rows = data.rows || [];

  if (!rows.length) {
    throw new Error('Apps Script returned no product rows');
  }

  return rows;
}

/* =========================================================
   8. CATALOG LOADING AND AUTOMATIC REFRESH
   ========================================================= */

function showCatalogStatus(message, isError = false) {
  $('status').textContent = message;
  $('status').classList.toggle('error', isError);
}

function showCachedCatalog(error) {
  const cachedRows = readStorage(CONFIG.cacheKey, null);

  if (!Array.isArray(cachedRows) || !cachedRows.length) {
    return false;
  }

  products = cachedRows;

  showCatalogStatus(
    `${t('usingSavedCatalog')} (${products.length.toLocaleString('id-ID')} ${t('products')}). ` +
    `${t('refreshFailed')}: ${error.message}`,
    true
  );

  renderProducts();
  return true;
}

async function loadCatalog(options = {}) {
  const { silent = false } = options;

  if (catalogRequest) {
    return catalogRequest;
  }

  catalogRequest = (async () => {
    const refreshButton = $('refreshBtn');

    if (!silent) {
      showCatalogStatus(t('connectingSheets'));
    }

    if (refreshButton) {
      refreshButton.disabled = true;
    }

    try {
      const rows = await fetchCatalogFromGoogleSheets();

      products = rows;
      writeStorage(CONFIG.cacheKey, products);

      showCatalogStatus(
        `${products.length.toLocaleString('id-ID')} ${t('productsLoaded')}` +
        `${navigator.onLine ? '' : ' · ' + t('offline')}`
      );

      renderProducts();
      return true;

    } catch (error) {
      console.error('Catalog refresh failed:', error);

      const usedCache = showCachedCatalog(error);

      if (!usedCache) {
        showCatalogStatus(
          `${t('couldNotLoad')}: ${error.message}`,
          true
        );
        $('resultCount').textContent = t('catalogUnavailable');
      }

      return false;

    } finally {
      if (refreshButton) {
        refreshButton.disabled = false;
      }

      catalogRequest = null;
    }
  })();

  return catalogRequest;
}

function startAutomaticRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }

  refreshTimer = setInterval(() => {
    if (document.hidden || !navigator.onLine) return;
    loadCatalog({ silent: true });
  }, CONFIG.refreshInterval);
}

/* =========================================================
   9. SEARCH RESULTS AND REFINEMENT
   ========================================================= */

function resultLabel(result, list) {
  const count = list.length.toLocaleString('id-ID');

  if (!result) {
    return `${t('showingFirst')} ${list.length} ${t('of')} ` +
      `${CentiSearch.count().toLocaleString('id-ID')} ${t('products')}`;
  }

  if (result.mode === 'corrected') {
    return `${count} ${t('matching')} “${result.corrected}” (${t('spellingCorrected')})`;
  }

  if (result.mode === 'partial') {
    return `${t('noEveryWord')} · ${count} ${t('closest')}`;
  }

  if (result.mode === 'full') {
    return `${count} ${t('matching')} (${t('fullTitle')})`;
  }

  if (result.mode === 'ranked') {
    return `${count} ${t('products')} · ${t('ranked')}`;
  }

  return `${count} ${t('matching')}`;
}

function renderRefine(result) {
  let box = $('refineChips');

  if (!box) {
    box = document.createElement('div');
    box.id = 'refineChips';
    box.className = 'refine-chips';
    box.style.cssText =
      'display:flex;flex-wrap:wrap;gap:6px;margin:8px 0';

    $('resultCount').insertAdjacentElement('afterend', box);
  }

  box.innerHTML = '';

  if (!result) return;

  CentiSearch.refine(result).forEach(chip => {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'refine-chip';
    button.textContent = chip.label;
    button.style.cssText =
      'border:1px solid currentColor;border-radius:999px;' +
      'padding:4px 10px;background:transparent;color:inherit;' +
      'font:inherit;font-size:.85em;cursor:pointer;opacity:.85';

    button.onclick = () => {
      const input = $('searchInput');
      input.value = (input.value.trim() + ' ' + chip.add).trim();

      window.scrollTo({ top: 0, behavior: 'smooth' });

      previousSearchQuery = input.value.trim();
      renderProducts();
      input.focus();
    };

    box.appendChild(button);
  });
}

/* =========================================================
   10. PRODUCT RENDERING
   ========================================================= */

function renderProducts() {
  const query = $('searchInput').value.trim();

  CentiSearch.ensure(products);

  const result = query ? CentiSearch.search(query) : null;
  const list = result ? result.items : CentiSearch.browse(80);

  $('resultCount').textContent = resultLabel(result, list);
  renderRefine(result);

  const host = $('productList');

  host.innerHTML = list.slice(0, 160).map(product => `
    <article class="product-card">
      <div class="media" data-add="${esc(product.sku)}">
        ${
          product.image
            ? `<img
                class="product-image"
                src="${esc(product.image)}"
                loading="lazy"
                referrerpolicy="no-referrer"
                onerror="this.outerHTML='<div class=&quot;image-placeholder&quot;>▧</div>'"
              >`
            : `<div class="image-placeholder">▧</div>`
        }
      </div>

      <div class="product-info">
        <div class="product-name">
          ${esc(product.short || product.name || product.sku)}
        </div>

        <div class="product-price">${money(product.price)}</div>

<div
  class="product-stock-estimate"
  data-stock-for="${esc(product.sku)}"
  style="margin:4px 0 8px;font-size:13px;color:#64748b;"
></div>

<button class="add-button" data-add="${esc(product.sku)}">
          ＋ ${t('addToCart')}
        </button>
      </div>
    </article>
  `).join('');

  $('emptyState').classList.toggle('hidden', list.length !== 0);

  if (list.length > 160) {
    showCatalogStatus(t('first160'));
  }

  host.querySelectorAll('[data-add]').forEach(button => {
  button.addEventListener('click', () => {
    const sku = button.dataset.add;

    fetchAndDisplayProductStock(sku);
    openQuantitySelector(sku);
  });
});

// Restore cached stock and observe cards as they enter the viewport.
if (!stockObserver && 'IntersectionObserver' in window) {
  stockObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const sku = entry.target.dataset.stockFor;

      stockObserver.unobserve(entry.target);
      fetchAndDisplayProductStock(sku);
    });
  }, {
    rootMargin: '150px 0px',
    threshold: 0
  });
}

host.querySelectorAll('[data-stock-for]').forEach(slot => {
  const sku = slot.dataset.stockFor;
  const cached = getCachedStockMessage(sku);

  if (cached) {
    slot.textContent = cached;
  } else if (stockObserver) {
    stockObserver.observe(slot);
  } else {
    fetchAndDisplayProductStock(sku);
  }
});
}

/* =========================================================
   11. PRODUCT QUANTITY SELECTOR
   ========================================================= */
function descriptionToText(html) {
  const source = String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n');

  const doc = new DOMParser().parseFromString(source, 'text/html');

  return (doc.body.textContent || '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
function openQuantitySelector(sku) {
  const product = products.find(item => item.sku === sku);
  if (!product) return;

  activatePanelBackGuard();
  selectedProduct = product;

  $('quantityProductName').textContent =
    product.short || product.name || product.sku;

  $('quantityProductSku').textContent = `${t('sku')}: ${product.sku}`;
  $('quantityProductPrice').textContent = money(product.price);
     $('quantityDescription').textContent =
    descriptionToText(product.description) ||
    (currentLanguage === 'id'
      ? 'Belum ada deskripsi untuk produk ini.'
      : 'No description for this product yet.');
   let modalStock = $('quantityModalStock');

if (!modalStock) {
  modalStock = document.createElement('div');
  modalStock.id = 'quantityModalStock';
  modalStock.style.cssText =
    'margin-top:6px;font-size:13px;color:#64748b;';

  $('quantityProductPrice').insertAdjacentElement(
    'afterend',
    modalStock
  );
}

modalStock.textContent =
  getCachedStockMessage(sku) ||
  (currentLanguage === 'id'
    ? 'Memeriksa estimasi stok...'
    : 'Checking stock estimate...');

fetchAndDisplayProductStock(sku);
  $('productQuantity').value = 1;

  const image = $('quantityImage');
  const placeholder = $('quantityImagePlaceholder');

  if (product.image) {
    image.src = product.image;
    image.alt = product.short || product.name || product.sku;
    image.classList.remove('hidden');
    placeholder.classList.add('hidden');

    image.onerror = () => {
      image.classList.add('hidden');
      placeholder.classList.remove('hidden');
    };
  } else {
    image.removeAttribute('src');
    image.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }

  updateQuantitySubtotal();

  $('quantityOverlay').classList.remove('hidden');
  $('quantityPanel').classList.remove('hidden');
     $('quantityGallery').scrollLeft = 0;
}

function closeQuantitySelector() {
  $('quantityOverlay').classList.add('hidden');
  $('quantityPanel').classList.add('hidden');
  selectedProduct = null;
}

function updateQuantitySubtotal() {
  if (!selectedProduct) return;

  const rawValue = $('productQuantity').value;

  if (rawValue === '') {
    $('quantitySubtotal').textContent = money(0);
    return;
  }

  const quantity = Math.max(
    0,
    Math.floor(Number(rawValue) || 0)
  );

  $('quantitySubtotal').textContent =
    money(selectedProduct.price * quantity);
}


async function checkWooCommerceStock(sku) {
  if (!settings.scriptUrl) {
    throw new Error('Apps Script URL is not configured.');
  }

  const separator = settings.scriptUrl.includes('?') ? '&' : '?';

  const url =
    settings.scriptUrl +
    separator +
    'action=stock&sku=' +
    encodeURIComponent(sku);

  const result = await jsonp(url, 30000);

  if (!result || !result.ok) {
    throw new Error(result?.error || 'Stock lookup failed.');
  }

  if (result.stock_status === 'not_found') {
    throw new Error('SKU not found in WooCommerce.');
  }

  return result;
}

function showWooCommerceStock(sku) {
  let info = $('wooCommerceStockInfo');

  if (!info) {
    info = document.createElement('div');
    info.id = 'wooCommerceStockInfo';

    info.style.cssText = `
      margin: 10px 0;
      padding: 10px 12px;
      border-radius: 8px;
      background: #f1f5f9;
      color: #334155;
      font-size: 14px;
    `;

    $('quantityProductSku').insertAdjacentElement('afterend', info);
  }

  info.textContent = currentLanguage === 'id'
    ? 'Memeriksa estimasi stok...'
    : 'Checking estimated stock...';
}
function getCachedStockMessage(sku) {
  const expiresAt = wooCommerceStockExpiry.get(sku);

  if (!expiresAt || Date.now() >= expiresAt) {
    wooCommerceStockCache.delete(sku);
    wooCommerceStockExpiry.delete(sku);
     wooCommerceStockData.delete(sku);
    return null;
  }

  return wooCommerceStockCache.get(sku) || null;
}

function formatStockMessage(stock) {
  if (stock.stock_status === 'not_found' || stock.stock_status === 'error') {
    return currentLanguage === 'id'
      ? 'Estimasi stok tidak tersedia'
      : 'Stock estimate unavailable';
  }

  if (stock.stock_status === 'outofstock') {
    return currentLanguage === 'id'
      ? 'Estimasi stok: Habis'
      : 'Estimated stock: Out of stock';
  }

  if (
    stock.manage_stock &&
    stock.quantity !== null &&
    stock.quantity !== undefined
  ) {
    return currentLanguage === 'id'
      ? `Estimasi stok: ${stock.quantity} unit`
      : `Estimated stock: ${stock.quantity} units`;
  }

  return currentLanguage === 'id'
    ? 'Stok tersedia (jumlah tidak dilacak)'
    : 'In stock (quantity not tracked)';
}

function fetchAndDisplayProductStock(sku) {
  const cached = getCachedStockMessage(sku);

  if (cached) {
    updateProductCardStock(sku, cached);
    return;
  }

  if (stockQueued.has(sku) || stockInFlight.has(sku)) {
    return;
  }

  const loadingText = currentLanguage === 'id'
    ? 'Memeriksa estimasi stok...'
    : 'Checking stock estimate...';

  updateProductCardStock(sku, loadingText);

  stockQueue.push(sku);
  stockQueued.add(sku);

  processStockQueue();
}

function processStockQueue() {
  while (
    activeStockBatches < STOCK_MAX_CONCURRENT_BATCHES &&
    stockQueue.length
  ) {
    const batch = stockQueue.splice(0, STOCK_BATCH_SIZE);

    batch.forEach(sku => {
      stockQueued.delete(sku);
      stockInFlight.add(sku);
    });

    activeStockBatches++;

    fetchStockBatch(batch)
      .finally(() => {
        batch.forEach(sku => stockInFlight.delete(sku));
        activeStockBatches--;
        processStockQueue();
      });
  }
}

async function fetchStockBatch(skus) {
  try {
    const uniqueSkus = [...new Set(skus)];

    const query = new URLSearchParams({
      select: 'sku,quantity,stock_status,manage_stock',
      sku: `in.(${uniqueSkus.map(sku => `"${sku.replace(/"/g, '\\"')}"`).join(',')})`
    });

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/wc_stock_cache?${query}`,
      {
        method: 'GET',
        headers: {
          apikey: SUPABASE_PUBLIC_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase error ${response.status}: ${await response.text()}`);
    }

    const stocks = await response.json();

    stocks.forEach(stock => {
      const message = formatStockMessage(stock);

      wooCommerceStockData.set(stock.sku, stock);
      wooCommerceStockCache.set(stock.sku, message);
      wooCommerceStockExpiry.set(
        stock.sku,
        Date.now() + STOCK_CACHE_MS
      );

      updateProductCardStock(stock.sku, message);
    });

    const returnedSkus = new Set(stocks.map(stock => stock.sku));

    uniqueSkus.forEach(sku => {
      if (!returnedSkus.has(sku)) {
        updateProductCardStock(
          sku,
          currentLanguage === 'id'
            ? 'Estimasi stok tidak tersedia'
            : 'Stock estimate unavailable'
        );
      }
    });

  } catch (error) {
    console.warn('Supabase stock lookup failed:', error);

    skus.forEach(sku => {
      updateProductCardStock(
        sku,
        currentLanguage === 'id'
          ? 'Estimasi stok tidak tersedia'
          : 'Stock estimate unavailable'
      );
    });
  }
}
function updateProductCardStock(sku, message) {
  document.querySelectorAll('[data-stock-for]').forEach(slot => {
    if (slot.dataset.stockFor === sku) {
      slot.textContent = message;
    }
  });

  if (
    selectedProduct &&
    selectedProduct.sku === sku &&
    $('quantityModalStock')
  ) {
    $('quantityModalStock').textContent = message;
  }

  updateCartStockDisplay(sku, message);
}

function updateCartStockDisplay(sku, message) {
  const slot = document.querySelector(
    `[data-cart-stock-for="${CSS.escape(sku)}"]`
  );

  if (!slot) return;

  const text = slot.querySelector('.cart-stock-text');
  const warning = slot.querySelector('.cart-stock-warning');

  if (text) text.textContent = message;

  const stock = wooCommerceStockData.get(sku);
  const item = cart[sku];

  if (!warning || !stock || !item) {
    if (warning) warning.hidden = true;
    return;
  }

  const hasNumericStock =
    stock.manage_stock &&
    stock.quantity !== null &&
    stock.quantity !== undefined &&
    Number.isFinite(Number(stock.quantity));

  const insufficient =
    stock.stock_status === 'outofstock' ||
    (
      hasNumericStock &&
      item.qty > Number(stock.quantity)
    );

  warning.hidden = !insufficient;
  warning.textContent = currentLanguage === 'id'
    ? '⚠ Stok mungkin tidak cukup'
    : '⚠ Stock may be insufficient';
}

function confirmAddToCart() {
  if (!selectedProduct) return;

  const quantity = Math.max(
    1,
    Math.floor(Number($('productQuantity').value) || 1)
  );

  const sku = selectedProduct.sku;

  addToCart(sku, quantity);
  closeQuantitySelector();

  showToast(`${t('added')} ${quantity} × ${sku} ${t('toCart')}`);
}


/* =========================================================
   12. SHOPPING CART
   ========================================================= */

function addToCart(sku, quantity = 1) {
  const product = products.find(item => item.sku === sku);
  if (!product) return;

  quantity = Math.max(1, Math.floor(Number(quantity) || 1));

  cart[sku] ??= {
    sku: product.sku,
    name: product.short || product.name,
    price: product.price,
    image: product.image || '',
    qty: 0
  };

  cart[sku].image = product.image || cart[sku].image || '';
  cart[sku].qty += quantity;

  saveCart();
}

function saveCart() {
  writeStorage(CONFIG.cartKey, cart);
  if (!cartValues().length) setCartNo('');
  updateCartBadge();
  renderCart();
}
const CART_NO_KEY = 'centi_catalog_cart_no_v1';

function newOrderNo() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) +
         p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds()) +
         (SALESMAN_CODES[requesterName] || '00');
}

function getCartNo() {
  let no = localStorage.getItem(CART_NO_KEY);
  if (!no) {
    no = newOrderNo();
    localStorage.setItem(CART_NO_KEY, no);
  }
  return no;
}

function setCartNo(no) {
  if (no) localStorage.setItem(CART_NO_KEY, no);
  else localStorage.removeItem(CART_NO_KEY);
}
function cartValues() {
  return Object.values(cart).filter(item => item.qty > 0);
}
function setOrderLocation(location) {
  if (!['Pusat', 'Cabang Solo'].includes(location)) return;

  orderLocation = location;
  localStorage.setItem(ORDER_LOCATION_KEY, location);

  document.querySelectorAll('[data-order-location]').forEach(button => {
    const active = button.dataset.orderLocation === orderLocation;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function updateCartBadge() {
  const count = cartValues().reduce((sum, item) => sum + item.qty, 0);

  $('cartCount').textContent = count;
  $('navCartCount').textContent = count;
}

function renderCart() {
  const items = cartValues();

  $('cartSubtitle').textContent =
    `${items.length} ${t('differentProducts')}`;

  $('cartItems').innerHTML = items.length
    ? items.map(item => {
        const product = products.find(p => p.sku === item.sku);
        const image = item.image || product?.image || '';

        return `
          <div class="cart-row">
            <div class="cart-row-main">
              ${
                image
                  ? `<img
                      class="cart-product-image"
                      src="${esc(image)}"
                      alt="${esc(item.name)}"
                      loading="lazy"
                      referrerpolicy="no-referrer"
                      onerror="this.outerHTML='<div class=&quot;cart-image-placeholder&quot;>▧</div>'"
                    >`
                  : `<div class="cart-image-placeholder">▧</div>`
              }

              <div class="cart-product-info">
                <strong>${esc(item.name)}</strong>
                <small>${t('sku')}: ${esc(item.sku)} · ${money(item.price)} ${t('each')}</small>
                <div
  class="cart-stock"
  data-cart-stock-for="${esc(item.sku)}"
  style="font-size:12px; margin-top:5px;"
>
  <span class="cart-stock-text">
    ${currentLanguage === 'id'
      ? 'Memeriksa estimasi stok...'
      : 'Checking stock estimate...'}
  </span>
  <span
    class="cart-stock-warning"
    hidden
   style="color:#dc2626; font-weight:600; margin-top:3px;"
  ></span>
</div>

                <div class="qty-control">
                  <button data-minus="${esc(item.sku)}">−</button>

                  <input
                    data-qty="${esc(item.sku)}"
                    type="number"
                    min="1"
                    step="1"
                    value="${item.qty}"
                  >

                  <button data-plus="${esc(item.sku)}">＋</button>

                  <button class="remove-button" data-remove="${esc(item.sku)}">
                    ${t('remove')}
                  </button>
                </div>
              </div>
            </div>

            <div class="cart-row-price">
              ${money(item.price * item.qty)}
            </div>
          </div>
        `;
      }).join('')
    : `
      <div class="empty">
        <strong>${t('emptyCartTitle')}</strong>
        <span>${t('emptyCartText')}</span>
      </div>
    `;
items.forEach(item => {
  const cached = getCachedStockMessage(item.sku);

  if (cached) {
    updateProductCardStock(item.sku, cached);
  } else {
    fetchAndDisplayProductStock(item.sku);
  }
});
  $('cartTotal').textContent = money(
    items.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  const canUseCart = items.length > 0 && Boolean($('customerType').value);

  // Keep the close button usable so the customer can close the cart.
  document.querySelectorAll('#cartPanel button:not(#closeCart)').forEach(button => {
    button.disabled = !canUseCart;
  });
   
  $('cartItems').querySelectorAll('[data-minus]').forEach(button => {
    button.onclick = () => changeQty(button.dataset.minus, -1);
  });

  $('cartItems').querySelectorAll('[data-plus]').forEach(button => {
    button.onclick = () => changeQty(button.dataset.plus, 1);
  });

  $('cartItems').querySelectorAll('[data-remove]').forEach(button => {
    button.onclick = () => {
      delete cart[button.dataset.remove];
      saveCart();
    };
  });

  $('cartItems').querySelectorAll('[data-qty]').forEach(input => {
    input.onchange = () => {
      const quantity = Math.max(1, Math.floor(Number(input.value) || 1));
      cart[input.dataset.qty].qty = quantity;
      saveCart();
    };
  });
}

function changeQty(sku, difference) {
  if (!cart[sku]) return;

  cart[sku].qty += difference;

  if (cart[sku].qty <= 0) {
    delete cart[sku];
  }

  saveCart();
}

function emptyCart() {
  if (!cartValues().length) return;

  if (!confirm(t('confirmEmpty'))) {
    return;
  }

  cart = {};
  saveCart();
  showToast(t('cartEmptied'));
}

/* =========================================================
   12B. SAVED ORDERS
   ========================================================= */

function saveCurrentOrder() {
  const items = cartValues();

  if (!items.length) return;

  const name = prompt('Masukkan nama / Nomor Pelanggan');

  if (name === null) return;

  const cleanName = name.trim();

  if (!cleanName) {
    showToast('Please enter an order name');
    return;
  }

 const savedAt = new Date();
const orderId = 'SAVED-' + savedAt.getTime();

const order = {
  id: orderId,
    orderNo: getCartNo(),
  invoiceNumber: 'INV-' + getCartNo(),
    name: cleanName,
    createdAt: new Date().toISOString(),
        requesterName,
    customerType: $('customerType').value,
    orderLocation,

    items: JSON.parse(JSON.stringify(items)),
    total: items.reduce(
      (sum, item) => sum + item.price * item.qty, 0
    )
  };

  savedOrders.unshift(order);

  writeStorage(CONFIG.savedOrdersKey, savedOrders);

  renderSavedOrders();

  showToast(`Order "${cleanName}" saved`);
}

function renderSavedOrders() {
  const host = $('savedOrdersList');

  $('savedOrdersSubtitle').textContent =
    `${savedOrders.length} saved orders`;

  if (!savedOrders.length) {
    host.innerHTML = `
      <div class="empty">
        <strong>No saved orders</strong>
        <span>Save an order from your cart.</span>
      </div>
    `;
    return;
  }

  host.innerHTML = savedOrders.map(order => `
    <div class="saved-order-card" data-saved-id="${esc(order.id)}">

      <div class="saved-order-info">
        <strong>${esc(order.name)}</strong>

        <small>
          ${order.items.length} different products ·
          ${money(order.total)}
        </small>

        <small>
          ${esc(order.requesterName || 'Unknown')} ·
          ${new Date(order.createdAt).toLocaleString()}
        </small>
      </div>

      <div class="saved-order-actions">
        <button type="button"
                class="primary-button"
                data-load-saved="${esc(order.id)}">
          Load
        </button>

        <button type="button"
                class="remove-button"
                data-delete-saved="${esc(order.id)}">
          Delete
        </button>
<button type="button"
        class="secondary-button"
        data-copy-invoice="${esc(order.id)}">
  Copy Invoice
</button>
<button type="button" class="print-saved" data-print-saved="${esc(order.id)}">
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9V2h12v7"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <path d="M6 14h12v8H6z"/>
  </svg>
  Print Nota
</button>
<button type="button" class="view-saved" data-id="${order.id}" aria-label="View order" title="View order">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
</button>
      </div>

    </div>
  `).join('');

  host.querySelectorAll('[data-load-saved]').forEach(button => {
    button.onclick = () => loadSavedOrder(button.dataset.loadSaved);
  });

  host.querySelectorAll('[data-delete-saved]').forEach(button => {
    button.onclick = () => deleteSavedOrder(button.dataset.deleteSaved);
  });
host.querySelectorAll('[data-copy-invoice]').forEach(button => {
  button.onclick = () => copySavedInvoice(button.dataset.copyInvoice);
});
}
async function copySavedInvoice(id) {
  const order = savedOrders.find(item => item.id === id);
  if (!order) return;

  const invoiceNumber =
    order.invoiceNumber ||
    'INV-' + order.id.replace('SAVED-', '');

  const invoiceDate = new Date(order.createdAt)
    .toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const width = 900;
  const padding = 65;
  const rowHeight = 78;
  const headerHeight = 310;
  const footerHeight = 190;
 const height = headerHeight + order.items.length * rowHeight + footerHeight + 180;

  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Header
  ctx.fillStyle = '#171717';
  ctx.fillRect(0, 0, width, 220);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.fillText('CENTI STORE', padding, 90);

  ctx.font = '24px Arial';
  ctx.fillStyle = '#d1d5db';
  ctx.fillText('INVOICE', padding, 145);

  ctx.font = '20px Arial';
  ctx.fillText(`Invoice: ${invoiceNumber}`, padding, 185);

  ctx.textAlign = 'right';
  ctx.fillText(invoiceDate, width - padding, 185);
  ctx.textAlign = 'left';

  // Customer
  let y = 275;

  ctx.fillStyle = '#777777';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('CUSTOMER', padding, y);

  y += 38;
  ctx.fillStyle = '#171717';
  ctx.font = 'bold 28px Arial';
  ctx.fillText(String(order.name), padding, y);

  // Items header
  y += 65;
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(padding, y - 30, width - padding * 2, 48);

  ctx.fillStyle = '#555555';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('ITEM', padding + 12, y);
  ctx.textAlign = 'right';
  ctx.fillText('QTY', 560, y);
  ctx.fillText('PRICE', 710, y);
  ctx.fillText('SUBTOTAL', width - padding - 12, y);
  ctx.textAlign = 'left';

  y += 48;

  // Items
  order.items.forEach((item, index) => {
    const subtotal = Number(item.price) * Number(item.qty);

    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();

    y += 28;

    ctx.fillStyle = '#171717';
    ctx.font = 'bold 17px Arial';

    const productName = String(item.name || '');
    ctx.fillText(
      productName.length > 34
        ? productName.slice(0, 31) + '...'
        : productName,
      padding + 12,
      y
    );

    ctx.font = '14px Arial';
    ctx.fillStyle = '#777777';
    ctx.fillText(`SKU: ${item.sku || '-'}`, padding + 12, y + 23);

    ctx.fillStyle = '#333333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(String(item.qty), 560, y);
    ctx.fillText(money(item.price), 710, y);
    ctx.fillText(money(subtotal), width - padding - 12, y);
    ctx.textAlign = 'left';

    y += rowHeight - 28;
  });

  // Grand total
  y += 25;

  ctx.strokeStyle = '#171717';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(width - padding, y);
  ctx.stroke();

  y += 65;

  ctx.fillStyle = '#777777';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('GRAND TOTAL', padding, y);

  ctx.fillStyle = '#171717';
  ctx.font = 'bold 34px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(money(order.total), width - padding, y);
  ctx.textAlign = 'left';

  // Footer
  y += 90;
  ctx.fillStyle = '#777777';
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Centi STORE', width / 2, y);

  try {
    const blob = await new Promise(resolve =>
      canvas.toBlob(resolve, 'image/png')
    );

    if (!blob) throw new Error('PNG generation failed');

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);

    showToast('Invoice image copied. Paste with Ctrl + V');
  } catch (error) {
    console.error('Invoice image copy failed:', error);
    showToast('Unable to copy invoice image. Check browser clipboard permissions.');
  }
}
function loadSavedOrder(id) {
  const order = savedOrders.find(item => item.id === id);

  if (!order) return;

  if (cartValues().length) {
    if (!confirm(
      'Replace your current cart with "' + order.name + '"?'
    )) {
      return;
    }
  }

  cart = {};

  order.items.forEach(item => {
    cart[item.sku] = {
      sku: item.sku,
      name: item.name,
      price: Number(item.price) || 0,
      image: item.image || '',
      qty: Math.max(1, Number(item.qty) || 1)
    };
  });

   $('customerType').value = order.customerType || '';
  setOrderLocation(order.orderLocation || 'Pusat');
     setCartNo(order.orderNo || String(order.invoiceNumber || '').replace(/\D/g, ''));

  saveCart();

  closeSavedOrders();
  openCart();

  showToast(`Loaded "${order.name}"`);
}

function deleteSavedOrder(id) {
  const order = savedOrders.find(item => item.id === id);

  if (!order) return;

  if (!confirm(`Delete saved order "${order.name}"?`)) {
    return;
  }

  savedOrders = savedOrders.filter(item => item.id !== id);

  writeStorage(CONFIG.savedOrdersKey, savedOrders);

  renderSavedOrders();

  showToast('Saved order deleted');
}

function openSavedOrders() {
  activatePanelBackGuard();
  renderSavedOrders();

  $('savedOrdersOverlay').classList.remove('hidden');
  $('savedOrdersPanel').classList.add('open');
  $('savedOrdersPanel').setAttribute('aria-hidden', 'false');
}

function closeSavedOrders() {
  $('savedOrdersOverlay').classList.add('hidden');
  $('savedOrdersPanel').classList.remove('open');
  $('savedOrdersPanel').setAttribute('aria-hidden', 'true');
}

/* =========================================================
   13. ORDER GENERATION AND TELEGRAM
   ========================================================= */

function orderText() {
  const items = cartValues();

   const id = 'CAT-' + getCartNo();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const lines = [
    `New Order: ${id}`,
    '---------------------------------',
       `Pelanggan: ${$('customerType').value || 'Unknown'}`,
`Requested by: ${requesterName || 'Unknown'}`,
`Lokasi: ${orderLocation}`,
    'No : Mobile Catalog',
    '',
    'Pesanan :'
  ];

  for (const item of items) {
    lines.push(
      '',
      `${item.qty}x ${item.name}`,
      `  SKU: ${item.sku}`,
      `  Price: ${money(item.price)}`
    );
  }

  lines.push('', `Total : ${money(total)}`);

  return {
    id,
    text: lines.join('\n'),
    items,
    total,
    requesterName
  };
}

async function sendOrder() {
  if (!REQUESTER_NAMES.includes(requesterName)) {
    showRequesterPrompt();
    showToast(t('selectName'));
    return;
  }

  const order = orderText();
  const customerType = $('customerType').value;

  if (!customerType) {
    showToast(t('selectCustomerFirst'));
    return;
  }

  order.customerType = customerType;
  order.orderLocation = orderLocation;

   await navigator.clipboard.writeText(order.text).catch(error => {
  console.warn('Order clipboard copy failed:', error);
});
   
  if (!confirm(
    t('confirmTelegram') + '\n\n' +
    t('destination') + ': TELEGRAM\n\n' +
    t('confirmSend')
  )) {
    return;
  }

 const pin = (settings.pin || '').trim();

if (!pin) {
    openSettings();
    showToast(t('enterPIN'));
    return;
  }

  if (order.text.length > 1500) {
    showToast(t('telegramTooLong'));
    return;
  }

  const button = $('sendOrder');
  button.disabled = true;
  button.textContent = t('sending');

  try {
    const response = await fetch(
  `${SUPABASE_URL}/functions/v1/listener-gateway`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_PUBLIC_KEY,
      'Authorization': `Bearer ${SUPABASE_PUBLIC_KEY}`
    },
    body: JSON.stringify({
      action: 'telegram',
      pin,
      payload: order
    })
  }
);

const result = await response.json();

if (!response.ok || !result.ok) {
  throw new Error(result.error || t('telegramRejected'));
}


    showToast(t('sentTelegram'));

  } catch (error) {
    showToast(`${t('orderFailed')}: ${error.message}. ${t('sendFailedCopy')}`);
  } finally {
    button.disabled = false;
    button.textContent = t('sendTelegram');
  }
}

function openImportOrder() {
  activatePanelBackGuard();
  $('importOrderOverlay').classList.remove('hidden');
  $('importOrderPanel').classList.add('open');
  $('importOrderPanel').setAttribute('aria-hidden', 'false');
}

function closeImportOrder() {
  $('importOrderOverlay').classList.add('hidden');
  $('importOrderPanel').classList.remove('open');
  $('importOrderPanel').setAttribute('aria-hidden', 'true');
}

async function pasteImportOrder() {
  try {
    $('importOrderText').value =
      await navigator.clipboard.readText();
  } catch (error) {
    showToast('Cannot access clipboard. Paste manually.');
  }
  
}

function importOrderFromText() {
  const text = $('importOrderText').value.trim();

  if (!/^New Order:/m.test(text)) {
    showToast('Invalid order text');
    return;
  }

  const lines = text.split(/\r?\n/);
  const importedCart = {};

  for (let i = 0; i < lines.length; i++) {
    const itemMatch = lines[i].trim().match(/^(\d+)\s*x\s+(.+)$/i);

    if (!itemMatch) continue;

    const skuMatch = lines[i + 1]?.trim().match(/^SKU:\s*(.+)$/i);
    const priceMatch = lines[i + 2]?.trim().match(/^Price:\s*(.+)$/i);

    if (!skuMatch || !priceMatch) continue;

    const qty = Number(itemMatch[1]);
    const name = itemMatch[2].trim();
    const sku = skuMatch[1].trim();
    const price = Number(priceMatch[1].replace(/[^\d]/g, ''));

    if (!sku || !Number.isFinite(price) || qty <= 0) continue;

    const product = products.find(
      p => String(p.sku).trim() === sku
    );

    importedCart[sku] = {
      sku,
      name: product?.short || product?.name || name,
      price,
      image: product?.image || '',
      qty: (importedCart[sku]?.qty || 0) + qty
    };
  }

  if (!Object.keys(importedCart).length) {
    showToast('No valid products found');
    return;
  }

  if (
    cartValues().length &&
    !confirm('Replace your current cart with this imported order?')
  ) {
    return;
  }

  cart = importedCart;
     const noMatch = text.match(/^New Order:\s*CAT-(\d+)/m);
  setCartNo(noMatch ? noMatch[1] : '');
  saveCart();

  closeImportOrder();
  openCart();

  showToast(`Imported ${Object.keys(importedCart).length} products`);
}
async function copyOrder() {
  try {
    await navigator.clipboard.writeText(orderText().text);
    showToast(t('orderCopied'));
  } catch {
    showToast(t('copyUnavailable'));
  }
}

/* =========================================================
   14. PANELS AND NOTIFICATIONS
   ========================================================= */

function openCart() {
   activatePanelBackGuard();
  $('cartOverlay').classList.remove('hidden');
  $('cartPanel').classList.add('open');
  $('cartPanel').setAttribute('aria-hidden', 'false');
}

function closeCart() {
  $('cartOverlay').classList.add('hidden');
  $('cartPanel').classList.remove('open');
  $('cartPanel').setAttribute('aria-hidden', 'true');
   releasePanelBackGuard();
}

function openSettings() {
  activatePanelBackGuard();

  $('settingsOverlay').classList.remove('hidden');
  $('settingsPanel').classList.remove('hidden');
  $('settingsPanel').setAttribute('aria-hidden', 'false');

  $('orderPin').value = settings.pin || '';
  $('orderPin').type = 'password';
   $('inboxPin').value = settings.inboxPin || '';
$('inboxPin').type = 'password';

  if (!window.matchMedia('(pointer: coarse)').matches) {
    $('orderPin').focus();
  }
}


function closeSettings() {
  $('settingsOverlay').classList.add('hidden');
  $('settingsPanel').classList.remove('open');
  $('settingsPanel').classList.add('hidden');
  $('settingsPanel').setAttribute('aria-hidden', 'true');

  releasePanelBackGuard();
}

function showToast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    $('toast').classList.remove('show');
  }, 2600);
}

// Android / Mobile Back Button
let panelBackGuardActive = false;

function activatePanelBackGuard() {
  if (panelBackGuardActive) return;

  history.pushState({ centiPanel: true }, '', location.href);
  panelBackGuardActive = true;
}

function releasePanelBackGuard() {
  if (!panelBackGuardActive) return;

  panelBackGuardActive = false;
  history.back();
}


window.addEventListener('popstate', () => {
  // Our own history.back() calls: ignore once
  if (window.__skipPop) {
    window.__skipPop = false;
    return;
  }

   // 0) Incoming-order popup sits on top of everything
  if (window.closeOrderPrompt) {
    window.closeOrderPrompt();
    return;
  }

  // 1) Nota popup sits on top of everything
  if (window.closeNotaPopup) {
    window.closeNotaPopup();
    return;
  }

  // 2) View Order panel
  if ($('viewOrderPanel') && $('viewOrderPanel').classList.contains('open')) {
    window.__viewEntry = false;
    window.closeViewOrder();
    return;
  }

  // 3) Everything else uses the shared guard
  if (!panelBackGuardActive) return;

  panelBackGuardActive = false;

  if ($('cartPanel').classList.contains('open')) {
    closeCart();
  } else if (!$('quantityPanel').classList.contains('hidden')) {
    closeQuantitySelector();
  } else if (!$('settingsPanel').classList.contains('hidden')) {
    closeSettings();
  } else if ($('importOrderPanel').classList.contains('open')) {
    closeImportOrder();
  } else if (!$('savedOrdersPanel').classList.contains('hidden')) {
    closeSavedOrders();
  }
});


/* =========================================================
   15. EVENT LISTENERS
   ========================================================= */

function bindEvents() {
  const menuButton = $('headerMenuButton');
  const menu = $('headerMenu');

  if (menuButton && menu) {
    menuButton.onclick = event => {
      event.stopPropagation();

      const isOpen = !menu.classList.contains('hidden');

      menu.classList.toggle('hidden', isOpen);
      menuButton.setAttribute('aria-expanded', String(!isOpen));
    };

    document.addEventListener('click', event => {
      if (!event.target.closest('.header-menu')) {
        menu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Keep the rest of your existing bindEvents() code here.


  const languageSelect = $('languageSelect');

  if (languageSelect) {
    languageSelect.addEventListener('change', event => {
      currentLanguage = event.target.value === 'id' ? 'id' : 'en';

      try {
        localStorage.setItem(LANGUAGE_KEY, currentLanguage);
      } catch (error) {
        console.warn('Could not save language preference:', error);
      }

      applyLanguage();
    });
  }

  $('searchInput').addEventListener('input', () => {
    clearTimeout(searchTimer);

    const query = $('searchInput').value.trim();

    if (query && !previousSearchQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    previousSearchQuery = query;

    searchTimer = setTimeout(renderProducts, 120);
  });

  $('clearSearch').onclick = () => {
    $('searchInput').value = '';
    previousSearchQuery = '';
    renderProducts();
    $('searchInput').focus();
  };

  $('refreshBtn').onclick = () => loadCatalog();

  $('closeQuantity').onclick = closeQuantitySelector;
  $('quantityOverlay').onclick = closeQuantitySelector;

  $('quantityMinus').onclick = () => {
    const input = $('productQuantity');
    input.value = Math.max(1, Number(input.value || 1) - 1);
    updateQuantitySubtotal();
  };

  $('quantityPlus').onclick = () => {
    const input = $('productQuantity');
    input.value = Math.max(1, Number(input.value || 1) + 1);
    updateQuantitySubtotal();
  };

  $('productQuantity').addEventListener('input', updateQuantitySubtotal);

  $('productQuantity').addEventListener('focus', event => {
    event.target.value = '';
    updateQuantitySubtotal();
  });

  $('productQuantity').addEventListener('blur', () => {
    const input = $('productQuantity');

    input.value = Math.max(
      1,
      Math.floor(Number(input.value) || 1)
    );

    updateQuantitySubtotal();
  });

  $('confirmAddToCart').onclick = confirmAddToCart;

  $('cartTop').onclick = openCart;
  $('navCart').onclick = openCart;
$('savedOrdersTop').onclick = openSavedOrders;
document.querySelectorAll('[data-order-location]').forEach(button => {
  button.onclick = () => setOrderLocation(button.dataset.orderLocation);
});

setOrderLocation(orderLocation);
if ($('closeSavedOrders')) {
  $('closeSavedOrders').onclick = closeSavedOrders;
}
if ($('savedOrdersOverlay')) {
  $('savedOrdersOverlay').onclick = closeSavedOrders;
}

if ($('saveCartOrder')) {
  $('saveCartOrder').onclick = saveCurrentOrder;
}

if ($('navImport')) {
  $('navImport').onclick = openImportOrder;
}

if ($('closeImportOrder')) {
  $('closeImportOrder').onclick = closeImportOrder;
}

if ($('importOrderOverlay')) {
  $('importOrderOverlay').onclick = closeImportOrder;
}

if ($('pasteImportOrder')) {
  $('pasteImportOrder').onclick = pasteImportOrder;
}

if ($('confirmImportOrder')) {
  $('confirmImportOrder').onclick = importOrderFromText;
}

$('navCatalog').onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
  $('customerType').addEventListener('change', renderCart);
  $('closeCart').onclick = closeCart;
  $('cartOverlay').onclick = closeCart;

  $('sendOrder').onclick = sendOrder;

  $('copyOrder').onclick = copyOrder;
  $('emptyCart').onclick = emptyCart;

  $('settingsButton').onclick = () => {
    $('headerMenu').classList.add('hidden');
    $('headerMenuButton').setAttribute('aria-expanded', 'false');
    openSettings();
  };

 const closeSettingsButton = $('closeSettings');
if (closeSettingsButton) {
  closeSettingsButton.onclick = closeSettings;
}

const settingsOverlay = $('settingsOverlay');
if (settingsOverlay) {
  settingsOverlay.onclick = closeSettings;
}

    $('saveSettings').onclick = () => {
    settings = {
  ...settings,
  pin: $('orderPin').value.trim(),
  inboxPin: $('inboxPin').value.trim()
};
    writeStorage(CONFIG.settingsKey, settings);
    closeSettings();
    showToast(t('settingsSaved'));
  };

}

/* =========================================================
   16. APP STARTUP
   ========================================================= */

function initializeApp() {
  bindEvents();
  applyLanguage();
  ensureRequesterIdentity();

  updateCartBadge();
  renderCart();
   renderSavedOrders();

  CentiSearch.loadRules('./search-rules.json')
    .then(() => {
      if (products.length) renderProducts();
    })
    .catch(error => {
      console.error('Could not load search rules:', error);
    });

  loadCatalog();

  window.addEventListener('pageshow', event => {
    if (event.persisted && navigator.onLine) {
      loadCatalog({ silent: true });
    }
  });

  startAutomaticRefresh();

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && navigator.onLine) {
      loadCatalog({ silent: true });
    }
  });

  window.addEventListener('online', () => {
    loadCatalog({ silent: true });
  });

  if ('serviceWorker' in navigator) {
    let refreshing = false;
    let swRegistration;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;

      refreshing = true;
      window.location.reload();
    });

    async function checkForUpdates() {
      if (!navigator.onLine || !swRegistration) return;

      try {
        await swRegistration.update();
      } catch (error) {
        console.log('Update check failed:', error);
      }
    }

    navigator.serviceWorker.register('./sw.js', {
      updateViaCache: 'none'
    })
      .then(registration => {
        swRegistration = registration;
        checkForUpdates();

        setInterval(checkForUpdates, 60 * 1000);

        window.addEventListener('pageshow', checkForUpdates);
        window.addEventListener('focus', checkForUpdates);

        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            checkForUpdates();
          }
        });

        window.addEventListener('online', checkForUpdates);
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  }
}

initializeApp();

(function initViewOrder() {
  const $ = (id) => document.getElementById(id);
  const panel = $('viewOrderPanel');
  const overlay = $('viewOrderOverlay');

  function openViewOrder(order) {
    const items = order.items || order.cart || [];
    let total = 0;

    $('viewOrderTitle').textContent = order.name || 'Order';
    $('viewOrderSubtitle').textContent = `${items.length} different products`;

    $('viewOrderItems').innerHTML = items.map(it => {
      const qty = Number(it.qty ?? it.quantity ?? 1);
      const price = Number(it.price ?? 0);
      const line = qty * price;
      total += line;
      const img = it.image || it.imageUrl || '';
      return `
        <div class="cart-row">
          <div class="cart-row-main">
            ${img
              ? `<img class="cart-product-image" src="${esc(img)}" alt="">`
              : `<div class="cart-image-placeholder">▧</div>`}
            <div class="cart-product-info">
              <strong>${esc(it.name)}</strong>
              <small>SKU: ${esc(it.sku)}</small>
              <small>${qty} × ${money(price)}</small>
            </div>
          </div>
          <div class="cart-row-price">${money(line)}</div>
        </div>`;
    }).join('') || '<div class="empty"><strong>This order is empty</strong></div>';

    $('viewOrderTotal').textContent = money(order.total ?? total);
        $('viewOrderMeta').innerHTML = [order.orderLocation, order.customerType, order.requesterName]
      .filter(Boolean).map(esc).join(' · ');
        history.pushState({ centiView: true }, '', location.href);
    window.__viewEntry = true;
    overlay.classList.remove('hidden');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
  }

    function closeViewOrder() {
    overlay.classList.add('hidden');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');

    if (window.__viewEntry) {
      window.__viewEntry = false;
      window.__skipPop = true;
      history.back();
    }
  }
  window.closeViewOrder = closeViewOrder;

  $('savedOrdersList').addEventListener('click', (e) => {
    const btn = e.target.closest('.view-saved');
    if (!btn) return;
    const order = savedOrders.find(o => String(o.id) === String(btn.dataset.id)); // <-- ADJUST
    if (order) openViewOrder(order);
  });

  $('closeViewOrder').addEventListener('click', closeViewOrder);
  overlay.addEventListener('click', closeViewOrder);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closeViewOrder();
  });
})();
/* =========================================================
   NOTA PEMBAYARAN (A5, print)
   ========================================================= */
(function initNota() {
  const W = 1050, H = 1488, M = 60, FOOT = 90;   // ~A5 portrait ratio
  const FOOTER_TEXT =
    'Lembar ini merupakan nota sah yang di keluarkan oleh Centi Store';

   function loadLogo() {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          c.width = img.width;
          c.height = img.height;
          const cx = c.getContext('2d');
          cx.drawImage(img, 0, 0);
          const d = cx.getImageData(0, 0, c.width, c.height).data;

          let x1 = c.width, y1 = c.height, x2 = 0, y2 = 0;
          for (let y = 0; y < c.height; y++) {
            for (let x = 0; x < c.width; x++) {
              const i = (y * c.width + x) * 4;
              if (d[i + 3] > 10 && (d[i] < 220 || d[i + 1] < 220 || d[i + 2] < 220)) {
                if (x < x1) x1 = x;
                if (x > x2) x2 = x;
                if (y < y1) y1 = y;
                if (y > y2) y2 = y;
              }
            }
          }

          if (x2 <= x1 || y2 <= y1) return resolve(img);

          const out = document.createElement('canvas');
          out.width = x2 - x1 + 1;
          out.height = y2 - y1 + 1;
          out.getContext('2d').drawImage(
            img, x1, y1, out.width, out.height, 0, 0, out.width, out.height
          );
          resolve(out);
        } catch (e) {
          resolve(img);
        }
      };
      img.onerror = () => resolve(null);
      img.src = 'assets/centi-logo-nota.png';
    });
  }

  function wrapText(ctx, text, maxW, maxLines) {
    const words = String(text || '').split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    words.forEach(word => {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    if (!lines.length) lines.push('');
    if (lines.length > maxLines) {
      lines.length = maxLines;
      lines[maxLines - 1] = lines[maxLines - 1].slice(0, -1) + '…';
    }
    return lines;
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const date = d.toLocaleDateString('id-ID',
      { day: '2-digit', month: 'long', year: 'numeric' });
    const time = d.toLocaleTimeString('id-ID',
      { hour: '2-digit', minute: '2-digit' });
    return `${date}, ${time}`;
  }

  /* ---------- popup: name + payment method ---------- */
     function askDetails(defaultType, defaultDoc) {
    return new Promise(resolve => {
      let payment = 'Cash';
             let docType = defaultDoc || 'Nota';

      const overlay = document.createElement('div');
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:999998;display:flex;' +
        'align-items:flex-start;justify-content:center;' +
        'padding:max(12px,env(safe-area-inset-top)) 14px 14px;' +
        'overflow-y:auto;-webkit-overflow-scrolling:touch;' +
        'background:rgba(0,0,0,.6);';

      overlay.innerHTML = `
               <section style="width:min(380px,100%);padding:20px;background:#fff;margin:0 auto;
                        color:#172033;border-radius:16px;box-sizing:border-box">
                   <h2 style="margin:0 0 12px;font-size:18px">Cetak dokumen</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
            ${['Nota', 'Invoice'].map(d => `
              <button type="button" data-doc="${d}"
                style="padding:11px 6px;border:1px solid #e7eaf0;border-radius:9px;
                       font-size:13px;font-weight:700;cursor:pointer">
                ${d === 'Nota' ? 'Nota Pembayaran' : 'Invoice'}
              </button>
            `).join('')}
          </div>

          <label style="display:block;font-size:12px;font-weight:700;margin-bottom:6px">
            Nama pelanggan (opsional)
          </label>
          <input id="notaNameInput" type="text" autocomplete="off"
                 placeholder="Kosongkan = jenis pelanggan saja"
                 style="width:100%;padding:11px;border:1px solid #e7eaf0;
                        border-radius:9px;font-size:14px;box-sizing:border-box">
                        
          <label style="display:block;font-size:12px;font-weight:700;margin:14px 0 6px">
            Jenis pelanggan
          </label>
          <select id="notaTypeSelect"
                  style="width:100%;padding:11px;border:1px solid #e7eaf0;
                         border-radius:9px;font-size:14px;background:#fff;
                         box-sizing:border-box">
            <option value="">-</option>
            ${[...document.querySelectorAll('#customerType option')]
              .filter(o => o.value)
              .map(o => `<option value="${o.value}"${o.value === defaultType ? ' selected' : ''}>${o.value}</option>`)
              .join('')}
          </select>

                    <div id="notaPayLabel" style="font-size:12px;font-weight:700;margin:14px 0 6px">Pembayaran</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
            ${['QRIS', 'Cash', 'Transfer'].map(p => `
              <button type="button" data-pay="${p}"
                style="padding:11px 6px;border:1px solid #e7eaf0;border-radius:9px;
                       font-size:13px;font-weight:700;cursor:pointer">${p}</button>
            `).join('')}
          </div>

                   <button type="button" data-nota-wa
            style="width:100%;margin-top:18px;padding:12px;border:0;border-radius:10px;
                   background:#25d366;color:#fff;font-weight:700;cursor:pointer">
            Kirim ke WhatsApp
          </button>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">
            <button type="button" data-nota-cancel
              style="padding:12px;border:1px solid #e7eaf0;border-radius:10px;
                     background:#fff;font-weight:700;cursor:pointer">Batal</button>
            <button type="button" data-nota-ok
              style="padding:12px;border:0;border-radius:10px;background:#16845b;
                     color:#fff;font-weight:700;cursor:pointer">Print</button>
          </div>
        </section>`;

      document.body.appendChild(overlay);

      const input = overlay.querySelector('#notaNameInput');
      const payButtons = [...overlay.querySelectorAll('[data-pay]')];

      const paint = () => payButtons.forEach(b => {
        const on = b.dataset.pay === payment;
        b.style.background = on ? '#16845b' : '#fff';
        b.style.color = on ? '#fff' : '#172033';
        b.style.borderColor = on ? '#16845b' : '#e7eaf0';
      });
      const docButtons = [...overlay.querySelectorAll('[data-doc]')];
      const payLabel = overlay.querySelector('#notaPayLabel');
      const payGrid = payLabel.nextElementSibling;

      const paintDoc = () => {
        docButtons.forEach(b => {
          const on = b.dataset.doc === docType;
          b.style.background = on ? '#16845b' : '#fff';
          b.style.color = on ? '#fff' : '#172033';
          b.style.borderColor = on ? '#16845b' : '#e7eaf0';
        });
        const isNota = docType === 'Nota';
        payLabel.style.display = isNota ? '' : 'none';
        payGrid.style.display = isNota ? 'grid' : 'none';
      };

      docButtons.forEach(b => b.addEventListener('click', () => {
        docType = b.dataset.doc;
        paintDoc();
      }));
      paintDoc();
      payButtons.forEach(b => b.addEventListener('click', () => {
        payment = b.dataset.pay;
        paint();
      }));
      paint();

                 overlay.id = 'notaPopupOverlay';
      history.pushState({ centiNota: true }, '', location.href);

      const close = (value, fromBack) => {
        overlay.remove();
        window.closeNotaPopup = null;
        if (!fromBack) {
          window.__skipPop = true;
          history.back();
        }
        resolve(value);
      };
      window.closeNotaPopup = () => close(null, true);
       
             overlay.querySelector('[data-nota-wa]').addEventListener('click', () =>
        close({
          name: input.value.trim(),
          payment,
          customerType: overlay.querySelector('#notaTypeSelect').value,
          docType,
          action: 'whatsapp'
        }));
      overlay.querySelector('[data-nota-cancel]')
        .addEventListener('click', () => close(null));
      overlay.querySelector('[data-nota-ok]')
        .addEventListener('click', () =>
                    close({
            name: input.value.trim(),
            payment,
                        customerType: overlay.querySelector('#notaTypeSelect').value,
            docType
          }));

            if (!window.matchMedia('(pointer: coarse)').matches) input.focus();
    });
  }

  /* ---------- page drawing ---------- */
  function drawPage(page, index, totalPages, logo, data) {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const hline = (yy, color, width) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(M, yy);
      ctx.lineTo(W - M, yy);
      ctx.stroke();
    };

    let y;

    /* header */
    if (logo) {
      const lw = page.first ? 440 : 300;
      const lh = lw * logo.height / logo.width;
      ctx.drawImage(logo, M, page.first ? 40 : 28, lw, lh);
    } else {
      ctx.fillStyle = '#8f0010';
      ctx.font = 'bold 40px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('CENTI STORE', M, 80);
    }

    ctx.textAlign = 'right';
    ctx.fillStyle = '#171717';

    if (page.first) {
      ctx.font = 'bold 40px Arial';
            ctx.fillText(data.docType === 'Invoice' ? 'Invoice' : 'Nota Pembayaran', W - M, 78);
      ctx.font = '20px Arial';
      ctx.fillStyle = '#777777';
      ctx.fillText(String(data.invoiceNumber).replace(/^INV-/, data.docType === 'Invoice' ? 'INV-' : 'NOT-'), W - M, 112);
      hline(150, '#171717', 2);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#777777';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('PELANGGAN', M, 200);

      ctx.fillStyle = '#171717';
      ctx.font = 'bold 30px Arial';
      ctx.fillText(data.customerType || '-', M, 244);

      if (data.customerName) {
        ctx.font = '26px Arial';
        ctx.fillText(data.customerName, M, 284);
      }
      y = 340;
    } else {
      ctx.font = 'bold 26px Arial';
            ctx.fillText((data.docType === 'Invoice' ? 'Invoice' : 'Nota Pembayaran') + ' (lanjutan)', W - M, 60);
      hline(105, '#171717', 2);
      y = 130;
    }

    /* table */
    if (page.rows.length) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(M, y, W - M * 2, 44);

      ctx.fillStyle = '#555555';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('ITEM', M + 12, y + 29);
      ctx.textAlign = 'right';
      ctx.fillText('QTY', 650, y + 29);
      ctx.fillText('HARGA', 820, y + 29);
      ctx.fillText('SUBTOTAL', W - M - 12, y + 29);
      y += 56;

      page.rows.forEach(r => {
        const it = r.item;
        const qty = Number(it.qty) || 0;
        const price = Number(it.price) || 0;

        hline(y, '#e5e7eb', 1);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#171717';
        ctx.font = 'bold 22px Arial';
        r.lines.forEach((ln, i) => ctx.fillText(ln, M + 12, y + 36 + i * 28));

        ctx.font = '15px Arial';
        ctx.fillStyle = '#777777';
        ctx.fillText(`SKU: ${it.sku || '-'}`, M + 12,
          y + 62 + (r.lines.length - 1) * 28);

        ctx.fillStyle = '#333333';
        ctx.font = '21px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(String(qty), 650, y + 36);
        ctx.fillText(money(price), 820, y + 36);
        ctx.fillText(money(price * qty), W - M - 12, y + 36);

        y += r.h;
      });
    }

        /* totals (last page only) */
    if (page.totals) {
      hline(y, '#171717', 2);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#777777';
      ctx.font = 'bold 22px Arial';
      ctx.fillText('GRAND TOTAL', M, y + 58);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#171717';
      ctx.font = 'bold 40px Arial';
      ctx.fillText(money(data.total), W - M, y + 60);

            /* payment (Nota only) + date, pinned to the bottom above the footer */
      const isInv = data.docType === 'Invoice';
      const by = H - FOOT - (isInv ? 80 : 160);
      hline(by, '#cfd3da', 1);

      let dy = by + 50;

      if (!isInv) {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#777777';
        ctx.font = '22px Arial';
        ctx.fillText('Pembayaran', M, dy);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#171717';
        ctx.font = 'bold 26px Arial';
        ctx.fillText(data.payment, W - M, dy);

        hline(by + 80, '#cfd3da', 1);
        dy = by + 130;
      }

      ctx.textAlign = 'left';
      ctx.fillStyle = '#777777';
      ctx.font = '22px Arial';
      ctx.fillText('Tanggal dibuat', M, dy);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#171717';
      ctx.font = '24px Arial';
      ctx.fillText(formatDate(data.createdAt), W - M, dy);
    }

    /* footer on every page */
    hline(H - FOOT, '#cfd3da', 1);

    if (totalPages > 1) {
      ctx.textAlign = 'right';
      ctx.fillStyle = '#777777';
      ctx.font = '16px Arial';
      ctx.fillText(`Halaman ${index + 1}/${totalPages}`, W - M, H - FOOT + 30);
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#666666';
    ctx.font = '19px Arial';
        ctx.fillText(
      data.docType === 'Invoice'
        ? 'Terima kasih telah berbelanja di Centi Store'
        : FOOTER_TEXT,
      W / 2, H - 28
    );

    return c;
  }

  async function generatePages(data) {
    const logo = await loadLogo();

    const measure = document.createElement('canvas').getContext('2d');
    measure.font = 'bold 22px Arial';

    const rows = data.items.map(item => {
      const lines = wrapText(measure, item.name, 470, 2);
      return { item, lines, h: 56 + lines.length * 28 };
    });

    const HEAD1 = 340, HEADN = 130, TABLE_HEAD = 56, TOTALS = 290;
    const limit = H - FOOT - 20;

    const pages = [];
    let cur = { rows: [], first: true };
    let y = HEAD1 + TABLE_HEAD;

    rows.forEach(r => {
      if (y + r.h > limit) {
        pages.push(cur);
        cur = { rows: [], first: false };
        y = HEADN + TABLE_HEAD;
      }
      cur.rows.push(r);
      y += r.h;
    });

    if (y + TOTALS > limit) {
      pages.push(cur);
      cur = { rows: [], first: false };
    }
    cur.totals = true;
    pages.push(cur);

    return pages.map((p, i) => drawPage(p, i, pages.length, logo, data));
  }
  /* ---------- share sheet + WhatsApp ---------- */
  const WA_NUMBER = '6287877888865';

  function buildText(d) {
    const no = String(d.invoiceNumber || '').replace(/\D/g, '') || getCartNo();
    const lines = [
      `New Order: CAT-${no}`,
      '---------------------------------',
      `Pelanggan: ${d.customerType || 'Unknown'}`,
      `Requested by: ${d.requesterName || requesterName || 'Unknown'}`,
      `Lokasi: ${d.orderLocation || orderLocation}`,
      'No : Mobile Catalog',
      '',
      'Pesanan :'
    ];
    d.items.forEach(it => lines.push(
      '',
      `${it.qty}x ${it.name}`,
      `  SKU: ${it.sku}`,
      `  Price: ${money(it.price)}`
    ));
    lines.push('', `Total : ${money(d.total)}`);
    return lines.join('\n');
  }

  function toFiles(canvases, data) {
    const prefix = String(data.invoiceNumber || 'nota').replace(
      /^INV-/, data.docType === 'Invoice' ? 'INV-' : 'NOT-');
    return Promise.all(canvases.map((c, i) => new Promise(resolve =>
      c.toBlob(b => resolve(new File(
        [b],
        `${prefix}${canvases.length > 1 ? '-' + (i + 1) : ''}.png`,
        { type: 'image/png' }
      )), 'image/png')
    )));
  }

  async function shareFiles(canvases, data) {
    try {
      const files = await toFiles(canvases, data);
      if (!navigator.canShare || !navigator.canShare({ files })) return false;
      await navigator.share({ files });
      return true;
    } catch (error) {
      return error && error.name === 'AbortError';   // user closed the sheet
    }
  }

  async function sendWhatsApp(canvases, data) {
    let copied = false;
    try {
      const blob = await new Promise(r => canvases[0].toBlob(r, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      copied = true;
    } catch (error) {
      console.warn('Image copy failed:', error);
    }

    showToast(copied
      ? 'Gambar nota disalin. Tempel di chat WhatsApp'
      : 'Gambar tidak bisa disalin');

    setTimeout(() => {
      window.location.href =
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildText(data))}`;
    }, 700);
  }
   
  /* ---------- print ---------- */
    async function printPages(canvases, data) {
    if (data && window.matchMedia('(pointer: coarse)').matches) {
      if (await shareFiles(canvases, data)) return;
    }
    const old = document.getElementById('notaPrintArea');
    if (old) old.remove();

    const area = document.createElement('div');
    area.id = 'notaPrintArea';

    const imgs = canvases.map(canvas => {
      const img = new Image();
      img.src = canvas.toDataURL('image/png');
      area.appendChild(img);
      return img;
    });

    document.body.appendChild(area);

    await Promise.all(imgs.map(img =>
      img.decode ? img.decode().catch(() => {}) : Promise.resolve()
    ));

    window.addEventListener('afterprint', () => {
      setTimeout(() => area.remove(), 1000);
    }, { once: true });

    window.print();
  }

  async function runNota(base) {
           const details = await askDetails(
      base.customerType || ($('customerType') ? $('customerType').value : ''),
      base.docType
    );
    if (!details) return;

    showToast('Membuat nota…');

    try {
      const pages = await generatePages({
        ...base,
        customerName: details.name,
       customerType: details.customerType,
                payment: details.payment,
        docType: details.docType
      });
            const merged = {
        ...base,
        customerType: details.customerType,
        docType: details.docType
      };
      if (details.action === 'whatsapp') await sendWhatsApp(pages, merged);
      else await printPages(pages, merged);
    } catch (error) {
      console.error('Nota failed:', error);
      showToast('Gagal membuat nota');
    }
  }

  function printSavedNota(id) {
    const order = savedOrders.find(o => o.id === id);
    if (!order) return;

    runNota({
      items: order.items,
      total: order.total,
            customerType: order.customerType,
      requesterName: order.requesterName,
      orderLocation: order.orderLocation,
      createdAt: order.createdAt,
      invoiceNumber: order.invoiceNumber ||
        'INV-' + String(order.id).replace('SAVED-', '')
    });
  }

  function printCartNota() {
    const items = cartValues();
    if (!items.length) return;

    runNota({
      items: JSON.parse(JSON.stringify(items)),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
      customerType: $('customerType').value,
      createdAt: new Date().toISOString(),
            invoiceNumber: 'INV-' + getCartNo()
    });
  }

  $('savedOrdersList').addEventListener('click', e => {
    const btn = e.target.closest('.print-saved');
    if (btn) printSavedNota(btn.dataset.printSaved);
  });

  const cartBtn = $('printNotaCart');
  if (cartBtn) cartBtn.addEventListener('click', printCartNota);
})();
(function initQuantityGallery() {
  const gallery = $('quantityGallery');
  if (!gallery) return;

  const dots = [...document.querySelectorAll('.q-dot')];

  const sync = () => {
    const i = Math.round(gallery.scrollLeft / Math.max(1, gallery.clientWidth));
    dots.forEach((dot, n) => dot.classList.toggle('active', n === i));
  };

  gallery.addEventListener('scroll', sync, { passive: true });

  dots.forEach(dot => dot.addEventListener('click', () => {
    gallery.scrollTo({
      left: Number(dot.dataset.slide) * gallery.clientWidth,
      behavior: 'smooth'
    });
  }));
})();
