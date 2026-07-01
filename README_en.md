# AIC Lab Website

This repository contains the official website of the Artificial Intelligence and Communication Laboratory (AIC Lab), Nagoya Institute of Technology.

The site is built with Hugo and is designed for long-term maintenance through data files. Most page content is stored under `data/`, so routine updates usually do not require editing templates.

## Main Features

- Multilingual website: English, Japanese, and Chinese.
- Data-driven pages for Home, Research, Members, Publications, Projects, News, Access, and Links.
- Shared publication records under `data/publications/`.
- Research topics managed by folder under `data/research/`.
- Member records managed by category under `data/members/`.
- Google Scholar citation updates through `scripts/update_citations.py`.
- GitHub Pages deployment through GitHub Actions.

## Local Preview

```powershell
hugo server -D
```

Build the production site:

```powershell
hugo --minify
```

## Data Management

- `data/home/`: home-page text and shared home content.
- `data/access/`: access and contact information.
- `data/links/`: external links.
- `data/members/`: faculty, students, collaborating researchers, and alumni.
- `data/research/`: research directions and featured papers.
- `data/publications/`: publication records, grouped by year.
- `data/projects/items.yaml`: research projects.
- `data/news/<year>/`: yearly news entries.
- `data/citations/meta.yaml`: citation metrics and update timestamp.

For multilingual folders, `en.yaml` stores shared fields when possible. `ja.yaml` and `zh.yaml` store only translated or language-specific fields that override the English data by the same ID.

## Citation Updates

Run the citation updater manually with:

```powershell
python scripts/update_citations.py
```

The script uses Google Scholar through `scholarly`, updates citation counts in all publication YAML files, writes citation metadata to `data/citations/meta.yaml`, and can add newly detected publications to the corresponding yearly file.

The GitHub Actions workflow `.github/workflows/update-citations.yml` runs automatically twice a day, around midnight in Japan and noon in China time.

## Deployment

The site is deployed by `.github/workflows/hugo.yml`. Push changes to GitHub, and GitHub Pages will build and publish the site automatically.
