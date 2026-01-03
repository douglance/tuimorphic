'use client';
export function ComponentPreview({ children, className = '' }) {
    return (<div className={`component-preview ${className}`}>
      <div className="preview-content">
        {children}
      </div>
    </div>);
}
export function PropsTable({ props }) {
    return (<div className="props-table-wrapper">
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
          {props.map((prop) => (<tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
                {prop.required && <span className="required">*</span>}
              </td>
              <td><code>{prop.type}</code></td>
              <td>{prop.default ? <code>{prop.default}</code> : '—'}</td>
              <td>{prop.description}</td>
            </tr>))}
        </tbody>
      </table>
    </div>);
}
