# AIC Lab 官网

本仓库是名古屋工业大学 Artificial Intelligence and Communication Laboratory（AIC Lab）的官方网站项目。

网站基于 Hugo 构建，并采用数据与模板分离的方式进行维护。多数页面内容位于 `data/` 文件夹中，日常更新通常只需要修改 YAML 数据文件，不需要修改页面模板。

## 主要功能

- 支持英文、日文、中文三语言页面。
- Home、Research、Members、Publications、Projects、News、Access、Links 均采用数据驱动管理。
- 论文信息在 `data/publications/` 中按年份管理。
- 研究方向在 `data/research/` 中按文件夹管理。
- 成员信息在 `data/members/` 中按类别管理。
- 通过 `scripts/update_citations.py` 从 Google Scholar 更新引用数据。
- 通过 GitHub Actions 自动部署到 GitHub Pages。

## 本地预览

```powershell
hugo server -D
```

生成正式网站：

```powershell
hugo --minify
```

## 数据管理

- `data/home/`：主页内容。
- `data/access/`：地址与联系方式。
- `data/links/`：相关链接。
- `data/members/`：教员、学生、合作研究者、往届成员。
- `data/research/`：研究方向与代表论文。
- `data/publications/`：按年份划分的论文列表。
- `data/projects/items.yaml`：科研项目。
- `data/news/<year>/`：按年份划分的动态。
- `data/citations/meta.yaml`：引用统计与最新更新时间。

三语言数据文件中，`en.yaml` 尽量保存共通信息，`ja.yaml` 和 `zh.yaml` 只保存同一 ID 下需要翻译或覆盖的内容。

## 引用数据更新

手动更新命令：

```powershell
python scripts/update_citations.py
```

该脚本通过 `scholarly` 读取 Google Scholar 信息，自动更新所有论文 YAML 文件中的引用数，并更新 `data/citations/meta.yaml`。如果 Google Scholar 中出现了本地没有的新论文，脚本会尝试添加到对应年份的文件中。

`.github/workflows/update-citations.yml` 会每天自动运行两次，时间约为日本时间夜间 12 点和中国时间中午 12 点。

## 部署

`.github/workflows/hugo.yml` 负责 GitHub Pages 自动部署。将修改 push 到 GitHub 后，网站会自动构建并发布。
