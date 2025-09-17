import Icon from './icon';

export default function ButtonDisabledText() {
    return (
        <>
            <Icon name="loader" size="xs" className="animate-spin" />
            Submitting...
        </>
    );
}
