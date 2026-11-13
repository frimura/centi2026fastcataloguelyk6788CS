'use strict';

(() => {
   const ENDPOINT = `${SUPABASE_URL}/functions/v1/smooth-handler`;


  const COPY = {
    en: {
      recipient: 'Send to',
      choose: 'Select salesman',
      send: 'Send to salesman',
      inbox: 'Inbox',
      received: 'Orders sent to this name',
      refresh: 'Refresh inbox',
      loading: 'Loading inbox…',
      noOrders: 'No open orders for this name.',
      chooseName: 'Select your name before opening the inbox.',
      needPin: 'Set the shared inbox PIN in Connection settings.',
      load: 'Load to cart',
      complete: 'Complete',
      emptyCartConfirm: 'Replace your current cart with this received order?',
      loaded: 'Order loaded into your cart',
      sendConfirm: 'Send this order to',
      sent: 'Order sent to',
      sender: 'Sent by',
      total: 'Total',
      failed: 'Inbox request failed',
      orderCompleted: 'Order marked complete',
      dateInvalid: 'Unknown date',
      orderFrom: 'Order from',
      openInCart: 'open in cart?',
      yesOpen: 'Open in cart',
      later: 'Later',
      loadedFrom: 'Loaded from'
    },
    id: {
      recipient: 'Kirim kepada',
      choose: 'Pilih sales',
      send: 'Kirim ke sales',
      inbox: 'Kotak masuk',
      received: 'Pesanan untuk nama ini',
      refresh: 'Muat ulang',
      loading: 'Memuat kotak masuk…',
      noOrders: 'Tidak ada pesanan terbuka untuk nama ini.',
      chooseName: 'Pilih nama Anda sebelum membuka kotak masuk.',
      needPin: 'Atur PIN kotak masuk bersama di Pengaturan koneksi.',
      load: 'Muat ke keranjang',
      complete: 'Selesai',
      emptyCartConfirm: 'Ganti keranjang saat ini dengan pesanan ini?',
      loaded: 'Pesanan dimuat ke keranjang',
      sendConfirm: 'Kirim pesanan ini kepada',
      sent: 'Pesanan terkirim kepada',
      sender: 'Dikirim oleh',
      total: 'Total',
      failed: 'Permintaan kotak masuk gagal',
      orderCompleted: 'Pesanan ditandai selesai',
      dateInvalid: 'Tanggal tidak diketahui',
      orderFrom: 'Pesanan dari',
      openInCart: 'buka di keranjang?',
      yesOpen: 'Buka di keranjang',
      later: 'Nanti',
      loadedFrom: 'Dimuat dari'
    }
  };

   let cachedInboxOrders = [];
  let inboxRequestRunning = false;

  const SEEN_KEY = 'centi_inbox_seen_v1';
  let promptQueue = [];
  let promptOpen = false;

  function words() {
    return COPY[currentLanguage === 'id' ? 'id' : 'en'];
  }

  function ensureInboxSection() {
    const host = $('savedOrdersList');
    if (!host) return null;

    let section = $('sharedInboxSection');
    if (!section) {
      section = document.createElement('section');
      section.id = 'sharedInboxSection';
      section.className = 'shared-inbox-section';
      host.appendChild(section);
    }

    section.innerHTML = `
      <div class="shared-inbox-heading">
        <div>
          <strong>${words().received}</strong>
          <small id="sharedInboxStatus">${words().loading}</small>
        </div>
        <button id="refreshSharedInbox" type="button">
          ${words().refresh}
        </button>
      </div>
      <div id="sharedInboxOrders"></div>
    `;

    return section;
  }

  function updateInboxBadge(count) {
    const badge = $('navInboxCount');
    if (!badge) return;

    badge.textContent = String(count);
    badge.hidden = count < 1;
  }

  function renderInboxOrders(orders) {
    const section = ensureInboxSection();
    if (!section) return;

    const status = $('sharedInboxStatus');
    const host = $('sharedInboxOrders');
    if (!status || !host) return;

    status.textContent = `${orders.length} open`;
    updateInboxBadge(orders.length);

    if (!orders.length) {
      host.innerHTML = `<p class="shared-inbox-empty">${words().noOrders}</p>`;
      return;
    }

    host.innerHTML = orders.map(order => {
      const created = new Date(order.created_at);
      const date = Number.isNaN(created.getTime())
        ? words().dateInvalid
        : created.toLocaleString();

      const itemRows = (order.items || []).map(item => `
        <li>
          <strong>${esc(item.qty)} × ${esc(item.name)}</strong>
          <small>${esc(item.sku)}</small>
        </li>
      `).join('');

      return `
        <article class="shared-order-card">
          <div class="shared-order-top">
            <strong>${esc(order.order_no)}</strong>
            <small>${esc(date)}</small>
          </div>

          <p>
            ${esc(words().sender)}: ${esc(order.sender_name)}
          </p>
          <p>
            ${esc(order.customer_type)} · ${esc(order.order_location)}
          </p>

          <ul class="shared-order-items">${itemRows}</ul>

          <div class="shared-order-total">
            ${esc(words().total)}: <strong>${money(order.total)}</strong>
          </div>

          <div class="shared-order-actions">
            <button type="button" data-load-shared="${esc(order.id)}">
              ${words().load}
            </button>
            <button type="button" data-complete-shared="${esc(order.id)}">
              ${words().complete}
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  async function callInboxApi(payload) {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_PUBLIC_KEY
      },
      body: JSON.stringify({
        ...payload,
        pin: (settings.inboxPin || '').trim()
      })
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.error || `${words().failed} (${response.status})`);
    }

    return result;
  }

  async function loadInbox() {
    ensureInboxSection();

    if (!REQUESTER_NAMES.includes(requesterName)) {
      $('sharedInboxStatus').textContent = words().chooseName;
      updateInboxBadge(0);
      return;
    }

    if (!(settings.inboxPin || '').trim()) {
      $('sharedInboxStatus').textContent = words().needPin;
      updateInboxBadge(0);
      return;
    }

    if (inboxRequestRunning) return;
    inboxRequestRunning = true;

    try {
      const result = await callInboxApi({
        action: 'inbox',
        recipientName: requesterName
      });

      cachedInboxOrders = result.orders || [];
      renderInboxOrders(cachedInboxOrders);
      checkNewOrders(cachedInboxOrders);
    } catch (error) {
      const status = $('sharedInboxStatus');
      if (status) status.textContent = error.message;
    } finally {
      inboxRequestRunning = false;
    }
  }

  function updateLabels() {


    const button = $('sendToSalesman');
    if (button) button.textContent = words().send;

    const inboxLabel = $('navInboxLabel');
    if (inboxLabel) inboxLabel.textContent = words().inbox;


    const section = $('sharedInboxSection');
    if (section) ensureInboxSection();
  }

  function addControls() {
    const cartActions = document.querySelector('.cart-actions');
    const savedOrdersButton = $('savedOrdersTop');

    if (!cartActions || !savedOrdersButton) {
      console.error('Order inbox: required page elements were not found.');
      return false;
    }


    const sendRow = document.createElement('div');
    sendRow.className = 'cart-button-row shared-send-row';

    const sendButton = document.createElement('button');
    sendButton.id = 'sendToSalesman';
    sendButton.type = 'button';
    sendButton.className = 'primary-button shared-send-button';
    sendRow.appendChild(sendButton);

    const firstButtonRow = cartActions.querySelector('.cart-button-row');
    if (firstButtonRow) {
      firstButtonRow.insertAdjacentElement('afterend', sendRow);
    } else {
      cartActions.appendChild(sendRow);
    }

    const inboxButton = document.createElement('button');
    inboxButton.id = 'navInbox';
    inboxButton.type = 'button';
    inboxButton.innerHTML = `
      <span class="nav-icon">📥</span>
      <span class="nav-label" id="navInboxLabel"></span>
      <b id="navInboxCount" hidden>0</b>
    `;
    savedOrdersButton.insertAdjacentElement('beforebegin', inboxButton);


    updateLabels();
    renderCart();

    $('sendToSalesman').addEventListener('click', openRecipientPopup);

    $('navInbox').addEventListener('click', () => {
      openSavedOrders();
      setTimeout(() => {
        $('sharedInboxSection')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 150);
    });

    $('languageSelect')?.addEventListener('change', updateLabels);

    $('savedOrdersList').addEventListener('click', async event => {
      const target = event.target;

      if (target.closest('#refreshSharedInbox')) {
        await loadInbox();
        return;
      }

      const loadButton = target.closest('[data-load-shared]');
      if (loadButton) {
        loadSharedOrder(loadButton.dataset.loadShared);
        return;
      }

      const completeButton = target.closest('[data-complete-shared]');
      if (completeButton) {
        await completeSharedOrder(completeButton.dataset.completeShared);
      }
    });

    const originalRenderSavedOrders = renderSavedOrders;
    renderSavedOrders = function (...args) {
      originalRenderSavedOrders.apply(this, args);
      void loadInbox();
    };

        setInterval(() => {
      if (!document.hidden && navigator.onLine) void loadInbox();
    }, 20000);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) void loadInbox();
    });

    void loadInbox();
    return true;
  }
function openRecipientPopup() {
  if (!REQUESTER_NAMES.includes(requesterName)) {
    showRequesterPrompt();
    showToast(t('selectName'));
    return;
  }

  if (!cartValues().length) {
    showToast(t('emptyCart'));
    return;
  }

  if (!$('customerType').value) {
    showToast(t('selectCustomerFirst'));
    return;
  }

  const cancelLabel = currentLanguage === 'id' ? 'Batal' : 'Cancel';
  let selectedRecipient = '';

  const overlay = document.createElement('div');
  overlay.id = 'salesmanRecipientOverlay';
  overlay.className = 'salesman-recipient-overlay';

  overlay.innerHTML = `
    <section class="salesman-recipient-dialog"
             role="dialog" aria-modal="true">
      <h2>${esc(words().send)}</h2>
      <p class="salesman-recipient-prompt">${esc(words().choose)}</p>

      <div class="salesman-recipient-options">
        ${REQUESTER_NAMES.map(name => `
          <button
            type="button"
            class="salesman-recipient-option"
            data-recipient="${esc(name)}"
            aria-pressed="false">
            ${esc(name)}
          </button>
        `).join('')}
      </div>

      <div class="salesman-recipient-actions">
        <button id="cancelSalesmanPopup" type="button">
          ${esc(cancelLabel)}
        </button>
        <button id="confirmSalesmanPopup"
                class="primary-button" type="button" disabled>
          ${esc(words().send)}
        </button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);

  const closePopup = () => overlay.remove();

  $('cancelSalesmanPopup').onclick = closePopup;

  overlay.addEventListener('click', event => {
    if (event.target === overlay) closePopup();
  });

  overlay.querySelectorAll('[data-recipient]').forEach(button => {
    button.addEventListener('click', () => {
      selectedRecipient = button.dataset.recipient;

      overlay.querySelectorAll('[data-recipient]').forEach(option => {
        const selected = option === button;
        option.classList.toggle('is-selected', selected);
        option.setAttribute('aria-pressed', String(selected));
      });

      $('confirmSalesmanPopup').disabled = false;
    });
  });

  $('confirmSalesmanPopup').onclick = async () => {
    if (!selectedRecipient) {
      showToast(words().choose);
      return;
    }

    closePopup();
    await sendSharedOrder(selectedRecipient);
  };
}

async function sendSharedOrder(recipientName) {
  if (!REQUESTER_NAMES.includes(requesterName)) {
    showRequesterPrompt();
    showToast(t('selectName'));
    return;
  }

  const items = cartValues();
  if (!items.length) {
    showToast(t('emptyCart'));
    return;
  }

  const customerType = $('customerType').value;
  if (!customerType) {
    showToast(t('selectCustomerFirst'));
    return;
  }

  if (!(settings.inboxPin || '').trim()) {
    openSettings();
    showToast(words().needPin);
    return;
  }

  const button = $('sendToSalesman');
  button.disabled = true;

  try {
    await callInboxApi({
      action: 'send',
      senderName: requesterName,
      recipientName,
      order: {
        orderNo: `CAT-${getCartNo()}`,
        customerType,
        orderLocation,
        items: items.map(item => ({
          sku: item.sku,
          name: item.name,
          price: Number(item.price) || 0,
          qty: Number(item.qty) || 0,
          image: item.image || ''
        }))
      }
    });

    showToast(`${words().sent} ${recipientName}`);

    if ($('savedOrdersPanel')?.classList.contains('open')) {
      await loadInbox();
    }
  } catch (error) {
    showToast(`${words().failed}: ${error.message}`);
  } finally {
    button.disabled = false;
  }
}
    function loadSharedOrder(id) {
    const order = cachedInboxOrders.find(item => item.id === id);
    if (order) openSharedOrderInCart(order);
  }

  function openSharedOrderInCart(order) {
    const importedCart = {};

    for (const item of order.items || []) {
      const sku = String(item.sku || '').trim();
      const qty = Math.floor(Number(item.qty) || 0);
      if (!sku || qty < 1) continue;

      const product = products.find(
        product => String(product.sku).trim() === sku
      );

      importedCart[sku] = {
        sku,
        name: product?.short || product?.name || item.name || sku,
        price: Number(item.price) || 0,
        image: product?.image || item.image || '',
        qty: (importedCart[sku]?.qty || 0) + qty
      };
    }

    if (!Object.keys(importedCart).length) {
      showToast('This order has no usable products');
      return;
    }

    if (cartValues().length && !confirm(words().emptyCartConfirm)) {
      return;
    }

    cart = importedCart;
    $('customerType').value = order.customer_type || '';
    setOrderLocation(order.order_location || 'Pusat');

    // Keep the sender's order number (CAT-123 -> 123)
    setCartNo(String(order.order_no || '').replace(/\D/g, ''));
    saveCart();

    closeQuantitySelector();
    closeSavedOrders();
    openCart();
    showToast(`${words().loadedFrom} ${order.sender_name}`);
  }

  async function completeSharedOrder(id) {
    if (!confirm(`${words().complete}?`)) return;

    try {
      await callInboxApi({
        action: 'complete',
        id,
        recipientName: requesterName
      });

      showToast(words().orderCompleted);
      await loadInbox();
    } catch (error) {
      showToast(`${words().failed}: ${error.message}`);
    }
  }
  /* ---------- incoming order popup ---------- */

  function markSeen(id) {
    const stored = readStorage(SEEN_KEY, []);
    const list = Array.isArray(stored) ? stored : [];
    if (!list.includes(id)) list.push(id);
    writeStorage(SEEN_KEY, list.slice(-300));
  }

  function promptBlocked() {
    const settingsEl = $('settingsPanel');
    const identityEl = $('requesterIdentityOverlay');

    return !!(
      (settingsEl && !settingsEl.classList.contains('hidden')) ||
      (identityEl && identityEl.style.display === 'flex') ||
      $('notaPopupOverlay') ||
      $('salesmanRecipientOverlay') ||
      $('viewOrderPanel')?.classList.contains('open')
    );
  }

  function checkNewOrders(orders) {
    const seen = readStorage(SEEN_KEY, null);

    // First run on this device: don't pop up for orders that already exist
    if (!Array.isArray(seen)) {
      writeStorage(SEEN_KEY, orders.map(order => order.id));
      return;
    }

    orders.slice().reverse().forEach(order => {   // oldest first
      if (!seen.includes(order.id) &&
          !promptQueue.some(queued => queued.id === order.id)) {
        promptQueue.push(order);
      }
    });

    showNextPrompt();
  }

  function showNextPrompt() {
    if (promptOpen || !promptQueue.length || promptBlocked()) return;
    showOrderPrompt(promptQueue[0]);
  }

  function showOrderPrompt(order) {
    promptOpen = true;

    const count = (order.items || []).length;

    const overlay = document.createElement('div');
    overlay.id = 'orderPromptOverlay';
    overlay.className = 'salesman-recipient-overlay';

    overlay.innerHTML = `
      <section class="salesman-recipient-dialog"
               role="dialog" aria-modal="true">
        <p class="order-prompt-text">
          ${esc(words().orderFrom)}
          <strong>${esc(order.sender_name)}</strong>
          — ${esc(words().openInCart)}
        </p>
        <p class="order-prompt-summary">
          ${esc(order.order_no)} · ${count} ${esc(t('products'))} ·
          ${esc(money(order.total))}
        </p>
        <p class="order-prompt-summary">
          ${esc(order.customer_type)} · ${esc(order.order_location)}
        </p>

        <div class="salesman-recipient-actions">
          <button id="orderPromptLater" type="button">
            ${esc(words().later)}
          </button>
          <button id="orderPromptYes" class="primary-button" type="button">
            ${esc(words().yesOpen)}
          </button>
        </div>
      </section>
    `;

    document.body.appendChild(overlay);

    // Back-gesture guard: this popup owns one history entry
    history.pushState({ centiOrderPrompt: true }, '', location.href);

    const finish = (accepted, fromBack) => {
      overlay.remove();
      window.closeOrderPrompt = null;

      markSeen(order.id);
      promptQueue = promptQueue.filter(queued => queued.id !== order.id);
      promptOpen = false;

      const next = () => {
        if (accepted) openSharedOrderInCart(order);
        else showNextPrompt();
      };

      if (fromBack) {          // the back gesture already removed the entry
        next();
        return;
      }

      // Remove our history entry first, then continue, so the cart's
      // guard entry is not pushed on top of a pending history.back().
      let done = false;
      const run = () => {
        if (done) return;
        done = true;
        next();
      };

      window.addEventListener('popstate', run, { once: true });
      window.__skipPop = true;
      history.back();
      setTimeout(run, 400);    // fallback
    };

    window.closeOrderPrompt = () => finish(false, true);

    $('orderPromptLater').onclick = () => finish(false, false);
    $('orderPromptYes').onclick = () => finish(true, false);
    // No tap-outside-to-close: the choice should be deliberate.
  }
  addControls();
})();
