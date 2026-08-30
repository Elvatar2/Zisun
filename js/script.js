/* ============================================
   🚀 Zisun - JavaScript
   - لودینگ، تغییر تم، اسکرول نرم
============================================ */

// ============================================
// ۱. کلاس Loader (مدیریت لودینگ)
// ============================================
class Loader {
  constructor() {
    this.loader = document.getElementById("loader");
    this.main = document.getElementById("main");
    this.loadingDuration = 2500; // 2.5 ثانیه
  }

  init() {
    // صبر کن و بعد لودینگ رو مخفی کن
    setTimeout(() => {
      this.hideLoader();
    }, this.loadingDuration);
  }

  hideLoader() {
    // مخفی کردن لودینگ
    this.loader.classList.add("hidden");

    // نمایش محتوای اصلی
    this.main.classList.remove("hidden");

    // حذف لودینگ از DOM بعد از انیمیشن
    setTimeout(() => {
      this.loader.remove();
    }, 800);
  }
}

// ============================================
// ۲. کلاس ThemeManager (مدیریت تم تاریک/روشن)
// ============================================
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.iconSun = this.themeToggle.querySelector(".icon-sun");
    this.iconMoon = this.themeToggle.querySelector(".icon-moon");
    this.storageKey = "zisun-theme";
    this.currentTheme = this.getStoredTheme() || "light";
  }

  init() {
    // تنظیم تم اولیه
    this.setTheme(this.currentTheme);

    // اضافه کردن event listener
    this.themeToggle.addEventListener("click", () => {
      this.toggleTheme();
    });
  }

  getStoredTheme() {
    return localStorage.getItem(this.storageKey);
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.storageKey, theme);
    this.currentTheme = theme;
    this.updateIcons();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }

  updateIcons() {
    if (this.currentTheme === "dark") {
      this.iconSun.classList.add("hidden");
      this.iconMoon.classList.remove("hidden");
    } else {
      this.iconSun.classList.remove("hidden");
      this.iconMoon.classList.add("hidden");
    }
  }
}

// ============================================
// ۳. کلاس SmoothScroll (اسکرول نرم)
// ============================================
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.headerHeight = document.querySelector(".header").offsetHeight;
  }

  init() {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          this.scrollTo(targetElement);
        }
      });
    });
  }

  scrollTo(element) {
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - this.headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// ============================================
// ۴. کلاس App (مدیریت اصلی برنامه)
// ============================================
class App {
  constructor() {
    this.loader = new Loader();
    this.themeManager = new ThemeManager();
    this.smoothScroll = new SmoothScroll();
  }

  init() {
    // راه‌اندازی همه ماژول‌ها
    this.loader.init();
    this.themeManager.init();
    this.smoothScroll.init();

    console.log("✨ Zisun website initialized");
  }
}

// ============================================
// ۵. راه‌اندازی برنامه
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
