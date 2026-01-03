'use client';

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({ children, className = '' }: ComponentPreviewProps) {
  return (
    <div className={`component-preview ${className}`}>
      <div className="preview-content">
        {children}
      </div>
    </div>
  );
}

interface PropsTableProps {
  props: {
    name: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
  }[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="props-table-wrapper">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
                {prop.required && <span className="required">*</span>}
              </td>
              <td><code>{prop.type}</code></td>
              <td>{prop.default ? <code>{prop.default}</code> : '—'}</td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
