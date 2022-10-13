import * as React from "react";

export default function Post({
  data,
  pageContext,
  children,
}: {
  data: any;
  pageContext: any;
  children: any;
}) {
  return (
    <main>
      data
      <pre>{JSON.stringify(data, null, 2)}</pre>
      pagecontext
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
      children
      {children}
    </main>
  );
}
