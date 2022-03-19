(() => {
  'use strict';
  function $n(e) {
    return document.querySelector(e);
  }
  function $na(e) {
    return document.querySelectorAll(e);
  }

  // 从左侧列表获取多级标题
  function getTitleDef() {
    const titleMap = {
      r1: "",
      r2: "",
      r3: "",
    }
    const doOffset = (map, value) => {
      map.r1 = map.r2;
      map.r2 = map.r3;
      map.r3 = value;
    }
    const checkActive = (el, oFlag) => {
      if (el.classList.contains("active")) {
        oFlag.activeIsMe = true;
      }
      if (el.querySelector(".active") || oFlag.activeIsMe) {
        return true;
      }
      return false;
    }
    const checkH3 = (el, oFlag) => {
      let text = el.querySelector("p,a").textContent;
      // get id in location.hash
      const id = ((str) => {
        str = decodeURI(str);
        const reg = /id=(.*)/;
        const result = str.match(reg);
        return result ? result[1] : "";
      })(location.hash);
      if (id && id !== text) {
        text = id;
      }

      if ($n(`h3#${text}`)) {
        oFlag.h3IsMe = true;
        return true;
      }
      return false;
    }
    const parseList = ($elList, mapKeyNum = 1) => {
      for (let i = 0; i < $elList.length; i++) {
        const $elCur = $elList[i];
        // const $elPrev = $elList[i - 1];
        const oFlag = {
          activeIsMe: false,
          h3IsMe: false,
        }
        if (checkActive($elCur, oFlag)) {
          let $elPick = $elCur;
          if (checkH3($elCur, oFlag) && oFlag.activeIsMe) {
            $elPick = $elCur.parentElement.previousElementSibling;
          }
          titleMap[`r${mapKeyNum}`] = $elPick.querySelector("p,a").innerText;
          if (oFlag.activeIsMe) {
            if (oFlag.h3IsMe) {
              doOffset(titleMap, $elCur.querySelector("p,a").innerText);
            }
            break;
          } else {
            parseList($elCur.querySelectorAll("ul>li"), mapKeyNum + 1);
          }
          break;
        }
      }
    }

    // 一级分类列表
    const $r1List = $na(".sidebar-nav>ul>li");
    parseList($r1List);

    // 拼接为字符串
    titleMap.strTitle = titleMap.r3 + " - " + titleMap.r2 + " - " + titleMap.r1;
    titleMap.strTitle = titleMap.strTitle.replace(/^\s-\s/g, " ");
    return titleMap;
  }

  function updateTitle() {
    const oNewTitle = getTitleDef();
    document.title = oNewTitle.strTitle;
  }

  // Docsify plugin functions
  function Anchor2Title(hook, vm) {
    hook.init(function () {
      // 初始化完成后调用，只调用一次，没有参数。
      window.onhashchange = () => {
        setTimeout(updateTitle, 137);
      };
    });
    hook.doneEach(updateTitle);
  }

  // Docsify plugin
  window.$docsify.plugins = [].concat(
    Anchor2Title,
    window.$docsify.plugins
  );
})();
