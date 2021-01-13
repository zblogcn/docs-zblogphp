```json
{
  "include": {
    "prefix": ["include", "inc_include"],
    "body": ["[$1](include/$1.md ':include')"],
    "description": "插入预定义内容片段（include/）"
  },
  "include_terms": {
    "prefix": ["include_terms", "inc_terms"],
    "body": ["[$1](terms/$1.md ':include')"],
    "description": "插入预定义内容片段（terms/）"
  },
  "include_terms_path": {
    "prefix": ["include_terms_path", "inc_terms_path"],
    "body": ["[path](terms/path.md ':include')"],
    "description": "`path`的定义说明"
  },
  "include_terms_host": {
    "prefix": ["include_terms_host", "inc_terms_host"],
    "body": ["[host](terms/host.md ':include')"],
    "description": "`host`的定义说明"
  },
  "comer_brackets": {
    "prefix": [
      "comer_brackets",
      "comer",
      "brackets",
      "kagi_kakko",
      "kagi",
      "kakko",
      "goukuohu",
      "gou",
      "kuohu",
      "||"
    ],
    "body": "「${1:内容}」",
    "description": "输入`「」`用于着重某些内容"
  },
  "「": {
    "prefix": ["[[", "【【"],
    "body": "「",
    "description": ""
  },
  "」": {
    "prefix": ["]]", "】】"],
    "body": "」",
    "description": ""
  },
  "code": {
    "prefix": ["code", "``"],
    "body": " `${1:code}` ",
    "description": "行内代码`code`"
  },
  "**注：**": {
    "prefix": "**",
    "body": "**注：$1**",
    "description": "加粗内容「注：」"
  },
  "**重要：**": {
    "prefix": "**",
    "body": "**重要：$1**",
    "description": "加粗内容「重要：」"
  },
  "docsify": {
    "prefix": "docsify",
    "body": "docsify",
    "description": "docsify"
  }
}
```
