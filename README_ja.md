# AIC Lab ウェブサイト

このリポジトリは，名古屋工業大学 Artificial Intelligence and Communication Laboratory（AIC Lab）の公式ウェブサイトです．

Hugo により構築されており，長期的な保守を行いやすいように，ページの内容は主に `data/` 以下の YAML ファイルで管理しています．通常の更新では，テンプレートを編集せずにデータファイルを更新できます．

## 主な機能

- 英語，日本語，中国語の三言語対応．
- Home，Research，Members，Publications，Projects，News，Access，Links のデータ管理．
- 論文情報は `data/publications/` で年度別に管理．
- 研究紹介は `data/research/` で研究方向ごとに管理．
- メンバー情報は `data/members/` でカテゴリごとに管理．
- `scripts/update_citations.py` による Google Scholar 引用数更新．
- GitHub Actions による GitHub Pages への自動デプロイ．

## ローカル確認

```powershell
hugo server -D
```

本番用ビルド：

```powershell
hugo --minify
```

## データ管理

- `data/home/`: ホームページの内容．
- `data/access/`: アクセス・連絡先情報．
- `data/links/`: 外部リンク．
- `data/members/`: 教員，学生，共同研究者，卒業生・元スタッフ．
- `data/research/`: 研究方向と代表論文．
- `data/publications/`: 年度別の論文リスト．
- `data/projects/items.yaml`: 研究プロジェクト．
- `data/news/<year>/`: 年度別ニュース．
- `data/citations/meta.yaml`: 引用統計と最終更新時刻．

三言語ファイルでは，可能な限り `en.yaml` に共通情報を置き，`ja.yaml` と `zh.yaml` には同じ ID に対応する翻訳・言語固有情報のみを記述します．

## 引用数更新

手動更新は以下で実行します．

```powershell
python scripts/update_citations.py
```

このスクリプトは `scholarly` を通じて Google Scholar から情報を取得し，全ての論文 YAML の引用数を更新します．また，引用統計を `data/citations/meta.yaml` に書き込み，Google Scholar で新しい論文が見つかった場合は，対応する年度ファイルへ追加できます．

`.github/workflows/update-citations.yml` により，日本時間の深夜頃と中国時間の正午頃に自動実行されます．

## デプロイ

`.github/workflows/hugo.yml` により GitHub Pages へ自動デプロイされます．変更を GitHub に push すると，サイトが自動的にビルド・公開されます．
