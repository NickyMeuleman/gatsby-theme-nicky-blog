/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { ITableOfContents, ITableOfContentsItem } from "../types";
import { useActiveId } from "../hooks/useActiveId";

interface IProps {
  tableOfContents: ITableOfContents;
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
// TODO: Why is this rule on here? It's disabled in eslintrc
function getIds(items: ITableOfContentsItem[]) {
  return items.reduce<string[]>((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it and add the raw CSS-id
      acc.push(item.url.slice(1));
    }
    if (item.items) {
      acc.push(...getIds(item.items));
    }
    return acc;
  }, []);
}

function renderItems(
  items: ITableOfContentsItem[],
  activeId: string,
  isRecursiveCall?: boolean
): JSX.Element {
  return (
    <ol
      sx={{
        listStyle: `none`,
        padding: 0,
        variant: isRecursiveCall ? null : `styles.TableOfContentsList`,
      }}
    >
      {items.map((item) => {
        // exit early if there is no url, that also means there can't be any item.items
        // Reason: heading levels should only ever increase by one level.
        if (!item.url) {
          return null;
        }
        return (
          <li key={item.url} sx={{ mt: isRecursiveCall ? 1 : 3 }}>
            <a
              href={item.url}
              sx={{
                variant:
                  activeId === item.url.slice(1)
                    ? `styles.TableOfContentsList.link.active`
                    : `styles.TableOfContentsList.link`,
              }}
            >
              {item.title}
            </a>
            {item.items && (
              <ol sx={{ listStyle: `none`, padding: 0, pl: 2 }}>
                {renderItems(item.items, activeId, true)}
              </ol>
            )}
          </li>
        );
      })}
    </ol>
  );
}

const TableOfContentsList: React.FC<IProps> = ({ tableOfContents }) => {
  const { items } = tableOfContents;
  const activeId = useActiveId(getIds(items));
  return renderItems(items, activeId);
};

export default TableOfContentsList;
