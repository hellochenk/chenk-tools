# 1 fc temp
```json
  {
  "Print to console": {
    "prefix": "react-temp-fc",
    "body": [
      "import React, { useState, useEffect } from 'react';",
      "import type { FC } from 'react';",
      "",
      "const styles = require('./index.css');",
      "",
      "type Props = {",
      "",
      "};",
      "",
      "export const Index:FC<Props> = (props) => {",
      " const [isPageLoading, setPageLoading] = useState<boolean>(false);",
      "",
      " useEffect(() => {",
      "  console.log('page loading!')",
      "}, []);",
      "",
      "    return (",
      "        <div>",
      "            new components",
      "        </div>",
      "    );",
      "};"
    ],
    "description": "default react snippet_1"
  }
}
```

# 2 useState
```json
{
	"Print to console": {
		"prefix": "react.state",
		"body": [
			"const [state, setState] = useState<boolean>(false)",
		],
		"description": "react useState"
	}
}
```

# 3 useEffect
```json
{
	"Print to console": {
		"prefix": "react.effect",
		"body": [
			"useEffect(() => {",
			"",
			"}, [])",
		],
		"description": "react useState"
	}
}
```

# 4 useRef
```json
{
	"Print to console": {
		"prefix": "react.ref",
		"body": [
			"const myRef = useRef<HTMLDivElement>()",
		],
		"description": "react useState"
	}
}
```

# 5 page state (render by loading, success, fail, empty)

```json
{
	"Print to console": {
		"prefix": "page.status",
		"body": [
			"enum PageStatusENUM {",
			"  default,",
			"  loading,",
			"  success,",
			"  fail,",
			"  empty,",
			"}",
			"",
			"const [pageState, setPageState] = useState<PrizeModalStatus>(",
			"  PageStatusENUM.default,",
			")",
			"",
			"const renderLoading = () => <div className={styles.loading}>loading</div>",
			"",
			"const renderEmpty = () => <div className={styles.empty}>empty</div>",
			"",
			"const renderFail = () => <div className={styles.fail}>fail</div>",
			"",
			"const renderContent = () => <div className={styles.fail}>content</div>",
			"",
			"const renderMain = () => {",
			"  switch(pageState) {",
			"    case PageStatusENUM.loading: {",
			"      return renderLoading()",
			"    }",
			"    case PageStatusENUM.success: {",
			"      return renderContent()",
			"    }",
			"    case PageStatusENUM.fail: {",
			"      return renderFail()",
			"    }",
			"    default: {",
			"      return null",
			"    }",
			"  }",
			"}",
		],
		"description": "page.status"
	}
}
```
