export default interface MenuOption {
    name: string;
    label: string;
    route: string;
    disabled?: boolean;
    className?: string;
    activeClassName?: string;
}