import React from 'react';
import '../styles/globals.css';

const ColorSwatch = ({ name, color }: { name: string; color: string }) => (
  <div className="flex flex-col gap-2">
    <div 
      className="w-24 h-24 rounded-md border border-neutral-st2-default" 
      style={{ backgroundColor: color }}
    />
    <div className="flex flex-col">
      <span className="text-body-2-strong text-neutral-fg1-default">{name}</span>
      <span className="text-caption-1 text-neutral-fg2-default">{color}</span>
    </div>
  </div>
);

const ColorSection = ({ title, colors }: { title: string; colors: { name: string; color: string }[] }) => (
  <section className="mb-8">
    <h2 className="text-title-3 text-neutral-fg1-default mb-4">{title}</h2>
    <div className="flex flex-wrap gap-6">
      {colors.map(({ name, color }) => (
        <ColorSwatch key={name} name={name} color={color} />
      ))}
    </div>
  </section>
);

const TextExample = ({ className, name }: { className: string; name: string }) => (
  <div className="mb-6">
    <div className="flex flex-col gap-2">
      <span className="text-caption-1-strong text-neutral-fg2-default">{name}</span>
      <p className={className}>
        Arvancloud Challenge
      </p>
      <div className="text-caption-1 text-neutral-fg2-default">
        <p>Font Weight: {className.includes('semibold') ? 'Semibold' : 'Regular'}</p>
        <p>Font Size: {className.includes('title-1') ? '40px' : 
                      className.includes('title-2') ? '24px' :
                      className.includes('title-3') ? '18px' :
                      className.includes('body-1') ? '16px' :
                      className.includes('body-2') ? '14px' :
                      className.includes('caption-1') ? '12px' :
                      '10px'}</p>
        <p>Line Height: {className.includes('title-1') ? '56px' :
                        className.includes('title-2') ? '32px' :
                        className.includes('title-3') ? '24px' :
                        className.includes('body-1') ? '24px' :
                        className.includes('body-2') ? '20px' :
                        className.includes('caption-1') ? '16px' :
                        '12px'}</p>
        <p>Letter Spacing: {className.includes('title-1') ? '-0.8px' :
                           className.includes('title-2') ? '-0.48px' :
                           className.includes('title-3') ? '-0.36px' :
                           className.includes('body-1') ? '-0.32px' :
                           className.includes('body-2') ? '-0.28px' :
                           className.includes('caption-1') ? '-0.32px' :
                           '-0.2px'}</p>
      </div>
    </div>
  </div>
);

const TextSection = () => (
  <section className="mb-8">
    <h2 className="text-title-3 text-neutral-fg1-default mb-4">Typography</h2>
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="text-body-2-strong text-neutral-fg1-default mb-4">Headings</h3>
        <TextExample className="text-title-1" name="Title 1" />
        <TextExample className="text-title-2" name="Title 2" />
        <TextExample className="text-title-3" name="Title 3" />
      </div>
      <div>
        <h3 className="text-body-2-strong text-neutral-fg1-default mb-4">Body Text</h3>
        <TextExample className="text-body-1" name="Body 1 (Semibold)" />
        <TextExample className="text-body-2" name="Body 2 (Regular)" />
        <TextExample className="text-body-2-strong" name="Body 2 (Semibold)" />
      </div>
      <div>
        <h3 className="text-body-2-strong text-neutral-fg1-default mb-4">Caption Text</h3>
        <TextExample className="text-caption-1" name="Caption 1 (Regular)" />
        <TextExample className="text-caption-1-strong" name="Caption 1 (Semibold)" />
        <TextExample className="text-caption-2" name="Caption 2 (Regular)" />
      </div>
    </div>
  </section>
);

export const Page: React.FC = () => {
  const neutralColors = [
    { name: 'Neutral BG1 Default', color: 'var(--color-neutral-bg1-default)' },
    { name: 'Neutral BG1 Hover', color: 'var(--color-neutral-bg1-hover)' },
    { name: 'Neutral BG1 Focus', color: 'var(--color-neutral-bg1-focus)' },
    { name: 'Neutral BG1 Press', color: 'var(--color-neutral-bg1-press)' },
    { name: 'Neutral BG2 Default', color: 'var(--color-neutral-bg2-default)' },
    { name: 'Neutral BG2 Hover', color: 'var(--color-neutral-bg2-hover)' },
    { name: 'Neutral BG2 Focus', color: 'var(--color-neutral-bg2-focus)' },
    { name: 'Neutral BG2 Press', color: 'var(--color-neutral-bg2-press)' },
    { name: 'Neutral BG2 Disable', color: 'var(--color-neutral-bg2-disable)' },
    { name: 'Neutral BG2 Selected', color: 'var(--color-neutral-bg2-selected)' },
    { name: 'Neutral FG1 Default', color: 'var(--color-neutral-fg1-default)' },
    { name: 'Neutral FG1 Hover', color: 'var(--color-neutral-fg1-hover)' },
    { name: 'Neutral FG1 Focus', color: 'var(--color-neutral-fg1-focus)' },
    { name: 'Neutral FG1 Press', color: 'var(--color-neutral-fg1-press)' },
    { name: 'Neutral FG1 Disable', color: 'var(--color-neutral-fg1-disable)' },
    { name: 'Neutral FG2 Default', color: 'var(--color-neutral-fg2-default)' },
    { name: 'Neutral FG2 Hover', color: 'var(--color-neutral-fg2-hover)' },
    { name: 'Neutral FG2 Focus', color: 'var(--color-neutral-fg2-focus)' },
    { name: 'Neutral FG2 Press', color: 'var(--color-neutral-fg2-press)' },
    { name: 'Neutral FG2 Disable', color: 'var(--color-neutral-fg2-disable)' },
    { name: 'Neutral FG2 Selected', color: 'var(--color-neutral-fg2-selected)' },
    { name: 'Neutral FG3 Default', color: 'var(--color-neutral-fg3-default)' },
    { name: 'Neutral ST1 Default', color: 'var(--color-neutral-st1-default)' },
    { name: 'Neutral ST2 Default', color: 'var(--color-neutral-st2-default)' },
    { name: 'Neutral ST3 Default', color: 'var(--color-neutral-st3-default)' },
  ];

  const primaryColors = [
    { name: 'Primary BG1 Default', color: 'var(--color-primary-bg1-default)' },
    { name: 'Primary BG1 Hover', color: 'var(--color-primary-bg1-hover)' },
    { name: 'Primary BG1 Focus', color: 'var(--color-primary-bg1-focus)' },
    { name: 'Primary BG1 Press', color: 'var(--color-primary-bg1-press)' },
    { name: 'Primary BG2 Default', color: 'var(--color-primary-bg2-default)' },
    { name: 'Primary BG2 Hover', color: 'var(--color-primary-bg2-hover)' },
    { name: 'Primary BG2 Focus', color: 'var(--color-primary-bg2-focus)' },
    { name: 'Primary BG2 Press', color: 'var(--color-primary-bg2-press)' },
    { name: 'Primary BG2 Disable', color: 'var(--color-primary-bg2-disable)' },
    { name: 'Primary FG1 Default', color: 'var(--color-primary-fg1-default)' },
    { name: 'Primary FG1 Hover', color: 'var(--color-primary-fg1-hover)' },
    { name: 'Primary FG1 Focus', color: 'var(--color-primary-fg1-focus)' },
    { name: 'Primary FG1 Press', color: 'var(--color-primary-fg1-press)' },
    { name: 'Primary FG1 Disable', color: 'var(--color-primary-fg1-disable)' },
  ];

  const errorColors = [
    { name: 'Error BG1 Default', color: 'var(--color-error-bg1-default)' },
    { name: 'Error BG1 Hover', color: 'var(--color-error-bg1-hover)' },
    { name: 'Error BG1 Focus', color: 'var(--color-error-bg1-focus)' },
    { name: 'Error BG1 Press', color: 'var(--color-error-bg1-press)' },
    { name: 'Error BG2 Default', color: 'var(--color-error-bg2-default)' },
    { name: 'Error BG2 Hover', color: 'var(--color-error-bg2-hover)' },
    { name: 'Error BG2 Focus', color: 'var(--color-error-bg2-focus)' },
    { name: 'Error BG2 Press', color: 'var(--color-error-bg2-press)' },
    { name: 'Error BG2 Disable', color: 'var(--color-error-bg2-disable)' },
    { name: 'Error FG1 Default', color: 'var(--color-error-fg1-default)' },
    { name: 'Error FG1 Hover', color: 'var(--color-error-fg1-hover)' },
    { name: 'Error FG1 Focus', color: 'var(--color-error-fg1-focus)' },
    { name: 'Error FG1 Press', color: 'var(--color-error-fg1-press)' },
    { name: 'Error FG1 Disable', color: 'var(--color-error-fg1-disable)' },
    { name: 'Error FG2 Default', color: 'var(--color-error-fg2-default)' },
    { name: 'Error FG2 Hover', color: 'var(--color-error-fg2-hover)' },
    { name: 'Error FG2 Focus', color: 'var(--color-error-fg2-focus)' },
    { name: 'Error FG2 Press', color: 'var(--color-error-fg2-press)' },
    { name: 'Error FG2 Disable', color: 'var(--color-error-fg2-disable)' },
  ];

  const successColors = [
    { name: 'Success BG1 Default', color: 'var(--color-success-bg1-default)' },
    { name: 'Success BG1 Hover', color: 'var(--color-success-bg1-hover)' },
    { name: 'Success BG1 Focus', color: 'var(--color-success-bg1-focus)' },
    { name: 'Success BG1 Press', color: 'var(--color-success-bg1-press)' },
    { name: 'Success BG2 Default', color: 'var(--color-success-bg2-default)' },
    { name: 'Success BG2 Hover', color: 'var(--color-success-bg2-hover)' },
    { name: 'Success BG2 Focus', color: 'var(--color-success-bg2-focus)' },
    { name: 'Success BG2 Press', color: 'var(--color-success-bg2-press)' },
    { name: 'Success BG2 Disable', color: 'var(--color-success-bg2-disable)' },
    { name: 'Success FG1 Default', color: 'var(--color-success-fg1-default)' },
    { name: 'Success FG1 Hover', color: 'var(--color-success-fg1-hover)' },
    { name: 'Success FG1 Focus', color: 'var(--color-success-fg1-focus)' },
    { name: 'Success FG1 Press', color: 'var(--color-success-fg1-press)' },
    { name: 'Success FG2 Default', color: 'var(--color-success-fg2-default)' },
    { name: 'Success FG2 Hover', color: 'var(--color-success-fg2-hover)' },
    { name: 'Success FG2 Focus', color: 'var(--color-success-fg2-focus)' },
    { name: 'Success FG2 Press', color: 'var(--color-success-fg2-press)' },
    { name: 'Success FG2 Disable', color: 'var(--color-success-fg2-disable)' },
  ];

  const linkColors = [
    { name: 'Link Default', color: 'var(--color-link-default)' },
    { name: 'Link Hover', color: 'var(--color-link-hover)' },
    { name: 'Link Focus', color: 'var(--color-link-focus)' },
    { name: 'Link Disable', color: 'var(--color-link-disable)' },
  ];

  return (
    <article className="p-8">
      <h1 className="text-title-1 text-neutral-fg1-default mb-8">Design System Documentation</h1>
      
      <TextSection />
      
      <h2 className="text-title-2 text-neutral-fg1-default mb-8">Color Palette</h2>
      <ColorSection title="Neutral Colors" colors={neutralColors} />
      <ColorSection title="Primary Colors" colors={primaryColors} />
      <ColorSection title="Error Colors" colors={errorColors} />
      <ColorSection title="Success Colors" colors={successColors} />
      <ColorSection title="Link Colors" colors={linkColors} />
    </article>
  );
};
