## 「前台页面」输出

| 接口                                | 参数        | 说明 |
| ----------------------------------- | ----------- | ---- |
| Filter_Plugin_ViewList_Template     | `$template` |      |
| Filter_Plugin_ViewPost_Template     | `$template` |      |
| Filter_Plugin_ViewSearch_Template   | `$template` |      |
| Filter_Plugin_ViewComments_Template | `$template` |      |
| Filter_Plugin_ViewComment_Template  | `$template` |      |

## 「前台页面」流程

| 接口                           | 参数                                   | 说明 |
| ------------------------------ | -------------------------------------- | ---- |
| Filter_Plugin_Index_Begin      |
| Filter_Plugin_Index_End        |
| Filter_Plugin_ViewIndex_Begin  | `str $url`                             |
| Filter_Plugin_ViewAuto_Begin   | `str $inpurl`,`str $url`               |
| Filter_Plugin_ViewAuto_End     | `str $url`                             |
| Filter_Plugin_Feed_Begin       |
| Filter_Plugin_Feed_End         |
| Filter_Plugin_ViewFeed_Begin   |
| Filter_Plugin_ViewFeed_Core    | `arr $w`                               |
| Filter_Plugin_ViewFeed_End     | `obj $rss2`                            |
| Filter_Plugin_ViewList_Begin   |
| Filter_Plugin_ViewList_Core    |
| Filter_Plugin_Search_Begin     |
| Filter_Plugin_Search_End       |
| Filter_Plugin_ViewSearch_Begin |
| Filter_Plugin_ViewSearch_Core  |
| Filter_Plugin_ViewPost_Begin   |
| Filter_Plugin_ViewPost_Core    | `$select, $w, $order, $limit, $option` |
