import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../components/shared/atoms/Input/index';

const meta = {
  title: 'Shared/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary'],
      description: 'The variant of the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isError: {
      control: 'boolean',
      description: 'Whether the input is in error state',
    },
    as: {
      control: 'select',
      options: ['input', 'textarea'],
      description: 'Render as input or textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'The type of input',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Default Input',
    variant: 'primary',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small Input',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large Input',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled Input',
    isDisabled: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Error Input',
    isError: true,
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter password',
    type: 'password',
  },
};

export const Email: Story = {
  args: {
    placeholder: 'Enter email',
    type: 'email',
  },
};

export const Textarea: Story = {
  args: {
    placeholder: 'Enter your message',
    as: 'textarea',
    rows: 4,
  },
}; 