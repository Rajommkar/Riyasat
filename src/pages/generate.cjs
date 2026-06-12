const fs = require('fs');
const path = require('path');
const pagesDir = path.join('c:/', '.vscode', 'refine_dashboard', 'client', 'src', 'pages');

const pages = [
  { file: 'home.tsx', comp: 'Home' },
  { file: 'agent-profile.tsx', comp: 'AgentProfile' },
  { file: 'agent.tsx', comp: 'Agents' },
  { file: 'all-properties.tsx', comp: 'AllProperties' },
  { file: 'create-property.tsx', comp: 'CreateProperty' },
  { file: 'edit-property.tsx', comp: 'EditProperty' },
  { file: 'my-profile.tsx', comp: 'MyProfile' },
  { file: 'property-details.tsx', comp: 'PropertyDetails' },
];

let indexContent = "export { Login } from './login';\n";

pages.forEach(p => {
  const content = `import React from 'react';\n\nconst ${p.comp} = () => {\n  return (\n    <div>${p.comp}</div>\n  );\n};\n\nexport default ${p.comp};\n`;
  fs.writeFileSync(path.join(pagesDir, p.file), content);
  indexContent += `export { default as ${p.comp} } from './${p.file.replace('.tsx', '')}';\n`;
});

fs.writeFileSync(path.join(pagesDir, 'index.ts'), indexContent);
