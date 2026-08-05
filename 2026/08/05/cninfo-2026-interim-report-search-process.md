# 巨潮资讯 2026 年中报发布公司检索过程

> 最后核对日期：2026-08-05  
> 统计对象：巨潮资讯中正式披露《2026年半年度报告》的 A 股公司  
> 截至本次查询时点：109 家

## 1. 统计口径

本次检索只统计正式的《2026年半年度报告》全文：

- 包含沪市、深市、创业板、科创板和北交所公司。
- 同一家公司同时发布“全文”和“摘要”时，只统计一次。
- 不把《2026年半年度报告摘要》单独计为一家公司。
- 排除业绩预告、业绩快报、预约披露日期和其他非正式财报。
- 排除 2025 年及更早年度中报的更正稿、修订稿和更新稿。
- 公司名称与证券代码以巨潮资讯接口返回值为准。

这个口径回答的是“哪些公司已经正式发布 2026 年中报”，而不是“哪些公司预告了中报业绩”。

## 2. 数据来源

使用巨潮资讯历史公告查询接口：

```text
POST http://www.cninfo.com.cn/new/hisAnnouncement/query
```

核心请求参数如下：

| 参数 | 值 | 作用 |
|---|---|---|
| `pageNum` | 从 `1` 开始递增 | 公告分页 |
| `pageSize` | `30` | 每页公告数量 |
| `column` | `szse` | 巨潮全量公告查询入口；本次实际返回覆盖沪深京公司 |
| `tabName` | `fulltext` | 全文检索 |
| `category` | `category_bndbg_szsh` | 半年度报告分类 |
| `seDate` | `2026-07-01~查询日` | 公告披露日期区间 |
| `stock` | 空 | 不限定公司 |
| `searchkey` | 空 | 不做关键词预筛选，避免遗漏标题变体 |

请求头至少设置浏览器 `User-Agent`、`X-Requested-With`、`Origin` 和 `Referer`。接口返回 JSON，公告记录位于 `announcements`，是否还有下一页由 `hasMore` 判断。

## 3. 分页获取公告

从第一页开始请求，将每页的 `announcements` 合并；只要 `hasMore` 为真，就继续请求下一页。

主要使用以下返回字段：

| 字段 | 用途 |
|---|---|
| `secCode` | 证券代码，也是公司去重主键 |
| `secName` | 公司简称 |
| `announcementTitle` | 判断报告年度、全文或摘要 |
| `announcementTime` | 公告时间，毫秒级 Unix 时间戳 |
| `announcementId` | 巨潮公告唯一标识 |
| `adjunctUrl` | PDF 相对地址 |

`announcementTime` 按 `Asia/Shanghai` 时区转换为披露日期。

## 4. 筛选正式的 2026 年中报全文

巨潮的“半年度报告”分类不只包含当年首次发布的全文，还可能包含：

- 同一中报的全文和摘要；
- 往年中报的更正稿或修订稿；
- 个别与中报相关的补充公告。

因此不能直接使用接口返回的公告条数作为公司数量。本次实际筛选条件是：

```python
title = announcement["announcementTitle"]

is_2026_full_report = (
    "2026年半年度报告" in title
    and "摘要" not in title
)
```

在当前披露期内，这一条件配合 `category_bndbg_szsh` 可以得到正式报告全文。若后续出现标题含“更正公告”“修订公告”等非报告文件，还需要追加标题排除项或人工复核。

## 5. 公司级去重

以 `secCode` 为键建立字典。同一公司如果存在多个符合条件的文件，保留 `announcementTime` 最新的一条。

这样可以避免：

- 全文和摘要重复计数；
- 更新稿或修订稿造成公司重复；
- 分页接口偶发重复返回同一公告。

最终公司数为去重字典的长度，不是公告记录数。

## 6. 生成巨潮 PDF 链接

接口返回的 `adjunctUrl` 是相对路径，拼接方式为：

```python
pdf_url = "https://static.cninfo.com.cn/" + announcement["adjunctUrl"]
```

例如：

```text
https://static.cninfo.com.cn/finalpage/2026-08-05/1225458161.PDF
```

这个地址直接指向巨潮资讯中的中报全文 PDF。

## 7. 增量查询方法

每天重新查询完整披露区间，而不是只查当天，原因包括：

- 巨潮公告可能在同一天内继续增加；
- 接口数据可能存在短暂的收录延迟；
- 全量重算可以避免漏掉前一日稍晚上线的公告。

将当次去重后的 `secCode` 集合与上一次结果集合做差：

```python
new_codes = current_codes - previous_codes
```

差集就是本次新增发布中报的公司。累计数量始终使用当次全量重算值。

## 8. 本轮查询记录

| 查询日期 | 本次新增 | 累计公司数 | 说明 |
|---|---:|---:|---|
| 2026-07-29 | 29 | 29 | 首次建立清单 |
| 2026-07-30 | 7 | 36 | 新增陆家嘴、西部矿业、宏发股份等 |
| 2026-08-04 | 63 | 99 | 汇总 7 月 31 日至 8 月 4 日新增披露 |
| 2026-08-04 再次刷新 | 0 | 99 | 日内复核，无新增 |
| 2026-08-05 | 10 | 109 | 新增百润股份、东方电缆、禾望电气等 |

2026 年 8 月 5 日新增的 10 家公司为：

| 代码 | 公司 |
|---|---|
| 002145 | 钛能化学 |
| 002568 | 百润股份 |
| 300396 | ST迪瑞 |
| 300471 | 厚普股份 |
| 300768 | 迪普科技 |
| 600206 | 有研新材 |
| 600595 | 中孚实业 |
| 603063 | 禾望电气 |
| 603606 | 东方电缆 |
| 688668 | 鼎通科技 |

## 9. 可复现脚本

安装依赖：

```bash
python3 -m pip install httpx
```

将下面脚本保存为 `query_cninfo_2026_interim.py`，执行：

```bash
python3 query_cninfo_2026_interim.py --end-date 2026-08-05
```

脚本会输出去重后的公司数量、证券代码、公司简称、披露日期和巨潮 PDF 链接。

```python
#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt

import httpx


QUERY_URL = "http://www.cninfo.com.cn/new/hisAnnouncement/query"
PDF_BASE = "https://static.cninfo.com.cn/"
CNINFO_TZ = dt.timezone(dt.timedelta(hours=8), "Asia/Shanghai")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) "
        "AppleWebKit/537.36"
    ),
    "X-Requested-With": "XMLHttpRequest",
    "Origin": "http://www.cninfo.com.cn",
    "Referer": "http://www.cninfo.com.cn/",
}


def query_announcements(start_date: str, end_date: str) -> list[dict]:
    base_payload = {
        "pageSize": 30,
        "column": "szse",
        "tabName": "fulltext",
        "plate": "",
        "stock": "",
        "searchkey": "",
        "secid": "",
        "category": "category_bndbg_szsh",
        "trade": "",
        "seDate": f"{start_date}~{end_date}",
        "sortName": "",
        "sortType": "",
        "isHLtitle": "false",
    }

    announcements: list[dict] = []
    page = 1

    with httpx.Client(headers=HEADERS, timeout=60.0) as client:
        while True:
            response = client.post(
                QUERY_URL,
                data=base_payload | {"pageNum": page},
            )
            response.raise_for_status()
            result = response.json()
            announcements.extend(result.get("announcements") or [])

            if not result.get("hasMore"):
                break
            page += 1

    return announcements


def select_formal_reports(announcements: list[dict]) -> list[dict]:
    companies: dict[str, dict] = {}

    for announcement in announcements:
        title = announcement.get("announcementTitle", "")
        if "2026年半年度报告" not in title or "摘要" in title:
            continue

        code = announcement["secCode"]
        current = companies.get(code)
        if (
            current is not None
            and current["announcementTime"]
            >= announcement["announcementTime"]
        ):
            continue

        disclosure_date = dt.datetime.fromtimestamp(
            announcement["announcementTime"] / 1000,
            CNINFO_TZ,
        ).date().isoformat()

        companies[code] = {
            "code": code,
            "name": announcement["secName"],
            "date": disclosure_date,
            "title": title,
            "announcementTime": announcement["announcementTime"],
            "pdf_url": PDF_BASE + announcement["adjunctUrl"],
        }

    return sorted(
        companies.values(),
        key=lambda row: (row["date"], row["code"]),
        reverse=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="查询巨潮资讯已正式发布 2026 年中报的公司",
    )
    parser.add_argument("--start-date", default="2026-07-01")
    parser.add_argument("--end-date", required=True)
    args = parser.parse_args()

    announcements = query_announcements(
        args.start_date,
        args.end_date,
    )
    reports = select_formal_reports(announcements)

    print(f"正式发布 2026 年中报的公司数：{len(reports)}")
    print("| 披露日期 | 代码 | 公司 | 巨潮中报 |")
    print("|---|---:|---|---|")
    for report in reports:
        print(
            f"| {report['date']} | {report['code']} | "
            f"{report['name']} | [全文]({report['pdf_url']}) |"
        )


if __name__ == "__main__":
    main()
```

## 10. 复核要点

每次对外报告结果前，至少检查：

1. 接口分页是否完整走到 `hasMore == false`。
2. 标题是否明确包含“2026年半年度报告”。
3. 是否排除了“摘要”和旧年度报告。
4. 公司是否按证券代码去重。
5. `announcementTime` 是否按北京时间转换。
6. PDF 链接是否由 `adjunctUrl` 正确拼接。
7. 当日是否可能继续披露，并在结果中注明“截至本次查询时点”。

## 11. 限制说明

- 巨潮接口属于网站内部查询接口，字段或参数未来可能调整。
- 日内查询结果只是当前快照，不能代表当天最终披露数量。
- 后续若出现同年度报告更正稿，应区分“首次发布公司数”和“最新有效版本”两个口径。
- 本流程用于识别已发布正式中报的公司，不包含财务质量、估值或投资结论分析。
