
// Docsify plugin functions
function auto_add_update_time_plugin(hook, vm) {

  hook.beforeEach(function(content) {
    vm.config.autoHeader = false;
    content = "<p align=\"right\" style=\"opacity: .6;\">更新时间：{docsify-updated}</p>\n\n"+content
    return content;
  });
}

// Docsify plugin
window.$docsify.plugins = [].concat(auto_add_update_time_plugin, window.$docsify.plugins);
