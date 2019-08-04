import * as React from "react";
import {useState} from "react";
import MenuOption from "./MenuOption";
import {Link} from "react-router-dom";

interface Props {
    options: MenuOption[];
    containerClassName?: string;
}

export default function PageBaseMenuOptions(props: Props) {
    const [activeOption, setActiveOption] = useState('');
    return <div className={`page-menu ${props.containerClassName ? props.containerClassName : ''}`}>
        {
            props.options.map((item: MenuOption, index: number) => {
                if (item.disabled) {
                    return renderDisabledOption(index, item, activeOption, setActiveOption)
                }
                return renderSimpleOption(index, item, activeOption, setActiveOption)
            })
        }
    </div>
}


function renderSimpleOption(index: number, item: MenuOption, activeOption: string, setActiveOption: React.Dispatch<React.SetStateAction<string>>) {
    return <Link key={index}
                 className={getOptionClassName(item, activeOption === item.name)}
                 onClick={() => setActiveOption(item.name)}
                 to={item.route}>
        {item.label}
    </Link>;
}

function renderDisabledOption(index: number, item: MenuOption, activeOption: string, setActiveOption: React.Dispatch<React.SetStateAction<string>>) {
    return <div style={{color: '#AAA'}} key={index}
                className={getOptionClassName(item, item.name === activeOption)}
                onClick={() => setActiveOption(item.name)}>
        {item.label}
    </div>;
}

function getOptionClassName(item: MenuOption, isActive: boolean): string {
    let className = 'page-menu-option ' + (item.className ? item.className : '');
    if (isActive) {
        className += ' active ' + (item.activeClassName ? item.activeClassName : ' ');
    }
    return className;
}


