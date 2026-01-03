'use client';
import { useState } from 'react';
import { CodeBlock, TreeView, Grid, GridItem } from 'tuimorphic';
// ============================================================================
// CodeBlock Examples
// ============================================================================
export function CodeBlockBasic() {
    const code = `function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`;
    return <CodeBlock code={code}/>;
}
export function CodeBlockWithLanguage() {
    const code = `import { Button } from 'tuimorphic';

export function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}`;
    return (<CodeBlock code={code} language="typescript" showCopyButton/>);
}
export function CodeBlockNoLineNumbers() {
    const code = `npm install tuimorphic
pnpm add tuimorphic
yarn add tuimorphic`;
    return (<CodeBlock code={code} language="bash" showLineNumbers={false} showCopyButton/>);
}
export function CodeBlockCustomStartLine() {
    const code = `  const handleSubmit = async (data: FormData) => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: data,
    });
    return response.json();
  };`;
    return (<CodeBlock code={code} language="typescript" startLineNumber={42} showCopyButton/>);
}
// ============================================================================
// TreeView Examples
// ============================================================================
export function TreeViewBasic() {
    const data = [
        {
            id: 'src',
            label: 'src',
            children: [
                { id: 'index.ts', label: 'index.ts', isFile: true },
                {
                    id: 'components',
                    label: 'components',
                    children: [
                        { id: 'Button.tsx', label: 'Button.tsx', isFile: true },
                        { id: 'Input.tsx', label: 'Input.tsx', isFile: true },
                    ],
                },
                {
                    id: 'utils',
                    label: 'utils',
                    children: [
                        { id: 'helpers.ts', label: 'helpers.ts', isFile: true },
                    ],
                },
            ],
        },
        { id: 'package.json', label: 'package.json', isFile: true },
        { id: 'tsconfig.json', label: 'tsconfig.json', isFile: true },
    ];
    return (<TreeView data={data} defaultExpanded={['src', 'components']}/>);
}
export function TreeViewWithSelection() {
    const [selected, setSelected] = useState(null);
    const data = [
        {
            id: 'documents',
            label: 'Documents',
            children: [
                { id: 'report.pdf', label: 'report.pdf', isFile: true },
                { id: 'notes.txt', label: 'notes.txt', isFile: true },
                {
                    id: 'projects',
                    label: 'Projects',
                    children: [
                        { id: 'project-a', label: 'project-a', isFile: true },
                        { id: 'project-b', label: 'project-b', isFile: true },
                    ],
                },
            ],
        },
        {
            id: 'downloads',
            label: 'Downloads',
            children: [
                { id: 'image.png', label: 'image.png', isFile: true },
                { id: 'archive.zip', label: 'archive.zip', isFile: true },
            ],
        },
    ];
    return (<div className="space-y-2">
      <TreeView data={data} defaultExpanded={['documents']} onSelect={(node) => setSelected(node.label)}/>
      {selected && (<p className="text-sm opacity-70">Selected: {selected}</p>)}
    </div>);
}
export function TreeViewDeepNesting() {
    const data = [
        {
            id: 'level-1',
            label: 'Level 1',
            children: [
                {
                    id: 'level-2',
                    label: 'Level 2',
                    children: [
                        {
                            id: 'level-3',
                            label: 'Level 3',
                            children: [
                                {
                                    id: 'level-4',
                                    label: 'Level 4',
                                    children: [
                                        { id: 'deep-file', label: 'deeply-nested.txt', isFile: true },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                { id: 'sibling', label: 'sibling.ts', isFile: true },
            ],
        },
    ];
    return (<TreeView data={data} defaultExpanded={['level-1', 'level-2', 'level-3', 'level-4']}/>);
}
// ============================================================================
// Grid Examples
// ============================================================================
export function GridBasic() {
    return (<Grid columns={3} gap={2}>
      <GridItem>
        <div className="p-4 border border-current">Item 1</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Item 2</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Item 3</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Item 4</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Item 5</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Item 6</div>
      </GridItem>
    </Grid>);
}
export function GridWithSpanning() {
    return (<Grid columns={4} gap={2}>
      <GridItem span={2}>
        <div className="p-4 border border-current">Span 2</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Normal</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Normal</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Normal</div>
      </GridItem>
      <GridItem span={3}>
        <div className="p-4 border border-current">Span 3</div>
      </GridItem>
      <GridItem span={4}>
        <div className="p-4 border border-current">Full Width (Span 4)</div>
      </GridItem>
    </Grid>);
}
export function GridAutoFit() {
    return (<Grid columns="auto" gap={2}>
      <GridItem>
        <div className="p-4 border border-current min-w-[120px]">Auto 1</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current min-w-[120px]">Auto 2</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current min-w-[120px]">Auto 3</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current min-w-[120px]">Auto 4</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current min-w-[120px]">Auto 5</div>
      </GridItem>
    </Grid>);
}
export function GridCustomGaps() {
    return (<Grid columns={2} rowGap={4} columnGap={8}>
      <GridItem>
        <div className="p-4 border border-current">Row gap: 4ch</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Column gap: 8ch</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">Different gaps</div>
      </GridItem>
      <GridItem>
        <div className="p-4 border border-current">For layout</div>
      </GridItem>
    </Grid>);
}
