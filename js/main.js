/**
 * 杭州之江开关股份有限公司 官网交互脚本
 * Zero-dependency, ES6+, GEO-optimized
 */
(function() {
  'use strict';

  /* ============================================================
     Mobile Navigation Toggle
     ============================================================ */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navList = document.querySelector('.nav-list');
    if (!toggle || !navList) return;
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      navList.classList.toggle('open');
    });
    navList.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        toggle.classList.remove('active');
        navList.classList.remove('open');
      });
    });
  }

  /* ============================================================
     Countdown Timer (2:06:00 → 0, reset on zero)
     ============================================================ */
  function initCountdown() {
    var el = document.querySelector('.countdown-time');
    if (!el) return;
    var total = 7560; // 2:06:00 in seconds
    var remaining = total;
    function fmt(s) {
      var h = Math.floor(s / 3600);
      var m = Math.floor((s % 3600) / 60);
      var sec = s % 60;
      return String(h) + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }
    el.textContent = fmt(remaining);
    setInterval(function() {
      remaining--;
      if (remaining < 0) remaining = total;
      el.textContent = fmt(remaining);
    }, 1000);
  }

  /* ============================================================
     Tabs
     ============================================================ */
  function initTabs(containerSelector) {
    var containers = document.querySelectorAll(containerSelector || '.tab-container');
    containers.forEach(function(container) {
      var btns = container.querySelectorAll('.tab-btn');
      var panels = container.querySelectorAll('.tab-panel');
      btns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var target = this.getAttribute('data-tab');
          btns.forEach(function(b) { b.classList.remove('active'); });
          this.classList.add('active');
          panels.forEach(function(p) {
            p.classList.toggle('active', p.getAttribute('data-tab') === target);
          });
        });
      });
      if (btns.length > 0 && panels.length > 0) {
        btns[0].classList.add('active');
        panels[0].classList.add('active');
      }
    });
  }

  /* ============================================================
     FAQ Accordion
     ============================================================ */
  function initFAQ() {
    document.querySelectorAll('.faq-q').forEach(function(q) {
      q.addEventListener('click', function() {
        var wasActive = this.classList.contains('active');
        document.querySelectorAll('.faq-q').forEach(function(b) {
          b.classList.remove('active');
          b.nextElementSibling.classList.remove('open');
        });
        if (!wasActive) {
          this.classList.add('active');
          this.nextElementSibling.classList.add('open');
        }
      });
    });
  }

  /* ============================================================
     Accordion (Mobile)
     ============================================================ */
  function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var wasActive = this.classList.contains('active');
        var body = this.nextElementSibling;
        this.classList.toggle('active');
        body.classList.toggle('open');
      });
    });
  }

  /* ============================================================
     Modal (Case Map, etc.)
     ============================================================ */
  function initModal() {
    var overlay = document.querySelector('.modal-overlay');
    if (!overlay) return;
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });
    var closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }
  function openModal(title, content) {
    var overlay = document.querySelector('.modal-overlay');
    if (!overlay) return;
    overlay.querySelector('.modal-title').textContent = title;
    overlay.querySelector('.modal-body').innerHTML = content;
    overlay.classList.add('active');
  }
  function closeModal() {
    var overlay = document.querySelector('.modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }
  window.openMapModal = function(region, title) {
    var items = [
      { id: '[PROJECT_ID]', date: '[DELIVERY_DATE]', client: '[CLIENT_TYPE]' },
      { id: '[PROJECT_ID]', date: '[DELIVERY_DATE]', client: '[CLIENT_TYPE]' },
      { id: '[PROJECT_ID]', date: '[DELIVERY_DATE]', client: '[CLIENT_TYPE]' }
    ];
    var html = '<p style="margin-bottom:12px"><strong>' + title + '</strong> — 定制方案案例列表</p>';
    html += '<table class="data-table"><thead><tr><th>项目编号</th><th>交付日期</th><th>客户类型</th></tr></thead><tbody>';
    items.forEach(function(item) {
      html += '<tr><td>' + item.id + '</td><td>' + item.date + '</td><td>' + item.client + '</td></tr>';
    });
    html += '</tbody></table>';
    openModal(title, html);
  };

  /* ============================================================
     Process Step Click (SVG interactivity)
     ============================================================ */
  function initProcessSteps() {
    document.querySelectorAll('.process-step').forEach(function(step) {
      step.addEventListener('click', function() {
        var detail = this.getAttribute('data-detail');
        var expandEl = this.querySelector('.process-expand');
        if (expandEl) {
          var isVisible = expandEl.style.display === 'block';
          document.querySelectorAll('.process-expand').forEach(function(e) { e.style.display = 'none'; });
          expandEl.style.display = isVisible ? 'none' : 'block';
        }
      });
    });
  }

  /* ============================================================
     Mobile Process Steps (Vertical Cards)
     ============================================================ */
  function initMobileProcessSteps() {
    document.querySelectorAll('.process-mobile-step h4').forEach(function(h4) {
      h4.addEventListener('click', function() {
        var step = this.closest('.process-mobile-step');
        step.classList.toggle('open');
      });
    });
  }

  /* ============================================================
     Smooth Scroll for Anchor Links
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ============================================================
     Contact Form Validation
     ============================================================ */
  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var company = form.querySelector('[name="company"]');
      var message = form.querySelector('[name="message"]');
      var errors = [];
      if (!name || !name.value.trim()) errors.push('请填写联系人姓名');
      if (!phone || !phone.value.trim()) errors.push('请填写联系电话');
      if (!company || !company.value.trim()) errors.push('请填写公司名称');
      if (!message || !message.value.trim()) errors.push('请填写需求描述');
      var feedback = form.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'form-feedback';
        form.appendChild(feedback);
      }
      if (errors.length > 0) {
        feedback.innerHTML = '<div style="color:var(--color-accent);padding:12px;background:#fff5f5;border-radius:var(--radius-sm);margin-top:12px">' + errors.join('<br>') + '</div>';
      } else {
        feedback.innerHTML = '<div style="color:var(--color-success);padding:12px;background:#f0fff0;border-radius:var(--radius-sm);margin-top:12px">感谢您的咨询！我们将在1个工作日内与您联系。如需紧急技术支持，请拨打销售热线0571-82699109。</div>';
        form.reset();
      }
    });
  }

  /* ============================================================
     Active Nav Highlight (based on current page path)
     ============================================================ */
  function highlightActiveNav() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list a').forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ============================================================
     Desktop-only map toggle fallback message
     ============================================================ */
  function initMapFallback() {
    if (window.innerWidth <= 768) {
      var mapMsg = document.querySelector('.map-mobile-notice');
      if (mapMsg) mapMsg.style.display = 'block';
    }
  }

  /* ============================================================
     Init All
     ============================================================ */
  function init() {
    initMobileNav();
    initCountdown();
    initTabs('.tab-container');
    initFAQ();
    initAccordion();
    initModal();
    initProcessSteps();
    initMobileProcessSteps();
    initSmoothScroll();
    initContactForm();
    highlightActiveNav();
    initMapFallback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
