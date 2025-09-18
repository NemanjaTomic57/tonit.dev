import { IconType } from 'react-icons';
import { FaAngleDown, FaGithub } from 'react-icons/fa6';
import { LuLoaderCircle } from 'react-icons/lu';

const icons: { [key: string]: IconType } = {
    angleDown: FaAngleDown,
    loader: LuLoaderCircle,
    github: FaGithub,
};

interface Props {
    name: keyof typeof icons;
    size?: string;
    sizeComputed?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export default function Icon({ name, size, sizeComputed, color, className, onClick }: Props) {
    const SelectedIcon = icons[name];

    if (!SelectedIcon) console.error('Icon not found: ' + { name });

    if (!sizeComputed) {
        switch (size) {
            case 'xs':
                sizeComputed = 16;
                break;

            case 'sm':
                sizeComputed = 20;
                break;

            case 'base':
                sizeComputed = 24;
                break;

            case 'lg':
                sizeComputed = 30;
                break;

            case 'xl':
                sizeComputed = 38;
                break;

            default:
                sizeComputed = 24;
                break;
        }
    }

    return (
        <div className={className} onClick={onClick}>
            <SelectedIcon size={sizeComputed} color={color} />
        </div>
    );
}
