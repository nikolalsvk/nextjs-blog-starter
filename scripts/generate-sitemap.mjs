import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";

async function generate() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/*.js",
    "content/**/*.md",
    "!content/*.md",
    "!pages/_*.js",
    "!pages/[*.js",
    "!pages/api",
    "!pages/404.js",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace("content/blog", "")
              .replace(".js", "")
              .replace(".md", "");
            const route = path === "/index" ? "" : path;

            return `
              <url>
                  <loc>${`https://DOMAIN_NAME_HERE${route}`}</loc>
									<changefreq>daily</changefreq>
									<priority>1.0</priority>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
}

generate();
