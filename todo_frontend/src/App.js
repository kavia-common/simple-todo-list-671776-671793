import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

/**
 * Ocean Professional themed Todo App
 * - Central column layout
 * - Add, list, and remove todos
 * - In-memory state only
 * - Modern minimalist styling with gradients, shadows, rounded corners, transitions
 */

// PUBLIC_INTERFACE
function App() {
  /** Theme setup: Apply Ocean Professional palette as CSS variables at runtime */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--op-primary', '#3b82f6'); // Primary blue
    root.style.setProperty('--op-secondary', '#64748b'); // Slate
    root.style.setProperty('--op-success', '#06b6d4'); // Cyan
    root.style.setProperty('--op-error', '#EF4444'); // Red
    root.style.setProperty('--op-background', '#f9fafb'); // Background
    root.style.setProperty('--op-surface', '#ffffff'); // Card surface
    root.style.setProperty('--op-text', '#111827'); // Text
    root.style.setProperty('--op-shadow', '0 10px 25px rgba(17, 24, 39, 0.08)');
    root.style.setProperty('--op-radius', '14px');
    root.style.setProperty('--op-radius-sm', '10px');
    root.style.setProperty('--op-radius-xs', '8px');
    root.style.setProperty('--op-focus', '0 0 0 3px rgba(59, 130, 246, 0.35)');
    root.style.setProperty('--op-gradient-start', 'rgba(59, 130, 246, 0.10)');
    root.style.setProperty('--op-gradient-end', '#f9fafb');
  }, []);

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  // Autofocus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = useMemo(() => input.trim(), [input]);
  const isAddDisabled = trimmed.length === 0;

  const handleAdd = () => {
    if (isAddDisabled) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, text: trimmed }]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="op-app">
      <div className="op-bg-gradient" />
      <main className="op-container" aria-labelledby="app-title">
        <section className="op-card">
          <header className="op-card-header">
            <div className="op-title-wrap">
              <span className="op-title-icon" aria-hidden="true">🗂️</span>
              <h1 id="app-title" className="op-title">Todo List</h1>
            </div>
            <p className="op-subtitle">Keep track of what matters. Add tasks and clear them as you go.</p>
          </header>

          <div className="op-input-row" role="form" aria-label="Add todo">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you need to do?"
              className="op-input"
              aria-label="Todo text"
            />
            <button
              className={`op-btn ${isAddDisabled ? 'op-btn-disabled' : ''}`}
              onClick={handleAdd}
              disabled={isAddDisabled}
              aria-disabled={isAddDisabled}
              aria-label="Add todo"
              title={isAddDisabled ? 'Enter a task first' : 'Add todo'}
            >
              <span className="op-btn-icon" aria-hidden="true">＋</span>
              Add
            </button>
          </div>

          <ul className="op-list" aria-live="polite">
            {todos.length === 0 && (
              <li className="op-empty">
                <span className="op-empty-icon" aria-hidden="true">🌊</span>
                <div className="op-empty-text">
                  <strong>No items yet</strong>
                  <span>Start by adding your first task above.</span>
                </div>
              </li>
            )}
            {todos.map((todo) => (
              <li key={todo.id} className="op-item">
                <span className="op-item-text">{todo.text}</span>
                <button
                  onClick={() => handleRemove(todo.id)}
                  className="op-icon-btn"
                  aria-label={`Remove ${todo.text}`}
                  title="Remove"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </section>
        <footer className="op-footer">
          <span>Ocean Professional UI • In-memory only</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
