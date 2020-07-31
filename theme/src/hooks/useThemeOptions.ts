import { useStaticQuery, graphql } from "gatsby";
import { IThemeOptions } from "../types";

const useThemeOptions = (): IThemeOptions => {
  const { nickyThemeBlogConfig: themeOptions } = useStaticQuery(
    graphql`
      query ThemeOptionsQuery {
        nickyThemeBlogConfig {
          id
          assetPath
          instances {
            basePath
            contentPath
            pagination {
              postsPerPage
              prefixPath
            }
          }
        }
      }
    `
  );
  return themeOptions;
};

export { useThemeOptions };
