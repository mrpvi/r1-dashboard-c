import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../../components/shared/molecules/Toast/index';
import { useNotificationStore } from '@/stores/notification.store';

const meta = {
  title: 'Shared/Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const { showNotification } = useNotificationStore();
      
      const showSuccessToast = () => {
        showNotification({
          title: 'Success',
          message: 'Operation completed successfully',
          type: 'success',
        });
      };

      const showErrorToast = () => {
        showNotification({
          title: 'Error',
          message: 'Something went wrong',
          type: 'error',
        });
      };

      return (
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <button
              onClick={showSuccessToast}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Show Success Toast
            </button>
            <button
              onClick={showErrorToast}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Show Error Toast
            </button>
          </div>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'top-center',
  },
}; 