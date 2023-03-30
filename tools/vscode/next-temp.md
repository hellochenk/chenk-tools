# 1. create next page
```json
  "NextPage": {
    "scope": "javascript,typescript,typescriptreact",
    "prefix": "next",
    "body": [
      "import type { GetServerSideProps, NextPage } from 'next';",
      "import Head from 'next/head';",
      "",
      "type NewPageType = {}",
      "",
      "const newPage: NextPage<NewPageType> = () => {",
      "return (",
      "<>",
      " <Head>",
      "  <title>new page</title>",
      " </Head>",
      " <div>123</div>",
      "</>",
      ");",
      "}",
      "",
      "export const getServerSideProps: GetServerSideProps<NewPageType> = async (context) => {",
      "return {",
      " props: {",
      "",
      " }",
      "}",
      "}",
      "",
      "export default newPage"
    ],
    "description": "Log output to console"
  }
```
