import toast from 'react-hot-toast';

export const notLoggedInToast = () => {
    toast.error('Not logged in.');
};

export const generalErrorToast = () => {
    toast.error('Something went wrong...');
};

export const networkErrorToast = () => {
    toast.error('Network error. Please try again.');
};
