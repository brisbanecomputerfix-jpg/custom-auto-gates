import React, { useRef, useState } from 'react';
import { UploadCloud, X, File, Image, Film, AlertCircle } from 'lucide-react';

export default function FileUploadField({
  files = [],
  onChange,
  maxFiles = 5,
  maxSizeMb = 25,
  helperText = 'Optional: Upload driveway photos, site slope videos, or existing gate motor pictures'
}) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = (newFiles) => {
    setError('');
    const validFiles = [];
    const maxSizeBytes = maxSizeMb * 1024 * 1024;

    if (files.length + newFiles.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (file.size > maxSizeBytes) {
        setError(`"${file.name}" exceeds the ${maxSizeMb}MB file size limit.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0 && onChange) {
      onChange([...files, ...validFiles]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemove = (index, e) => {
    e.stopPropagation();
    if (onChange) {
      const updated = files.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (file) => {
    if (file.type && file.type.startsWith('image/')) {
      return <Image size={16} className="text-amber-500" />;
    }
    if (file.type && file.type.startsWith('video/')) {
      return <Film size={16} className="text-blue-500" />;
    }
    return <File size={16} className="text-slate-400" />;
  };

  return (
    <div style={{ marginTop: '0.85rem', marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-heading, #0f172a)', marginBottom: '0.35rem' }}>
        Upload Photos / Videos <span style={{ fontWeight: '400', color: 'var(--text-muted, #64748b)', fontSize: '0.78rem' }}>(Optional)</span>
      </label>

      {/* Dropzone container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: dragOver ? '2px dashed #d97706' : '1.5px dashed var(--border-light, #cbd5e1)',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          backgroundColor: dragOver ? 'rgba(217, 119, 6, 0.05)' : 'var(--bg-card-subtle, #f8fafc)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(Array.from(e.target.files));
              e.target.value = ''; // Reset input so same file can be re-selected if removed
            }
          }}
          style={{ display: 'none' }}
        />

        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: 'rgba(217, 119, 6, 0.12)',
          color: '#d97706',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <UploadCloud size={20} />
        </div>

        <div>
          <span style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-heading, #0f172a)' }}>
            Click to upload
          </span>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-muted, #64748b)' }}> or drag & drop</span>
        </div>

        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted, #94a3b8)', lineHeight: 1.4 }}>
          {helperText} (JPG, PNG, HEIC, MP4, MOV up to {maxSizeMb}MB)
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginTop: '0.5rem',
          color: '#ef4444',
          fontSize: '0.78rem'
        }}>
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.45rem 0.75rem',
                backgroundColor: 'var(--bg-surface, #ffffff)',
                border: '1px solid var(--border-light, #e2e8f0)',
                borderRadius: '8px',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden' }}>
                {getFileIcon(file)}
                <span
                  style={{
                    fontWeight: '600',
                    color: 'var(--text-heading, #1e293b)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '240px'
                  }}
                  title={file.name}
                >
                  {file.name}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted, #64748b)' }}>
                  ({formatFileSize(file.size)})
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleRemove(idx, e)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: '2px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                title="Remove file"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
