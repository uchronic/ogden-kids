/**
 * Ogden Kids - 增强脚本
 * 故事配图、界面美化
 */
(function () {
  "use strict";

  // ============ 故事封面图 ============
  var STORY_COVERS = {
    "勇敢的小猫": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
    "小狗和球": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    "善良的小伞": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&q=80",
    "猴子和苹果": "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&q=80",
    "爱月亮的小鱼": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80",
    "飞走的帽子": "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=400&q=80",
    "忙碌的小蜜蜂": "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&q=80",
    "小船历险记": "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=400&q=80",
    "惊喜蛋": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80",
    "快乐的小火车": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80",
  };

  // ============ 故事每页配图 ============
  var STORY_PAGES = {
    "brave-cat": [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80",
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80",
      "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=600&q=80",
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&q=80",
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&q=80",
    ],
    "dog-and-ball": [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&q=80",
    ],
    "umbrella-rain": [
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&q=80",
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&q=80",
      "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=600&q=80",
      "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=600&q=80",
      "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=600&q=80",
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&q=80",
    ],
    "monkey-apple": [
      "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&q=80",
      "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
      "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=600&q=80",
      "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=600&q=80",
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=600&q=80",
      "https://images.unsplash.com/photo-1601727103943-4456e1e3c793?w=600&q=80",
    ],
    "fish-moon": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
      "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=600&q=80",
      "https://images.unsplash.com/photo-1508160114284-2398c0105b44?w=600&q=80",
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    ],
    "hat-wind": [
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=600&q=80",
      "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=600&q=80",
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80",
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    ],
    "bee-garden": [
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
      "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=600&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80",
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80",
      "https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=600&q=80",
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&q=80",
      "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&q=80",
    ],
    "boat-island": [
      "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
      "https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=600&q=80",
      "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=600&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80",
    ],
    "egg-surprise": [
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80",
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80",
      "https://images.unsplash.com/photo-1495571758719-6ec1e876d6ae?w=600&q=80",
      "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=600&q=80",
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80",
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
    ],
    "train-journey": [
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
      "https://images.unsplash.com/photo-1527154362230-ed5b04341f9b?w=600&q=80",
      "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&q=80",
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=600&q=80",
      "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=600&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    ],
  };

  // 故事中文名 → 英文 ID 映射
  var TITLE_TO_ID = {
    "勇敢的小猫": "brave-cat",
    "小狗和球": "dog-and-ball",
    "善良的小伞": "umbrella-rain",
    "猴子和苹果": "monkey-apple",
    "爱月亮的小鱼": "fish-moon",
    "飞走的帽子": "hat-wind",
    "忙碌的小蜜蜂": "bee-garden",
    "小船历险记": "boat-island",
    "惊喜蛋": "egg-surprise",
    "快乐的小火车": "train-journey",
  };

  var applied = new WeakSet();

  function applyEnhancements() {
    // 全局背景
    if (!document.body.classList.contains("kid-bg")) {
      document.body.classList.add("kid-bg");
      document.body.style.background = "linear-gradient(135deg,#fff9f0,#fef0e8 30%,#f0f4ff 70%,#fff5f9)";
    }

    // 标题
    var title = document.querySelector(".title");
    if (title && !applied.has(title)) {
      title.style.background = "linear-gradient(135deg,#ff6b6b,#ffa726,#66bb6a,#42a5f5,#ab47bc)";
      title.style.backgroundSize = "200% 200%";
      title.style.webkitBackgroundClip = "text";
      title.style.webkitTextFillColor = "transparent";
      title.style.backgroundClip = "text";
      title.style.animation = "rainbowShift 4s ease-in-out infinite";
      title.style.fontSize = "3.2rem";
      title.style.position = "relative";
      title.style.zIndex = "1";
      applied.add(title);
    }

    // 副标题
    var subtitle = document.querySelector(".subtitle");
    if (subtitle && !applied.has(subtitle)) {
      subtitle.style.background = "rgba(255,255,255,0.7)";
      subtitle.style.padding = "8px 20px";
      subtitle.style.borderRadius = "999px";
      subtitle.style.backdropFilter = "blur(8px)";
      subtitle.style.position = "relative";
      subtitle.style.zIndex = "1";
      applied.add(subtitle);
    }

    // 返回按钮
    document.querySelectorAll(".back-btn").forEach(function (btn) {
      if (applied.has(btn)) return;
      btn.style.background = "rgba(255,255,255,0.8)";
      btn.style.backdropFilter = "blur(8px)";
      btn.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
      btn.style.borderRadius = "14px";
      applied.add(btn);
    });

    // ===== 故事卡片 =====
    enhanceStoryCards();

    // ===== 故事阅读器 =====
    enhanceStoryReader();
  }

  // ============ 故事卡片 ============
  function enhanceStoryCards() {
    var allBtns = document.querySelectorAll("button");
    allBtns.forEach(function (btn) {
      if (applied.has(btn)) return;
      var text = btn.textContent.trim();

      // 检查是否包含故事标题
      var storyId = null;
      for (var cnTitle in TITLE_TO_ID) {
        if (text.indexOf(cnTitle) >= 0) {
          storyId = TITLE_TO_ID[cnTitle];
          break;
        }
      }
      if (!storyId) return;

      var coverUrl = STORY_COVERS[cnTitle];
      if (!coverUrl) return;

      // 标记为已处理
      applied.add(btn);

      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.style.borderRadius = "16px";
      btn.style.minHeight = "120px";
      btn.style.border = "none";

      // 添加背景图
      var bg = document.createElement("div");
      bg.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;" +
        "background:linear-gradient(180deg,transparent 20%,rgba(0,0,0,0.55) 100%),url('" + coverUrl + "');" +
        "background-size:cover;background-position:center;" +
        "border-radius:16px;pointer-events:none;z-index:0";
      btn.insertBefore(bg, btn.firstChild);

      // 文字置白
      var spans = btn.querySelectorAll("span");
      spans.forEach(function (span) {
        span.style.position = "relative";
        span.style.zIndex = "1";
        span.style.color = "#fff";
        span.style.textShadow = "0 1px 4px rgba(0,0,0,0.5)";
      });
    });
  }

  // ============ 故事阅读器 ============
  function enhanceStoryReader() {
    // 检测方法：找包含"上一页"和"下一页"按钮的容器
    var hasPrev = false, hasNext = false;
    var allBtns = document.querySelectorAll("button");
    allBtns.forEach(function (btn) {
      var t = btn.textContent;
      if (t.indexOf("上一页") >= 0) hasPrev = true;
      if (t.indexOf("下一页") >= 0 || t.indexOf("读完了") >= 0) hasNext = true;
    });

    if (!hasPrev && !hasNext) return; // 不在故事阅读页面

    // 找到页面计数器 "1 / 7"
    var pageSpan = null;
    document.querySelectorAll("span").forEach(function (span) {
      if (pageSpan) return;
      var t = span.textContent.trim();
      if (/^\d+\s*\/\s*\d+$/.test(t)) {
        pageSpan = span;
      }
    });

    if (!pageSpan) return;

    // 从计数器往上找故事容器
    var container = pageSpan.closest("div");
    while (container && !container.querySelector(".speak-btn")) {
      container = container.parentElement;
    }
    if (!container) return;

    // 找到当前页码
    var pageMatch = pageSpan.textContent.match(/(\d+)\s*\/\s*(\d+)/);
    var pageNum = pageMatch ? parseInt(pageMatch[1]) - 1 : 0;
    var totalPages = pageMatch ? parseInt(pageMatch[2]) : 1;

    // 找到英文文本（p 标签，包含目标词高亮）
    var storyText = "";
    var ps = container.querySelectorAll("p");
    ps.forEach(function (p) {
      if (p.style.fontSize === "1.6rem" || p.style.fontSize.indexOf("1.6") >= 0) {
        storyText = p.textContent.toLowerCase();
      }
    });

    // 通过文本识别故事
    var storyId = identifyStory(storyText);
    if (!storyId) return;

    var images = STORY_PAGES[storyId];
    if (!images) return;
    var imgUrl = images[pageNum % images.length];

    // 找到 emoji 容器：fontSize 为 5rem 的 div，且没有子元素
    var emojiDiv = null;
    container.querySelectorAll("div").forEach(function (div) {
      if (emojiDiv) return;
      var fs = div.style.fontSize;
      if (fs && (fs === "5rem" || fs.indexOf("5rem") >= 0)) {
        // 确认是纯文本（emoji），不是有子元素的容器
        if (div.children.length === 0 && div.textContent.trim().length > 0) {
          emojiDiv = div;
        }
      }
    });

    if (!emojiDiv) return;
    if (applied.has(emojiDiv)) return;
    applied.add(emojiDiv);

    // 替换为图片
    var origEmoji = emojiDiv.textContent;
    emojiDiv.textContent = "";
    emojiDiv.style.cssText =
      "width:100%;max-width:320px;height:220px;border-radius:20px;overflow:hidden;" +
      "box-shadow:0 8px 32px rgba(0,0,0,0.15);position:relative;margin:0 auto";

    var img = document.createElement("img");
    img.src = imgUrl;
    img.alt = "story illustration";
    img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block";
    img.onerror = function () {
      emojiDiv.style.background = "linear-gradient(135deg,#a8e6cf,#dcedc1,#ffd3b6,#ffaaa5)";
      emojiDiv.style.display = "flex";
      emojiDiv.style.alignItems = "center";
      emojiDiv.style.justifyContent = "center";
      emojiDiv.style.fontSize = "4rem";
      emojiDiv.textContent = origEmoji;
    };
    emojiDiv.appendChild(img);

    // 底部 emoji 标签
    var tag = document.createElement("div");
    tag.style.cssText =
      "position:absolute;bottom:10px;right:10px;font-size:1.6rem;" +
      "background:rgba(255,255,255,0.85);border-radius:10px;padding:3px 7px;" +
      "box-shadow:0 2px 8px rgba(0,0,0,0.1)";
    tag.textContent = origEmoji;
    emojiDiv.appendChild(tag);
  }

  // ============ 识别故事 ============
  function identifyStory(text) {
    var map = {
      "brave-cat": ["cat", "brave", "scared", "tree", "bird"],
      "dog-and-ball": ["dog", "ball", "fetch", "stick", "play"],
      "umbrella-rain": ["umbrella", "rain", "wet", "sheep", "kind"],
      "monkey-apple": ["monkey", "apple", "banana", "tree", "basket"],
      "fish-moon": ["fish", "moon", "water", "shining", "night"],
      "hat-wind": ["hat", "wind", "blew", "flew", "chase"],
      "bee-garden": ["bee", "flower", "garden", "honey", "buzz"],
      "boat-island": ["boat", "island", "sea", "sail", "wave"],
      "egg-surprise": ["egg", "boy", "nest", "warm", "crack"],
      "train-journey": ["train", "hill", "horse", "cow", "sheep", "choo"],
    };
    for (var id in map) {
      var kws = map[id];
      for (var i = 0; i < kws.length; i++) {
        if (text.indexOf(kws[i]) >= 0) return id;
      }
    }
    return null;
  }

  // ============ 样式 ============
  function injectStyles() {
    if (document.getElementById("kid-enhance-styles")) return;
    var style = document.createElement("style");
    style.id = "kid-enhance-styles";
    style.textContent = [
      "@keyframes rainbowShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}",
      "@keyframes popIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}",
      ".menu-btn{animation:popIn .4s ease-out backwards}",
      ".menu-btn:nth-child(1){animation-delay:.1s}",
      ".menu-btn:nth-child(2){animation-delay:.2s}",
      ".menu-btn:nth-child(3){animation-delay:.3s}",
      ".menu-btn:nth-child(4){animation-delay:.4s}",
      ".menu-btn:nth-child(5){animation-delay:.5s}",
      ".menu-btn:nth-child(6){animation-delay:.6s}",
      ".menu-btn:hover{transform:translateY(-4px) scale(1.02)!important;box-shadow:0 8px 28px rgba(0,0,0,0.12)!important}",
      ".choice-btn:hover{transform:translateY(-2px)!important;box-shadow:0 6px 20px rgba(0,0,0,0.1)!important}",
      ".back-btn:hover{transform:translateX(-2px)}",
      ".speak-btn{transition:all .2s ease}",
      ".speak-btn:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(255,140,66,0.4)}",
    ].join("");
    document.head.appendChild(style);
  }

  // ============ Observer ============
  function startObserver() {
    var root = document.getElementById("root");
    if (!root) return;
    var timer = null;
    var observer = new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(applyEnhancements, 100);
    });
    observer.observe(root, { childList: true, subtree: true });
    applyEnhancements();
    injectStyles();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
