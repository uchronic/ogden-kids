/**
 * Ogden Kids - 增强脚本
 * 注入儿童插画素材、优化视觉体验
 * MutationObserver 持续监听，适配 React 重渲染
 */
(function () {
  "use strict";

  // ============ 图片资源 ============
  const IMAGES = {
    bg: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
    hero: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&q=80",
    picture: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
    listen: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&q=80",
    bubble: "https://images.unsplash.com/photo-1527236438218-d82077ae1f85?w=400&q=80",
    trace: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80",
  };

  const applied = new WeakSet();

  // ============ 注入所有增强 ============
  function applyEnhancements() {
    var home = document.querySelector(".home");
    var gameWrapper = document.querySelector(".game-wrapper");
    if (!home && !gameWrapper) return;

    // 1. 全局背景 - 温馨的浅色
    if (!applied.has(document.body)) {
      document.body.style.background =
        "linear-gradient(135deg, #fff9f0 0%, #fef0e8 30%, #f0f4ff 70%, #fff5f9 100%)";
      document.body.style.minHeight = "100vh";
      applied.add(document.body);
    }

    // 2. 首页增强
    if (home && !applied.has(home)) {
      home.style.position = "relative";
      home.style.overflow = "hidden";
      home.style.padding = "48px 20px 40px";

      // 添加装饰性背景圆
      if (!home.querySelector(".deco-circle")) {
        var colors = [
          "rgba(255,183,77,0.15)", "rgba(129,212,250,0.15)",
          "rgba(165,214,167,0.15)", "rgba(206,147,216,0.15)",
          "rgba(255,138,128,0.12)", "rgba(255,213,79,0.12)"
        ];
        for (var i = 0; i < 6; i++) {
          var circle = document.createElement("div");
          circle.className = "deco-circle";
          var size = 80 + Math.random() * 160;
          circle.style.cssText =
            "position:absolute;border-radius:50%;background:" + colors[i] + ";" +
            "width:" + size + "px;height:" + size + "px;" +
            "left:" + (Math.random() * 100 - 10) + "%;" +
            "top:" + (Math.random() * 100 - 10) + "%;" +
            "pointer-events:none;z-index:0;" +
            "animation:floatBubble " + (6 + Math.random() * 6) + "s ease-in-out infinite;" +
            "animation-delay:" + (Math.random() * 4) + "s";
          home.insertBefore(circle, home.firstChild);
        }
      }
      applied.add(home);
    }

    // 3. 标题增强
    var title = document.querySelector(".title");
    if (title && !applied.has(title)) {
      title.style.background = "linear-gradient(135deg, #ff6b6b, #ffa726, #66bb6a, #42a5f5, #ab47bc)";
      title.style.backgroundSize = "200% 200%";
      title.style.webkitBackgroundClip = "text";
      title.style.webkitTextFillColor = "transparent";
      title.style.backgroundClip = "text";
      title.style.animation = "rainbowShift 4s ease-in-out infinite";
      title.style.fontSize = "3.2rem";
      title.style.textShadow = "none";
      title.style.position = "relative";
      title.style.zIndex = "1";
      applied.add(title);
    }

    // 4. 副标题增强
    var subtitle = document.querySelector(".subtitle");
    if (subtitle && !applied.has(subtitle)) {
      subtitle.style.background = "rgba(255,255,255,0.7)";
      subtitle.style.padding = "8px 20px";
      subtitle.style.borderRadius = "999px";
      subtitle.style.backdropFilter = "blur(8px)";
      subtitle.style.fontSize = "1.15rem";
      subtitle.style.position = "relative";
      subtitle.style.zIndex = "1";
      subtitle.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      applied.add(subtitle);
    }

    // 5. 菜单按钮增强 - 添加插画背景
    var menuBtns = document.querySelectorAll(".menu-btn");
    var btnImages = [IMAGES.picture, IMAGES.listen, IMAGES.bubble, IMAGES.trace];
    var btnGradients = [
      "linear-gradient(135deg, rgba(255,183,77,0.12), rgba(255,138,128,0.12))",
      "linear-gradient(135deg, rgba(129,212,250,0.12), rgba(77,208,225,0.12))",
      "linear-gradient(135deg, rgba(129,199,133,0.12), rgba(165,214,167,0.12))",
      "linear-gradient(135deg, rgba(206,147,216,0.12), rgba(171,71,188,0.12))",
    ];
    menuBtns.forEach(function (btn, i) {
      if (applied.has(btn)) return;
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.style.background = btnGradients[i] || btnGradients[0];
      btn.style.border = "2px solid rgba(255,255,255,0.6)";
      btn.style.transition = "all .3s ease";
      btn.style.zIndex = "1";

      // 添加背景图
      if (btnImages[i]) {
        var imgDiv = document.createElement("div");
        imgDiv.style.cssText =
          "position:absolute;top:0;right:0;width:45%;height:100%;" +
          "background:url('" + btnImages[i] + "') center/cover;" +
          "opacity:0.18;border-radius:0 20px 20px 0;pointer-events:none;z-index:0";
        btn.insertBefore(imgDiv, btn.firstChild);
      }

      // 让文字在图片上方
      btn.querySelectorAll("span").forEach(function (span) {
        span.style.position = "relative";
        span.style.zIndex = "1";
      });

      applied.add(btn);
    });

    // 6. 菜单图标放大
    document.querySelectorAll(".menu-icon").forEach(function (el) {
      if (applied.has(el)) return;
      el.style.fontSize = "3.5rem";
      el.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.1))";
      applied.add(el);
    });

    // 7. 返回按钮增强
    document.querySelectorAll(".back-btn").forEach(function (btn) {
      if (applied.has(btn)) return;
      btn.style.background = "rgba(255,255,255,0.8)";
      btn.style.backdropFilter = "blur(8px)";
      btn.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
      btn.style.border = "1px solid rgba(0,0,0,0.06)";
      btn.style.borderRadius = "14px";
      applied.add(btn);
    });

    // 8. 游戏容器增强
    document.querySelectorAll(".game-container").forEach(function (gc) {
      if (applied.has(gc)) return;
      gc.style.position = "relative";
      gc.style.zIndex = "1";
      applied.add(gc);
    });

    // 9. 选项按钮增强
    document.querySelectorAll(".choice-btn").forEach(function (btn) {
      if (applied.has(btn)) return;
      btn.style.transition = "all .2s ease";
      btn.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
      btn.style.border = "2px solid rgba(0,0,0,0.08)";
      applied.add(btn);
    });

    // 10. 泡泡增强
    document.querySelectorAll(".bubble").forEach(function (b) {
      if (applied.has(b)) return;
      b.style.boxShadow = "0 4px 16px rgba(79,195,247,0.3), inset 0 -2px 4px rgba(0,0,0,0.05)";
      applied.add(b);
    });

    // 11. 描红区域增强
    document.querySelectorAll(".trace-area").forEach(function (area) {
      if (applied.has(area)) return;
      area.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
      area.style.border = "3px dashed rgba(0,0,0,0.1)";
      applied.add(area);
    });

    // 12. 添加浮动装饰元素
    if (!document.getElementById("kid-deco") && (home || gameWrapper)) {
      var deco = document.createElement("div");
      deco.id = "kid-deco";
      deco.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden";
      var emojis = ["⭐", "🌈", "🎈", "🦋", "🌸", "🍀", "💫", "🎀", "🌻", "✨"];
      for (var j = 0; j < 12; j++) {
        var e = document.createElement("div");
        e.textContent = emojis[j % emojis.length];
        e.style.cssText =
          "position:absolute;font-size:" + (16 + Math.random() * 20) + "px;" +
          "left:" + (Math.random() * 100) + "%;" +
          "top:" + (Math.random() * 100) + "%;" +
          "opacity:0.4;" +
          "animation:floatEmoji " + (8 + Math.random() * 8) + "s ease-in-out infinite;" +
          "animation-delay:" + (Math.random() * 6) + "s";
        deco.appendChild(e);
      }
      document.body.appendChild(deco);
    }
  }

  // ============ 注入动画样式 ============
  function injectStyles() {
    if (document.getElementById("kid-enhance-styles")) return;
    var style = document.createElement("style");
    style.id = "kid-enhance-styles";
    style.textContent = [
      "@keyframes rainbowShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}",
      "@keyframes floatBubble{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}",
      "@keyframes floatEmoji{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-15px) rotate(5deg)}75%{transform:translateY(10px) rotate(-5deg)}}",
      "@keyframes popIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}",
      ".menu-btn{animation:popIn .4s ease-out backwards}",
      ".menu-btn:nth-child(1){animation-delay:.1s}",
      ".menu-btn:nth-child(2){animation-delay:.2s}",
      ".menu-btn:nth-child(3){animation-delay:.3s}",
      ".menu-btn:nth-child(4){animation-delay:.4s}",
      ".menu-btn:hover{transform:translateY(-4px) scale(1.02)!important;box-shadow:0 8px 28px rgba(0,0,0,0.12)!important}",
      ".menu-btn:active{transform:scale(0.95)!important}",
      ".choice-btn:hover{transform:translateY(-2px)!important;box-shadow:0 6px 20px rgba(0,0,0,0.1)!important;border-color:rgba(0,0,0,0.15)!important}",
      ".choice-btn:active{transform:scale(0.95)!important}",
      ".bubble:hover{transform:translate(-50%) scale(1.1)!important}",
      ".back-btn:hover{background:rgba(255,255,255,0.95)!important;transform:translateX(-2px)}",
      ".speak-btn{transition:all .2s ease}",
      ".speak-btn:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(255,140,66,0.4)}",
      ".next-btn{transition:all .2s ease}",
      ".next-btn:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(255,140,66,0.4)}",
      ".reward{animation:pop .6s ease-out!important}",
    ].join("");
    document.head.appendChild(style);
  }

  // ============ MutationObserver ============
  function startObserver() {
    var root = document.getElementById("root");
    if (!root) return;

    var timer = null;
    var observer = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(applyEnhancements, 80);
    });

    observer.observe(root, { childList: true, subtree: true });
    applyEnhancements();
    injectStyles();
  }

  // ============ 启动 ============
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
