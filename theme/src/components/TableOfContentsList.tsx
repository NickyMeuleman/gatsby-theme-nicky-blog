/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { ITableOfContents } from "../types";
import { useActiveId } from "../hooks/useActiveId";

interface IProps {
  tableOfContents: ITableOfContents;
}

function getIds(items) {
  return items.reduce((acc, item) => {
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
  items: any,
  activeId: string,
  isRecursiveCall?: boolean
): any {
  return (
    <ol sx={{ listStyle: `none`, padding: 0 }}>
      {items.map((item: any) => (
        <li key={item.url} sx={{ mt: isRecursiveCall ? 1 : 3 }}>
          <a
            href={item.url}
            sx={{
              variant:
                activeId === item.url.slice(1)
                  ? `styles.tableOfContents`
                  : `styles.tableOfContents.active`,
            }}
          >
            {item.title}
          </a>
          {item.items && (
            <ol sx={{ listStyle: `none`, padding: 0, pl: 3 }}>
              {renderItems(item.items, activeId, true)}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}

const TableOfContentsList: React.FC<IProps> = ({ tableOfContents }) => {
  const { items } = tableOfContents;
  const activeId = useActiveId(getIds(items));
  return renderItems(items, activeId, false);
};

export default TableOfContentsList;
