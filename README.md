# AIC Lab Multilingual Hugo Website

This starter is designed for the AIC Lab research website with English, Japanese, and Chinese pages. The layout reads structured YAML files from `data/`, so routine maintenance can be done by editing data instead of touching templates.

## Display Names

- Header brand: language-specific abbreviation plus full lab name
- Site title: AIC Lab
- Browser tab title: AIC Lab
- Footer: AIC Lab
- Main page title: AIC Lab

The browser tab title is fixed to `AIC Lab` for every page.

The lab logo is stored at:

```text
static/images/aiclab_logo.png
```

## Language URLs

- English: `/en/`
- Japanese: `/ja/`
- Chinese: `/zh/`

## Main Sections

- Home
- Members
- Publications
- Projects
- News
- Access
- Links

## What To Edit Later

Most updates should happen in these folders:

```text
data/
+-- access/
+-- home/
+-- links/
+-- members/
+-- research/
+-- news/
+-- publications/
+-- projects\n|   `-- items.yaml
+-- citations\n    `-- meta.yaml
```

For example:

- Add a paper: edit or create a year file under `data/publications/`, such as `data/publications/2026.yaml`.
- Add a research project/grant: edit the shared `data/projects/items.yaml`.
- Add news: edit or create a fiscal-year/language file under `data/news/`, such as `data/news/2026/en.yaml`.
- Add or update members: edit the category/language files under `data/members/`.
- Add or update research topics: edit the direction/language files under `data/research/`.
- Update homepage text: edit `data/home/en.yaml`, `data/home/ja.yaml`, or `data/home/zh.yaml`.
- Update address or map link: edit `data/access/en.yaml`, `data/access/ja.yaml`, or `data/access/zh.yaml`.
- Add external resources: edit `data/links/en.yaml`, `data/links/ja.yaml`, or `data/links/zh.yaml`.


## Members

Members are managed by category and language. Edit the file for the relevant category and language:

```text
data/members/faculty/en.yaml
data/members/faculty/ja.yaml
data/members/faculty/zh.yaml
data/members/students/en.yaml
data/members/students/ja.yaml
data/members/students/zh.yaml
data/members/coresearchers/en.yaml
data/members/coresearchers/ja.yaml
data/members/coresearchers/zh.yaml
data/members/alumni/en.yaml
data/members/alumni/ja.yaml
data/members/alumni/zh.yaml
```

Each language file is organized as one top-level entry per member, similar to the structured entries used by projects and publications:

```yaml
cheng_tang:
  group: "faculty"
  display: true
  image: "/images/members/faculty/chengtang.png"
  name: "Cheng Tang"
  name_sort: "Cheng Tang"
  role: "Associate Professor"
  role_sort: "Associate Professor"
  grade: ""
  emails:
    - "tang.cheng@nitech.ac.jp"
    - "tangcheng.ac@outlook.com"
  url: "https://chengtang-ai.github.io/"
  origin: "China"
  interests: "Artificial Intelligence, Communication Systems, Network Intelligence"
  hobbies: "Calligraphy, Photography, Travel"
  message: "In life, you either succeed or grow."
```

Use `display: true` to show a member and `display: false` to hide one without deleting the entry. If `display` is omitted, the site treats the member as visible by default.

Use `group: "faculty"`, `group: "collaborator"`, `group: "student"`, or `group: "alumni"`. For students, add `student_type: "doctoral"`, `student_type: "master"`, `student_type: "research"`, `student_type: "undergraduate"`, or `student_type: "exchange_preparatory"`. The Students section is displayed as a collapsible section. Use `grade` values such as `D1`, `D2`, `D3`, `M1`, `M2`, or `B4`. Alumni use `group: "alumni"` with a `year` field and `alumni_type: "faculty"` or `alumni_type: "student"`, and are grouped by year on the website. Empty groups are hidden automatically. Optional profile fields include `origin`, `interests`, `hobbies`, `message`, `emails`, `email`, and `url`.

Sorting rules are configured at the top of each member data file. Use `sort_rule` in the `faculty/` and `coresearchers/` language files, `student_type_sort_rule` in the `students/` language files, and `faculty_sort_rule` / `student_sort_rule` in the `alumni/` language files. Use `role` for the displayed role in each language and `role_sort` for sorting. Keep `role_sort` aligned with the configured English sorting rules, such as `Professor`, `Associate Professor`, `Assistant Professor`, and `Postdoctoral Researcher`. Use `name` for display and `name_sort` for sorting. Members whose role does not match a configured rule are shown after the configured roles, then sorted alphabetically by `name_sort`.
## Research

Research directions are managed by direction and language. Each research direction is one folder under `data/research/`, and each folder contains `en.yaml`, `ja.yaml`, and `zh.yaml`:

```text
data/research/dendritic_computation/en.yaml
data/research/dendritic_computation/ja.yaml
data/research/dendritic_computation/zh.yaml
data/research/medical_data_mining/en.yaml
```

`en.yaml` is the primary file for shared/common information. It contains direction-level metadata and all featured-paper entries, including `display`, `image`, `publication_title`, `link`, and English contributions:

```yaml
display: true
title: "Dendritic Computation"
description: "Computational models and learning algorithms inspired by dendritic processing in biological neurons."

Dendritic neural network: a novel extension of dendritic neuron model:
  display: true
  image: images/research/dendritic_computation/DNN.png
  contributions:
    - "Proposed the Dendritic Neural Network (DNN), extending the conventional dendritic neuron model into a neural network."
```

`ja.yaml` and `zh.yaml` only store localized text. They inherit common fields from `en.yaml` by matching the same top-level paper ID:

```yaml
title: "Japanese or Chinese direction title"
description: "Japanese or Chinese direction description"

Dendritic neural network: a novel extension of dendritic neuron model:
  contributions:
    - "Localized contribution text."
```

To add a new research direction, create a new folder under `data/research/` and add the three language files. The site automatically reads every direction folder under `data/research/`; no template edit is needed.

To add a new featured paper, first add the full entry to `en.yaml`. Then add only translated fields to `ja.yaml` and `zh.yaml` using the exact same top-level paper ID. If a localized file does not contain that paper ID, the site falls back to the English text and common fields.

Use `display: true` to show the direction or featured paper and `display: false` to hide it. The common visibility setting should usually be maintained in `en.yaml`. Research directions are sorted automatically by the number of visible featured papers. Papers inside each direction are sorted automatically by the publication year and month matched from all files under `data/publications/`.

The featured paper entry key is used as the display title and is matched case-insensitively against the `title` fields in all publication year files. If the display title should differ from the publication title, add `publication_title: "Exact publication title"` in `en.yaml`. When a matching publication is found, the Research page automatically uses its authors, venue, year/month, DOI, URL, and link information.

## Publications

Publications are shared across English, Japanese, and Chinese pages. They are managed as one YAML file per publication year:

```text
data/publications/2026.yaml
data/publications/2025.yaml
data/publications/2024.yaml
```

The site automatically reads every `*.yaml` file under `data/publications/`. To add a new year, create a new file such as `data/publications/2027.yaml`; no template edit is needed.

Each year file is organized as one top-level entry per paper, similar to BibTeX:

```yaml
journal_2026_01:
  type: "journal"
  title: "Paper title"
  authors: "Author A, Cheng Tang, Author B"
  journal: "Journal name"
  year: 2026
  month: "01"
  volume: "10"
  number: "2"
  pages: "100--110"
  doi: "https://doi.org/..."
  url: "https://..."
```

Use IDs such as `journal_2026_01`, `conference_2026_01`, or `preprint_01`. Use `type: "preprint"`, `type: "journal"`, or `type: "conference"`. For the publication source, use `journal:`, `conference:`, or `preprint:` according to the type. Add `month: "01"` to display dates as `2026.01`. Add `doi: "https://doi.org/..."` when available, or `url: "https://..."` when there is no DOI. The right-side `Link` button uses DOI first, then URL, then `link`, and falls back to a Google Scholar title search.

The site automatically displays preprints first, then groups journal and conference papers by Japanese academic/fiscal year in descending order. The Japanese academic year runs from April to March, so January-March papers are grouped into the previous fiscal year. Each fiscal year contains collapsible `Journal Papers` and `Conference Papers` sections. Publication numbers are generated automatically from the oldest to newest item within each type: `P001` for preprints, `J001` for journal papers, and `C001` for conference papers.


## Citation Updates

Citation display can be turned on or off in `hugo.toml`:

```toml
[params]
  showCitations = true
```

When `showCitations` is `true`, the Publications page displays the top citation metrics panel, citation totals beside publication groups, and citation counts beside individual papers. When it is `false`, all citation metrics are hidden from the site, while the updater can still keep citation fields in `data/publications/*.yaml` and `data/citations/meta.yaml`.

The workflow at `.github/workflows/update-citations.yml` updates citation counts twice per day using Google Scholar through the Python `scholarly` package. The configured Google Scholar profile ID is:

```text
GvXOVv0AAAAJ
```

The script also updates `data/citations/meta.yaml`, which is displayed next to the citation source as the latest update date. After this workflow completes successfully, `.github/workflows/hugo.yml` is also triggered so the public GitHub Pages site can be rebuilt with the latest citation data.

The script is:

```text
scripts/update_citations.py
```

It reads every `*.yaml` file under `data/publications/`. Publication field names are read case-insensitively, so `title`, `Title`, and `TITLE` are treated the same. Title matching is also case-insensitive. Existing entries are updated in place by replacing or inserting only citation-related fields. If there are no citation changes and no new papers, the script leaves the publication files untouched.

With the default Google Scholar source, the script loads the publication list from the configured Scholar profile and matches existing entries by title across all publication year files. If Google Scholar contains a publication title that is not found in any file, the script inserts a review-required template into the corresponding `data/publications/YYYY.yaml` file. If that year file does not exist, it is created automatically.

Some Google Scholar records can be intentionally ignored. The ignore list is maintained in `scripts/update_citations.py` as `IGNORED_PUBLICATION_TITLE_TEXTS`; ignored titles are neither updated nor inserted as new publication templates. If Google Scholar returns duplicate records with the same normalized title, their citation counts are merged before matching, so duplicate Scholar records contribute a combined citation count to the corresponding YAML entry.

The citation source can be changed with:

```text
CITATION_SOURCE=google_scholar
GOOGLE_SCHOLAR_ID=GvXOVv0AAAAJ
```

OpenAlex remains available as a fallback source:

```text
CITATION_SOURCE=openalex
OPENALEX_AUTHOR_ID=...
```

Optional OpenAlex repository secrets:

```text
OPENALEX_API_KEY
OPENALEX_EMAIL
```

If the selected source contains papers that are not yet in any file under `data/publications/`, the script inserts review-required templates near the top of the corresponding year file:

```yaml
new_publication_2026_01:
  # TODO: Review this automatically added Google Scholar entry.
  display: true
  type: "preprint"
  title: "Paper title from Google Scholar"
  authors: ""
  journal: ""
  conference: ""
  preprint: "Google Scholar"
  year: 2026
  month: ""
  doi: ""
  link: ""
  citations: 0
```

Review these entries regularly, fill missing fields, and rename IDs to the normal format such as `journal_2026_01`, `conference_2026_01`, or `preprint_01`.


## Projects

Research grants/projects are shared across English, Japanese, and Chinese pages. Edit only:

```text
data/projects/items.yaml
```

The list is organized as one top-level entry per project:

```yaml
rg_003:
  code: "RG003"
  title: "Project title"
  title_ja: "Japanese title, if available"
  funder: "Funding agency"
  funder_ja: "Japanese funding program name, if available"
  institution: "Institution name"
  program: "Program name"
  grant_number: "JP..."
  period: "2025-2026"
  start_year: 2025
  end_year: 2026
  role: "PI"
  role_type: "principal"
```

To add a project, copy one of the hidden `example_*` entries at the top of `data/projects/items.yaml`, give it a unique entry ID, edit the fields, and change `display: false` to `display: true`. Use `role_type: "principal"` for projects led by the lab member and `role_type: "collaborator"` for collaborative projects. The projects page groups entries into collapsible ongoing and completed sections, and each section is further grouped by role. The Japanese labels are `代表者` and `分担者`; the Chinese labels are `项目负责人` and `共同研究人员`. Empty role groups are hidden automatically. Projects are sorted by `start_year` in descending order; if two projects have the same `start_year`, the project with the later `end_year` appears first. A project is treated as completed when `end_year` is earlier than the current year.

## News

News is managed by Japanese fiscal year and language. Each fiscal year has its own folder, and each folder contains `en.yaml`, `ja.yaml`, and `zh.yaml`:

```text
data/news/2026/en.yaml
data/news/2026/ja.yaml
data/news/2026/zh.yaml
data/news/2025/en.yaml
```

The site automatically reads every numeric year folder under `data/news/`. To add a new fiscal year, create a new folder such as `data/news/2027/` with the three language files; no template edit is needed. The home-page latest-news labels are stored separately in:

```text
data/news/_summary/en.yaml
data/news/_summary/ja.yaml
data/news/_summary/zh.yaml
```

Each language file is organized as one top-level entry per news item:

```yaml
news_2026_04_01_01:
  display: true
  date: "2026-04-01"
  student_year: ""
  title: "News title"
  person_name: "Cheng Tang"
  person_type: "Faculty"
  position: "Associate Professor"
  text: "News body with **Markdown** and [links](https://example.com/)."
```

Use `display: true` to show a news item and `display: false` to hide it. The website renders the person fields as a prefix such as `(Faculty, Associate Professor) Cheng Tang`. For students, use fields such as `person_type: "Student"` and `position: "M1"`, `M2`, `D1`, or `B4`, with corresponding values in the Japanese and Chinese files. Markdown links in `title` and `text` are rendered as clickable links on the website. News is sorted automatically by `date` and grouped by Japanese academic/fiscal year, where April to the following March forms one fiscal year.


## Theme Strategy

This starter includes local layouts in `layouts/` so it can work as a minimal Hugo site. If you later choose an existing Hugo theme, keep `data/` and `hugo.toml`, then either:

1. Move these layouts into the theme override layer, or
2. Adapt the selected theme templates to read from the same `data/` files.

The important boundary is:

- Design and HTML: `layouts/`, `assets/css/`
- Lab content and maintenance: `data/`
- Language and menus: `hugo.toml`

## Run Locally

Install Hugo Extended, then run:

```powershell
hugo server
```

Build the static site:

```powershell
hugo --minify
```

## GitHub Pages

The included workflow at `.github/workflows/hugo.yml` builds the site and deploys it to GitHub Pages.

In the GitHub repository, enable:

Settings -> Pages -> Build and deployment -> Source -> GitHub Actions

