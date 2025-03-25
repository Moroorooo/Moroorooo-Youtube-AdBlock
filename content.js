(function() {
  // Danh sách các selector quảng cáo
  const adSelectors = [
    '.ytp-ad-overlay-container',       // Quảng cáo overlay
    '.video-ads',                      // Container quảng cáo video
    '.ytp-ad-module',                 // Module quảng cáo chung
    '.ytp-ad-player-overlay',         // Quảng cáo pre-roll
    '.ytp-ad-text.ytp-ad-preview-text' // Thông báo "Video sẽ phát sau quảng cáo"
  ];

  // Hàm ẩn phần tử
  function hideElement(element) {
    if (element) element.style.display = 'none';
  }

  // Hàm theo dõi và xử lý phần tử khi xuất hiện
  function observeElement(selector, callback) {
    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        callback(element);
        // Không ngắt observer để tiếp tục theo dõi các quảng cáo mới
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Ẩn quảng cáo tĩnh
  function hideAds() {
    adSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(hideElement);
    });
  }

  // Tự động bỏ qua quảng cáo video
  function skipAds() {
    observeElement('.ytp-ad-skip-button', (skipButton) => {
      setTimeout(() => skipButton.click(), Math.random() * 1000 + 500); // Trễ ngẫu nhiên 0.5-1.5 giây
    });
  }

  // Theo dõi thay đổi trên trang để phát hiện quảng cáo mới
  function monitorPage() {
    const observer = new MutationObserver(() => {
      hideAds();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Khởi chạy các hàm chính
  hideAds();    // Ẩn quảng cáo ngay lập tức nếu có
  skipAds();    // Theo dõi nút bỏ qua
  monitorPage(); // Theo dõi liên tục
})();