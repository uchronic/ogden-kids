/**
 * Ogden Kids - 增强脚本
 * 注入儿童插画素材、故事配图、优化视觉体验
 * MutationObserver 持续监听，适配 React 重渲染
 */
(function () {
  "use strict";

  // ============ 故事配图 ============
  var STORY_IMAGES = {
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

  // 故事卡片封面图
  var STORY_COVERS = {
    "brave-cat": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
    "dog-and-ball": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    "umbrella-rain": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&q=80",
    "monkey-apple": "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&q=80",
    "fish-moon": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80",
    "hat-wind": "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=400&q=80",
    "bee-garden": "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&q=80",
    "boat-island": "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=400&q=80",
    "egg-surprise": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80",
    "train-journey": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80",
  };

  // 故事 ID 列表（按顺序）
  var STORY_IDS = [
    "brave-cat", "dog-and-ball", "umbrella-rain", "monkey-apple",
    "fish-moon", "hat-wind", "bee-garden", "boat-island",
    "egg-surprise", "train-journey"
  ];

  // ============ 全局背景 ============
  var BG_URL = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80";
  var applied = new WeakSet();

  function applyEnhancements() {
    // 全局背景
    if (!document.body.classList.contains("kid-bg")) {
      document.body.classList.add("kid-bg");
      document.body.style.background = "linear-gradient(135deg,#fff9f0,#fef0e8 30%,#f0f4ff 70%,#fff5f9)";
    }

    // 标题彩虹
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
      subtitle.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      applied.add(subtitle);
    }

    // 菜单按钮
    document.querySelectorAll(".menu-btn").forEach(function (btn, i) {
      if (applied.has(btn)) return;
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.style.border = "2px solid rgba(255,255,255,0.6)";
      btn.style.transition = "all .3s ease";
      btn.style.zIndex = "1";
      btn.style.borderRadius = "20px";
      applied.add(btn);
    });

    // 菜单图标
    document.querySelectorAll(".menu-icon").forEach(function (el) {
      if (applied.has(el)) return;
      el.style.fontSize = "3.5rem";
      el.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.1))";
      el.style.position = "relative";
      el.style.zIndex = "1";
      applied.add(el);
    });

    // 返回按钮
    document.querySelectorAll(".back-btn").forEach(function (btn) {
      if (applied.has(btn)) return;
      btn.style.background = "rgba(255,255,255,0.8)";
      btn.style.backdropFilter = "blur(8px)";
      btn.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
      btn.style.borderRadius = "14px";
      applied.add(btn);
    });

    // ===== 故事增强 =====
    enhanceStoryCards();
    enhanceStoryReader();

    // 选项按钮
    document.querySelectorAll(".choice-btn").forEach(function (btn) {
      if (applied.has(btn)) return;
      btn.style.transition = "all .2s ease";
      btn.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
      applied.add(btn);
    });

    // 泡泡
    document.querySelectorAll(".bubble").forEach(function (b) {
      if (applied.has(b)) return;
      b.style.boxShadow = "0 4px 16px rgba(79,195,247,0.3),inset 0 -2px 4px rgba(0,0,0,0.05)";
      applied.add(b);
    });
  }

  // ============ 故事卡片增强 ============
  function enhanceStoryCards() {
    // 找到故事选择网格中的按钮
    var buttons = document.querySelectorAll(".game-container button[style*='grid']");
    if (buttons.length === 0) {
      // 备用：找故事选择页面的大按钮
      var grid = document.querySelector(".game-container div[style*='grid']");
      if (grid) {
        buttons = grid.querySelectorAll("button");
      }
    }

    // 通过文本内容识别故事按钮
    var allBtns = document.querySelectorAll("button");
    var storyBtns = [];
    var storyTitles = [
      "勇敢的小猫", "小狗和球", "善良的小伞", "猴子和苹果",
      "爱月亮的小鱼", "飞走的帽子", "忙碌的小蜜蜂", "小船历险记",
      "惊喜蛋", "快乐的小火车"
    ];

    allBtns.forEach(function (btn) {
      var text = btn.textContent;
      for (var i = 0; i < storyTitles.length; i++) {
        if (text.indexOf(storyTitles[i]) >= 0) {
          storyBtns.push({ btn: btn, idx: i });
          break;
        }
      }
    });

    storyBtns.forEach(function (item) {
      if (applied.has(item.btn)) return;
      var storyId = STORY_IDS[item.idx];
      var coverUrl = STORY_COVERS[storyId];
      if (!coverUrl) return;

      item.btn.style.position = "relative";
      item.btn.style.overflow = "hidden";
      item.btn.style.borderRadius = "16px";
      item.btn.style.minHeight = "120px";

      // 添加背景图
      var bg = document.createElement("div");
      bg.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;" +
        "background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.5) 100%),url('" + coverUrl + "');" +
        "background-size:cover;background-position:center;" +
        "border-radius:16px;pointer-events:none;z-index:0";
      item.btn.insertBefore(bg, item.btn.firstChild);

      // 让文字在上层
      var spans = item.btn.querySelectorAll("span");
      spans.forEach(function (span) {
        span.style.position = "relative";
        span.style.zIndex = "1";
        span.style.color = "#fff";
        span.style.textShadow = "0 1px 4px rgba(0,0,0,0.5)";
      });

      applied.add(item.btn);
    });
  }

  // ============ 故事阅读器增强 ============
  function enhanceStoryReader() {
    // 找到故事阅读页面 - 有 5rem 大 emoji 的区域
    var bigEmojis = document.querySelectorAll("div[style*='5rem']");
    if (bigEmojis.length === 0) return;

    bigEmojis.forEach(function (emojiDiv) {
      if (applied.has(emojiDiv)) return;

      // 找到所在的阅读容器
      var container = emojiDiv.closest("div[style*='flex-direction: column']");
      if (!container) return;

      // 找到英文文本
      var textP = container.querySelector("p[style*='1.6rem']");
      if (!textP) return;
      var storyText = textP.textContent.toLowerCase();

      // 通过文本内容判断是哪个故事
      var currentStoryId = identifyStory(storyText);
      if (!currentStoryId) return;

      var images = STORY_IMAGES[currentStoryId];
      if (!images) return;

      // 找到当前页码
      var pageInfo = container.querySelector("span[style*='0.9rem']");
      var pageNum = 0;
      if (pageInfo) {
        var match = pageInfo.textContent.match(/(\d+)/);
        if (match) pageNum = parseInt(match[1]) - 1;
      }

      var imgUrl = images[pageNum % images.length];

      // 替换 emoji 为图片
      emojiDiv.textContent = "";
      emojiDiv.style.cssText =
        "width:100%;max-width:320px;height:220px;border-radius:20px;overflow:hidden;" +
        "box-shadow:0 8px 32px rgba(0,0,0,0.15);position:relative";

      var img = document.createElement("img");
      img.src = imgUrl;
      img.alt = "story illustration";
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;display:block";
      img.onerror = function () {
        // 图片加载失败时显示渐变背景
        emojiDiv.style.background = "linear-gradient(135deg,#a8e6cf,#dcedc1,#ffd3b6,#ffaaa5)";
      };
      emojiDiv.appendChild(img);

      // 添加装饰性 emoji 标签
      var emojiTag = document.createElement("div");
      emojiTag.style.cssText =
        "position:absolute;bottom:12px;right:12px;font-size:2rem;" +
        "background:rgba(255,255,255,0.85);border-radius:12px;padding:4px 8px;" +
        "box-shadow:0 2px 8px rgba(0,0,0,0.1)";
      var storyData = STORY_COVERS;
      // Find the story emoji from the page data
      var storyEmojis = {
        "brave-cat": "🐱",
        "dog-and-ball": "🐕",
        "umbrella-rain": "☂️",
        "monkey-apple": "🐒",
        "fish-moon": "🐟",
        "hat-wind": "🎩",
        "bee-garden": "🐝",
        "boat-island": "⛵",
        "egg-surprise": "🥚",
        "train-journey": "🚂"
      };
      emojiTag.textContent = storyEmojis[currentStoryId] || "📖";
      emojiDiv.appendChild(emojiTag);

      applied.add(emojiDiv);
    });
  }

  // ============ 识别故事 ============
  function identifyStory(text) {
    var keywords = {
      "brave-cat": ["cat", "brave", "scared", "bird", "tree", "little cat"],
      "dog-and-ball": ["dog", "ball", "fetch", "play", "stick"],
      "umbrella-rain": ["umbrella", "rain", "sheep", "wet", "kind"],
      "monkey-apple": ["monkey", "apple", "banana", "tree", "basket"],
      "fish-moon": ["fish", "moon", "water", "shining", "night"],
      "hat-wind": ["hat", "wind", "blew", "flew", "chase"],
      "bee-garden": ["bee", "flower", "garden", "honey", "buzz"],
      "boat-island": ["boat", "island", "sea", "sail", "wave"],
      "egg-surprise": ["egg", "boy", "nest", "warm", "crack", "bird"],
      "train-journey": ["train", "hill", "horse", "cow", "sheep", "choo"]
    };

    for (var id in keywords) {
      var kws = keywords[id];
      for (var i = 0; i < kws.length; i++) {
        if (text.indexOf(kws[i]) >= 0) return id;
      }
    }
    return null;
  }

  // ============ 注入样式 ============
  function injectStyles() {
    if (document.getElementById("kid-enhance-styles")) return;
    var style = document.createElement("style");
    style.id = "kid-enhance-styles";
    style.textContent = [
      "@keyframes rainbowShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}",
      "@keyframes floatEmoji{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-15px) rotate(5deg)}75%{transform:translateY(10px) rotate(-5deg)}}",
      "@keyframes popIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}",
      ".menu-btn{animation:popIn .4s ease-out backwards}",
      ".menu-btn:nth-child(1){animation-delay:.1s}",
      ".menu-btn:nth-child(2){animation-delay:.2s}",
      ".menu-btn:nth-child(3){animation-delay:.3s}",
      ".menu-btn:nth-child(4){animation-delay:.4s}",
      ".menu-btn:nth-child(5){animation-delay:.5s}",
      ".menu-btn:nth-child(6){animation-delay:.6s}",
      ".menu-btn:hover{transform:translateY(-4px) scale(1.02)!important;box-shadow:0 8px 28px rgba(0,0,0,0.12)!important}",
      ".menu-btn:active{transform:scale(0.95)!important}",
      ".choice-btn:hover{transform:translateY(-2px)!important;box-shadow:0 6px 20px rgba(0,0,0,0.1)!important}",
      ".back-btn:hover{background:rgba(255,255,255,0.95)!important;transform:translateX(-2px)}",
      ".speak-btn{transition:all .2s ease}",
      ".speak-btn:hover{transform:scale(1.08);box-shadow:0 4px 16px rgba(255,140,66,0.4)}",
    ].join("");
    document.head.appendChild(style);
  }

  // ============ 浮动装饰 ============
  function addFloatingDecorations() {
    if (document.getElementById("kid-deco")) return;
    var deco = document.createElement("div");
    deco.id = "kid-deco";
    deco.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden";
    var emojis = ["⭐", "🌈", "🎈", "🦋", "🌸", "🍀", "💫", "🎀", "🌻", "✨", "🐱", "🐶", "🐥"];
    for (var j = 0; j < 14; j++) {
      var e = document.createElement("div");
      e.textContent = emojis[j % emojis.length];
      e.style.cssText =
        "position:absolute;font-size:" + (14 + Math.random() * 18) + "px;" +
        "left:" + (Math.random() * 100) + "%;top:" + (Math.random() * 100) + "%;" +
        "opacity:0.35;animation:floatEmoji " + (8 + Math.random() * 8) + "s ease-in-out infinite;" +
        "animation-delay:" + (Math.random() * 6) + "s";
      deco.appendChild(e);
    }
    document.body.appendChild(deco);
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
    addFloatingDecorations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
