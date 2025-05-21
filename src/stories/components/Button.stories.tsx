import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/shared/atoms/Button';
import { iconRegistry } from '@/app/assets/icons';

const meta = {
  title: 'Shared/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    isDisabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    block: {
      control: 'boolean',
    },
    icon: {
      control: 'select',
      options: Object.keys(iconRegistry),
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    isLoading: true,
  },
};

export const Block: Story = {
  args: {
    children: 'Block Button',
    block: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Button with Icon',
    icon: 'spinner',
  },
}; 