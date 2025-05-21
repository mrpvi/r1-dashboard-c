import type { Meta, StoryObj } from '@storybook/react';
import { Field } from '../../components/shared/molecules/Field/index';
import { Input } from '@/components/shared/atoms/Input';
import { useForm } from 'react-hook-form';

const FieldWrapper = (props: any) => {
  const { register, formState: { errors } } = useForm();
  return <Field {...props} register={register} errors={errors} />;
};

const meta = {
  title: 'Shared/Molecules/Field',
  component: FieldWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Field',
    name: 'default',
    id: 'default-field',
    children: <Input placeholder="Enter text" />,
  },
};